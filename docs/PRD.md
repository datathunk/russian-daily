# Russian Daily — Product Requirements Document
## AI-Powered Everyday Russian for Real Life in Russia

**Version:** 2.0  
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

**You can hold a normal conversation with your girlfriend and her son at the dinner table without freezing, translating in your head, or reaching for your phone.**

Secondary: you handle any everyday environment — supermarket, gas station, café, beach, menu, taxi — without anxiety.

---

## Adaptive Learning System

### The Core Principle: The System Learns You

Russian Daily is not a fixed curriculum. It is an ever-evolving personal course that:
- Knows what you already know
- Knows what you're close to knowing (exposure without mastery)
- Knows what's too far ahead to be useful right now
- Rebuilds itself based on real performance data every session

### Initial Placement Assessment
On first launch, a 10-minute placement session determines starting level:

1. **Listening test** — AI plays 5 native-speed clips (supermarket, café, greeting). User selects what they understood. No reading required.
2. **Vocabulary probe** — 20 Russian words shown one at a time. User rates: "Never seen / Seen but unsure / Know it." Takes 2 minutes.
3. **Production test** — 3 simple scenarios. AI plays a Russian shopkeeper. User responds. AI scores output on grammar, vocabulary, and comprehension.
4. **Level estimate output** — system assigns a CEFR level per skill area (not one global score):

| Skill | Scale | Example |
|---|---|---|
| Listening | A1–B2 | "Understands slow, clear speech in familiar contexts" |
| Speaking | A1–B2 | "Can produce basic phrases with significant errors" |
| Vocabulary | word count | "~400 words passive, ~120 words active" |
| Grammar | pattern set | "Numbers 1–20 ✓, genitive quantity ✗, aspect ✗" |

### Known Vocabulary Graph
Every word the user encounters is tracked in a vocabulary graph:

```
word_encounters (word_id, context, times_seen, times_produced, last_seen, confidence_score)
```

This graph powers:
- **"Build from what you know"** — new scenarios use 80% known words, 20% new. The 20% is the growth edge.
- **"Don't drill what you've mastered"** — FSRS removes words from rotation when confidence is high across multiple production attempts
- **Vocabulary export** — user can see their real vocabulary at any time: "You know 340 words actively. Here's a gap: you know фрукты but not ягоды."

### Pace Adaptation
The system tracks session rhythm and adjusts:
- If a learner drills 5 minutes/day → short focused drills, high-frequency items only
- If a learner does 30 minutes/day → deeper scenario practice, more grammar patterns introduced
- After 3 consecutive failed attempts at a pattern → the system backs off, rebuilds from an easier version
- After 5 clean productions of a phrase → it graduates and something harder replaces it

---

## Pronunciation System

### Why Pronunciation Cannot Be an Afterthought
Russian pronunciation breaks English speaker fluency at three specific points:
1. **Stress** — shifts across paradigms, not marked in text, completely changes word recognition by natives
2. **Vowel reduction** — unstressed о sounds like а (молоко → "malakó"), unstressed е/я reduce further
3. **Soft consonants** — palatalization (нь, ть, дь) doesn't exist in English and produces a foreign accent that confuses natives

### The Pronunciation Coach (Лена's alter ego)
A dedicated pronunciation mode where the AI:
1. **Plays a phrase** (native TTS, natural speed)
2. **User repeats** (mic input)
3. **ASR scores phoneme by phoneme** — not just "did you say the right word" but "did you place stress correctly, did the vowels reduce properly"
4. **Shows a visual stress map**: highlighted syllable in the word (MOЛО́КО → moloKO)
5. **Plays comparison** — your version vs native version side by side

### Stress Drilling
Stress is taught as a **reflex drill**, not a rule:
- Show a word → user taps the stressed syllable before the audio plays
- Immediate feedback: correct stress lights up green, wrong lights up red with the correct version
- Stress patterns for high-frequency words are drilled daily in a 2-minute "stress sprint" until automatic

### Pronunciation Accuracy Scoring
Every production attempt logs:
```
pronunciation_attempts (attempt_id, user_id, phrase_id, phoneme_errors[], stress_correct, overall_score, recorded_at)
```
The score is strict — lenient scoring consolidates fossilized errors. A 70% threshold must be met before a phrase graduates from pronunciation drills.

### Soft Consonant Introduction
Introduced gradually through high-frequency words the user already knows:
- Week 1: ignore soft consonants, focus on vocabulary
- Week 3: introduce: **нет, сейчас, день, рубль** — high-frequency words with soft endings
- Month 2: systematic soft consonant drilling as its own 5-minute daily exercise

---

## Personal Life Russian — Talking With Family

This is the most important category in the entire system. Supermarket Russian is survival. Family Russian is belonging.

### The Register Shift: вы → ты
Everything taught in the public categories uses вы (formal). Family Russian runs entirely on ты. The system has a dedicated **"Home Mode"** where all scenarios use informal register — contractions, casual intonation, ты conjugations, colloquial vocabulary.

### Key Scenarios: Girlfriend & Her Son

**Daily life with girlfriend:**
| Scenario | Key phrases |
|---|---|
| Morning routine | Доброе утро / Как спала? / Кофе хочешь? |
| Asking about her day | Как дела? / Что случилось? / Расскажи |
| Expressing feelings | Я тебя люблю / Мне нравится / Мне не нравится / Мне всё равно |
| Making plans | Пойдём...? / Хочешь...? / Давай... |
| Eating together | Вкусно / Что приготовила? / Я сам сделаю |
| Small disagreements | Подожди / Я не понял / Не злись |
| Affection | Молодец / Умница / Красавица |

**Daily life with her son (child/teen register):**
| Scenario | Key phrases |
|---|---|
| Greeting / games | Привет / Как дела? / Во что играешь? |
| Asking what he wants | Хочешь есть? / Что будешь? |
| Simple praise | Молодец! / Классно! / Супер! |
| Understanding fast child speech | Listening drills at child's natural speed |
| Jokes and play | Давай / Поехали / Чур не я |

### Fast Native Speech Comprehension
Family members speak at full speed with reductions and dropped sounds. The system trains this separately:
- **Speed ladder** — same sentence at 60%, 80%, 100%, 120% of natural speed
- **Reduction training** — what "что" actually sounds like in fast speech ("шо"), what "сейчас" becomes ("щас")
- **Filler words** — ну, вот, значит, типа, короче — these appear constantly in informal speech and confuse learners who never heard them in an app

---

## Complete Category Map (All Life Scenarios)

Each category below has its own sub-PRD at `docs/categories/`. Every category is a place or situation in real Russian daily life.

### Public / Transactional
| # | Category | File | Key Scenarios |
|---|---|---|---|
| 1 | Supermarket & Market | `CAT-01-supermarket.md` | Checkout, deli, produce, finding items |
| 2 | Numbers, Prices & Weights | `CAT-02-numbers.md` | Prices 1–5000, weights, quantity nouns |
| 3 | Food Vocabulary | `CAT-03-food.md` | Fruit, veg, meat, fish, staples |
| 4 | Gas Station (АЗС) | `CAT-04-gas-station.md` | Fuel types, fill up, pay, car wash |
| 5 | Café & Restaurant | `CAT-05-cafe.md` | Ordering, menu reading, paying, complaints |
| 6 | Menu Reading | `CAT-06-menus.md` | Dish names, ingredients, asking what something is |
| 7 | Pharmacy | `CAT-07-pharmacy.md` | Symptoms, medication names, dosage instructions |
| 8 | Transport & Directions | `CAT-08-transport.md` | Taxi, metro, bus, asking directions |
| 9 | Money & Banking | `CAT-09-money.md` | ATM, card, cash, utilities |
| 10 | Asking Questions | `CAT-10-questions.md` | Где? Сколько? Как? У вас есть? Можно? |

### Leisure & Lifestyle
| # | Category | File | Key Scenarios |
|---|---|---|---|
| 11 | Beach & Outdoors | `CAT-11-beach.md` | Рядом с морем, sun, directions, vendors |
| 12 | Shopping (Clothes/Goods) | `CAT-12-shopping.md` | Size, colour, price, fitting room, returns |
| 13 | Barbershop / Beauty | `CAT-13-barbershop.md` | Describing what you want, prices |
| 14 | Gym & Sport | `CAT-14-gym.md` | Equipment names, asking to work in, booking |
| 15 | Park & Social Outdoors | `CAT-15-park.md` | Small talk with strangers, kids playing, dogs |

### Home & Family
| # | Category | File | Key Scenarios |
|---|---|---|---|
| 16 | **Family Conversations** | `CAT-16-family.md` | ⭐ Girlfriend, her son, morning/evening, meals |
| 17 | Household & Chores | `CAT-17-household.md` | Cleaning, shopping list, fixing things |
| 18 | Cooking Together | `CAT-18-cooking.md` | Recipe words, kitchen verbs, tasting |
| 19 | Watching TV / Films | `CAT-19-tv.md` | What's on, suggesting, reactions |
| 20 | Talking About Plans | `CAT-20-plans.md` | Weekend plans, travel, making arrangements |

### Social & Interpersonal
| # | Category | File | Key Scenarios |
|---|---|---|---|
| 21 | Small Talk | `CAT-21-smalltalk.md` | Weather, how are you, neighbours |
| 22 | Politeness & Register | `CAT-22-politeness.md` | вы/ты, getting attention, softeners |
| 23 | Expressing Opinions | `CAT-23-opinions.md` | I like / don't like / I think / in my opinion |
| 24 | Phone & Messaging | `CAT-24-phone.md` | WhatsApp phrases, calls, leaving a message |
| 25 | Making Friends | `CAT-25-friends.md` | Introducing yourself, asking about them |

### Practical & Emergency
| # | Category | File | Key Scenarios |
|---|---|---|---|
| 26 | Doctor & Health | `CAT-26-doctor.md` | Symptoms, appointments, prescriptions |
| 27 | Emergencies | `CAT-27-emergency.md` | Police, accident, asking for help |
| 28 | Documents & Officials | `CAT-28-documents.md` | Registration, ID, basic bureaucracy |
| 29 | Post Office & Delivery | `CAT-29-post.md` | Sending parcels, tracking, collecting |
| 30 | Repairs & Services | `CAT-30-repairs.md` | Plumber, electrician, car mechanic |

---

## Autonomous Agent Architecture

The course builds itself. A background agent pipeline runs continuously to generate new content, assess progress, and evolve the curriculum. No manual content authoring needed beyond the initial seed.

### Agent 1: The Assessor
**Runs:** After every 3 sessions  
**Job:** Evaluates the learner's current level across all skill dimensions using recent session data. Updates the CEFR estimate, vocabulary graph, and grammar pattern mastery map. Writes a brief assessment note: "You've mastered checkout phrases. Genitive plural after 5+ is still inconsistent. Recommend: weight drills."  
**Output:** Updated `user_profile.json` with level scores, mastered patterns, and weak spots.

### Agent 2: The Curriculum Planner
**Runs:** Daily (or when Assessor updates)  
**Job:** Reads the current `user_profile.json` and decides what to build next. Generates a 7-day learning plan — which scenarios to introduce, which phrases to review, which grammar patterns to drill. Prioritizes based on: real-life frequency (what does this learner encounter most in Russia?), learning proximity (what's one step beyond what they already know?), and time since last exposure.  
**Output:** `curriculum_plan.json` — the next 7 days of content with priorities.

### Agent 3: The Content Generator
**Runs:** When Curriculum Planner adds new scenarios to the plan  
**Job:** Claude generates full scenario content — the shopkeeper dialogue, the target phrases, the error correction scripts, the COACH mode explanation, the cultural note. Uses the learner's vocabulary graph to ensure 80% known words in new content. Generates 3 difficulty variants of each scenario (easy/normal/hard).  
**Output:** New scenario files in `data/scenarios/` — immediately available in the app.

### Agent 4: The Pronunciation Coach
**Runs:** After each speaking session  
**Job:** Analyzes the phoneme error logs from the session. Identifies the top 3 recurring errors (e.g. "stress on рубль wrong 4/5 times", "ы vs и confusion"). Generates targeted micro-drills — 5 words with the same error pattern, scheduled for the next session opening.  
**Output:** `pronunciation_drill_queue.json` — prepended to the next session's opening 2 minutes.

### Agent 5: The Vocabulary Miner
**Runs:** Weekly  
**Job:** Scans the learner's conversation logs and identifies words that appeared in AI output but were not in the learner's active vocabulary graph. Flags them as "exposure candidates" — words the learner has now seen in context and is ready to learn actively. Generates flashcard-style entries for each: Russian, stress marked, transliteration, example sentence from an actual session.  
**Output:** New entries in `word_encounters` table, scheduled for introduction in next week's sessions.

### Agent 6: The Personal Context Agent
**Runs:** On demand / weekly  
**Job:** This agent is unique — it learns about the learner's actual life in Russia. Periodically asks: "What situations came up this week that you didn't have the words for?" User answers in English. The agent converts these into new scenario seeds and adds them to the curriculum plan. This is how "talking about football with her son" or "understanding the building manager" get added — the course grows around the learner's real life.  
**Output:** New scenario seeds in `curriculum_plan.json`, tagged as `user_requested`.

### Agent Pipeline Architecture
```
[Session ends]
      ↓
[Assessor] → updates user_profile.json
      ↓
[Curriculum Planner] → reads profile → updates curriculum_plan.json
      ↓
[Content Generator] → builds new scenarios from plan
      ↓
[Pronunciation Coach] → queues micro-drills from session errors
      ↓
[Vocabulary Miner] (weekly) → mines session logs for exposure candidates
      ↓
[Personal Context Agent] (on demand) → adds real-life scenarios
      ↓
[App refreshes] → new content available next session
```

All agents are Claude API calls triggered by a local cron job or PM2 scheduled process. They read/write to the local SQLite database and the `data/` directory. No external infrastructure needed.

---

## Technical Architecture (Updated for Local)

### Stack
- **Frontend:** React + Vite + Tailwind + shadcn/ui — port **3030**
- **API Server:** Bun + Hono — port **3031**
- **Database:** SQLite via `bun:sqlite` — `data/russian.db`
- **AI:** Claude API (`claude-sonnet-4-6` for conversation, `claude-haiku-4-5` for scoring/drills)
- **Audio:** Web Speech API (STT) + ElevenLabs or system TTS (Лена's voice)
- **Agent runner:** PM2 scheduled jobs or local cron

### SQLite Schema (Full)
```sql
-- Core user profile
CREATE TABLE user_profile (
  id INTEGER PRIMARY KEY,
  display_name TEXT,
  cefr_listening TEXT DEFAULT 'A1',
  cefr_speaking TEXT DEFAULT 'A1',
  active_vocabulary_count INTEGER DEFAULT 0,
  sessions_completed INTEGER DEFAULT 0,
  last_session_at DATETIME,
  profile_json TEXT -- full JSON blob updated by Assessor agent
);

-- Known vocabulary graph
CREATE TABLE word_encounters (
  id INTEGER PRIMARY KEY,
  word TEXT NOT NULL,
  word_ru TEXT NOT NULL,
  category TEXT,
  times_seen INTEGER DEFAULT 0,
  times_produced INTEGER DEFAULT 0,
  confidence_score REAL DEFAULT 0.0,
  stress_marked TEXT, -- e.g. "молоко́"
  last_seen_at DATETIME,
  mastered_at DATETIME
);

-- Scenario progress
CREATE TABLE scenario_progress (
  id INTEGER PRIMARY KEY,
  scenario_id TEXT NOT NULL,
  category_id TEXT NOT NULL,
  times_practiced INTEGER DEFAULT 0,
  confidence INTEGER DEFAULT 0,
  can_do_confirmed INTEGER DEFAULT 0,
  last_practiced_at DATETIME
);

-- FSRS spaced repetition
CREATE TABLE phrase_reviews (
  id INTEGER PRIMARY KEY,
  phrase_id TEXT NOT NULL,
  due_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  stability REAL DEFAULT 1.0,
  difficulty REAL DEFAULT 5.0,
  last_review_at DATETIME,
  review_count INTEGER DEFAULT 0
);

-- Pronunciation attempts
CREATE TABLE pronunciation_attempts (
  id INTEGER PRIMARY KEY,
  phrase_id TEXT NOT NULL,
  scenario_id TEXT,
  stress_correct INTEGER,
  overall_score REAL,
  phoneme_errors TEXT, -- JSON array
  recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Real-life usage confirmations
CREATE TABLE real_life_uses (
  id INTEGER PRIMARY KEY,
  phrase_id TEXT NOT NULL,
  scenario_id TEXT,
  confirmed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Agent-generated curriculum plan
CREATE TABLE curriculum_plan (
  id INTEGER PRIMARY KEY,
  plan_date DATE,
  scenario_id TEXT,
  priority INTEGER,
  source TEXT, -- 'assessor' | 'user_requested' | 'vocabulary_miner'
  status TEXT DEFAULT 'pending', -- 'pending' | 'in_progress' | 'completed'
  notes TEXT
);

-- Session logs (for Vocabulary Miner agent)
CREATE TABLE session_logs (
  id INTEGER PRIMARY KEY,
  scenario_id TEXT,
  session_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ai_output TEXT, -- full AI dialogue for mining
  user_input TEXT,
  errors_logged TEXT, -- JSON
  duration_seconds INTEGER
);
```

### PM2 Config
```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'russian-daily',
      script: 'vite',
      args: '--port 3030',
      cwd: '/Users/datathunk/dev/AI/russian-daily',
    },
    {
      name: 'russian-daily-api',
      script: 'bun',
      args: 'run src/api/server.ts',
      cwd: '/Users/datathunk/dev/AI/russian-daily',
      env: { PORT: 3031, ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY }
    },
    {
      name: 'russian-daily-agents',
      script: 'bun',
      args: 'run src/agents/runner.ts',
      cwd: '/Users/datathunk/dev/AI/russian-daily',
      cron_restart: '0 * * * *', // run agent pipeline every hour
    }
  ]
}
```

### Caddy Entry
```
russian.localhost {
  reverse_proxy localhost:3030
}
russian-api.localhost {
  reverse_proxy localhost:3031
}
```

---

## Category Sub-PRDs

Each category listed in the Complete Category Map has its own PRD file at `docs/categories/CAT-XX-name.md`. These are generated by the Content Generator agent as the course evolves. The initial seed PRDs to build first (in order):

1. `CAT-01-supermarket.md` — already seeded in v1.0
2. `CAT-02-numbers.md` — highest leverage, gates everything else
3. `CAT-16-family.md` — ⭐ the real goal: girlfriend and her son
4. `CAT-05-cafe.md` — daily use
5. `CAT-04-gas-station.md` — frequent real-life scenario
6. `CAT-10-questions.md` — cross-cutting skill
7. `CAT-11-beach.md` — summer/leisure context

Remaining categories are generated by the Content Generator agent as the learner progresses, triggered by the Curriculum Planner.

---

## What This Is Not

- Not a grammar course. Grammar emerges through situational drilling.
- Not a vocabulary flashcard app. Isolated words are not practiced.
- Not a chatbot. Free-form conversation without structured scenarios trains false fluency.
- Not Duolingo with a Russian accent. No streaks, no hearts, no tile-tapping.
- Not a fixed curriculum. The course rebuilds itself around your actual life in Russia.

---

## Success Metric

**You can hold a normal conversation with your girlfriend and her son at the dinner table without freezing, translating in your head, or reaching for your phone.**

Secondary: you handle any everyday environment — supermarket, gas station, café, beach, menu, taxi — without anxiety.

The system knows what you know, builds from where you are, and runs itself.
