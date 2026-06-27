// @ts-nocheck
// Natural language → destination scorer.
// Each signal maps trigger words to a category, tag, or difficulty.

const SIGNALS = [
  // ── Historia y Cultura ────────────────────────────────────────────────────
  { words: ["history", "historic", "historical", "colonial", "heritage", "culture", "cultura", "museo", "museum", "monument", "landmark", "architecture"], category: "culture" },
  { words: ["museum", "exhibit", "exhibition", "gallery", "mummies", "momias", "mummy", "art", "arte"], tag: "museum" },
  { words: ["church", "cathedral", "basilica", "chapel", "templo", "iglesia", "saint", "religious", "faith"], tag: "church" },
  { words: ["mine", "mina", "silver", "plata", "mining", "tunnel", "valenciana", "underground"], tag: "mine" },
  { words: ["mural", "painting", "rivera", "diego", "artwork", "fresco", "paint"], tag: "art" },
  { words: ["romance", "romantic", "couple", "couples", "date", "kiss", "callejon", "alley", "honeymoon"], tag: "romance" },

  // ── Comida y Mercados ─────────────────────────────────────────────────────
  { words: ["food", "eat", "eating", "comida", "dinner", "lunch", "breakfast", "desayuno", "comer", "foodie", "tasty", "delicious", "yummy", "hungry"], category: "food" },
  { words: ["market", "mercado", "stall", "vendor", "tianguis", "fresh produce"], tag: "market" },
  { words: ["street food", "taco", "tacos", "gordita", "enchilada", "quesadilla", "tlayuda", "antojito", "snack", "street eats"], tag: "street-food" },
  { words: ["mezcal", "tequila", "pulque", "spirits", "spirits tasting", "mezcaleria", "agave", "destilado", "artisanal spirits", "degustacion"], tag: "mezcal" },
  { words: ["sweets", "candy", "dulces", "cajeta", "sugar", "chocolate", "postre", "dessert", "caramel", "mazapan"], tag: "sweets" },
  { words: ["cafe", "coffee", "café", "latte", "espresso", "terraza", "brunch", "breakfast spot", "pastry", "cafeteria"], tag: "cafe" },
  { words: ["bar", "bars", "drink", "drinks", "cantina", "mezcal bar", "beer", "cocktail", "nightcap", "cerveza"], tag: "bars" },

  // ── Exterior y Naturaleza ─────────────────────────────────────────────────
  { words: ["outdoor", "outside", "nature", "natural", "fresh air", "open air", "aire libre", "naturaleza", "verde", "green"], category: "outdoor" },
  { words: ["view", "views", "mirador", "panorama", "panoramic", "lookout", "overlook", "skyline", "vista", "belvedere"], tag: "views" },
  { words: ["hike", "hiking", "trail", "trails", "trek", "trekking", "climb", "subir", "cerro", "mountain", "hill"], tag: "hiking" },
  { words: ["park", "garden", "jardin", "trees", "picnic", "relax", "stroll", "walk", "caminar", "promenade"], tag: "walking" },
  { words: ["lake", "lake", "reservoir", "dam", "presa", "water", "rowboat", "boat ride", "pond", "laguna"], tag: "nature" },

  // ── Vida Nocturna y Festivales ────────────────────────────────────────────
  { words: ["night", "nightlife", "nocturno", "nocturna", "evening", "noche", "after dark", "night out", "going out"], category: "nightlife" },
  { words: ["festival", "cervantino", "event", "events", "celebration", "fiesta", "feria", "fete", "arts festival", "theater festival"], tag: "festival" },
  { words: ["music", "live music", "musica", "concert", "mariachi", "band", "serenade", "serenata", "folk music", "show"], tag: "music" },
  { words: ["dance", "dancing", "bailar", "baile", "callejoneada", "callejoneadas", "estudiantina", "troubadour"], tag: "tradition" },
  { words: ["day of the dead", "dia de muertos", "dia de los muertos", "ofrendas", "altar", "cemetery", "panteon", "muertos"], tag: "tradition" },

  // ── Dificultad ────────────────────────────────────────────────────────────
  { words: ["easy", "relaxed", "chill", "calm", "beginner", "no experience", "low key", "laid back", "accessible", "facil"], difficulty: "Easy" },
  { words: ["moderate", "medium", "some experience", "intermediate", "moderate difficulty"], difficulty: "Moderate" },
  { words: ["hard", "difficult", "challenging", "advanced", "strenuous", "intense", "dificil"], difficulty: "Hard" },
];

function parseQuery(query) {
  const lower = query.toLowerCase();
  const out = { categories: new Set(), tags: new Set(), difficulties: new Set() };

  for (const signal of SIGNALS) {
    if (signal.words.some(w => lower.includes(w))) {
      if (signal.category)   out.categories.add(signal.category);
      if (signal.tag)        out.tags.add(signal.tag);
      if (signal.difficulty) out.difficulties.add(signal.difficulty);
    }
  }
  return out;
}

function searchDestinations(query) {
  if (!query.trim()) return [];

  const { categories, tags, difficulties } = parseQuery(query);
  const lower      = query.toLowerCase();
  const hasSignals = categories.size || tags.size || difficulties.size;

  const scored = destinations.map(dest => {
    let score = 0;

    if (categories.has(dest.category)) score += 5;
    for (const t of dest.tags) {
      if (tags.has(t)) score += 4;
    }
    if (difficulties.size) {
      const dMap = { "Easy": 1, "Easy to Moderate": 1.5, "Moderate": 2, "Moderate to Hard": 2.5, "Hard": 3 };
      const destLevel = dMap[dest.difficulty] ?? 2;
      for (const d of difficulties) {
        const target = dMap[d] ?? 2;
        if (Math.abs(target - destLevel) <= 0.5) score += 2;
      }
    }

    if (!hasSignals || score === 0) {
      if (dest.name.toLowerCase().includes(lower))        score += 3;
      if (dest.description.toLowerCase().includes(lower)) score += 1;
    }

    return { dest, score };
  })
  .filter(d => d.score > 0)
  .sort((a, b) => b.score - a.score);

  return scored.map(d => d.dest);
}
