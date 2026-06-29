# Lovable.dev Build Prompt — Russian Daily

Paste this prompt into Lovable.dev to scaffold the initial interface.

---

## PROMPT

Build a Russian language learning app called **Russian Daily** — an AI-powered everyday Russian trainer for someone living in Russia who needs real supermarket and daily-life fluency. This is NOT a flashcard or vocabulary app. Every screen simulates a real Russian interaction, powered by Claude AI acting as a bilingual tutor named **Лена**.

### Tech Stack
- React + Vite + Tailwind CSS + shadcn/ui
- Supabase for auth and user progress
- Claude API (claude-sonnet-4-6) for conversation
- Web Speech API for voice input

### Pages & Navigation

**1. Home Page (`/`)**
A clean, focused home screen:
- Top strip: "Phrases used in real life this week: [N]"
- A large hero card: "Today's Survival Drill" — shows the daily scenario title (e.g. "At the checkout"), a brief description, and a big "Start Drill →" button with a mic icon
- Below: a 2-column grid of 10 category tiles. Each tile has:
  - An icon (emoji is fine: 🛒 🔢 🥕 ❓ 💊 🚇 ☕ 💳 🤝 🚨)
  - Category name in Russian + English (e.g. "Супермаркет / Supermarket")
  - A 5-dot confidence meter (filled dots = confidence level 0–5)
- No streaks, no hearts, no XP bar, no leaderboard

**2. Category Page (`/category/:id`)**
Shows all scenarios inside a category as cards. Each scenario card shows:
- Setting photo (use a relevant Unsplash image by keyword)
- Scenario title in Russian + English
- "Can-do" capability tag (e.g. "I can buy fruit by weight")
- Confidence dots (●●○○○)
- "Practice" button

**3. Lesson / Scenario Page (`/lesson/:id`)**
This is the main interaction screen. Layout:

**Top bar:**
- Back arrow, scenario title, a "?" Help button that switches to COACH mode
- Mode indicator chip: "IN_SCENE" or "COACH" or "DRILL" (color-coded)

**Scenario header:**
- Setting photo (16:9, rounded)
- Subtitle: e.g. "You're at the fish counter. Ask for 200g of salmon."
- Target phrases chip row (e.g. "Взвесьте, пожалуйста" / "Сколько стоит?") — shown at start, fade out once used

**Conversation area (scrollable):**
- Chat-style bubbles. AI (Лена/shopkeeper) on left with a small avatar. User on right.
- Each Russian bubble is tappable → expands a 3-layer stack:
  1. Cyrillic text (large, primary)
  2. Transliteration in gray italic (visible by default, has an eye-toggle to hide)
  3. English gloss in small text (collapsed by default, tap to expand)
- Each bubble has a speaker icon for audio playback + a slow-play (0.75x) button

**Input area (bottom, sticky):**
- Large mic button (primary action) — press to speak, release to submit
- Small keyboard icon to switch to text input
- "Hint" button showing the next suggested phrase
- "Word bank" button showing 3 chip options when stuck

**After scene completes:**
- Summary card slides up showing:
  - Scenario completed ✓
  - Errors logged: list of corrections (was → should be → why)
  - "Did you use any of these today in real life?" → Yes/Not yet toggle per phrase
  - "Next scenario →" and "Practice again" buttons

**4. Numbers Drill Page (`/drill/numbers`)**
A dedicated rapid-fire drill mode:
- AI speaks a price in Russian (audio): "сто сорок пять рублей"
- User types or speaks the number: "145"
- 3-second countdown timer per item
- Shows result instantly (correct/wrong + correct answer)
- Tracks score: X/20 correct
- Configurable: prices (1–5000 rubles) / weights (100g–5kg) / quantities (1–50)

**5. Progress Page (`/progress`)**
- "Can-Do" checklist: list of all scenario capabilities with Rehearsed/Tried/Confident status
- Weekly "phrases used in real life" count with a simple bar chart
- Category grid showing overall confidence per category
- FSRS review queue: "X phrases due for review today"

### Supabase Schema (create these tables)
```sql
-- Users table (extends Supabase auth.users)
create table profiles (
  id uuid references auth.users primary key,
  display_name text,
  cefr_level text default 'A1',
  created_at timestamptz default now()
);

-- Scenario progress per user
create table scenario_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  scenario_id text not null,
  confidence int default 0 check (confidence between 0 and 5),
  times_practiced int default 0,
  last_practiced_at timestamptz,
  can_do_confirmed bool default false
);

-- FSRS spaced repetition state per phrase
create table phrase_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  phrase_id text not null,
  due_date timestamptz default now(),
  stability float default 1.0,
  difficulty float default 5.0,
  last_review_at timestamptz,
  review_count int default 0
);

-- Real-life usage confirmations
create table real_life_uses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  phrase_id text not null,
  scenario_id text,
  confirmed_at timestamptz default now()
);
```

### Claude AI Integration

Create a Supabase Edge Function `/api/chat` that proxies to Claude API. The function:
1. Receives: `{ state: ConversationState, userMessage: string, mode: 'IN_SCENE' | 'COACH' | 'DRILL' }`
2. Calls Claude with this system prompt structure:

```
You are Лена, a warm Russian tutor and conversation partner. You help an English speaker living in Russia practice everyday Russian interactions.

CURRENT STATE: {{state_json}}

RULES:
- IN_SCENE mode: You play the Russian shopkeeper/character. Speak ONLY Russian. Max 1-2 short sentences. Then wait. Never blend into English. Never over-explain. If the user makes a grammar error that doesn't block comprehension, recast the correct form naturally in your reply and log it.
- COACH mode: Switch to English. Explain what just happened, correct errors, teach the grammar pattern briefly. Then offer to return to the scene.
- DRILL mode: Fire rapid number/price/weight prompts in Russian. Grade the response strictly.

ERROR HANDLING:
- If the error doesn't block comprehension: recast it in your reply, add to corrections[]
- If it blocks comprehension: ask for clarification in-character ("Простите?")
- Never praise mediocre output. Recast and move on.

OUTPUT FORMAT (always return valid JSON):
{
  "russian_text": "...",
  "transliteration": "...",
  "english_gloss": "...",
  "corrections": [{"was": "...", "fix": "...", "why": "..."}],
  "scene_complete": false,
  "next_state": {...updated state object}
}
```

Store the Anthropic API key in Supabase secrets as `ANTHROPIC_API_KEY`.

### Static Content: The 10 Categories

Hardcode this initial content in a `src/data/categories.ts` file:

```typescript
export const categories = [
  {
    id: 'supermarket',
    nameRu: 'Супермаркет',
    nameEn: 'Supermarket & Market',
    icon: '🛒',
    scenarios: [
      { id: 'checkout', titleRu: 'На кассе', titleEn: 'At the checkout', canDo: 'I can handle the checkout', photo: 'supermarket-checkout' },
      { id: 'deli_counter', titleRu: 'У прилавка', titleEn: 'At the deli counter', canDo: 'I can order at the deli', photo: 'deli-counter' },
      { id: 'produce', titleRu: 'Фрукты и овощи', titleEn: 'Fruit and veg section', canDo: 'I can buy produce by weight', photo: 'produce-market' },
      { id: 'find_item', titleRu: 'Где это?', titleEn: 'Finding items', canDo: 'I can ask where things are', photo: 'supermarket-aisle' },
    ]
  },
  {
    id: 'numbers',
    nameRu: 'Числа и цены',
    nameEn: 'Numbers, Prices & Weights',
    icon: '🔢',
    scenarios: [
      { id: 'prices_1_20', titleRu: 'Цены 1–20', titleEn: 'Prices 1–20', canDo: 'I understand prices under 20 rubles', photo: 'price-tag' },
      { id: 'prices_to_1000', titleRu: 'Цены до 1000', titleEn: 'Prices up to 1000₽', canDo: 'I understand prices at normal speed', photo: 'cash-register' },
      { id: 'weights', titleRu: 'Вес и граммы', titleEn: 'Weights and grams', canDo: 'I can order by weight', photo: 'market-scale' },
      { id: 'number_noun', titleRu: 'Число + слово', titleEn: '1 рубль / 2 рубля / 5 рублей', canDo: 'I know the 1/2-4/5+ rule', photo: 'numbers' },
    ]
  },
  {
    id: 'food',
    nameRu: 'Продукты',
    nameEn: 'Food: Fruit, Veg, Meat, Fish',
    icon: '🥕',
    scenarios: [
      { id: 'vegetables', titleRu: 'Овощи', titleEn: 'Vegetables', canDo: 'I know 15 vegetables', photo: 'vegetables' },
      { id: 'fruit', titleRu: 'Фрукты', titleEn: 'Fruit', canDo: 'I know 10 fruits', photo: 'fruit-market' },
      { id: 'meat', titleRu: 'Мясо', titleEn: 'Meat', canDo: 'I can order meat at the counter', photo: 'butcher' },
      { id: 'fish', titleRu: 'Рыба', titleEn: 'Fish', canDo: 'I can buy fish by weight', photo: 'fish-market' },
    ]
  },
  {
    id: 'questions',
    nameRu: 'Вопросы',
    nameEn: 'Asking Questions',
    icon: '❓',
    scenarios: [
      { id: 'where', titleRu: 'Где находится?', titleEn: 'Where is...?', canDo: 'I can ask and understand directions', photo: 'asking-directions' },
      { id: 'how_much', titleRu: 'Сколько стоит?', titleEn: 'How much is it?', canDo: 'I can ask and understand prices', photo: 'price-inquiry' },
      { id: 'do_you_have', titleRu: 'У вас есть?', titleEn: 'Do you have...?', canDo: 'I can ask for items I need', photo: 'shop-inquiry' },
      { id: 'can_i', titleRu: 'Можно?', titleEn: 'Can I...? / May I...?', canDo: 'I can use Можно for permission/requests', photo: 'polite-request' },
    ]
  },
  {
    id: 'pharmacy',
    nameRu: 'Аптека',
    nameEn: 'Pharmacy & Health',
    icon: '💊',
    scenarios: [
      { id: 'pharmacy_basic', titleRu: 'В аптеке', titleEn: 'In the pharmacy', canDo: 'I can ask for basic medication', photo: 'pharmacy' },
      { id: 'symptoms', titleRu: 'Что болит', titleEn: 'Describing symptoms', canDo: 'I can say what hurts', photo: 'health' },
    ]
  },
  {
    id: 'transport',
    nameRu: 'Транспорт',
    nameEn: 'Transport & Directions',
    icon: '🚇',
    scenarios: [
      { id: 'taxi', titleRu: 'Такси', titleEn: 'Taking a taxi', canDo: 'I can tell a taxi driver where to go', photo: 'taxi' },
      { id: 'metro', titleRu: 'Метро', titleEn: 'Metro', canDo: 'I can navigate the metro', photo: 'metro' },
    ]
  },
  {
    id: 'cafe',
    nameRu: 'Кафе',
    nameEn: 'Café & Restaurant',
    icon: '☕',
    scenarios: [
      { id: 'ordering', titleRu: 'Заказ', titleEn: 'Ordering', canDo: 'I can order food and drinks', photo: 'cafe' },
      { id: 'paying', titleRu: 'Оплата', titleEn: 'Paying the bill', canDo: 'I can ask for the bill and pay', photo: 'cafe-paying' },
    ]
  },
  {
    id: 'money',
    nameRu: 'Деньги',
    nameEn: 'Money & Banking',
    icon: '💳',
    scenarios: [
      { id: 'paying_methods', titleRu: 'Как платить', titleEn: 'Payment methods', canDo: 'I know cash vs card phrases', photo: 'payment' },
    ]
  },
  {
    id: 'smalltalk',
    nameRu: 'Общение',
    nameEn: 'Small Talk & Politeness',
    icon: '🤝',
    scenarios: [
      { id: 'vy_vs_ty', titleRu: 'Вы и ты', titleEn: 'Formal vs informal', canDo: 'I know when to use вы vs ты', photo: 'conversation' },
      { id: 'getting_attention', titleRu: 'Девушка! Молодой человек!', titleEn: 'Getting attention', canDo: 'I can get someone\'s attention politely', photo: 'asking-help' },
      { id: 'softeners', titleRu: 'Пожалуйста / Давайте / Норм', titleEn: 'Russian softeners and fillers', canDo: 'I sound natural not robotic', photo: 'polite' },
    ]
  },
  {
    id: 'emergency',
    nameRu: 'Срочно',
    nameEn: 'Emergencies & Officials',
    icon: '🚨',
    scenarios: [
      { id: 'help', titleRu: 'Помогите!', titleEn: 'Asking for help', canDo: 'I can ask for help in an emergency', photo: 'emergency' },
      { id: 'documents', titleRu: 'Документы', titleEn: 'Documents & officials', canDo: 'I can handle a basic official interaction', photo: 'documents' },
    ]
  },
];
```

### Design System
- **Primary color:** Deep Russian blue `#1A237E`
- **Accent:** Warm amber `#FF8F00` (for correct answers, confidence fills)
- **Error color:** Soft red `#C62828` (for corrections — not harsh)
- **Background:** Off-white `#FAFAFA`
- **Font:** Inter for UI, a slightly larger size for Cyrillic text (16px min for readability)
- **Tone:** Focused and calm. No cartoon characters. No confetti. Adult learner energy.

### Auth
Use Supabase Auth with magic link (email). No password required. After login, redirect to `/` home.

### Mobile-First
Design for mobile (375px base). The lesson screen especially — the chat + mic button pattern should feel like WhatsApp, not a desktop app.

---

Build the home page, category page, and lesson page shell first. Wire up Claude for the IN_SCENE conversation on the lesson page. The numbers drill page can come second. Focus on making the core conversation loop feel natural and fast.
