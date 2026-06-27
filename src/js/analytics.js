// @ts-nocheck
const DIFFICULTY_MAP = {
  "Easy":               1,
  "Easy to Moderate":   1.5,
  "Moderate":           2,
  "Moderate to Hard":   2.5,
  "Hard":               3,
};

const TAG_LABELS_FULL = {
  history:        "History",
  museum:         "Museum",
  church:         "Church",
  mine:           "Mine",
  art:            "Art",
  romance:        "Romance",
  market:         "Market",
  "street-food":  "Street Food",
  "local-food":   "Local Food",
  mezcal:         "Mezcal",
  sweets:         "Sweets",
  cafe:           "Café",
  restaurant:     "Restaurant",
  bars:           "Bars",
  views:          "Views",
  hiking:         "Hiking",
  nature:         "Nature",
  walking:        "Walking",
  festival:       "Festival",
  music:          "Music",
  dance:          "Dance",
  tradition:      "Tradition",
  social:         "Social",
};

function computeTagFrequency() {
  const freq = {};
  for (const dest of destinations) {
    for (const tag of dest.tags) {
      freq[tag] = (freq[tag] || 0) + 1;
    }
  }
  return freq;
}

function sortDestinations(dests) {
  const select = document.getElementById("sortSelect");
  const val    = select ? select.value : "default";
  const arr    = [...dests];

  if (val === "rating") {
    return arr.sort((a, b) => b.rating - a.rating);
  }
  if (val === "activities") {
    return arr.sort((a, b) => b.tags.length - a.tags.length);
  }
  if (val === "difficulty-asc") {
    return arr.sort((a, b) => (DIFFICULTY_MAP[a.difficulty] ?? 2) - (DIFFICULTY_MAP[b.difficulty] ?? 2));
  }
  if (val === "difficulty-desc") {
    return arr.sort((a, b) => (DIFFICULTY_MAP[b.difficulty] ?? 2) - (DIFFICULTY_MAP[a.difficulty] ?? 2));
  }
  return arr;
}

function renderInsights() {
  const freq   = computeTagFrequency();
  const total  = destinations.length;
  const avgRating = (destinations.reduce((s, d) => s + d.rating, 0) / total).toFixed(1);
  const sorted    = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const topTag    = sorted[0] ? (TAG_LABELS_FULL[sorted[0][0]] ?? sorted[0][0]) : "—";
  const avgTags   = (destinations.reduce((s, d) => s + d.tags.length, 0) / total).toFixed(1);

  document.getElementById("statDestinations").textContent = total;
  document.getElementById("statAvgRating").textContent    = avgRating;
  document.getElementById("statTopActivity").textContent  = topTag;
  document.getElementById("statTagDensity").textContent   = avgTags;

  const max  = sorted[0]?.[1] ?? 1;
  const bars = document.getElementById("tagFreqBars");
  if (!bars) return;

  bars.innerHTML = sorted.map(([tag, count]) => {
    const label = TAG_LABELS_FULL[tag] ?? tag;
    const pct   = Math.round((count / total) * 100);
    const width  = Math.round((count / max) * 100);
    return `
      <div class="freq-row">
        <span class="freq-label">${label}</span>
        <div class="freq-bar-wrap">
          <div class="freq-bar freq-bar-${tag}" style="width:${width}%"></div>
        </div>
        <span class="freq-count">${count} <span class="freq-of">/ ${total}</span>
          <span class="freq-pct">(${pct}%)</span>
        </span>
      </div>`;
  }).join("");
}
