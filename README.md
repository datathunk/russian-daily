# Russian Daily

AI-powered everyday Russian for people living in Russia. Built for real supermarket conversations, not Duolingo streaks.

## The Problem
377 days of Duolingo → still can't survive a cashier. Duolingo builds passive recognition. Russian daily life demands live spoken production under pressure.

## The Solution
Scenario-first learning powered by Claude AI. Every session simulates a real Russian interaction. You speak. The AI plays the shopkeeper, corrects by recasting, and tracks what you can actually do in the wild.

## Docs
- [`docs/PRD.md`](docs/PRD.md) — Full product requirements, learning architecture, curriculum
- [`docs/LOVABLE_PROMPT.md`](docs/LOVABLE_PROMPT.md) — Lovable.dev build prompt for the interface

## Stack
- React + Vite + Tailwind + shadcn/ui (Lovable.dev)
- Supabase (auth + progress)
- Claude API (claude-sonnet-4-6)
- Web Speech API

## Categories
1. Supermarket & Market
2. Numbers, Prices & Weights
3. Food: Fruit, Veg, Meat, Fish
4. Asking Questions
5. Pharmacy & Health
6. Transport & Directions
7. Café & Restaurant
8. Money & Banking
9. Small Talk & Politeness
10. Emergencies & Officials
