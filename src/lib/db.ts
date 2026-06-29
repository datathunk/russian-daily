// JSON file store — replaces SQLite/Supabase for lean local mode.
// Server-side only (TanStack Start server functions).
// Browser persistence uses localStorage via src/lib/store.ts

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const DATA_DIR = process.env.DB_PATH ?? "data";

function readJson<T>(file: string): T[] {
  const p = join(DATA_DIR, file);
  if (!existsSync(p)) return [];
  try { return JSON.parse(readFileSync(p, "utf-8")) as T[]; } catch { return []; }
}

function writeJson<T>(file: string, rows: T[]) {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(join(DATA_DIR, file), JSON.stringify(rows, null, 2));
}

export const jsonDb = {
  getScenarioProgress(userId: string, scenarioId: string) {
    const rows = readJson<any>("scenario_progress.json");
    return rows.find((r) => r.user_id === userId && r.scenario_id === scenarioId) ?? null;
  },
  upsertScenarioProgress(userId: string, scenarioId: string, patch: Record<string, any>) {
    const rows = readJson<any>("scenario_progress.json");
    const idx = rows.findIndex((r) => r.user_id === userId && r.scenario_id === scenarioId);
    const now = new Date().toISOString();
    if (idx >= 0) {
      rows[idx] = { ...rows[idx], ...patch, last_practiced_at: now };
    } else {
      rows.push({ id: Date.now(), user_id: userId, scenario_id: scenarioId, times_practiced: 0, confidence: 0, can_do_confirmed: 0, last_practiced_at: now, ...patch });
    }
    writeJson("scenario_progress.json", rows);
  },
  getAllScenarioProgress(userId: string) {
    return readJson<any>("scenario_progress.json").filter((r) => r.user_id === userId);
  },
  addRealLifeUse(userId: string, phraseId: string, scenarioId?: string) {
    const rows = readJson<any>("real_life_uses.json");
    rows.push({ id: Date.now(), user_id: userId, phrase_id: phraseId, scenario_id: scenarioId ?? null, confirmed_at: new Date().toISOString() });
    writeJson("real_life_uses.json", rows);
  },
  getWeeklyRealLifeCount(userId: string): number {
    const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
    return readJson<any>("real_life_uses.json").filter(
      (r) => r.user_id === userId && r.confirmed_at >= since,
    ).length;
  },
};

// Stub localDb for any remaining imports — routes through jsonDb
type Row = Record<string, unknown>;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Row = Record<string, unknown>;

interface QueryResult {
  data: Row | Row[] | null;
  count?: number;
  error: null | Error;
}

type SelectOptions = { count?: "exact"; head?: boolean };

// ---------------------------------------------------------------------------
// QueryBuilder
// ---------------------------------------------------------------------------

class QueryBuilder implements PromiseLike<QueryResult> {
  private _table: string;
  private _operation: "select" | "insert" | "update" | "count" = "select";
  private _cols: string = "*";
  private _conditions: Array<{ col: string; op: string; val: unknown }> = [];
  private _insertData: Row | null = null;
  private _updateData: Row | null = null;
  private _singleMode = false;
  private _countMode = false;

  constructor(table: string) {
    this._table = table;
  }

  // --- SELECT ---

  select(cols: string, opts?: SelectOptions): this {
    if (opts?.count === "exact") {
      this._operation = "count";
      this._countMode = true;
    } else {
      this._operation = "select";
      this._cols = cols;
    }
    return this;
  }

  // --- INSERT ---

  insert(data: Row): this {
    this._operation = "insert";
    this._insertData = data;
    return this;
  }

  // --- UPDATE ---

  update(data: Row): this {
    this._operation = "update";
    this._updateData = data;
    return this;
  }

  // --- WHERE clauses ---

  eq(col: string, val: unknown): this {
    this._conditions.push({ col, op: "=", val });
    return this;
  }

  gte(col: string, val: unknown): this {
    this._conditions.push({ col, op: ">=", val });
    return this;
  }

  lte(col: string, val: unknown): this {
    this._conditions.push({ col, op: "<=", val });
    return this;
  }

  gt(col: string, val: unknown): this {
    this._conditions.push({ col, op: ">", val });
    return this;
  }

  lt(col: string, val: unknown): this {
    this._conditions.push({ col, op: "<", val });
    return this;
  }

  // --- Modifiers ---

  maybeSingle(): this {
    this._singleMode = true;
    return this;
  }

  // ---------------------------------------------------------------------------
  // Execution helpers
  // ---------------------------------------------------------------------------

  private buildWhere(): { clause: string; params: unknown[] } {
    if (this._conditions.length === 0) return { clause: "", params: [] };
    const clause =
      "WHERE " + this._conditions.map((c) => `"${c.col}" ${c.op} ?`).join(" AND ");
    const params = this._conditions.map((c) => c.val);
    return { clause, params };
  }

  private runSelect(): QueryResult {
    const { clause, params } = this.buildWhere();

    // Parse columns — handle "col1, col2" or "*"
    const colList =
      this._cols.trim() === "*"
        ? "*"
        : this._cols
            .split(",")
            .map((c) => `"${c.trim()}"`)
            .join(", ");

    const sql = `SELECT ${colList} FROM "${this._table}" ${clause}`;
    const stmt = db.prepare(sql);
    const rows = stmt.all(...(params as Parameters<typeof stmt.all>)) as Row[];

    if (this._singleMode) {
      return { data: rows[0] ?? null, error: null };
    }
    return { data: rows, error: null };
  }

  private runCount(): QueryResult {
    const { clause, params } = this.buildWhere();
    const sql = `SELECT COUNT(*) as cnt FROM "${this._table}" ${clause}`;
    const stmt = db.prepare(sql);
    const row = stmt.get(...(params as Parameters<typeof stmt.get>)) as { cnt: number } | undefined;
    return { data: null, count: row?.cnt ?? 0, error: null };
  }

  private runInsert(): QueryResult {
    if (!this._insertData) return { data: null, error: new Error("No insert data") };

    const obj = this._insertData;
    const keys = Object.keys(obj);
    const cols = keys.map((k) => `"${k}"`).join(", ");
    const placeholders = keys.map(() => "?").join(", ");
    const vals = keys.map((k) => obj[k]);

    // For scenario_progress: upsert on (user_id, scenario_id) conflict
    // For other tables: plain insert
    let sql: string;
    if (this._table === "scenario_progress") {
      const updateCols = keys
        .filter((k) => k !== "user_id" && k !== "scenario_id")
        .map((k) => `"${k}" = excluded."${k}"`)
        .join(", ");
      sql = `INSERT INTO "${this._table}" (${cols}) VALUES (${placeholders})
             ON CONFLICT(user_id, scenario_id) DO UPDATE SET ${updateCols}`;
    } else {
      sql = `INSERT INTO "${this._table}" (${cols}) VALUES (${placeholders})`;
    }

    const stmt = db.prepare(sql);
    stmt.run(...(vals as Parameters<typeof stmt.run>));

    return { data: null, error: null };
  }

  private runUpdate(): QueryResult {
    if (!this._updateData) return { data: null, error: new Error("No update data") };

    const obj = this._updateData;
    const keys = Object.keys(obj);
    const setClauses = keys.map((k) => `"${k}" = ?`).join(", ");
    const setVals = keys.map((k) => obj[k]);

    const { clause, params } = this.buildWhere();
    const sql = `UPDATE "${this._table}" SET ${setClauses} ${clause}`;

    const stmt = db.prepare(sql);
    stmt.run(...([...setVals, ...params] as Parameters<typeof stmt.run>));

    return { data: null, error: null };
  }

  // ---------------------------------------------------------------------------
  // PromiseLike — makes `await queryBuilder` work
  // ---------------------------------------------------------------------------

  then<TResult1 = QueryResult, TResult2 = never>(
    onfulfilled?: ((value: QueryResult) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    let result: QueryResult;
    try {
      switch (this._operation) {
        case "select":
          result = this.runSelect();
          break;
        case "count":
          result = this.runCount();
          break;
        case "insert":
          result = this.runInsert();
          break;
        case "update":
          result = this.runUpdate();
          break;
        default:
          result = { data: null, error: new Error("Unknown operation") };
      }
    } catch (err) {
      if (onrejected) return Promise.resolve(onrejected(err));
      return Promise.reject(err);
    }

    if (onfulfilled) return Promise.resolve(onfulfilled(result));
    return Promise.resolve(result as unknown as TResult1);
  }
}

// ---------------------------------------------------------------------------
// localDb — drop-in replacement for context.supabase
// ---------------------------------------------------------------------------

export const localDb = {
  from(table: string): QueryBuilder {
    return new QueryBuilder(table);
  },
};

// Note: db.init.ts (bun:sqlite) is intentionally NOT re-exported here — CF Workers don't support it.

