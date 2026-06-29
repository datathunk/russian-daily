export type Scenario = {
  id: string;
  titleRu: string;
  titleEn: string;
  canDo: string;
  photo: string;
};

export type Category = {
  id: string;
  nameRu: string;
  nameEn: string;
  icon: string;
  scenarios: Scenario[];
};

export const categories: Category[] = [
  {
    id: "supermarket",
    nameRu: "Супермаркет",
    nameEn: "Supermarket & Market",
    icon: "🛒",
    scenarios: [
      { id: "checkout", titleRu: "На кассе", titleEn: "At the checkout", canDo: "I can handle the checkout", photo: "supermarket-checkout" },
      { id: "deli_counter", titleRu: "У прилавка", titleEn: "At the deli counter", canDo: "I can order at the deli", photo: "deli-counter" },
      { id: "produce", titleRu: "Фрукты и овощи", titleEn: "Fruit and veg section", canDo: "I can buy produce by weight", photo: "produce-market" },
      { id: "find_item", titleRu: "Где это?", titleEn: "Finding items", canDo: "I can ask where things are", photo: "supermarket-aisle" },
    ],
  },
  {
    id: "numbers",
    nameRu: "Числа и цены",
    nameEn: "Numbers, Prices & Weights",
    icon: "🔢",
    scenarios: [
      { id: "prices_1_20", titleRu: "Цены 1–20", titleEn: "Prices 1–20", canDo: "I understand prices under 20 rubles", photo: "price-tag" },
      { id: "prices_to_1000", titleRu: "Цены до 1000", titleEn: "Prices up to 1000₽", canDo: "I understand prices at normal speed", photo: "cash-register" },
      { id: "weights", titleRu: "Вес и граммы", titleEn: "Weights and grams", canDo: "I can order by weight", photo: "market-scale" },
      { id: "number_noun", titleRu: "Число + слово", titleEn: "1 рубль / 2 рубля / 5 рублей", canDo: "I know the 1/2-4/5+ rule", photo: "numbers" },
    ],
  },
  {
    id: "food",
    nameRu: "Продукты",
    nameEn: "Food: Fruit, Veg, Meat, Fish",
    icon: "🥕",
    scenarios: [
      { id: "vegetables", titleRu: "Овощи", titleEn: "Vegetables", canDo: "I know 15 vegetables", photo: "vegetables" },
      { id: "fruit", titleRu: "Фрукты", titleEn: "Fruit", canDo: "I know 10 fruits", photo: "fruit-market" },
      { id: "meat", titleRu: "Мясо", titleEn: "Meat", canDo: "I can order meat at the counter", photo: "butcher" },
      { id: "fish", titleRu: "Рыба", titleEn: "Fish", canDo: "I can buy fish by weight", photo: "fish-market" },
    ],
  },
  {
    id: "questions",
    nameRu: "Вопросы",
    nameEn: "Asking Questions",
    icon: "❓",
    scenarios: [
      { id: "where", titleRu: "Где находится?", titleEn: "Where is...?", canDo: "I can ask and understand directions", photo: "asking-directions" },
      { id: "how_much", titleRu: "Сколько стоит?", titleEn: "How much is it?", canDo: "I can ask and understand prices", photo: "price-inquiry" },
      { id: "do_you_have", titleRu: "У вас есть?", titleEn: "Do you have...?", canDo: "I can ask for items I need", photo: "shop-inquiry" },
      { id: "can_i", titleRu: "Можно?", titleEn: "Can I...? / May I...?", canDo: "I can use Можно for permission/requests", photo: "polite-request" },
    ],
  },
  {
    id: "pharmacy",
    nameRu: "Аптека",
    nameEn: "Pharmacy & Health",
    icon: "💊",
    scenarios: [
      { id: "pharmacy_basic", titleRu: "В аптеке", titleEn: "In the pharmacy", canDo: "I can ask for basic medication", photo: "pharmacy" },
      { id: "symptoms", titleRu: "Что болит", titleEn: "Describing symptoms", canDo: "I can say what hurts", photo: "health" },
    ],
  },
  {
    id: "transport",
    nameRu: "Транспорт",
    nameEn: "Transport & Directions",
    icon: "🚇",
    scenarios: [
      { id: "taxi", titleRu: "Такси", titleEn: "Taking a taxi", canDo: "I can tell a taxi driver where to go", photo: "taxi" },
      { id: "metro", titleRu: "Метро", titleEn: "Metro", canDo: "I can navigate the metro", photo: "metro" },
    ],
  },
  {
    id: "cafe",
    nameRu: "Кафе",
    nameEn: "Café & Restaurant",
    icon: "☕",
    scenarios: [
      { id: "ordering", titleRu: "Заказ", titleEn: "Ordering", canDo: "I can order food and drinks", photo: "cafe" },
      { id: "paying", titleRu: "Оплата", titleEn: "Paying the bill", canDo: "I can ask for the bill and pay", photo: "cafe-paying" },
    ],
  },
  {
    id: "money",
    nameRu: "Деньги",
    nameEn: "Money & Banking",
    icon: "💳",
    scenarios: [
      { id: "paying_methods", titleRu: "Как платить", titleEn: "Payment methods", canDo: "I know cash vs card phrases", photo: "payment" },
    ],
  },
  {
    id: "smalltalk",
    nameRu: "Общение",
    nameEn: "Small Talk & Politeness",
    icon: "🤝",
    scenarios: [
      { id: "vy_vs_ty", titleRu: "Вы и ты", titleEn: "Formal vs informal", canDo: "I know when to use вы vs ты", photo: "conversation" },
      { id: "getting_attention", titleRu: "Девушка! Молодой человек!", titleEn: "Getting attention", canDo: "I can get someone's attention politely", photo: "asking-help" },
      { id: "softeners", titleRu: "Пожалуйста / Давайте / Норм", titleEn: "Russian softeners and fillers", canDo: "I sound natural not robotic", photo: "polite" },
    ],
  },
  {
    id: "emergency",
    nameRu: "Срочно",
    nameEn: "Emergencies & Officials",
    icon: "🚨",
    scenarios: [
      { id: "help", titleRu: "Помогите!", titleEn: "Asking for help", canDo: "I can ask for help in an emergency", photo: "emergency" },
      { id: "documents", titleRu: "Документы", titleEn: "Documents & officials", canDo: "I can handle a basic official interaction", photo: "documents" },
    ],
  },
];

export function findScenario(scenarioId: string) {
  for (const cat of categories) {
    const s = cat.scenarios.find((s) => s.id === scenarioId);
    if (s) return { category: cat, scenario: s };
  }
  return null;
}

export function findCategory(categoryId: string) {
  return categories.find((c) => c.id === categoryId) ?? null;
}

export function photoUrl(keyword: string, w = 800) {
  return `https://source.unsplash.com/${w}x${Math.round(w * 0.5625)}/?${encodeURIComponent(keyword)}`;
}

// Today's drill rotates daily across all scenarios
export function todaysScenario(): { category: Category; scenario: Scenario } {
  const all = categories.flatMap((c) => c.scenarios.map((s) => ({ category: c, scenario: s })));
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return all[day % all.length];
}