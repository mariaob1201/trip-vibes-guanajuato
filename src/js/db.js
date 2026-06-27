// @ts-nocheck
// Ratings and comments are stored locally in the browser via localStorage.
// Prefix "gto_" prevents collisions with other trip-vibes projects.

const NS = "gto";

function _get(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

function _set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getRatingSummary(destinationId) {
  const ratings = _get(`${NS}_ratings_${destinationId}`, []);
  if (!ratings.length) return { avg: 0, count: 0 };
  const avg = ratings.reduce((s, r) => s + r, 0) / ratings.length;
  return { avg: Math.round(avg * 10) / 10, count: ratings.length };
}

function submitRating(destinationId, stars) {
  const ratings = _get(`${NS}_ratings_${destinationId}`, []);
  ratings.push(stars);
  _set(`${NS}_ratings_${destinationId}`, ratings);
}

function getComments(destinationId) {
  return _get(`${NS}_comments_${destinationId}`, []);
}

function submitComment(destinationId, nickname, body) {
  const comments = _get(`${NS}_comments_${destinationId}`, []);
  comments.unshift({
    nickname:   nickname.trim() || "Anonymous",
    body:       body.trim(),
    created_at: new Date().toISOString()
  });
  _set(`${NS}_comments_${destinationId}`, comments);
}

function getAllRatingSummaries() {
  const result = {};
  for (const dest of destinations) {
    const summary = getRatingSummary(dest.id);
    if (summary.count > 0) result[dest.id] = summary;
  }
  return result;
}

function getRatingDistribution(destinationId) {
  const ratings = _get(`${NS}_ratings_${destinationId}`, []);
  const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const r of ratings) dist[r] = (dist[r] || 0) + 1;
  return dist;
}
