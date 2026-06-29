import { Database } from "bun:sqlite";
import { mkdirSync } from "fs";
import { dirname } from "path";

const DB_PATH = process.env.DB_PATH || "data/russian.db";

// Ensure data directory exists
try {
  mkdirSync(dirname(DB_PATH), { recursive: true });
} catch {
  // already exists
}

export const db = new Database(DB_PATH, { create: true });

// WAL mode for better concurrency
db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA foreign_keys = ON;");

export function initDb(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS scenario_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL DEFAULT 'local-user',
      scenario_id TEXT NOT NULL,
      category_id TEXT,
      confidence INTEGER DEFAULT 0,
      times_practiced INTEGER DEFAULT 0,
      can_do_confirmed INTEGER DEFAULT 0,
      last_practiced_at TEXT,
      UNIQUE(user_id, scenario_id)
    );

    CREATE TABLE IF NOT EXISTS real_life_uses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL DEFAULT 'local-user',
      phrase_id TEXT NOT NULL,
      scenario_id TEXT,
      confirmed_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS pronunciation_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL DEFAULT 'local-user',
      phrase_id TEXT NOT NULL,
      scenario_id TEXT,
      stress_correct INTEGER,
      overall_score REAL,
      phoneme_errors TEXT,
      recorded_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS phrase_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL DEFAULT 'local-user',
      phrase_id TEXT NOT NULL,
      due_date TEXT DEFAULT (datetime('now')),
      stability REAL DEFAULT 1.0,
      difficulty REAL DEFAULT 5.0,
      last_review_at TEXT,
      review_count INTEGER DEFAULT 0,
      UNIQUE(user_id, phrase_id)
    );

    CREATE TABLE IF NOT EXISTS word_encounters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL DEFAULT 'local-user',
      word TEXT NOT NULL,
      word_ru TEXT NOT NULL,
      category TEXT,
      times_seen INTEGER DEFAULT 0,
      times_produced INTEGER DEFAULT 0,
      confidence_score REAL DEFAULT 0.0,
      stress_marked TEXT,
      last_seen_at TEXT,
      mastered_at TEXT,
      UNIQUE(user_id, word)
    );
  `);
}
