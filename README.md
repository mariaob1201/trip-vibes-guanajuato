# Trip Vibes Guanajuato

A static travel guide for Guanajuato, Mexico — history, markets, nature, and nightlife. No backend or setup required; open `index.html` and go.

## Features

- **20 destinations** across 4 categories: Historia & Cultura, Comida & Mercados, Exterior & Naturaleza, Vida Nocturna & Festivales
- **Natural language search** in English and Spanish — try "mezcal con amigos", "easy hike with views", "callejoneada"
- **Featured daily pick** — date and time-aware (Saturday morning → market, Friday night → nightlife, Sunday → outdoor)
- **Vibe picker** quick-tap buttons that jump to a category section
- **Category sections** with a nightlife subgroup split (Festivales vs Bares & Música)
- Content-based recommendation engine (Jaccard tag similarity + difficulty proximity + community rating)
- Star ratings and comments stored locally in the browser (localStorage — no account needed)
- Rating distribution histogram per destination
- Data insights: activity frequency chart and summary stats
- Fully responsive design with a warm colonial color palette

## Categories

| Category | What's included |
|---|---|
| 🏛️ Historia & Cultura | Museo de las Momias, Teatro Juárez, Mina La Valenciana, Diego Rivera, Callejón del Beso |
| 🌮 Comida & Mercados | Mercado Hidalgo, enchiladas mineras, dulces típicos, mezcalerías, Jardín Unión cafés |
| 🌄 Exterior & Naturaleza | Cerro del Cubilete, Presa de la Olla, Mirador del Pípila, Parque Embajadoras, Sierra de Guanajuato |
| 🎭 Vida Nocturna & Festivales | Festival Cervantino, callejoneadas, Día de los Muertos, Bares de Sopeña, Serenatas en el Jardín |

## Tech Stack

- Plain HTML / CSS / JavaScript — no build step, no dependencies, no backend
- Ratings and comments stored in **localStorage** (per browser, namespaced `gto_`)
- Deployed via [Netlify](https://netlify.com)

## Project Structure

```
├── index.html              # Page layout and modal markup
├── netlify.toml            # Netlify publish config
└── src/
    ├── css/
    │   └── styles.css      # All styles (warm terracotta / colonial palette)
    └── js/
        ├── data.js         # All 20 destination records
        ├── analytics.js    # Stats, frequency chart, sort logic
        ├── db.js           # localStorage ratings & comments (gto_ namespace)
        ├── recommendations.js  # Scoring algorithm
        ├── search.js       # NL search signals (English + Spanish)
        └── app.js          # UI logic, sections, modal, vibe picker, featured pick
```

## Run Locally

```bash
cd trip-vibes-guanajuato
python3 -m http.server 3001
```

Then open [http://localhost:3001](http://localhost:3001). No credentials or setup needed.

## Deploy to Netlify

**Option A — Drag & drop:**
Go to [netlify.com](https://netlify.com) → Add new site → Deploy manually → drag the project folder.

**Option B — GitHub auto-deploy:**
Push to GitHub, connect the repo in Netlify, leave build command blank, set publish directory to `.`, deploy.

## Adding a Destination

Add an object to the `destinations` array in `src/js/data.js`:

```js
{
  id: 21,                          // must be unique
  category: "culture",            // culture | food | outdoor | nightlife
  name: "Nombre del lugar",
  region: "Barrio o zona, Guanajuato",
  tags: ["history", "views"],     // see tag list below
  description: "Descripción corta.",
  difficulty: "Easy",             // Easy | Easy to Moderate | Moderate | Moderate to Hard | Hard
  bestFor: "Couples, solo, groups",
  image: "https://images.unsplash.com/photo-XXXXX?w=800&auto=format&fit=crop",
  mapLink: "https://maps.google.com/?q=...",
  rating: 4.5
}
```

**Available tags by category:**

| Category | Tags |
|---|---|
| Historia & Cultura | `history` `museum` `church` `mine` `art` `romance` |
| Comida & Mercados | `market` `street-food` `local-food` `mezcal` `sweets` `cafe` `restaurant` `bars` |
| Exterior & Naturaleza | `views` `hiking` `nature` `walking` |
| Vida Nocturna | `festival` `music` `dance` `tradition` `bars` `social` |

## Recommendation Algorithm

Each destination is scored against others using three weighted factors:

| Factor | Weight | Method |
|---|---|---|
| Tag overlap | 55% | Jaccard similarity |
| Community rating | 25% | Normalized 1–5 score |
| Difficulty match | 20% | Normalized distance on 1–3 scale |

## Natural Language Search

The search engine maps words and phrases to categories, tags, and difficulty levels. Supports both English and Spanish terms:

- `"mezcal tasting"` → food / mezcal tag
- `"callejoneada"` or `"estudiantina"` → nightlife / tradition tag
- `"momias"` or `"mummies"` → culture / museum tag
- `"easy hike"` → outdoor + Easy difficulty
- `"festival de teatro"` → nightlife / festival tag
- `"romantic alley"` → culture / romance tag

## Related Projects

- [summer-vibes-wisconsin](https://github.com/mariaob1201/summer-vibes-wisconsin) — Same engine adapted for Wisconsin lakes, waterparks, and dancing

## License

MIT
