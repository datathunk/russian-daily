# Russian Daily — Product Requirements Document
## AI-Powered Everyday Russian for Real Life in Russia

**Version:** 1.0  
**Date:** 2026-06-29  
**Status:** Ready for Build  
**Repo:** github.com/datathunk/russian-daily

---

## Executive Summary

377 days of Duolingo and you still can't survive a supermarket. That's not failure — that's what Duolingo is designed to produce: a passive recognizer, not a speaker. This system is built to fix exactly that. **Russian Daily** is a scenario-first, AI-powered training system where every session simulates a real Russian interaction — the cashier, the deli counter, the pharmacy — and forces live spoken output, not tile-tapping. Powered by Claude AI acting as a bilingual tutor and conversation partner named **Лена**, it drills the 200 functional phrases, number-noun agreements, and case patterns that unlock everyday life in Russia.

---

## The Problem: Why Duolingo Fails at Russian

Duolingo optimizes engagement metrics, not fluency. For Russian specifically, this produces five critical gaps:

### 1. Recognition vs. Production
Duolingo's tap-the-tile mechanic tests whether you recognize the right answer when it's in front of you. Russian supermarket life requires free production under time pressure. These are completely different cognitive skills. After 377 days, a learner has built strong recognition circuits and zero production pathways.

### 2. Cases Without Stakes
Russian has 6 grammatical cases — noun endings change based on the word's role in the sentence. Duolingo introduces cases as vocabulary to recognize, never as live decisions to make. In a real transaction, "a kilogram of apples" requires the genitive plural (килограмм яблок), not the nominative (яблоко). You cannot tap your way to that under cashier pressure.

### 3. Verb Aspect Is Invisible
Russian has no simple past tense — every verb comes in perfective/imperfective pairs (брать/взять, платить/заплатить). Duolingo treats these as vocabulary. They are the core decision behind every completed action. "I'll take it" = возьму (perfective). Getting this wrong marks you as a permanent beginner regardless of vocabulary size.

### 4. Stress Is Untrained
Russian stress is not marked in written text, shifts across a word's paradigm (рука → руку), and completely changes pronunciation. Duolingo audio is slow and citation-form. Native cashiers are not. A learner can know every word and still be incomprehensible because of stress errors.

### 5. No Situational Context
Duolingo encodes vocabulary against English prompts and cartoon images. In Russia, the retrieval cue is a cashier's face, a price display, a fast spoken question. The encoding never matches the retrieval context. Memory doesn't transfer.

---

## The Solution: How Russian Daily Works

### Core Philosophy
**Output leads input.** Forced spoken production in realistic scenarios, with the AI as a conversation partner who corrects by recasting rather than lecturing. Grammar is learned as a byproduct of situational practice, never as abstract rules.

### The AI Tutor: Лена
A single bilingual persona — a warm, patient Russian neighbor who plays shopkeepers, pharmacists, and locals in scripted scenarios. She operates in three modes:

- **IN_SCENE** — Лена speaks Russian as the character. Max 1-2 sentences, then waits for the learner's response.
- **COACH** — English meta-explanation, triggered only when the learner taps "Help" or types "?".
- **DRILL** — Rapid-fire numbers, prices, and weights with a timer.

Mode switching is learner-controlled via a UI button — not AI-guessed. Predictable behavior over clever behavior.

### The State Contract
Every conversation turn passes a JSON state object to Claude:
```json
{
  "scenario": "supermarket_deli",
  "step": 3,
  "cefr_level": "A2",
  "target_phrases": ["Взвесьте, пожалуйста", "Сколько стоит?"],
  "errors_logged": [{"was": "килограм яблоки", "fix": "килограмма яблок", "why": "genitive after 2"}],
  "mode": "IN_SCENE",
  "hints_used": 1
}
```
This persists to Supabase between turns, making the stateless Claude API appear to have memory. Progression is tracked in state, not conversation history.

---

## Learning Architecture

### Unit of Memory: The Scenario-Phrase
Not isolated words. Not whole dialogues. A **scenario-phrase** is a complete functional utterance tied to a location and intent:

> "Взвесьте, пожалуйста, полкило" — Weigh half a kilo, please. `@market/deli`

These are scheduled with FSRS (Forgetting-curve Spaced Repetition) — not SM-2, which degrades with irregular review intervals. Difficulty calibration runs in four stages:
1. Recognition (passive)
2. Cued recall (given the situation, what do you say?)
3. Free production (spoken output, no hints)
4. Live-speed roleplay (AI is unscripted, pressure is real)

A phrase only "graduates" at stage 4.

### The Quantity Genitive — The Master Key
The single most important unlock for Russian daily life:

> The noun's ending is a function of its grammatical role, and "quantity/amount" is its own grammatical role that forces the **genitive case**.

Once internalized, this unlocks supermarkets, prices, weights, and recipes simultaneously. The 1/2–4/5+ number-noun split is the first thing drilled because it fires in every transaction:

| Numbers | Rule | Example |
|---------|------|---------|
| 1 | Nominative singular | оди́н рубль |
| 2–4 | Genitive singular | два рубля́ |
| 5+ and 0 | Genitive plural | пять рубле́й |

It's the **last digit** that decides: 21 = два́дцать оди́н рубль, 22 = два́дцать два рубля́, 25 = два́дцать пять рубле́й.

### Grammar Through Situations (Never Abstract)
Cases are never taught as "the genitive case." They're drilled through the situations that require them:
- **Genitive of quantity** — every weight and price phrase
- **Accusative of request** — Дайте мне + food item
- **Prepositional of location** — Где находится + place
- **Instrumental of payment** — Картой или наличными?

### Verb Aspect for Transactions Only
Only the pairs that fire at checkout are taught in the first 30 days:
- взять (возьму) — to take (I'll take it)
- заплатить — to pay (completed)
- взвесить — to weigh (request)
- добавить — to add something more

---

## Content: The 10 Categories

Organized by **situations**, not grammar topics. Every category is a place the learner physically goes.

| # | Category | Key Skills |
|---|----------|------------|
| 1 | **Supermarket & Market** | Asking where things are, requesting items, checkout |
| 2 | **Numbers, Prices & Weights** | 1-1000, prices under pressure, кило/грамм/полкило |
| 3 | **Food: Fruit, Veg, Meat, Fish** | 50 core food words + quantity phrases |
| 4 | **Asking Questions** | Где? Сколько? У вас есть? Можно? Как? |
| 5 | **Pharmacy & Health** | У меня болит..., есть ли у вас... |
| 6 | **Transport & Directions** | Taxi, metro, "довезите до...", left/right/straight |
| 7 | **Café & Restaurant** | Ordering, paying, special requests |
| 8 | **Money & Banking** | Cards, cash, receipts, utilities |
| 9 | **Small Talk & Politeness** | Softeners, ты vs вы, getting attention |
| 10 | **Emergencies & Officials** | Police, documents, "помогите", medical |

**Category 2 (Numbers) is special** — it is both a standalone category and a skill layer threaded into every transactional scenario. Numbers drills auto-inject into categories 1, 3, 7, and 8.

---

## The Real Supermarket Script

These are the phrases that actually matter at a Russian supermarket. Every one of them is a target scenario-phrase:

| Russian | Transliteration | English |
|---------|----------------|---------|
| Извините, где находится...? | izviníte, gde nakhóditsa | Excuse me, where is...? |
| Скажите, пожалуйста... | skazhíte pozhálujsta | Tell me, please... |
| Сколько стоит? | skólko stóit | How much is it? |
| Взвесьте, пожалуйста | vzvéste pozhálujsta | Weigh it, please |
| Мне двести грамм вот этого | mne dvésti gramm vot étovo | 200g of this one |
| Можно вот это? (+ point) | mózhno vot éto | Can I have this one? |
| У вас есть...? | u vas yest | Do you have...? |
| Это всё | éto vsyo | That's all |
| Пакет не нужен | pakét ne núzhen | No bag needed |
| Картой можно? | kártoj mózhno | Can I pay by card? |
| Можно без сдачи? | mózhno bez sdáchi | Keep the change |

**Critical: Drill the cashier's questions first.** These fire at you without warning:
- *Пакет нужен?* — Bag?
- *Карта есть?* — Loyalty card?
- *Наличными или картой?* — Cash or card?
- *Чек нужен?* — Receipt?

The answers (нет, спасибо / да / картой) are more important to drill than the questions.

---

## Essential Food Vocabulary (50 Core Words)

### Овощи (Vegetables)
карто́шка, помидо́р, огуре́ц, лук, морко́вь *(f!)*, капу́ста, чесно́к, перец, свёкла, кабачо́к, баклажа́н, зе́лень

### Фрукты (Fruits)
я́блоко, ба́нан, апельси́н, лимо́н, виногра́д *(sing = grapes)*, клубни́ка, ма́ндарин, гру́ша, арбу́з, ды́ня

### Мясо (Meat)
говя́дина *(beef)*, свини́на *(pork)*, кури́ца *(chicken)*, фарш *(mince)*, сосиски, колбаса́, са́ло

### Рыба (Fish)
ры́ба, ло́сось, сёмга, селёдка, креветки, форе́ль

### Staples
хлеб, молоко́, сыр, я́йца, ма́сло *(butter AND oil!)*, смета́на, творо́г, кефи́р, са́хар, соль, гречка, рис, чай, ко́фе *(m, indeclinable)*

**Confusion flags:**
- морко́вь, соль, сельдь — feminine, end in -ь, confuse gender
- ма́сло = both butter and oil — always context-check
- виногра́д / карто́шка are mass nouns — no plural form for "potatoes"
- грамм stays грамм in colloquial plural (not граммо́в)

---

## Cultural Pragmatics (What Apps Never Teach)

### вы is default, always
Use **вы** with everyone you don't know. Using ты with a cashier or anyone older reads as aggressive or uneducated. Stay on вы until explicitly invited to switch. Hard-code this from day one.

### Getting Attention
- Call **Де́вушка!** for any woman under ~50
- Call **Молодо́й челове́к!** for any man
- "Excuse me" shouted into space is not Russian practice

### The No-Smile Rule
An unsmiling cashier is normal. Foreigners over-smiling reads as fake or simple. Don't perform friendliness — perform competence.

### Native Shortcuts
- **Мо́жно?** + pointing solves half of all transactions
- **Дава́йте** (let's go, go ahead, hand it over)
- **Всё** (that's it, done)
- **Норма́льно** (fine, OK, acceptable)

### What Makes You Look Rude
- Speaking English first and loud
- Holding up the queue (о́чередь is sacred)
- Counting change at the register
- Skipping здра́вствуйте entirely

---

## Error Correction Approach

**Deferred for flow, immediate for breakdown.**

- If the error doesn't block comprehension (case ending, gender), Лена **recasts** — she replies using the correct form naturally in her next line. The error is logged silently to `errors_logged`.
- If the error blocks the transaction (wrong word, unintelligible), she clarifies in-character: *Простите, сколько?*
- End of scene: COACH mode delivers a 3-line recap of the top recurring errors from `errors_logged`.

Never over-correct. This learner has been over-corrected into paralysis. Correct patterns, not every token.

---

## Progression System

### What Replaces Duolingo Streaks
**Can-Do capability tracking.** Each scenario maps to a real-world claim:
- "I can buy fruit by weight"
- "I can ask where something is"
- "I can handle checkout questions"

Progress = a checklist of unlocked real-life abilities. Shown as a **confidence meter per category**: Rehearsed → Tried in real life → Confident.

### The "Did You Use This?" Prompt
After each session, the app asks: "Did you use any of these phrases in real life today?" That self-report — tied to genuine real-world feedback — is the motivator. Show a weekly "phrases used in the wild" recap. This is uniquely powerful for someone who lives in Russia and has an instant testing ground.

### AI Progression Signals
The AI increases difficulty when three signals align:
1. **Unprompted production** — user produced target phrases without tapping Help
2. **Error decay** — same grammar error rate declining across scenes
3. **Hint reliance** — fewer transliteration toggles, fewer word bank uses

When a phrase is produced cleanly twice unaided: retire it, inject a harder variant (unscripted follow-up, colder register, number complication).

---

## Interface Design

### Home Screen
- **"Today's Survival Drill"** — one 3-minute scenario picked from the learner's weakest/most-overdue capability. One tap to start.
- **10-category grid** — large tappable tiles, confidence meter as fill level
- **"Phrases used in real life this week: N"** — thin top strip
- No leaderboard. No league. No lives system.

### Lesson Screen (Conversation-Rehearsal)
- **Top:** scenario header ("У прилавка с рыбой / At the fish counter") + setting photo
- **Center:** chat-style dialogue. AI vendor speaks (Russian bubble, left). Tap any bubble to expand: Cyrillic (large) → transliteration (muted, toggle-off as confidence grows) → English (smallest, collapsed by default). Audio plays automatically; slow-replay on every bubble.
- **Learner's turn:** mic button is primary. Speak the response. ASR scores pronunciation and intent, not exact word matching. "Show me phrasing" hint + 3-chip word bank as scaffolds.
- **Bottom:** thin progress rail showing turns completed in scene. Not XP.

### Transliteration Policy
Transliteration defaults visible but **auto-fades per word as the learner demonstrates recognition**. The crutch is removed gradually. An adult in Russia where every sign is Cyrillic cannot afford transliteration dependency.

### No Punishment Loops
No hearts. No lives. No lockouts. This learner is already punished by reality every day — the app adds rehearsal, not shame. Mistakes generate another attempt at the same scenario, never a penalty.

---

## Technical Architecture

### Stack
- **Frontend:** React + Vite + Tailwind + shadcn/ui (Lovable.dev)
- **Backend:** Supabase (auth, user progress, scenario-phrase FSRS state)
- **AI:** Claude API (claude-sonnet-4-6 for conversation, claude-haiku-4-5 for scoring/grading)
- **Audio:** Web Speech API (STT for learner input) + ElevenLabs or browser TTS (Лена's voice in Russian)

### Supabase Tables
```
users (id, email, cefr_level, created_at)
scenario_progress (user_id, scenario_id, step, errors_logged, last_played)
phrase_cards (id, scenario, russian, transliteration, english, audio_url, category)
fsrs_state (user_id, phrase_id, due_date, stability, difficulty, last_review)
real_life_uses (user_id, phrase_id, confirmed_at, note)
```

### Claude System Prompt Structure
Four locked blocks per conversation:
1. **ROLE & PERSONA** — Лена identity, tone, Russian-bias
2. **STATE CONTRACT** — receives and returns JSON state each turn
3. **MODE RULES** — IN_SCENE / COACH / DRILL — hard boundaries, no blending
4. **OUTPUT FORMAT** — structured fields: `russian_text`, `transliteration`, `english_gloss`, `corrections[]`, `next_state`

### ASR Scoring Policy
**Strict on phonemic accuracy.** Lenient ASR that accepts "close enough" consolidates fossilized errors. The system must grade stress placement and case endings, not just intent. A wrong answer that "means the right thing" is flagged, not praised.

---

## 30-Day Survival Curriculum

### Week 1 — Cashier Survival
Greetings, здравствуйте/до свидания, cashier Q&A drill (Пакет нужен? / Наличными или картой? / Чек нужен?), paying, "это всё", numbers 1–20 for prices.

### Week 2 — Numbers & Weights
Numbers 1–1000 in price contexts, рубль/рубля/рублей drill, weights (грамм, двести грамм, полкило, кило, полтора кило), price comprehension (hearing fast native prices and responding).

### Week 3 — The Counter
Deli/produce ordering (Взвесьте пожалуйста, Дайте мне..., Мне вот этого...), "where is" navigation, "do you have" queries, quantity genitive with 20 produce nouns.

### Week 4 — Range Expansion
Pharmacy (У меня болит..., есть ли у вас...), transport (taxi + metro essentials), asking for help and repeating (Повторите, пожалуйста / Я не понял), complaints and returns.

---

## Lovable.dev Build Prompt

*See `/docs/LOVABLE_PROMPT.md` for the full interface build prompt.*

---

## What This Is Not

- Not a grammar course. Grammar emerges through situational drilling.
- Not a vocabulary flashcard app. Isolated words are not practiced.
- Not a chatbot. Free-form conversation without structured scenarios trains false fluency.
- Not Duolingo with a Russian accent. No streaks, no hearts, no tile-tapping.

---

## Success Metric

**You walk into a Russian supermarket, a cashier asks you a question, and you answer correctly without freezing.**

That's it. Everything else is noise.
