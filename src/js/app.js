// @ts-nocheck

// ── Language ───────────────────────────────────────────────────────────────

let lang = localStorage.getItem("gto_lang") || "es";

function t(key) {
  return STRINGS[lang][key] ?? STRINGS.es[key] ?? key;
}

function getDayLabel(day, hour) {
  if (day === 5 && hour >= 18) return t("dayFriNight");
  if (day === 6 && hour < 11)  return t("daySatMorn");
  const keys = ["daySun","dayMon","dayTue","dayWed","dayThu","dayFri","daySat"];
  return t(keys[day]);
}

function applyStrings() {
  const qs = (sel) => document.querySelector(sel);
  const id = (i)   => document.getElementById(i);

  // Hero
  qs(".hero p").innerHTML = t("heroSubtitle");

  // Search
  id("nlSearch").placeholder = t("searchPlaceholder");
  id("searchBtn").innerHTML  = t("searchBtn");
  id("searchClear").innerHTML = t("searchClear");

  // Filter buttons
  qs('.filter-btn[data-filter="all"]').innerHTML       = t("filterAll");
  qs('.filter-btn[data-filter="culture"]').innerHTML   = t("filterCulture");
  qs('.filter-btn[data-filter="food"]').innerHTML      = t("filterFood");
  qs('.filter-btn[data-filter="outdoor"]').innerHTML   = t("filterOutdoor");
  qs('.filter-btn[data-filter="nightlife"]').innerHTML = t("filterNightlife");
  qs('.filter-btn[data-filter="firstTimer"]').innerHTML = t("filterFirst");

  // Sort
  qs(".sort-label").innerHTML = t("sortLabel");
  qs('#sortSelect option[value="default"]').textContent    = t("sortDefault");
  qs('#sortSelect option[value="rating"]').textContent     = t("sortRating");
  qs('#sortSelect option[value="activities"]').textContent = t("sortActivities");
  qs('#sortSelect option[value="difficulty-asc"]').textContent = t("sortEasiest");
  qs('#sortSelect option[value="difficulty-desc"]').textContent = t("sortHardest");

  // Vibe picker
  qs(".vibe-label").innerHTML = t("vibeLabel");
  qs('.vibe-btn[data-filter="culture"]').innerHTML   = t("vibeCulture");
  qs('.vibe-btn[data-filter="food"]').innerHTML      = t("vibeFood");
  qs('.vibe-btn[data-filter="outdoor"]').innerHTML   = t("vibeOutdoor");
  qs('.vibe-btn[data-filter="nightlife"]').innerHTML = t("vibeNightlife");

  // Featured
  qs(".section-eyebrow").innerHTML = t("featuredEyebrow");

  // Insights
  qs(".insights-section h2").innerHTML = t("insightsTitle");
  qs(".freq-chart-title").innerHTML    = t("freqTitle");
  id("statDestsLabel").innerHTML   = t("statDests");
  id("statAvgLabel").innerHTML     = t("statAvg");
  id("statTopLabel").innerHTML     = t("statTop");
  id("statTagsLabel").innerHTML    = t("statTags");

  // Tips
  qs(".tips-section h2").innerHTML = t("tipsTitle");
  id("tipsList").innerHTML = t("tips").map(tip => `<li>${tip}</li>`).join("");

  // Footer
  id("footerMain").innerHTML = t("footerMain");
  qs(".footer-sub").innerHTML = t("footerSub");

  // Modal
  id("recoSectionTitle").innerHTML    = t("recoTitle");
  id("communityRatingTitle").innerHTML = t("communityTitle");
  id("rateThisTitle").innerHTML       = t("rateTitle");
  id("leaveCommentTitle").innerHTML   = t("commentTitle");
  id("whatTravelersSayTitle").innerHTML = t("commentsTitle");
  id("commentName").placeholder       = t("commentNamePh");
  id("commentBody").placeholder       = t("commentBodyPh");
  qs(".comment-submit").innerHTML     = t("commentSubmit");

  // Save bar
  id("printBtn").innerHTML = t("printBtn");
  updateSaveBar();

  // Lang toggle
  id("langToggle").textContent = lang === "es" ? "EN" : "ES";
}

function setLang(newLang) {
  lang = newLang;
  localStorage.setItem("gto_lang", lang);
  applyStrings();
  renderFeatured();
  renderSections(currentFilter);
  renderInsights();
}

document.getElementById("langToggle").addEventListener("click", () => {
  setLang(lang === "es" ? "en" : "es");
});

// ── Tag labels ─────────────────────────────────────────────────────────────

const tagLabels = {
  history:       "🏛️ History",
  museum:        "🏺 Museum",
  church:        "⛪ Church",
  mine:          "⛏️ Mine",
  art:           "🎨 Art",
  romance:       "💑 Romance",
  market:        "🏪 Market",
  "street-food": "🌮 Street Food",
  "local-food":  "🍽️ Local Food",
  mezcal:        "🥃 Mezcal",
  sweets:        "🍬 Sweets",
  cafe:          "☕ Café",
  restaurant:    "🍽️ Restaurant",
  bars:          "🍻 Bars",
  views:         "🌄 Views",
  hiking:        "🥾 Hiking",
  nature:        "🌿 Nature",
  walking:       "🚶 Walking",
  festival:      "🎭 Festival",
  music:         "🎵 Music",
  dance:         "💃 Dance",
  tradition:     "🎪 Tradition",
  social:        "🎉 Social",
};

function getCategories() {
  return [
    { key: "culture",   label: t("catCulture"),   color: "#7c2d12" },
    { key: "food",      label: t("catFood"),       color: "#c2410c" },
    { key: "outdoor",   label: t("catOutdoor"),    color: "#166534" },
    { key: "nightlife", label: t("catNightlife"),  color: "#6d28d9" },
  ];
}

// ── Save / Itinerary ───────────────────────────────────────────────────────

let savedIds = new Set(JSON.parse(localStorage.getItem("gto_saved") || "[]"));

function toggleSaved(destId) {
  if (savedIds.has(destId)) savedIds.delete(destId);
  else savedIds.add(destId);
  localStorage.setItem("gto_saved", JSON.stringify([...savedIds]));
  document.querySelectorAll(`.save-btn[data-id="${destId}"]`).forEach(btn => {
    const saved = savedIds.has(destId);
    btn.classList.toggle("saved", saved);
    btn.title = saved ? t("cardUnsave") : t("cardSave");
    btn.textContent = saved ? "🔖" : "📌";
  });
  updateSaveBar();
}

function updateSaveBar() {
  const bar = document.getElementById("saveBar");
  const count = document.getElementById("saveCount");
  const n = savedIds.size;
  if (n === 0) {
    bar.classList.add("hidden");
  } else {
    bar.classList.remove("hidden");
    count.textContent = `${n} ${t("savedCount")}`;
  }
}

function renderPrintPanel() {
  const panel = document.getElementById("printPanel");
  const saved = destinations.filter(d => savedIds.has(d.id));
  const locale = lang === "es" ? "es-MX" : "en-US";
  const dateStr = new Date().toLocaleDateString(locale, { dateStyle: "long" });

  panel.innerHTML = `
    <div class="print-header">
      <h1 class="print-title">${t("printTitle")}</h1>
      <p class="print-date">${dateStr}</p>
    </div>
    <div class="print-list">
      ${saved.map((dest, i) => `
        <div class="print-item">
          <span class="print-num">${i + 1}</span>
          <div class="print-info">
            <h3 class="print-name">${dest.name}</h3>
            <p class="print-region">${dest.region} &middot; ${dest.difficulty}</p>
            <p class="print-desc">${dest.description}</p>
          </div>
        </div>
      `).join("")}
    </div>
    <p class="print-footer">Trip Vibes Guanajuato &mdash; tripvibesguanajuato.netlify.app</p>
  `;
}

document.getElementById("printBtn").addEventListener("click", () => {
  renderPrintPanel();
  window.print();
});

document.body.addEventListener("click", e => {
  const btn = e.target.closest(".save-btn");
  if (btn && !document.getElementById("modalOverlay").contains(btn)) {
    toggleSaved(parseInt(btn.dataset.id));
  }
});

// ── Card rendering ─────────────────────────────────────────────────────────

function createCard(dest) {
  const tagsHTML = dest.tags
    .map(t2 => `<span class="tag tag-${t2.replace(/[^a-z]/g, "-")}">${tagLabels[t2] ?? t2}</span>`)
    .join("");

  const filledStars = Math.round(dest.rating);
  const starsHTML = Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < filledStars ? "#f59e0b" : "#cbd5e1"}">&#9733;</span>`
  ).join("");

  const isSaved = savedIds.has(dest.id);

  return `
    <div class="card" data-tags="${dest.tags.join(",")}">
      <div class="card-img" style="background-image: url('${dest.image}')">
        <div class="card-region">${dest.region}</div>
        ${dest.firstTimer ? `<div class="first-timer-badge">${t("firstTimerBadge")}</div>` : ""}
        <button class="save-btn ${isSaved ? "saved" : ""}" data-id="${dest.id}"
          title="${isSaved ? t("cardUnsave") : t("cardSave")}">${isSaved ? "🔖" : "📌"}</button>
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
          <a class="card-link" href="${dest.mapLink}" target="_blank" rel="noopener">${t("cardMap")}</a>
          <button class="card-review-btn" data-id="${dest.id}">${t("cardRate")}</button>
        </div>
      </div>
    </div>
  `;
}

// ── Section rendering ──────────────────────────────────────────────────────

let currentFilter = "all";

function buildSection(cat, dests, preview) {
  const shown  = preview ? dests.slice(0, 3) : dests;
  const seeAll = preview
    ? `<button class="section-see-all" data-filter="${cat.key}">${t("seeAll")}</button>`
    : "";

  if (cat.key === "nightlife" && !preview) {
    const festivos = shown.filter(d => d.tags.some(tg => ["festival","tradition"].includes(tg)));
    const bares    = shown.filter(d => !d.tags.some(tg => ["festival","tradition"].includes(tg)));
    return `
      <div class="category-section" style="--section-color:${cat.color}">
        <div class="section-header">
          <h2 class="section-title">${cat.label}</h2>${seeAll}
        </div>
        ${festivos.length ? `<p class="subgroup-label">${t("subFestivos")}</p><div class="cards-grid">${festivos.map(createCard).join("")}</div>` : ""}
        ${bares.length    ? `<p class="subgroup-label">${t("subBares")}</p><div class="cards-grid">${bares.map(createCard).join("")}</div>` : ""}
      </div>`;
  }

  return `
    <div class="category-section" style="--section-color:${cat.color}">
      <div class="section-header">
        <h2 class="section-title">${cat.label}</h2>${seeAll}
      </div>
      <div class="cards-grid">${shown.map(createCard).join("")}</div>
    </div>`;
}

function renderSections(filter) {
  currentFilter = filter;
  const container = document.getElementById("sectionsContainer");
  const cats = getCategories();

  if (filter === "firstTimer") {
    const dests = sortDestinations(destinations.filter(d => d.firstTimer));
    container.innerHTML = `
      <div class="category-section" style="--section-color:#f59e0b">
        <div class="section-header">
          <h2 class="section-title">${t("catFirst")}</h2>
        </div>
        <div class="cards-grid">${dests.map(createCard).join("")}</div>
      </div>`;
    return;
  }

  if (filter !== "all") {
    const cat   = cats.find(c => c.key === filter);
    const dests = sortDestinations(destinations.filter(d => d.category === filter));
    container.innerHTML = buildSection(cat, dests, false);
    return;
  }

  container.innerHTML = cats.map(cat => {
    const dests = sortDestinations(destinations.filter(d => d.category === cat.key));
    return buildSection(cat, dests, true);
  }).join("");
}

// ── Featured daily pick ────────────────────────────────────────────────────

function renderFeatured() {
  const now  = new Date();
  const day  = now.getDay();
  const hour = now.getHours();

  let category;
  if      (day === 5 && hour >= 18) category = "nightlife";
  else if (day === 6 && hour < 11)  category = "food";
  else if (day === 6)               category = "culture";
  else if (day === 0)               category = "outdoor";
  else if (hour >= 19)              category = "nightlife";
  else if (hour < 10)               category = "food";
  else                              category = "culture";

  const pool = destinations.filter(d => d.category === category);
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const pick = pool[seed % pool.length];
  if (!pick) return;

  const dayLabel   = getDayLabel(day, hour);
  const filledStars = Math.round(pick.rating);
  const starsHTML  = Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < filledStars ? "#f59e0b" : "#cbd5e1"}">&#9733;</span>`
  ).join("");
  const isSaved = savedIds.has(pick.id);

  document.getElementById("featuredCard").innerHTML = `
    <div class="featured-card">
      <div class="featured-img" style="background-image:url('${pick.image}')">
        <div class="featured-badge">${dayLabel}</div>
        <div class="card-region">${pick.region}</div>
        ${pick.firstTimer ? `<div class="first-timer-badge">${t("firstTimerBadge")}</div>` : ""}
        <button class="save-btn ${isSaved ? "saved" : ""}" data-id="${pick.id}"
          title="${isSaved ? t("cardUnsave") : t("cardSave")}">${isSaved ? "🔖" : "📌"}</button>
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
          <a class="card-link" href="${pick.mapLink}" target="_blank" rel="noopener">${t("cardMap")}</a>
          <button class="card-review-btn" data-id="${pick.id}">${t("cardRate")}</button>
        </div>
      </div>
    </div>`;
}

// ── Filters, vibe picker & sort ────────────────────────────────────────────

function setActiveFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  document.querySelector(`.filter-btn[data-filter="${filter}"]`)?.classList.add("active");
}

document.getElementById("filters").addEventListener("click", e => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  clearSearch(false);
  setActiveFilter(btn.dataset.filter);
  renderSections(btn.dataset.filter);
});

document.getElementById("vibePicker").addEventListener("click", e => {
  const btn = e.target.closest(".vibe-btn");
  if (!btn) return;
  clearSearch(false);
  setActiveFilter(btn.dataset.filter);
  renderSections(btn.dataset.filter);
  document.getElementById("sectionsContainer").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("sectionsContainer").addEventListener("click", e => {
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
    statusTxt.textContent = t("searchNoResults");
    container.innerHTML   = `<p class="no-results">${t("searchNoResultsText")}</p>`;
    return;
  }

  statusTxt.textContent = `${results.length} resultado${results.length !== 1 ? "s" : ""} para "${query}"`;
  container.innerHTML   = `<div class="cards-grid">${sortDestinations(results).map(createCard).join("")}</div>`;
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
overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

document.body.addEventListener("click", e => {
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

starPicker.addEventListener("mouseover", e => {
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

starPicker.addEventListener("click", async e => {
  if (starPicker.dataset.locked === "true") return;
  const star = e.target.closest(".star-pick");
  if (!star || !activeDestId) return;

  const value    = parseInt(star.dataset.v);
  const feedback = document.getElementById("ratingFeedback");

  try {
    await submitRating(activeDestId, value);
    localStorage.setItem(`${NS}_user_rated_${activeDestId}`, value);
    resetStarPicker(value, true);
    feedback.textContent = t("ratingThanks");
    feedback.className   = "rating-feedback success";
    loadRatingSummary(activeDestId);
    renderRatingDistribution(activeDestId);
  } catch {
    feedback.textContent = t("ratingError");
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
    countEl.textContent = t("noRatings");
    return;
  }

  const full = Math.round(avg);
  starsEl.innerHTML = Array.from({ length: 5 }, (_, i) =>
    `<span style="color:${i < full ? "#f59e0b" : "#cbd5e1"}">&#9733;</span>`
  ).join("");
  avgEl.textContent   = `${avg} / 5`;
  countEl.textContent = lang === "es"
    ? `(${count} calificaci${count !== 1 ? "ones" : "ón"})`
    : `(${count} rating${count !== 1 ? "s" : ""})`;
}

// ── Rating distribution ────────────────────────────────────────────────────

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
      return `<div class="dist-row">
        <span class="dist-star">${star}&#9733;</span>
        <div class="dist-bar-wrap"><div class="dist-bar" style="width:${pct}%"></div></div>
        <span class="dist-count">${count}</span>
      </div>`;
    }).join("");
  } catch { /* fail silently */ }
}

// ── Comments ───────────────────────────────────────────────────────────────

async function loadComments(destId) {
  const list = document.getElementById("commentsList");
  list.innerHTML = `<p class="comments-loading">${t("commentsLoading")}</p>`;
  try {
    const comments = await getComments(destId);
    if (!comments.length) {
      list.innerHTML = `<p class="comments-empty">${t("commentsEmpty")}</p>`;
      return;
    }
    const locale = lang === "es" ? "es-MX" : "en-US";
    list.innerHTML = comments.map(c => {
      const date = new Date(c.created_at).toLocaleDateString(locale, { month:"short", day:"numeric", year:"numeric" });
      return `<div class="comment-item">
        <div class="comment-header">
          <span class="comment-name">${escapeHTML(c.nickname)}</span>
          <span class="comment-date">${date}</span>
        </div>
        <p class="comment-body">${escapeHTML(c.body)}</p>
      </div>`;
    }).join("");
  } catch {
    list.innerHTML = `<p class="comments-loading">${t("commentsLoading")}</p>`;
  }
}

document.getElementById("commentForm").addEventListener("submit", async e => {
  e.preventDefault();
  if (!activeDestId) return;
  const name = document.getElementById("commentName").value;
  const body = document.getElementById("commentBody").value.trim();
  const btn  = e.target.querySelector(".comment-submit");
  if (!body) return;
  btn.disabled = true;
  try {
    await submitComment(activeDestId, name, body);
    e.target.reset();
    loadComments(activeDestId);
  } catch {
    alert(lang === "es" ? "No se pudo publicar. Inténtalo de nuevo." : "Could not post comment. Try again.");
  } finally {
    btn.disabled = false;
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
      .map(tg => `<span class="tag tag-${tg.replace(/[^a-z]/g,"-")} tag-sm">${tagLabels[tg] ?? tg}</span>`)
      .join("");
    const ratingText = summary.count > 0
      ? `&#9733; ${summary.avg} (${summary.count})`
      : t("noRatings");
    return `<div class="reco-card">
      <div class="reco-img" style="background-image:url('${dest.image}')"></div>
      <div class="reco-body">
        <div class="reco-header">
          <span class="reco-name">${dest.name}</span>
          <span class="reco-match">${matchPct}% match</span>
        </div>
        <div class="reco-match-bar"><div class="reco-match-fill" style="width:${matchPct}%"></div></div>
        <div class="reco-meta"><span class="reco-rating">${ratingText}</span></div>
        <div class="reco-tags">${tagsHTML}</div>
        <button class="reco-open-btn" data-id="${dest.id}">${t("explore")}</button>
      </div>
    </div>`;
  }).join("");
}

document.getElementById("recoList").addEventListener("click", e => {
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
applyStrings();
renderFeatured();
renderSections("all");
renderInsights();
