// @ts-nocheck

// Jaccard similarity: |A ∩ B| / |A ∪ B|
function jaccardSimilarity(tagsA, tagsB) {
  const setB  = new Set(tagsB);
  const inter = tagsA.filter(t => setB.has(t)).length;
  const union = new Set([...tagsA, ...tagsB]).size;
  return union === 0 ? 0 : inter / union;
}

// Normalised difficulty distance on a 1–3 scale (max gap = 2)
function difficultySimilarity(a, b) {
  const da = DIFFICULTY_MAP[a.difficulty] ?? 2;
  const db = DIFFICULTY_MAP[b.difficulty] ?? 2;
  return 1 - Math.abs(da - db) / 2;
}

// Weights: 55% tag overlap (Jaccard) · 25% community rating · 20% difficulty proximity
function scoreDestination(source, candidate, ratingsCache) {
  const tagScore    = jaccardSimilarity(source.tags, candidate.tags);
  const summary     = ratingsCache[candidate.id] || { avg: 3, count: 0 };
  const ratingScore = summary.avg / 5;
  const diffScore   = difficultySimilarity(source, candidate);
  return tagScore * 0.55 + ratingScore * 0.25 + diffScore * 0.20;
}

function getRecommendations(destId, ratingsCache, count = 2) {
  const source = destinations.find(d => d.id === destId);
  if (!source) return [];

  return destinations
    .filter(d => d.id !== destId)
    .map(d => {
      const score      = scoreDestination(source, d, ratingsCache);
      const matchPct   = Math.round(score * 100);
      const sharedTags = source.tags.filter(t => d.tags.includes(t));
      const summary    = ratingsCache[d.id] || { avg: null, count: 0 };
      return { dest: d, score, matchPct, sharedTags, summary };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}
