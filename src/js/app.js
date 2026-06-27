// @ts-nocheck
const tagLabels = {
  history:       "&#127963;&#65039; History",
  museum:        "&#127981;&#65039; Museum",
  church:        "&#9962;&#65039; Church",
  mine:          "&#9935;&#65039; Mine",
  art:           "&#127912; Art",
  romance:       "&#128145; Romance",
  market:        "&#127978;&#65039; Market",
  "street-food": "&#127790; Street Food",
  "local-food":  "&#127859;&#65039; Local Food",
  mezcal:        "&#129347; Mezcal",
  sweets:        "&#127852; Sweets",
  cafe:          "&#9749; Caf&#233;",
  restaurant:    "&#127869;&#65039; Restaurant",
  bars:          "&#127867; Bars",
  views:         "&#127748; Views",
  hiking:        "&#129406; Hiking",
  nature:        "&#127807; Nature",
  walking:       "&#128694; Walking",
  festival:      "&#127917; Festival",
  music:         "&#127925; Music",
  dance:         "&#128131; Dance",
  tradition:     "&#127914; Tradition",
  social:        "&#127881; Social",
};

const CATEGORIES = [
  { key: "culture",   label: "&#127963;&#65039; Historia &amp; Cultura", color: "#7c2d12" },
  { key: "food",      label: "&#127790; Comida &amp; Mercados",          color: "#c2410c" },
  { key: "outdoor",   label: "&#127748; Exterior &amp; Naturaleza",      color: "#166534" },
  { key: "nightlife", label: "&#127917; Vida Nocturna &amp; Festivales", color: "#6d28d9" },
];

// ── Card rendering ─────────────────────────────────────────────────────────

function createCard(dest) {
  const tagsHTML = dest.tags
    .map(t => `<span class="tag tag-${t.replace(/[^a-z]/g, "-")}">${tagLabels[t] ?? t}</span>`)
    .join("");

  const filledStars = Math.round(dest.rating);
  const starsHTML = Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < filledStars ? "#f59e0b" : "#cbd5e1"}">&#9733;</span>`
  ).join("");

  return `
    <div class="card" data-tags="${dest.tags.join(",")}">
      <div class="card-img" style="background-image: url('${dest.image}')">
        <div class="card-region">${dest.region}</div>
      </div>
      <div class="card-body">
        <div class="card-tags">${tagsHTML}</div>
        <h3 class="card-title">${dest.name}</h3>
        <div class="card-rating">
          <span class="stars">${starsHTML}</span>
          <span class="rating-num">${dest.rating}</span>
        </div>
        <p class="card-desc">${dest.description}</p>
        <div class="card-actions">
          <a class="card-link" href="${dest.mapLink}" target="_blank" rel="noopener">
            Ver en Mapa &#8599;
          </a>
          <button class="card-review-btn" data-id="${dest.id}">
            &#9733; Calificar
          </button>
        </div>
      </div>
    </div>
  `;
}

// ── Section rendering ──────────────────────────────────────────────────────

function buildSection(cat, dests, preview) {
  const shown  = preview ? dests.slice(0, 3) : dests;
  const seeAll = preview
    ? `<button class="section-see-all" data-filter="${cat.key}">Ver todos &#8599;</button>`
    : "";

  // Nightlife: split festivals vs bars/music
  if (cat.key === "nightlife" && !preview) {
    const festivos = shown.filter(d => d.tags.some(t => ["festival", "tradition"].includes(t)));
    const bares    = shown.filter(d => !d.tags.some(t => ["festival", "tradition"].includes(t)));
    return `
      <div class="category-section" style="--section-color:${cat.color}">
        <div class="section-header">
          <h2 class="section-title">${cat.label}</h2>
          ${seeAll}
        </div>
        ${festivos.length ? `<p class="subgroup-label">&#127917; Festivales &amp; Eventos</p><div class="cards-grid">${festivos.map(createCard).join("")}</div>` : ""}
        ${bares.length    ? `<p class="subgroup-label">&#127925; Bares &amp; M&#250;sica en Vivo</p><div class="cards-grid">${bares.map(createCard).join("")}</div>` : ""}
      </div>`;
  }

  return `
    <div class="category-section" style="--section-color:${cat.color}">
      <div class="section-header">
        <h2 class="section-title">${cat.label}</h2>
        ${seeAll}
      </div>
      <div class="cards-grid">${shown.map(createCard).join("")}</div>
    </div>`;
}

function renderSections(filter) {
  const container = document.getElementById("sectionsContainer");

  if (filter !== "all") {
    const cat   = CATEGORIES.find(c => c.key === filter);
    const dests = sortDestinations(destinations.filter(d => d.category === filter));
    container.innerHTML = buildSection(cat, dests, false);
    return;
  }

  container.innerHTML = CATEGORIES.map(cat => {
    const dests = sortDestinations(destinations.filter(d => d.category === cat.key));
    return buildSection(cat, dests, true);
  }).join("");
}

// ── Featured daily pick ────────────────────────────────────────────────────

function renderFeatured() {
  const now  = new Date();
  const day  = now.getDay();  // 0=Sun … 6=Sat
  const hour = now.getHours();

  let category;
  if      (day === 5 && hour >= 18) category = "nightlife";   // Friday night
  else if (day === 6 && hour < 11)  category = "food";         // Saturday market morning
  else if (day === 6)               category = "culture";      // Saturday afternoon
  else if (day === 0)               category = "outdoor";      // Sunday
  else if (hour >= 19)              category = "nightlife";    // Any weekday evening
  else if (hour < 10)               category = "food";         // Morning café run
  else                              category = "culture";      // Default: go explore

  const pool  = destinations.filter(d => d.category === category);
  const seed  = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const pick  = pool[seed % pool.length];
  if (!pick) return;

  const dayLabels = {
    0: "Recomendación del Domingo",
    1: "Destino del Lunes",
    2: "Destino del Martes",
    3: "Destino del Miércoles",
    4: "Destino del Jueves",
    5: hour >= 18 ? "Pick de Viernes por la Noche" : "Destino del Viernes",
    6: hour < 11 ? "Pick Mañanero del Sábado" : "Destino del Sábado",
  };

  const filledStars = Math.round(pick.rating);
  const starsHTML = Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < filledStars ? "#f59e0b" : "#cbd5e1"}">&#9733;</span>`
  ).join("");

  document.getElementById("featuredCard").innerHTML = `
    <div class="featured-card">
      <div class="featured-img" style="background-image:url('${pick.image}')">
        <div class="featured-badge">${dayLabels[day]}</div>
        <div class="card-region">${pick.region}</div>
      </div>
      <div class="featured-body">
        <h3 class="featured-name">${pick.name}</h3>
        <p class="featured-desc">${pick.description}</p>
        <div class="featured-meta">
          <span class="stars">${starsHTML}</span>
          <span class="rating-num">${pick.rating}</span>
          <span class="featured-diff">&middot; ${pick.difficulty}</span>
        </div>
        <div class="card-actions">
          <a class="card-link" href="${pick.mapLink}" target="_blank" rel="noopener">Ver en Mapa &#8599;</a>
          <button class="card-review-btn" data-id="${pick.id}">&#9733; Calificar</button>
        </div>
      </div>
    </div>`;
}

// ── Filters, vibe picker & sort ────────────────────────────────────────────

function setActiveFilter(filter) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  document.querySelector(`.filter-btn[data-filter="${filter}"]`)?.classList.add("active");
}

document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  clearSearch(false);
  setActiveFilter(btn.dataset.filter);
  renderSections(btn.dataset.filter);
});

document.getElementById("vibePicker").addEventListener("click", (e) => {
  const btn = e.target.closest(".vibe-btn");
  if (!btn) return;
  clearSearch(false);
  setActiveFilter(btn.dataset.filter);
  renderSections(btn.dataset.filter);
  document.getElementById("sectionsContainer").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("sectionsContainer").addEventListener("click", (e) => {
  const btn = e.target.closest(".section-see-all");
  if (!btn) return;
  setActiveFilter(btn.dataset.filter);
  renderSections(btn.dataset.filter);
});

document.getElementById("sortSelect").addEventListener("change", () => {
  const active = document.querySelector(".filter-btn.active");
  renderSections(active ? active.dataset.filter : "all");
});

// ── Natural Language Search ─────────────────────────────────────────────────

document.getElementById("searchBtn").addEventListener("click", runSearch);
document.getElementById("nlSearch").addEventListener("keydown", e => {
  if (e.key === "Enter") runSearch();
});
document.getElementById("searchClear").addEventListener("click", () => clearSearch(true));

function runSearch() {
  const query     = document.getElementById("nlSearch").value.trim();
  if (!query) return;

  const results   = searchDestinations(query);
  const container = document.getElementById("sectionsContainer");
  const status    = document.getElementById("searchStatus");
  const statusTxt = document.getElementById("searchStatusText");

  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  status.classList.add("visible");

  if (!results.length) {
    statusTxt.textContent = `Sin resultados para "${query}" — prueba "mezcal", "minas", "festival" o "vistas"`;
    container.innerHTML = `<p class="no-results">Ningún destino coincide. Intenta con otras palabras.</p>`;
    return;
  }

  statusTxt.textContent = `${results.length} resultado${results.length !== 1 ? "s" : ""} para "${query}"`;
  container.innerHTML = `<div class="cards-grid">${sortDestinations(results).map(createCard).join("")}</div>`;
}

function clearSearch(resetInput) {
  if (resetInput) document.getElementById("nlSearch").value = "";
  document.getElementById("searchStatus").classList.remove("visible");
  document.getElementById("searchStatusText").textContent = "";
  setActiveFilter("all");
  renderSections("all");
}

// ── Modal ──────────────────────────────────────────────────────────────────

const overlay    = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
let activeDestId = null;

function openModal(destId) {
  const dest = destinations.find(d => d.id === destId);
  if (!dest) return;
  activeDestId = destId;

  document.getElementById("modalTitle").textContent = dest.name;
  document.getElementById("ratingFeedback").textContent = "";
  document.getElementById("commentForm").reset();

  const alreadyRated = localStorage.getItem(`${NS}_user_rated_${destId}`);
  resetStarPicker(alreadyRated ? parseInt(alreadyRated) : 0, alreadyRated);

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";

  renderRecommendations(destId);
  loadRatingSummary(destId);
  renderRatingDistribution(destId);
  loadComments(destId);
}

function closeModal() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  activeDestId = null;
}

modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

document.body.addEventListener("click", (e) => {
  const btn = e.target.closest(".card-review-btn");
  if (btn && !overlay.contains(btn)) openModal(parseInt(btn.dataset.id));
});

// ── Star picker ────────────────────────────────────────────────────────────

const starPicker = document.getElementById("starPicker");

function resetStarPicker(filledUpTo = 0, locked = false) {
  starPicker.querySelectorAll(".star-pick").forEach((s, i) => {
    s.classList.toggle("filled", i < filledUpTo);
    s.classList.toggle("locked", !!locked);
  });
  starPicker.dataset.locked = locked ? "true" : "false";
}

starPicker.addEventListener("mouseover", (e) => {
  if (starPicker.dataset.locked === "true") return;
  const star = e.target.closest(".star-pick");
  if (!star) return;
  resetStarPicker(parseInt(star.dataset.v));
});

starPicker.addEventListener("mouseleave", () => {
  if (starPicker.dataset.locked === "true") return;
  const saved = activeDestId ? localStorage.getItem(`${NS}_user_rated_${activeDestId}`) : null;
  resetStarPicker(saved ? parseInt(saved) : 0);
});

starPicker.addEventListener("click", async (e) => {
  if (starPicker.dataset.locked === "true") return;
  const star = e.target.closest(".star-pick");
  if (!star || !activeDestId) return;

  const value    = parseInt(star.dataset.v);
  const feedback = document.getElementById("ratingFeedback");

  try {
    await submitRating(activeDestId, value);
    localStorage.setItem(`${NS}_user_rated_${activeDestId}`, value);
    resetStarPicker(value, true);
    feedback.textContent = "¡Gracias por tu calificación!";
    feedback.className   = "rating-feedback success";
    loadRatingSummary(activeDestId);
    renderRatingDistribution(activeDestId);
  } catch {
    feedback.textContent = "No se pudo guardar. Inténtalo de nuevo.";
    feedback.className   = "rating-feedback error";
  }
});

// ── Rating summary ─────────────────────────────────────────────────────────

async function loadRatingSummary(destId) {
  const { avg, count } = await getRatingSummary(destId);

  const starsEl = document.getElementById("communityStars");
  const avgEl   = document.getElementById("communityAvg");
  const countEl = document.getElementById("communityCount");

  if (count === 0) {
    starsEl.innerHTML   = "&#9733;&#9733;&#9733;&#9733;&#9733;";
    starsEl.style.color = "#cbd5e1";
    avgEl.textContent   = "";
    countEl.textContent = "Sin calificaciones — ¡sé el primero!";
    return;
  }

  const full = Math.round(avg);
  starsEl.innerHTML = Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < full ? "#f59e0b" : "#cbd5e1"}">&#9733;</span>`
  ).join("");
  avgEl.textContent   = `${avg} / 5`;
  countEl.textContent = `(${count} calificaci${count !== 1 ? "ones" : "ón"})`;
}

// ── Rating distribution histogram ──────────────────────────────────────────

async function renderRatingDistribution(destId) {
  const el = document.getElementById("ratingDistribution");
  if (!el) return;
  try {
    const dist  = await getRatingDistribution(destId);
    const total = Object.values(dist).reduce((s, v) => s + v, 0);
    if (total === 0) { el.innerHTML = ""; return; }

    el.innerHTML = [5, 4, 3, 2, 1].map(star => {
      const count = dist[star] || 0;
      const pct   = Math.round((count / total) * 100);
      return `
        <div class="dist-row">
          <span class="dist-star">${star}&#9733;</span>
          <div class="dist-bar-wrap">
            <div class="dist-bar" style="width:${pct}%"></div>
          </div>
          <span class="dist-count">${count}</span>
        </div>`;
    }).join("");
  } catch { /* fail silently */ }
}

// ── Comments ───────────────────────────────────────────────────────────────

async function loadComments(destId) {
  const list = document.getElementById("commentsList");
  list.innerHTML = `<p class="comments-loading">Cargando...</p>`;

  try {
    const comments = await getComments(destId);
    if (!comments.length) {
      list.innerHTML = `<p class="comments-empty">Sin comentarios todavía. ¡Comparte tu experiencia!</p>`;
      return;
    }
    list.innerHTML = comments.map(c => {
      const date = new Date(c.created_at).toLocaleDateString("es-MX", {
        month: "short", day: "numeric", year: "numeric"
      });
      return `
        <div class="comment-item">
          <div class="comment-header">
            <span class="comment-name">${escapeHTML(c.nickname)}</span>
            <span class="comment-date">${date}</span>
          </div>
          <p class="comment-body">${escapeHTML(c.body)}</p>
        </div>`;
    }).join("");
  } catch {
    list.innerHTML = `<p class="comments-loading">No se pudieron cargar los comentarios.</p>`;
  }
}

document.getElementById("commentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!activeDestId) return;

  const name = document.getElementById("commentName").value;
  const body = document.getElementById("commentBody").value.trim();
  const btn  = e.target.querySelector(".comment-submit");
  if (!body) return;

  btn.disabled = true; btn.textContent = "Publicando...";
  try {
    await submitComment(activeDestId, name, body);
    e.target.reset();
    loadComments(activeDestId);
  } catch {
    alert("No se pudo publicar el comentario. Por favor intenta de nuevo.");
  } finally {
    btn.disabled = false; btn.textContent = "Publicar";
  }
});

// ── Recommendations ────────────────────────────────────────────────────────

let ratingsCache = {};

async function preloadRatings() {
  try { ratingsCache = await getAllRatingSummaries(); } catch { /* fail silently */ }
}

function renderRecommendations(destId) {
  const section = document.getElementById("recoSection");
  const list    = document.getElementById("recoList");
  const recos   = getRecommendations(destId, ratingsCache);

  if (!recos.length) { section.style.display = "none"; return; }
  section.style.display = "";

  list.innerHTML = recos.map(({ dest, matchPct, sharedTags, summary }) => {
    const tagsHTML = sharedTags
      .map(t => `<span class="tag tag-${t.replace(/[^a-z]/g, "-")} tag-sm">${tagLabels[t] ?? t}</span>`)
      .join("");
    const ratingText = summary.count > 0
      ? `&#9733; ${summary.avg} (${summary.count})`
      : "Sin calificaciones";

    return `
      <div class="reco-card">
        <div class="reco-img" style="background-image:url('${dest.image}')"></div>
        <div class="reco-body">
          <div class="reco-header">
            <span class="reco-name">${dest.name}</span>
            <span class="reco-match">${matchPct}% match</span>
          </div>
          <div class="reco-match-bar">
            <div class="reco-match-fill" style="width:${matchPct}%"></div>
          </div>
          <div class="reco-meta"><span class="reco-rating">${ratingText}</span></div>
          <div class="reco-tags">${tagsHTML}</div>
          <button class="reco-open-btn" data-id="${dest.id}">Explorar &#8599;</button>
        </div>
      </div>`;
  }).join("");
}

document.getElementById("recoList").addEventListener("click", (e) => {
  const btn = e.target.closest(".reco-open-btn");
  if (btn) openModal(parseInt(btn.dataset.id));
});

// ── Utils ──────────────────────────────────────────────────────────────────

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ── Init ───────────────────────────────────────────────────────────────────

preloadRatings();
renderFeatured();
renderSections("all");
renderInsights();
