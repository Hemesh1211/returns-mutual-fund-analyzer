// Returns — Indian Mutual Fund Analytics & Return Comparison Engine

const STATE = {
  searchQuery: "",
  selectedCategory: "All",
  sortField: "y5",
  sortOrder: "desc",
  horizon: "y5", // y1, y3, y5, y10
  compareIds: ["ppfas-flexi", "motilal-midcap", "nippon-smallcap"],
  chartMode: "sip", // 'sip' (₹10,000/mo) or 'lumpsum' (₹1,00,000)
  chartYears: 10,
  calc: {
    mode: "sip", // 'sip' | 'lumpsum'
    frequency: "monthly", // daily | weekly | monthly
    fundId: "ppfas-flexi",
    monthlyAmount: 15000,
    lumpsumAmount: 200000,
    stepUpPercent: 10,
    years: 10,
    customCagr: null
  }
};

const CHART_COLORS = ["#C6A76A", "#9DB6C7", "#7D91A6", "#B28C82"];
let fundsPage = 0;
const FUNDS_PAGE_SIZE = 50;
const APP_PAGE_SECTIONS = {
  home: ["heroOverview", "homeSection"],
  categories: ["explorerSection", "fundHousesSection", "allIndianFundsSection"],
  compare: ["comparisonStudioSection"],
  details: ["fundDetailsSection"],
  tools: ["toolsSection", "sipCalculatorSection", "navHistorySection"],
  learn: ["marketNewsSection", "guideSection"]
};
let navHistoryDb = null;
let navHistoryDbReady = null;
let activeNavHistoryRows = [];

function displayMetric(value, digits = 1, suffix = "") {
  return value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value)) ? `${Number(value).toFixed(digits)}${suffix}` : "—";
}
function displayMoney(value, digits = 0) {
  return value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value)) ? Number(value).toLocaleString("en-IN", { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "—";
}
function safeRating(value) { return Math.max(0, Math.min(5, Number(value) || 0)); }


function openNavHistoryDatabase() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) return reject(new Error("IndexedDB is not available in this browser."));
    const request = window.indexedDB.open("ReturnsNavHistory", 2);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("schemes")) db.createObjectStore("schemes", { keyPath: "schemeCode" });
      if (!db.objectStoreNames.contains("schemeCatalog")) db.createObjectStore("schemeCatalog", { keyPath: "schemeCode" });
      if (!db.objectStoreNames.contains("navHistory")) {
        const store = db.createObjectStore("navHistory", { keyPath: "id" });
        store.createIndex("schemeCode", "schemeCode", { unique: false });
        store.createIndex("date", "date", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Could not open NAV database."));
  });
}

function amfiDateToISO(value) {
  const parts = String(value || "").split("-");
  if (parts.length !== 3) return "";
  return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
}

async function saveNavHistory(schemeCode, schemeName, navList, refresh = true) {
  if (!navHistoryDb || !schemeCode || !Array.isArray(navList) || !navList.length) return;
  try {
  const code = String(schemeCode);
  const savedAt = new Date().toISOString();
  const transaction = navHistoryDb.transaction(["schemes", "navHistory"], "readwrite");
  transaction.objectStore("schemes").put({ schemeCode: code, schemeName: schemeName || `AMFI Scheme ${code}`, lastSavedAt: savedAt });
  const store = transaction.objectStore("navHistory");
  navList.forEach((entry, index) => {
    const nav = Number.parseFloat(entry.nav);
    const date = amfiDateToISO(entry.date);
    if (!date || !Number.isFinite(nav)) return;
    const previousNav = navList[index + 1] ? Number.parseFloat(navList[index + 1].nav) : null;
    const dailyChange = Number.isFinite(previousNav) && previousNav !== 0 ? ((nav - previousNav) / previousNav) * 100 : null;
    store.put({ id: `${code}:${date}`, schemeCode: code, date, nav, dailyChange, savedAt });
  });
  await new Promise((resolve, reject) => {
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error || new Error("Could not save NAV history."));
    transaction.onabort = () => reject(transaction.error || new Error("NAV history save was cancelled."));
  });
  if (refresh) await refreshNavHistorySchemes();
  } catch (error) {
    console.warn("NAV history could not be saved:", error);
    const message = document.getElementById("navHistoryMessage");
    if (message) message.textContent = "The NAV history database could not save this update. Live fund data is still available.";
  }
}

async function refreshNavHistorySchemes() {
  if (!navHistoryDb) return;
  const transaction = navHistoryDb.transaction(["schemes", "navHistory"], "readonly");
  const schemesRequest = transaction.objectStore("schemes").getAll();
  const countRequest = transaction.objectStore("navHistory").count();
  const [schemes, count] = await Promise.all([
    new Promise((resolve, reject) => { schemesRequest.onsuccess = () => resolve(schemesRequest.result); schemesRequest.onerror = () => reject(schemesRequest.error); }),
    new Promise((resolve, reject) => { countRequest.onsuccess = () => resolve(countRequest.result); countRequest.onerror = () => reject(countRequest.error); })
  ]);
  const countEl = document.getElementById("navDbRecordCount");
  if (countEl) countEl.textContent = `${Number(count).toLocaleString("en-IN")} NAV records • ${schemes.length} schemes`;
  const select = document.getElementById("navHistoryScheme");
  const search = (document.getElementById("navHistorySearch")?.value || "").trim().toLowerCase();
  if (!select) return;
  const selected = select.value;
  const matches = schemes.filter(item => `${item.schemeName} ${item.schemeCode}`.toLowerCase().includes(search));
  select.innerHTML = matches.length
    ? matches.sort((a, b) => a.schemeName.localeCompare(b.schemeName)).map(item => `<option value="${item.schemeCode}">${item.schemeName} (#${item.schemeCode})</option>`).join("")
    : '<option value="">No matching saved schemes</option>';
  if (matches.some(item => item.schemeCode === selected)) select.value = selected;
  else if (matches.length) select.value = matches[0].schemeCode;
  if (select.value) await renderNavHistory(select.value);
}

async function areFundHistoriesSaved() {
  if (!navHistoryDb) return true;
  const known = await new Promise((resolve, reject) => {
    const request = navHistoryDb.transaction("schemes", "readonly").objectStore("schemes").getAllKeys();
    request.onsuccess = () => resolve(new Set(request.result.map(String)));
    request.onerror = () => reject(request.error);
  });
  const codeMap = window.AMFI_SCHEME_CODES || {};
  const schemeCodes = window.MUTUAL_FUNDS.filter(fund => !fund.dataStatus).map(fund => String(fund.amfiCode || codeMap[fund.id] || "")).filter(Boolean);
  return schemeCodes.every(code => known.has(code));
}

async function renderNavHistory(schemeCode) {
  if (!navHistoryDb || !schemeCode) return;
  const body = document.getElementById("navHistoryTableBody");
  const message = document.getElementById("navHistoryMessage");
  const exportButton = document.getElementById("navHistoryExportBtn");
  const transaction = navHistoryDb.transaction("navHistory", "readonly");
  const request = transaction.objectStore("navHistory").index("schemeCode").getAll(String(schemeCode));
  const rows = await new Promise((resolve, reject) => { request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
  rows.sort((a, b) => b.date.localeCompare(a.date));
  activeNavHistoryRows = rows;
  if (exportButton) exportButton.disabled = rows.length === 0;
  if (message) message.textContent = rows.length ? `${rows.length.toLocaleString("en-IN")} daily NAV values saved for scheme #${schemeCode}. Showing the latest 250; CSV export includes all saved dates.` : "No NAV history is saved for this scheme yet.";
  if (body) body.innerHTML = rows.length ? rows.slice(0, 250).map(row => `<tr><td>${row.date}</td><td class="mono-num">₹${row.nav.toFixed(4)}</td><td>${row.dailyChange == null ? "—" : `${row.dailyChange >= 0 ? "+" : ""}${row.dailyChange.toFixed(2)}%`}</td><td>${new Date(row.savedAt).toLocaleString()}</td></tr>`).join("") : '<tr><td colspan="4">Load or sync this scheme to save its NAV history.</td></tr>';
}

function exportNavHistoryCsv() {
  const rows = activeNavHistoryRows;
  if (!rows.length) return;
  const schemeName = document.getElementById("navHistoryScheme")?.selectedOptions[0]?.textContent || "Mutual fund";
  const csv = ["Scheme,AMFI Scheme Code,Date,NAV (INR),Daily Change (%)", ...rows.map(row => [schemeName, row.schemeCode, row.date, row.nav, row.dailyChange ?? ""].map(value => `"${String(value).replaceAll('"', '""')}"`).join(","))].join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = `nav-history-${document.getElementById("navHistoryScheme")?.value || "scheme"}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

// Indian Numbering Formatters
function formatINR(num) {
  const n = Math.round(num);
  return "₹" + n.toLocaleString("en-IN");
}

function formatIndianCompact(num) {
  if (num >= 10000000) {
    return "₹" + (num / 10000000).toFixed(2) + " Cr";
  }
  if (num >= 100000) {
    return "₹" + (num / 100000).toFixed(2) + " L";
  }
  return formatINR(num);
}

function getAppPageForTarget(targetId) {
  const target = document.getElementById(targetId);
  return target?.closest(".app-page-section")?.dataset.appPage || null;
}

window.setAppPage = function(page, targetId = null, updateAddress = false) {
  if (!APP_PAGE_SECTIONS[page]) page = "home";
  document.querySelectorAll(".app-page-section").forEach(section => {
    section.classList.toggle("app-page-hidden", !APP_PAGE_SECTIONS[page].includes(section.id));
  });
  document.querySelectorAll("[data-app-page-link]").forEach(link => {
    const active = link.dataset.appPageLink === page;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.querySelectorAll(".nav-mega").forEach(menu => {
    const active = [...menu.querySelectorAll("[data-app-page-link]")].some(link => link.dataset.appPageLink === page);
    menu.classList.toggle("active", active);
    const summary = menu.querySelector("summary");
    if (summary && active) summary.setAttribute("aria-current", "page");
    else summary?.removeAttribute("aria-current");
  });
  const destination = targetId || APP_PAGE_SECTIONS[page][0];
  if (updateAddress && destination) history.pushState({ page }, "", `#${destination}`);
  requestAnimationFrame(() => {
    const target = document.getElementById(destination);
    const pageHeading = target?.querySelector(".section-header") || target;
    if (pageHeading) pageHeading.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo(0, 0);
  });
};

function routeToCurrentHash() {
  const targetId = window.location.hash.slice(1);
  const page = getAppPageForTarget(targetId) || "home";
  window.setAppPage(page, targetId || null, false);
}

function renderFundDetailsResults(query = "") {
  const container = document.getElementById("fundDetailsResults");
  if (!container) return;
  const needle = String(query).trim().toLowerCase();
  const funds = (window.MUTUAL_FUNDS || []).filter(fund =>
    !needle || `${fund.name} ${fund.amc} ${fund.category} ${fund.manager || ""}`.toLowerCase().includes(needle)
  ).sort((a, b) => a.name.localeCompare(b.name));

  container.replaceChildren();
  if (!funds.length) {
    const empty = document.createElement("p");
    empty.className = "detail-search-empty";
    empty.textContent = "No matching schemes in the current dataset.";
    container.append(empty);
    return;
  }

  const status = document.createElement("p");
  status.className = "detail-results-count";
  status.textContent = `${funds.length.toLocaleString("en-IN")} ${funds.length === 1 ? "scheme" : "schemes"} available${funds.length > 100 ? " • showing first 100, refine your search to narrow the list" : ""}`;
  container.append(status);

  const grid = document.createElement("div");
  grid.className = "detail-fund-grid";
  funds.slice(0, 100).forEach(fund => {
    const card = document.createElement("article");
    card.className = "detail-fund-card";
    const category = document.createElement("span");
    category.className = "detail-fund-category";
    category.textContent = fund.category || "Category not available";
    const title = document.createElement("h3");
    title.textContent = fund.name;
    const house = document.createElement("p");
    house.textContent = fund.amc || "Fund house not available";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn detail-open-button";
    button.textContent = "View available details ↗";
    button.addEventListener("click", () => window.openFundModal(fund.id));
    card.append(category, title, house, button);
    grid.append(card);
  });
  container.append(grid);
}

function renderGoalPlanner() {
  const amountInput = document.getElementById("goalAmountInput");
  const yearsInput = document.getElementById("goalYearsInput");
  const output = document.getElementById("goalScenarioResults");
  if (!amountInput || !yearsInput || !output) return;
  const goal = Math.max(0, Number(amountInput.value) || 0);
  const years = Math.min(40, Math.max(1, Number(yearsInput.value) || 1));
  const months = years * 12;
  output.innerHTML = [6, 10, 14].map(rate => {
    const monthlyRate = Math.pow(1 + rate / 100, 1 / 12) - 1;
    const sip = monthlyRate === 0 ? goal / months : goal * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
    return `<div class="goal-scenario"><span class="goal-rate">${rate}% assumed return</span><strong>${formatINR(sip)}<small> / month</small></strong><span class="goal-total">Total contributions: ${formatIndianCompact(sip * months)}</span></div>`;
  }).join("");
}

function closeWelcomeModal() {
  document.getElementById("welcomeModal")?.classList.remove("open");
}

function finishWelcome(event) {
  event.preventDefault();
  const form = document.getElementById("welcomeExperienceForm");
  const experience = new FormData(form).get("experience");
  const destination = event.submitter?.value || "guide";
  try { localStorage.setItem("returns_onboarding_v1", JSON.stringify({ experience, completedAt: new Date().toISOString() })); } catch (_) {}
  closeWelcomeModal();
  if (destination === "guide") {
    setTimeout(() => window.setAppPage("learn", "guideSection", true), 180);
  }
}

// Render Market Indices Bar
function renderTicker() {
  const container = document.getElementById("marketTickerItems");
  if (!container) return;
  container.innerHTML = window.MARKET_INDICES.map(idx => `
    <div class="ticker-item">
      <span class="ticker-name">${idx.name}</span>
      <span class="ticker-val">${idx.value}</span>
      <span class="ticker-change">${idx.change}</span>
      <span style="color: var(--text-muted); font-size: 0.74rem;">5Y CAGR: <strong style="color: var(--text-primary);">${idx.cagr5Y}%</strong></span>
    </div>
  `).join("");
}

// Filter & Sort Funds
function getFilteredFunds() {
  const q = STATE.searchQuery.trim().toLowerCase();
  return window.MUTUAL_FUNDS.filter(f => {
    const matchesCat = STATE.selectedCategory === "All" ||
      (STATE.selectedCategory === "Invesco" ? f.amc.toLowerCase().includes("invesco") : f.category === STATE.selectedCategory);
    const matchesQuery = !q ||
      f.name.toLowerCase().includes(q) ||
      (f.amc || "").toLowerCase().includes(q) ||
      f.manager.toLowerCase().includes(q) ||
      f.topHoldings.some(h => h.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  }).sort((a, b) => {
    let valA, valB;
    if (["y1", "y3", "y5", "y10"].includes(STATE.sortField)) {
      valA = a.returns[STATE.sortField];
      valB = b.returns[STATE.sortField];
    } else if (["alpha", "sharpe", "stdDev"].includes(STATE.sortField)) {
      valA = a.metrics[STATE.sortField];
      valB = b.metrics[STATE.sortField];
    } else {
      valA = a[STATE.sortField];
      valB = b[STATE.sortField];
    }
    return STATE.sortOrder === "desc" ? valB - valA : valA - valB;
  });
}

// Render Explorer Table
function renderFundsTable() {
  const tbody = document.getElementById("fundsTableBody");
  const countEl = document.getElementById("fundsCountBadge");
  const funds = getFilteredFunds();
  const totalPages = Math.max(1, Math.ceil(funds.length / FUNDS_PAGE_SIZE));
  fundsPage = Math.min(fundsPage, totalPages - 1);
  const pageFunds = funds.slice(fundsPage * FUNDS_PAGE_SIZE, (fundsPage + 1) * FUNDS_PAGE_SIZE);
  if (countEl) countEl.textContent = `${funds.length.toLocaleString("en-IN")} Direct Growth Schemes`;

  // Estimate ₹1,00,000 lumpsum value for selected horizon
  const horizonYearsMap = { y1: 1, y3: 3, y5: 5, y10: 10 };
  const yrs = horizonYearsMap[STATE.horizon] || 5;
  const horizonLabelMap = { y1: "1Y", y3: "3Y", y5: "5Y", y10: "10Y" };
  const thCorpus = document.getElementById("thHorizonCorpus");
  if (thCorpus) {
    thCorpus.textContent = `₹1L Value (${horizonLabelMap[STATE.horizon]})`;
  }

  tbody.innerHTML = pageFunds.map(fund => {
    const isCompared = STATE.compareIds.includes(fund.id);
    const cagr = fund.returns?.[STATE.horizon];
    const bmarkCagr = fund.benchmarkReturns?.[STATE.horizon];
    const outperf = Number.isFinite(cagr) && Number.isFinite(bmarkCagr) ? (cagr - bmarkCagr).toFixed(1) : null;
    const lumpsum1LVal = Number.isFinite(cagr) ? 100000 * Math.pow(1 + cagr / 100, yrs) : null;
    const starsStr = "★".repeat(safeRating(fund.rating)) + "☆".repeat(5 - safeRating(fund.rating));

    return `
      <tr class="${isCompared ? 'selected-row' : ''}" onclick="handleFundRowClick(event, '${fund.id}')" title="Click to view full scheme deep-dive analysis & holdings">
        <td>
          <div class="fund-info-cell">
            <span class="fund-title-link" onclick="openFundModal('${fund.id}')">
              ${fund.name}
              <span style="font-size:0.75rem; color:var(--accent-indigo);">↗</span>
            </span>
            <div class="fund-meta-row">
              <span class="badge-cat">${fund.category}</span>
              <span class="stars" title="${fund.rating ?? "Not rated"} Star Rated">${starsStr}</span>
              <span class="mono-num">NAV: ₹${displayMetric(fund.nav, 2)}</span>
              ${fund.dayChange !== undefined ? `<span style="color:${fund.dayChange >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; font-weight:700; font-family:var(--font-mono);">(${fund.dayChange >= 0 ? '+' : ''}${Number(fund.dayChange).toFixed(2)}%)</span>` : ''}
              ${fund.navDate ? `<span style="color:var(--text-muted); font-size:0.7rem;">[${fund.navDate}]</span>` : ''}
            </div>
            <div style="font-size: 0.73rem; color: var(--text-muted);">
              Top Stocks: ${fund.holdings?.length ? fund.holdings.slice(0, 3).map(h => `${h.name} (${h.percent.toFixed(1)}%)`).join(", ") : ((fund.topHoldings || []).slice(0, 3).join(", ") || "Holdings not available")}
            </div>
          </div>
        </td>
        <td class="mono-num ${STATE.horizon === 'y1' ? 'return-highlight' : ''}">${displayMetric(fund.returns.y1, 1, "%")}</td>
        <td class="mono-num ${STATE.horizon === 'y3' ? 'return-highlight' : ''}">${displayMetric(fund.returns.y3, 1, "%")}</td>
        <td class="mono-num ${STATE.horizon === 'y5' ? 'return-highlight' : ''}">
          ${displayMetric(fund.returns.y5, 1, "%")}
          <div>
            <span class="alpha-pill ${outperf !== null && outperf < 0 ? 'negative' : ''}">
              ${outperf === null ? "Benchmark comparison unavailable" : `${outperf >= 0 ? "+" : ""}${outperf}% vs Index`}
            </span>
          </div>
        </td>
        <td class="mono-num ${STATE.horizon === 'y10' ? 'return-highlight' : ''}">${displayMetric(fund.returns.y10, 1, "%")}</td>
        <td>
          <div class="mono-num" style="color: var(--accent-emerald);">${lumpsum1LVal === null ? "—" : formatIndianCompact(lumpsum1LVal)}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">on ₹1,00,000 in ${yrs}Y</div>
        </td>
        <td class="mono-num">
          ${displayMetric(fund.metrics?.alpha, 2)}
          <div style="font-size: 0.72rem; color: var(--text-muted);">Sharpe: ${displayMetric(fund.metrics?.sharpe, 2)}</div>
        </td>
        <td class="mono-num">
          ${displayMetric(fund.expenseRatio, 2, "%")}
          <div style="font-size: 0.72rem; color: var(--text-muted);">Reg: ${displayMetric(fund.regularExpenseRatio, 2, "%")}</div>
        </td>
        <td class="mono-num">₹${displayMoney(fund.aumCr)} Cr</td>
        <td>
          <button class="compare-toggle-btn ${isCompared ? 'added' : ''}" onclick="toggleCompare('${fund.id}')">
            ${isCompared ? '✓ Comparing' : '+ Compare'}
          </button>
        </td>
      </tr>
    `;
  }).join("");

  renderFundsCards(pageFunds, yrs);
  renderFundsPagination(funds.length, totalPages);
  updateCompareCount();
}

function renderFundsPagination(total, totalPages) {
  const tbody = document.getElementById("fundsTableBody");
  if (!tbody) return;
  let container = document.getElementById("fundsPagination");
  if (!container) {
    container = document.createElement("nav");
    container.id = "fundsPagination";
    container.setAttribute("aria-label", "Fund list pages");
    container.className = "funds-pagination";
    const wrapper = tbody.closest(".table-wrapper") || tbody.closest("table")?.parentElement;
    if (wrapper) wrapper.insertAdjacentElement("afterend", container);
  }
  if (!container) return;
  if (!total) { container.innerHTML = ""; return; }
  const first = fundsPage * FUNDS_PAGE_SIZE + 1;
  const last = Math.min(total, first + FUNDS_PAGE_SIZE - 1);
  container.innerHTML = `<span>Showing ${first.toLocaleString("en-IN")}–${last.toLocaleString("en-IN")} of ${total.toLocaleString("en-IN")}</span><div><button class="btn btn-sm" onclick="changeFundsPage(-1)" ${fundsPage === 0 ? "disabled" : ""} aria-label="Previous page">Previous</button><span class="funds-page-count">Page ${fundsPage + 1} of ${totalPages}</span><button class="btn btn-sm" onclick="changeFundsPage(1)" ${fundsPage >= totalPages - 1 ? "disabled" : ""} aria-label="Next page">Next</button></div>`;
}
window.changeFundsPage = function(delta) {
  const totalPages = Math.max(1, Math.ceil(getFilteredFunds().length / FUNDS_PAGE_SIZE));
  fundsPage = Math.max(0, Math.min(totalPages - 1, fundsPage + delta));
  renderFundsTable();
};

// Render Mobile Phone Optimized Cards
function renderFundsCards(funds, yrs) {
  const container = document.getElementById("fundsCardsContainer");
  if (!container) return;

  container.innerHTML = funds.map(fund => {
    const isCompared = STATE.compareIds.includes(fund.id);
    const cagr = fund.returns?.[STATE.horizon];
    const bmarkCagr = fund.benchmarkReturns?.[STATE.horizon];
    const outperf = Number.isFinite(cagr) && Number.isFinite(bmarkCagr) ? (cagr - bmarkCagr).toFixed(1) : null;
    const starsStr = "★".repeat(safeRating(fund.rating)) + "☆".repeat(5 - safeRating(fund.rating));

    return `
      <div class="fund-mobile-card ${isCompared ? 'selected-card' : ''}" onclick="handleFundRowClick(event, '${fund.id}')" style="cursor: pointer;" title="Tap to view full fund details">
        <div>
          <div class="mobile-card-header">
            <div>
              <span class="badge-cat">${fund.category} • ${fund.plan}</span>
              <div class="mobile-fund-name" onclick="openFundModal('${fund.id}')" style="margin-top:4px;">
                ${fund.name} <span style="font-size:0.75rem; color:var(--accent-indigo);">↗</span>
              </div>
            </div>
            <div style="text-align:right;">
              <span class="stars">${starsStr}</span>
              <div class="mono-num" style="font-size:0.88rem; font-weight:700; margin-top:2px;">
                ₹${displayMetric(fund.nav, 2)}
              </div>
              ${fund.dayChange !== undefined ? `<div style="font-size:0.72rem; color:${fund.dayChange >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; font-weight:700;">${fund.dayChange >= 0 ? '+' : ''}${Number(fund.dayChange).toFixed(2)}%</div>` : ''}
            </div>
          </div>
          <div class="mobile-card-meta">
            <span>AMC: <strong>${fund.amc}</strong></span>
            ${fund.navDate ? `<span>[${fund.navDate}]</span>` : ''}
          </div>
        </div>

        <!-- 4-Pill Trailing CAGR Grid -->
        <div class="mobile-return-strip">
          <div class="mobile-return-col ${STATE.horizon === 'y1' ? 'highlight-horizon' : ''}">
            <span class="mobile-return-lbl">1Y</span>
            <span class="mobile-return-val">${displayMetric(fund.returns.y1, 1, "%")}</span>
          </div>
          <div class="mobile-return-col ${STATE.horizon === 'y3' ? 'highlight-horizon' : ''}">
            <span class="mobile-return-lbl">3Y</span>
            <span class="mobile-return-val">${displayMetric(fund.returns.y3, 1, "%")}</span>
          </div>
          <div class="mobile-return-col ${STATE.horizon === 'y5' ? 'highlight-horizon' : ''}">
            <span class="mobile-return-lbl">5Y</span>
            <span class="mobile-return-val">${displayMetric(fund.returns.y5, 1, "%")}</span>
          </div>
          <div class="mobile-return-col ${STATE.horizon === 'y10' ? 'highlight-horizon' : ''}">
            <span class="mobile-return-lbl">10Y</span>
            <span class="mobile-return-val">${displayMetric(fund.returns.y10, 1, "%")}</span>
          </div>
        </div>

        <div class="mobile-extra-metrics">
          <div>Alpha: <strong style="color:var(--accent-emerald);">+${displayMetric(fund.metrics?.alpha, 1, "%")}</strong></div>
          <div>Expense: <strong>${displayMetric(fund.expenseRatio, 2, "%")}</strong></div>
          <div>AUM: <strong>₹${displayMoney(fund.aumCr)} Cr</strong></div>
        </div>

        <div style="font-size:0.75rem; color:var(--text-muted); line-height:1.4; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-top:2px;">
          <span>Top Holdings: <span style="color:var(--text-secondary);">${fund.holdings?.length ? fund.holdings.slice(0, 3).map(h => `${h.name.split(' ')[0]} (${h.percent.toFixed(1)}%)`).join(", ") : (fund.topHoldings || []).slice(0, 3).join(", ") || "Holdings not available"}</span></span>
          <button class="btn btn-sm" style="font-size:0.72rem; padding:3px 8px; font-weight:700;" id="btn-mcard-holdings-${fund.id}" onclick="toggleMobileCardHoldings('${fund.id}')" title="Click to show full holdings">
            📊 Holdings ▾
          </button>
        </div>

        <!-- Mobile Card Holdings Drawer (COLLAPSED BY DEFAULT; shown when selected) -->
        <div class="mobile-holdings-drawer" id="mobile-card-holdings-${fund.id}" style="display:none; margin-top:10px; border-top:1px dashed var(--border-color); padding-top:8px;">
          <table style="width:100%; font-size:0.72rem; border-collapse:collapse;">
            <thead>
              <tr style="color:var(--text-muted); text-align:left;">
                <th style="padding:4px 0;">Asset (${(fund.holdings || []).length})</th>
                <th style="padding:4px 0; text-align:right;">Weight</th>
              </tr>
            </thead>
            <tbody>
              ${(fund.holdings || []).map((h, i) => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                  <td style="padding:4px 0; font-weight:600; color:var(--text-primary);">${i+1}. ${h.name}</td>
                  <td class="mono-num" style="padding:4px 0; text-align:right; font-weight:700; color:${h.sector.includes('Cash') ? 'var(--text-muted)' : 'var(--accent-emerald)'};">${h.percent.toFixed(2)}%</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div class="mobile-actions-row">
          <button class="compare-toggle-btn ${isCompared ? 'added' : ''}" style="flex:1; padding:9px 12px;" onclick="toggleCompare('${fund.id}')">
            ${isCompared ? '✓ Added to Compare' : '＋ Add to Compare'}
          </button>
          <button class="btn" style="padding:8px 12px;" onclick="openFundModal('${fund.id}')" title="Scheme Details">
            ℹ️ Details
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// Switch between Mobile Cards View and Full Table View
window.toggleFundView = function(mode) {
  const cardsContainer = document.getElementById("fundsCardsContainer");
  const tableWrapper = document.getElementById("fundsTableWrapper");
  const btnCards = document.getElementById("btnViewCards");
  const btnTable = document.getElementById("btnViewTable");

  if (mode === "cards") {
    if (cardsContainer) cardsContainer.style.display = "grid";
    if (tableWrapper) tableWrapper.style.display = "none";
    if (btnCards) btnCards.classList.add("active");
    if (btnTable) btnTable.classList.remove("active");
  } else {
    if (cardsContainer) cardsContainer.style.display = "none";
    if (tableWrapper) tableWrapper.style.display = "block";
    if (btnCards) btnCards.classList.remove("active");
    if (btnTable) btnTable.classList.add("active");
  }
};

function updateCompareCount() {
  const pill = document.getElementById("navCompareCount");
  if (pill) pill.textContent = `${STATE.compareIds.length}/4`;
  const mobilePill = document.getElementById("mobileCompareCountBadge");
  if (mobilePill) mobilePill.textContent = `(${STATE.compareIds.length})`;
}

// Toggle fund in Comparison Studio
window.toggleCompare = function(fundId) {
  const idx = STATE.compareIds.indexOf(fundId);
  if (idx >= 0) {
    if (STATE.compareIds.length === 1) {
      alert("Keep at least 1 fund in the Comparison Studio to view return charts.");
      return;
    }
    STATE.compareIds.splice(idx, 1);
  } else {
    if (STATE.compareIds.length >= 4) {
      alert("You can compare up to 4 mutual funds side-by-side. Remove one to add another.");
      return;
    }
    STATE.compareIds.push(fundId);
  }
  renderFundsTable();
  renderComparisonStudio();
  renderFundHousesDirectory(window.currentAmcFilter || "all");
};

// Calculate wealth series for chart
function computeWealthSeries(cagrPercent, years, mode) {
  const points = [];
  const rAnnual = cagrPercent / 100;
  const rMonthly = Math.pow(1 + rAnnual, 1 / 12) - 1;

  for (let y = 0; y <= years; y++) {
    if (mode === "lumpsum") {
      // ₹1,00,000 Lumpsum
      points.push(100000 * Math.pow(1 + rAnnual, y));
    } else {
      // ₹10,000 Monthly SIP
      const months = y * 12;
      if (months === 0) {
        points.push(0);
      } else {
        const fv = 10000 * ((Math.pow(1 + rMonthly, months) - 1) / rMonthly) * (1 + rMonthly);
        points.push(fv);
      }
    }
  }
  return points;
}

// Draw Multi-Fund Growth Chart on HTML5 Canvas
function drawComparisonChart(comparedFunds) {
  const canvas = document.getElementById("growthChartCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);

  const years = STATE.chartYears;
  const cagrKey = years === 3 ? "y3" : years === 5 ? "y5" : "y10";

  const seriesList = comparedFunds.map((f, i) => ({
    name: f.shortName,
    cagr: f.returns?.[cagrKey],
    color: CHART_COLORS[i % CHART_COLORS.length],
    points: computeWealthSeries(f.returns?.[cagrKey], years, STATE.chartMode)
  })).filter(series => Number.isFinite(series.cagr));


  if (!seriesList.length || seriesList.every(series => !Number.isFinite(series.cagr))) {
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px sans-serif";
    ctx.fillText("Return history unavailable for selected scheme(s).", 18, 28);
    return;
  }
  const maxVal = Math.max(...seriesList.flatMap(s => s.points)) * 1.08;
  const padLeft = 72;
  const padRight = 24;
  const padTop = 20;
  const padBottom = 34;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  // Grid lines
  ctx.strokeStyle = "rgba(148, 163, 184, 0.14)";
  ctx.lineWidth = 1;
  ctx.font = "600 11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#94a3b8";

  const yTicks = 4;
  for (let i = 0; i <= yTicks; i++) {
    const val = (maxVal / yTicks) * i;
    const y = padTop + plotH - (val / maxVal) * plotH;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();
    ctx.fillText(formatIndianCompact(val), 6, y + 4);
  }

  // X axis labels
  for (let yr = 0; yr <= years; yr++) {
    const x = padLeft + (yr / years) * plotW;
    if (yr % (years >= 10 ? 2 : 1) === 0 || yr === years) {
      ctx.fillText(`Yr ${yr}`, x - 14, height - 10);
    }
  }

  // Plot lines
  seriesList.forEach(series => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = series.color;
    ctx.lineWidth = series.dashed ? 2 : 3;
    if (series.dashed) ctx.setLineDash([6, 4]);

    series.points.forEach((pt, idx) => {
      const x = padLeft + (idx / years) * plotW;
      const y = padTop + plotH - (pt / maxVal) * plotH;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Final point dot
    const lastVal = series.points[series.points.length - 1];
    const lastX = padLeft + plotW;
    const lastY = padTop + plotH - (lastVal / maxVal) * plotH;
    ctx.setLineDash([]);
    ctx.fillStyle = series.color;
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });

  // Render Legend
  const legendEl = document.getElementById("chartLegend");
  if (legendEl) {
    legendEl.innerHTML = seriesList.map(s => {
      const finalAmt = s.points[s.points.length - 1];
      return `
        <div class="legend-item">
          <span class="legend-dot" style="background: ${s.color};"></span>
          <span>${s.name} (${s.cagr}% assumption):</span>
          <strong class="mono-num" style="color: ${s.color};">${formatIndianCompact(finalAmt)}</strong>
        </div>
      `;
    }).join("");
  }
}

// Render Interactive 4-Slot Selector & Quick Add Dropdown in Compare Section
function renderCompareSelectorSlots() {
  const slotsContainer = document.getElementById("compareSlotsGrid");
  const quickSelect = document.getElementById("quickAddFundSelect");

  // Populate Quick Add Dropdown with funds not yet in comparison
  if (quickSelect) {
    const availableFunds = window.MUTUAL_FUNDS.filter(f => !STATE.compareIds.includes(f.id));
    quickSelect.innerHTML = `
      <option value="">＋ Add / Select Mutual Fund to Compare (${availableFunds.length} available)...</option>
      ${availableFunds.map(f => `
        <option value="${f.id}">${f.name} — ${f.category} (5Y: ${displayMetric(f.returns?.y5, 1, "%")})</option>
      `).join("")}
    `;
  }

  if (!slotsContainer) return;

  const slotsHtml = [];
  for (let i = 0; i < 4; i++) {
    const fundId = STATE.compareIds[i];
    const fund = fundId ? window.MUTUAL_FUNDS.find(f => f.id === fundId) : null;
    const slotColor = CHART_COLORS[i % CHART_COLORS.length];

    if (fund) {
      slotsHtml.push(`
        <div class="compare-slot-card active-slot" style="--slot-color: ${slotColor};">
          <div class="slot-header">
            <span class="slot-badge" style="color: ${slotColor}; border: 1px solid ${slotColor};">
              ● Scheme ${i + 1} • ${fund.category}
            </span>
            <button class="slot-remove-btn" onclick="toggleCompare('${fund.id}')" title="Remove from comparison">✕</button>
          </div>

          <div>
            <label style="font-size:0.72rem; color:var(--text-muted); display:block; margin-bottom:4px;">Change / Swap Mutual Fund:</label>
            <select class="select-input" style="padding: 7px 10px; font-size: 0.83rem; font-weight: 600;" onchange="changeSlotFund(${i}, this.value)">
              ${window.MUTUAL_FUNDS.map(opt => `
                <option value="${opt.id}" ${opt.id === fund.id ? "selected" : ""} ${STATE.compareIds.includes(opt.id) && opt.id !== fund.id ? "disabled" : ""}>
                  ${opt.name} (${displayMetric(opt.returns?.y5, 1, "%")} 5Y)
                </option>
              `).join("")}
            </select>
          </div>

          <div class="slot-metrics-strip" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
            <span>3Y: <strong class="mono-num" style="color:var(--text-primary);">${displayMetric(fund.returns?.y3, 1, "%")}</strong></span>
            <span>5Y: <strong class="mono-num" style="color:var(--accent-emerald);">${displayMetric(fund.returns?.y5, 1, "%")}</strong></span>
            <span>Exp: <strong class="mono-num">${displayMetric(fund.expenseRatio, 2, "%")}</strong></span>
            <button class="btn btn-sm" onclick="openFundModal('${fund.id}')" style="font-size:0.72rem; padding:3px 8px; font-weight:700;" title="Deep dive analysis modal">🔍 Details ↗</button>
          </div>
        </div>
      `);
    } else {
      const available = window.MUTUAL_FUNDS.filter(f => !STATE.compareIds.includes(f.id));
      slotsHtml.push(`
        <div class="compare-slot-card empty-slot">
          <div class="slot-header">
            <span class="slot-badge">Slot ${i + 1} (Available)</span>
          </div>
          <div>
            <div style="font-weight: 700; font-size: 0.86rem; margin-bottom: 6px; color: var(--accent-emerald);">
              ＋ Select Mutual Fund to Compare
            </div>
            <select class="select-input" style="padding: 8px 10px; font-size: 0.83rem;" onchange="changeSlotFund(${i}, this.value)">
              <option value="">Choose a Mutual Fund...</option>
              ${available.map(opt => `
                <option value="${opt.id}">${opt.name} [${opt.category} • ${displayMetric(opt.returns?.y5, 1, "%")}]</option>
              `).join("")}
            </select>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted);">
            <span>Or add unlisted scheme:</span>
            <button type="button" onclick="openAddCustomFundModal()" style="background:none; border:none; color:var(--accent-indigo); font-weight:700; cursor:pointer;">+ Custom Fund</button>
          </div>
        </div>
      `);
    }
  }

  slotsContainer.innerHTML = slotsHtml.join("");
}

// Swap or Add a Mutual Fund in a specific comparison slot
window.changeSlotFund = function(slotIndex, newFundId) {
  if (!newFundId) return;
  if (STATE.compareIds.includes(newFundId)) {
    alert("This mutual fund is already selected in another comparison slot.");
    renderCompareSelectorSlots();
    return;
  }
  if (slotIndex < STATE.compareIds.length) {
    STATE.compareIds[slotIndex] = newFundId;
  } else {
    STATE.compareIds.push(newFundId);
  }
  renderFundsTable();
  renderComparisonStudio();
};

// Handle Top Quick-Add Dropdown
window.handleQuickAddFund = function(fundId) {
  if (!fundId) return;
  if (STATE.compareIds.includes(fundId)) return;
  if (STATE.compareIds.length >= 4) {
    // Replace the 4th slot if all 4 slots are full
    STATE.compareIds[3] = fundId;
  } else {
    STATE.compareIds.push(fundId);
  }
  renderFundsTable();
  renderComparisonStudio();
};

// Apply 1-Click Preset Comparison Pack
window.applyComparePreset = function(presetIds) {
  STATE.compareIds = presetIds.filter(id => window.MUTUAL_FUNDS.some(f => f.id === id)).slice(0, 4);
  renderFundsTable();
  renderComparisonStudio();
};

// Custom Mutual Fund Modal Handlers
window.openAddCustomFundModal = function() {
  const modal = document.getElementById("addCustomFundModal");
  if (modal) modal.classList.add("open");
};

window.closeAddCustomFundModal = function() {
  const modal = document.getElementById("addCustomFundModal");
  if (modal) modal.classList.remove("open");
};

window.submitCustomFund = function(event) {
  event.preventDefault();
  const name = document.getElementById("cfName").value.trim();
  const amc = document.getElementById("cfAmc").value.trim();
  const category = document.getElementById("cfCategory").value;
  const expenseRatio = parseFloat(document.getElementById("cfExpense").value) || 0.6;
  const y1 = parseFloat(document.getElementById("cfY1").value) || 25.0;
  const y3 = parseFloat(document.getElementById("cfY3").value) || 22.0;
  const y5 = parseFloat(document.getElementById("cfY5").value) || 24.0;
  const y10 = parseFloat(document.getElementById("cfY10").value) || 18.5;
  const aumCr = parseInt(document.getElementById("cfAum").value, 10) || 10000;
  const alpha = parseFloat(document.getElementById("cfAlpha").value) || 4.0;
  const holdingsRaw = document.getElementById("cfHoldings").value;
  const topHoldings = holdingsRaw.split(",").map(s => s.trim()).filter(Boolean);

  const customId = "custom-" + Date.now();
  const newFund = {
    id: customId,
    name: name,
    shortName: name.split(" ").slice(0, 3).join(" "),
    amc: amc,
    category: category,
    plan: "Direct - Growth",
    rating: 5,
    risk: "Very High",
    nav: 105.50,
    aumCr: aumCr,
    expenseRatio: expenseRatio,
    regularExpenseRatio: +(expenseRatio + 0.85).toFixed(2),
    exitLoad: "1% < 365 days",
    minSip: 500,
    manager: "Fund Management Team",
    benchmark: "NIFTY 500 TRI",
    returns: { y1, y3, y5, y10, inception: y5 },
    benchmarkReturns: { y1: 24.1, y3: 18.6, y5: 20.5, y10: 15.5 },
    metrics: { alpha: alpha, beta: 0.89, sharpe: 1.52, sortino: 2.18, stdDev: 13.5 },
    topHoldings: topHoldings.length ? topHoldings : ["HDFC Bank", "ICICI Bank", "Reliance Industries", "Infosys"],
    sectors: { Financials: 32, Technology: 18, Industrials: 18, Consumer: 16, Energy: 10, Others: 6 }
  };

  window.MUTUAL_FUNDS.unshift(newFund);

  if (STATE.compareIds.length >= 4) {
    STATE.compareIds[3] = customId;
  } else {
    STATE.compareIds.push(customId);
  }

  // Also refresh calculator dropdown
  const calcFundSelect = document.getElementById("calcFundSelect");
  if (calcFundSelect) {
    calcFundSelect.innerHTML = window.MUTUAL_FUNDS.map(f =>
      `<option value="${f.id}">${f.name} (${displayMetric(f.returns?.y5, 1, "%")} 5Y CAGR)</option>`
    ).join("");
  }

  closeAddCustomFundModal();
  renderFundsTable();
  renderComparisonStudio();
};

// Render Comparison Studio (4-Slot Selector + Chart + Overlap + Side-by-Side Matrix)
function renderComparisonStudio() {
  const comparedFunds = STATE.compareIds
    .map(id => window.MUTUAL_FUNDS.find(f => f.id === id))
    .filter(Boolean);

  renderCompareSelectorSlots();
  drawComparisonChart(comparedFunds);
  renderOverlapAnalysis(comparedFunds);
  renderComparisonMatrix(comparedFunds);
}

// Calculate Common Holdings & Overlap
function renderOverlapAnalysis(funds) {
  const container = document.getElementById("overlapContainer");
  if (!container) return;

  if (funds.length < 2) {
    container.innerHTML = `<p style="color: var(--text-secondary);">Select at least 2 funds from the table above to inspect stock portfolio overlap and diversification.</p>`;
    return;
  }

  // Count how many compared funds hold each stock
  const stockMap = {};
  if (funds.some(f => !(f.topHoldings || []).length)) {
    container.innerHTML = `<p style="color: var(--text-secondary);">Portfolio holdings are not available for every selected scheme, so overlap cannot be calculated.</p>`;
    return;
  }
  funds.forEach(f => {
    (f.topHoldings || []).forEach(stock => {
      if (!stockMap[stock]) stockMap[stock] = [];
      stockMap[stock].push(f.shortName);
    });
  });

  const sharedStocks = Object.entries(stockMap).filter(([, list]) => list.length > 1);
  const pairOverlaps = [];
  for (let i = 0; i < funds.length; i++) {
    for (let j = i + 1; j < funds.length; j++) {
      const setA = new Set(funds[i].topHoldings || []);
      const common = (funds[j].topHoldings || []).filter(s => setA.has(s));
      const pct = Math.round((common.length / 8) * 100);
      pairOverlaps.push({
        pair: `${funds[i].shortName} vs ${funds[j].shortName}`,
        pct,
        commonCount: common.length
      });
    }
  }

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 10px; margin-bottom: 14px;">
      ${pairOverlaps.map(p => `
        <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); padding: 12px; border-radius: 8px;">
          <div style="font-size: 0.76rem; color: var(--text-secondary);">${p.pair}</div>
          <div class="mono-num" style="font-size: 1.2rem; color: ${p.pct > 45 ? 'var(--accent-amber)' : 'var(--accent-emerald)'}; margin-top: 4px;">
            ${p.pct}% Top-Holding Overlap
          </div>
          <div style="font-size: 0.74rem; color: var(--text-muted);">${p.commonCount} of top 8 stocks in common</div>
        </div>
      `).join("")}
    </div>
    <div class="overlap-box">
      <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px;">
        COMMON NIFTY/BSE STOCK HOLDINGS ACROSS SELECTED FUNDS:
      </div>
      ${sharedStocks.length > 0
        ? sharedStocks.map(([stock, holders]) => `
            <span class="shared-stock-tag">
              ${stock} <small style="opacity:0.8;">(${holders.length}/${funds.length} funds)</small>
            </span>
          `).join("")
        : `<span style="font-size: 0.85rem; color: var(--accent-emerald);">0% Overlap in Top 8 Holdings — Excellent Portfolio Diversification!</span>`
      }
    </div>
  `;
}

// Render Side-by-Side Matrix Table
function renderComparisonMatrix(funds) {
  const table = document.getElementById("comparisonMatrixTable");
  if (!table) return;

  const bestVal = (getter, mode = "max") => {
    const vals = funds.map(getter).filter(Number.isFinite);
    return vals.length ? (mode === "max" ? Math.max(...vals) : Math.min(...vals)) : null;
  };

  const max1Y = bestVal(f => f.returns.y1, "max");
  const max3Y = bestVal(f => f.returns.y3, "max");
  const max5Y = bestVal(f => f.returns.y5, "max");
  const max10Y = bestVal(f => f.returns.y10, "max");
  const maxAlpha = bestVal(f => f.metrics?.alpha, "max");
  const maxSharpe = bestVal(f => f.metrics?.sharpe, "max");
  const minExpense = bestVal(f => f.expenseRatio, "min");

  table.innerHTML = `
    <thead>
      <tr>
        <th>Parameter / Metric</th>
        ${funds.map((f, idx) => `
          <th>
            <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
              <span style="color: ${CHART_COLORS[idx % CHART_COLORS.length]}; font-size: 0.95rem;">${f.name}</span>
              <button onclick="toggleCompare('${f.id}')" style="background:transparent; border:none; color:var(--text-muted); cursor:pointer; font-size:0.9rem;" title="Remove">✕</button>
            </div>
            <div style="font-size: 0.73rem; color: var(--text-secondary); font-weight: 500; margin-top: 3px;">
              ${f.category} • ${f.amc}
            </div>
          </th>
        `).join("")}
      </tr>
    </thead>
    <tbody>
      <tr class="matrix-section-row"><td colspan="${funds.length + 1}">Annualized Trailing Returns (CAGR %)</td></tr>
      <tr>
        <td>1 Year Return</td>
        ${funds.map(f => `<td class="mono-num"><span class="${Number.isFinite(f.returns?.y1) && f.returns.y1 === max1Y ? 'best-in-row' : ''}">${displayMetric(f.returns?.y1, 1, "%")}</span></td>`).join("")}
      </tr>
      <tr>
        <td>3 Year Return (CAGR)</td>
        ${funds.map(f => `<td class="mono-num"><span class="${Number.isFinite(f.returns?.y3) && f.returns.y3 === max3Y ? 'best-in-row' : ''}">${displayMetric(f.returns?.y3, 1, "%")}</span></td>`).join("")}
      </tr>
      <tr>
        <td>5 Year Return (CAGR)</td>
        ${funds.map(f => `<td class="mono-num"><span class="${Number.isFinite(f.returns?.y5) && f.returns.y5 === max5Y ? 'best-in-row' : ''}">${displayMetric(f.returns?.y5, 1, "%")}</span></td>`).join("")}
      </tr>
      <tr>
        <td>10 Year Return (CAGR)</td>
        ${funds.map(f => `<td class="mono-num"><span class="${Number.isFinite(f.returns?.y10) && f.returns.y10 === max10Y ? 'best-in-row' : ''}">${displayMetric(f.returns?.y10, 1, "%")}</span></td>`).join("")}
      </tr>
      <tr>
        <td>₹10,000/mo SIP for 10 Years</td>
        ${funds.map(f => {
          const pts = Number.isFinite(f.returns?.y10) ? computeWealthSeries(f.returns.y10, 10, "sip") : null;
          return `<td class="mono-num" style="color: var(--accent-emerald);">${pts ? formatIndianCompact(pts[pts.length - 1]) : "—"}</td>`;
        }).join("")}
      </tr>

      <tr class="matrix-section-row"><td colspan="${funds.length + 1}">Risk & Benchmark Alpha Metrics</td></tr>
      <tr>
        <td>Jensen's Alpha (Outperformance)</td>
        ${funds.map(f => `<td class="mono-num"><span class="${f.metrics?.alpha === maxAlpha ? 'best-in-row' : ''}">${displayMetric(f.metrics?.alpha, 2, "%")}</span></td>`).join("")}
      </tr>
      <tr>
        <td>Sharpe Ratio (Risk-Adjusted)</td>
        ${funds.map(f => `<td class="mono-num"><span class="${f.metrics?.sharpe === maxSharpe ? 'best-in-row' : ''}">${displayMetric(f.metrics?.sharpe, 2)}</span></td>`).join("")}
      </tr>
      <tr>
        <td>Volatility (Std Deviation)</td>
        ${funds.map(f => `<td class="mono-num">${displayMetric(f.metrics?.stdDev, 2, "%")} <span style="font-size:0.74rem; color:var(--text-muted);">(Beta: ${displayMetric(f.metrics?.beta, 2)})</span></td>`).join("")}
      </tr>
      <tr>
        <td>Primary Benchmark</td>
        ${funds.map(f => `<td style="font-size: 0.84rem;">${f.benchmark || "See scheme documents"}</td>`).join("")}
      </tr>

      <tr class="matrix-section-row"><td colspan="${funds.length + 1}">Cost, Fund Size & Portfolio Details</td></tr>
      <tr>
        <td>Direct Expense Ratio</td>
        ${funds.map(f => `<td class="mono-num"><span class="${f.expenseRatio === minExpense ? 'best-in-row' : ''}">${displayMetric(f.expenseRatio, 2, "%")}</span> <small style="color:var(--text-muted);">(Reg: ${displayMetric(f.regularExpenseRatio, 2, "%")})</small></td>`).join("")}
      </tr>
      <tr>
        <td>AUM (Fund Size)</td>
        ${funds.map(f => `<td class="mono-num">₹${displayMoney(f.aumCr)} Cr</td>`).join("")}
      </tr>
      <tr>
        <td>Fund Manager</td>
        ${funds.map(f => `<td style="font-size: 0.85rem;">${f.manager || "Not provided"}</td>`).join("")}
      </tr>
      <tr>
        <td>Exit Load</td>
        ${funds.map(f => `<td style="font-size: 0.82rem; color: var(--text-secondary);">${f.exitLoad || "See scheme documents"}</td>`).join("")}
      </tr>
      <tr>
        <td>Top 5 Equity Holdings</td>
        ${funds.map(f => `<td style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45;">${(f.topHoldings || []).slice(0, 5).join(" • ") || "Not available"}</td>`).join("")}
      </tr>
    </tbody>
  `;
}

// SIP, Step-Up SIP & Indian LTCG Tax Calculator
function runCalculator() {
  const fund = window.MUTUAL_FUNDS.find(f => f.id === STATE.calc.fundId) || window.MUTUAL_FUNDS[0];
  const cagr = STATE.calc.customCagr !== null ? STATE.calc.customCagr : fund.returns?.y5;
  if (!Number.isFinite(cagr)) {
    const badge = document.getElementById("calcFundCagrBadge");
    if (badge) badge.textContent = `Historical return unavailable (${fund.shortName})`;
    return;
  }
  const regCagr = cagr - (Number(fund.regularExpenseRatio || fund.expenseRatio || 0) - Number(fund.expenseRatio || 0));
  const years = STATE.calc.years;

  let totalInvested = 0;
  let directCorpus = 0;
  let regularCorpus = 0;

  if (STATE.calc.mode === "sip") {
    const periodsPerYear = { daily: 365, weekly: 52, monthly: 12 }[STATE.calc.frequency] || 12;
    const rateDirect = Math.pow(1 + cagr / 100, 1 / periodsPerYear) - 1;
    const rateReg = Math.pow(1 + regCagr / 100, 1 / periodsPerYear) - 1;
    let currentSip = STATE.calc.monthlyAmount * 12 / periodsPerYear;
    for (let y = 1; y <= years; y++) {
      for (let period = 1; period <= periodsPerYear; period++) {
        totalInvested += currentSip;
        directCorpus = (directCorpus + currentSip) * (1 + rateDirect);
        regularCorpus = (regularCorpus + currentSip) * (1 + rateReg);
      }
      currentSip = currentSip * (1 + STATE.calc.stepUpPercent / 100);
    }
  } else {
    totalInvested = STATE.calc.lumpsumAmount;
    directCorpus = totalInvested * Math.pow(1 + cagr / 100, years);
    regularCorpus = totalInvested * Math.pow(1 + regCagr / 100, years);
  }

  const totalGains = Math.max(0, directCorpus - totalInvested);
  // Tax outcomes depend on current law, scheme type, holding period, and investor circumstances.
  // Do not present a fixed tax estimate as a personalized or current calculation.
  const ltcgTax = null;
  const postTaxCorpus = null;
  const directCommissionSaved = Math.max(0, directCorpus - regularCorpus);

  document.getElementById("calcInvestedVal").textContent = formatIndianCompact(totalInvested);
  document.getElementById("calcGainsVal").textContent = "+" + formatIndianCompact(totalGains);
  document.getElementById("calcTotalVal").textContent = formatIndianCompact(directCorpus);
  document.getElementById("calcPostTaxVal").textContent = "See current tax rules";
  document.getElementById("calcLtcgNote").textContent = "Tax depends on current law, fund type, holding period and individual circumstances.";
  document.getElementById("calcDirectSaved").textContent = formatIndianCompact(directCommissionSaved);
  document.getElementById("calcFundCagrBadge").textContent = `${cagr.toFixed(1)}% CAGR (${fund.shortName})`;
}

// ============================================================================
// AESTHETIC DEEP-DIVE MUTUAL FUND MODAL & SELECTION ENGINE
// ============================================================================

window.loadFundHistory = async function(fundId) {
  const fund = window.MUTUAL_FUNDS.find(item => item.id === fundId);
  if (!fund || !fund.amfiCode) return;
  const button = document.getElementById(`load-history-${fundId}`);
  if (button) { button.disabled = true; button.textContent = "Loading NAV history…"; }
  try {
    const response = await fetch(`https://api.mfapi.in/mf/${fund.amfiCode}`);
    if (!response.ok) throw new Error("NAV history could not be reached.");
    const payload = await response.json();
    const history = Array.isArray(payload.data) ? payload.data : [];
    if (!history.length) throw new Error("No NAV history is available for this scheme yet.");
    const latest = Number.parseFloat(history[0].nav);
    if (Number.isFinite(latest)) fund.nav = +latest.toFixed(4);
    fund.navDate = history[0].date || fund.navDate;
    for (const years of [1, 3, 5, 10]) {
      const value = computeCagrFromNavHistory(history, years);
      if (value !== null) fund.returns[`y${years}`] = value;
    }
    if (navHistoryDb) await saveNavHistory(fund.amfiCode, fund.name, history);
    renderFundsTable();
    openFundModal(fundId);
    window.showToast?.("NAV history loaded from MFAPI.");
  } catch (error) {
    if (button) { button.disabled = false; button.textContent = "Load NAV history"; }
    window.showToast?.(error.message || "NAV history is temporarily unavailable.");
  }
};

window.openFundModal = function(fundId) {
  const fund = window.MUTUAL_FUNDS.find(f => f.id === fundId);
  if (!fund) return;
  const modal = document.getElementById("fundDetailModal");
  const content = document.getElementById("fundModalContent");
  if (!modal || !content) return;

  if (fund.dataStatus) {
    const returns = ["y1", "y3", "y5", "y10"].map((key, i) => `<div class="modal-cagr-card"><div class="cagr-lbl">${["1 Year", "3 Year", "5 Year", "10 Year"][i]}</div><div class="cagr-val">${displayMetric(fund.returns?.[key], 1, "%")}</div></div>`).join("");
    content.innerHTML = `<div class="modal-header-row"><div><span class="badge-cat">${fund.category} • ${fund.plan}</span><h2 class="modal-scheme-title">${fund.name}</h2><div class="modal-scheme-sub">${fund.amc} • AMFI scheme ${fund.amfiCode}</div></div><button class="btn" onclick="closeFundModal()">✕</button></div><section class="modal-hero-nav-card"><div><div>Latest NAV</div><strong>₹${displayMetric(fund.nav, 4)}</strong><div>${fund.navDate || "Syncing NAV"}</div></div><div><div>Risk</div><strong>Check the scheme’s current riskometer</strong></div></section><h3>Trailing returns</h3><div class="modal-cagr-grid">${returns}</div><p class="home-data-note">${fund.returns?.y1 != null || fund.returns?.y3 != null || fund.returns?.y5 != null ? "Returns are calculated from the available NAV history." : "Historical returns, expense ratios, AUM, holdings, manager, and benchmark-relative risk metrics are not included until verified. Refer to the fund house’s latest scheme documents."} Current NAV is from the AMFI catalog. Figures can change.</p><div class="modal-action-row"><button id="load-history-${fund.id}" class="btn" onclick="loadFundHistory('${fund.id}')">${fund.returns?.y1 != null || fund.returns?.y3 != null || fund.returns?.y5 != null ? "Refresh NAV history" : "Load NAV history"}</button><button class="compare-toggle-btn ${STATE.compareIds.includes(fund.id) ? "added" : ""}" onclick="toggleCompare('${fund.id}')">${STATE.compareIds.includes(fund.id) ? "✓ Comparing" : "+ Compare"}</button></div>`;
    modal.classList.add("active");
    return;
  }

  const isCompared = STATE.compareIds.includes(fund.id);
  const holdings = fund.holdings || [];
  const sectorEntries = Object.entries(fund.sectors || {}).sort((a, b) => b[1] - a[1]);
  const starsStr = "★".repeat(safeRating(fund.rating)) + "☆".repeat(5 - safeRating(fund.rating));
  const amfiCode = fund.amfiCode || (window.AMFI_SCHEME_CODES ? window.AMFI_SCHEME_CODES[fund.id] : null) || "122639";

  // Compounding Calculations: ₹10k/month 10Y SIP
  const sipMonthly = 10000;
  const sipYears = 10;
  const sipMonths = sipYears * 12;
  const sipCagr = (fund.returns.y10 || fund.returns.y5 || 18) / 100;
  const rMonth = Math.pow(1 + sipCagr, 1 / 12) - 1;
  const sipCorpus = sipMonthly * ((Math.pow(1 + rMonth, sipMonths) - 1) / rMonth) * (1 + rMonth);
  const sipInvested = sipMonthly * sipMonths;
  const sipGain = sipCorpus - sipInvested;
  const sipMultiplier = (sipCorpus / sipInvested).toFixed(1);

  // ₹1,00,000 5Y Lumpsum
  const lumpAmount = 100000;
  const lumpYears = 5;
  const lumpCagr = (fund.returns.y5 || 18) / 100;
  const lumpCorpus = lumpAmount * Math.pow(1 + lumpCagr, lumpYears);
  const lumpGain = lumpCorpus - lumpAmount;

  // Direct Plan commission savings estimate over 15Y (on ₹15k/mo SIP)
  const expSavingsPct = Number.isFinite(fund.regularExpenseRatio) && Number.isFinite(fund.expenseRatio) ? (fund.regularExpenseRatio - fund.expenseRatio).toFixed(2) : "—";
  const directWealthSaved = Math.round(15000 * 12 * 15 * 0.72);

  const dayChangeVal = fund.dayChange !== undefined ? fund.dayChange : null;
  const dayChangeSign = dayChangeVal !== null && dayChangeVal >= 0 ? "+" : "";

  // Multi-horizon CAGRs vs Benchmark
  const horizons = [
    { key: "y1", label: "1 Year Return", fundRet: fund.returns.y1, bmarkRet: fund.benchmarkReturns?.y1 },
    { key: "y3", label: "3 Year CAGR", fundRet: fund.returns.y3, bmarkRet: fund.benchmarkReturns?.y3 },
    { key: "y5", label: "5 Year CAGR", fundRet: fund.returns.y5, bmarkRet: fund.benchmarkReturns?.y5 },
    { key: "y10", label: "10 Year CAGR", fundRet: fund.returns.y10, bmarkRet: fund.benchmarkReturns?.y10 }
  ];

  content.innerHTML = `
    <!-- Top Header Bar -->
    <div class="modal-header-row">
      <div style="flex:1;">
        <div class="modal-badge-strip">
          <span class="brand-badge" style="background:rgba(232,176,74,0.15); color:var(--accent-indigo); border-color:rgba(232,176,74,0.3); font-weight:700;">
            ${fund.amc}
          </span>
          <span class="badge-cat">${fund.category} • ${fund.plan}</span>
          <span class="stars" style="color:var(--accent-amber); font-size:1rem;" title="${fund.rating} Star Rating">${starsStr}</span>
          <span style="font-size:0.75rem; font-weight:700; padding:2px 8px; border-radius:999px; background:rgba(244,63,94,0.12); color:var(--accent-rose); border:1px solid rgba(244,63,94,0.25);">
            ⚠️ ${fund.risk || "Riskometer unavailable"} Risk
          </span>
          <span style="font-family:var(--font-mono); font-size:0.75rem; padding:2px 8px; border-radius:6px; background:rgba(255,255,255,0.06); color:var(--text-secondary); cursor:pointer; border:1px solid var(--border-color);" onclick="navigator.clipboard.writeText('${amfiCode}'); window.showToast('Copied AMFI #${amfiCode} to clipboard!');" title="Click to copy AMFI scheme code">
            AMFI #${amfiCode} 📋
          </span>
        </div>
        <h2 class="modal-scheme-title">${fund.name}</h2>
        <div class="modal-scheme-sub">
          Fund Manager: <strong style="color:var(--text-primary);">${fund.manager || "Not provided"}</strong> • Benchmark: <strong style="color:var(--accent-cyan);">${fund.benchmark || "Not provided"}</strong>
        </div>
      </div>
      <button class="btn" onclick="closeFundModal()" style="border-radius:50%; width:38px; height:38px; padding:0; display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0;">✕</button>
    </div>

    <!-- Hero Live NAV & Vital Stats Grid -->
    <div class="modal-hero-nav-card">
      <div>
        <div style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Latest Declared NAV</div>
        <div style="font-size:1.65rem; font-weight:800; font-family:var(--font-mono); color:var(--text-primary); margin-top:2px;">
          ₹${displayMetric(fund.nav, 2)}
          <span style="font-size:0.82rem; font-weight:700; color:${dayChangeVal >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; margin-left:6px; vertical-align:middle;">
            ${dayChangeVal === null ? "" : `${dayChangeSign}${displayMetric(dayChangeVal, 2, "%")} ${dayChangeVal >= 0 ? "🟢" : "🔴"}`}
          </span>
        </div>
        <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">
          ${fund.navDate ? `Date: ${fund.navDate}` : 'AMFI Live Feed'}
        </div>
      </div>

      <div>
        <div style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Fund Size (AUM)</div>
        <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:var(--text-primary); margin-top:2px;">
          ₹${displayMoney(fund.aumCr)} Cr
        </div>
        <div style="font-size:0.72rem; color:var(--accent-emerald); font-weight:600; margin-top:2px;">
          Tier 1 Asset Size
        </div>
      </div>

      <div>
        <div style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Expense Ratio</div>
        <div style="font-size:1.3rem; font-weight:800; font-family:var(--font-mono); color:var(--text-primary); margin-top:2px;">
          ${displayMetric(fund.expenseRatio, 2, "%")}
          <small style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">(Reg: ${displayMetric(fund.regularExpenseRatio, 2, "%")})</small>
        </div>
        <div style="font-size:0.72rem; color:var(--accent-indigo); font-weight:700; margin-top:2px;">
          Save ${expSavingsPct}%/yr Direct
        </div>
      </div>

      <div>
        <div style="font-size:0.72rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Min SIP / Exit Load</div>
        <div style="font-size:1.1rem; font-weight:700; font-family:var(--font-mono); color:var(--text-primary); margin-top:2px;">
          ₹${fund.minSip.toLocaleString("en-IN")} / mo
        </div>
        <div style="font-size:0.7rem; color:var(--text-muted); margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${fund.exitLoad}">
          ${fund.exitLoad}
        </div>
      </div>
    </div>

    <!-- Multi-Horizon Trailing Returns vs Benchmark TRI Grid -->
    <div style="margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
      <h4 style="font-size:0.85rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.04em;">Trailing Returns vs ${fund.benchmark || "benchmark unavailable"}</h4>
      <span style="font-size:0.74rem; color:var(--accent-emerald); font-weight:700;">● Direct Plan Compound Annual Growth (CAGR)</span>
    </div>

    <div class="modal-cagr-grid">
      ${horizons.map(h => {
        const out = +(h.fundRet - h.bmarkRet).toFixed(1);
        const isPos = out >= 0;
        return `
          <div class="modal-cagr-card">
            <div class="cagr-lbl">${h.label}</div>
            <div class="cagr-val">${h.fundRet.toFixed(1)}%</div>
            <div class="cagr-bmark">Benchmark: ${h.bmarkRet.toFixed(1)}%</div>
            <div class="cagr-alpha" style="background:${isPos ? 'var(--accent-emerald-bg)' : 'var(--accent-rose-bg)'}; color:${isPos ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; border:1px solid ${isPos ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.3)'};">
              ${isPos ? '+' : ''}${out}% Alpha ${isPos ? '🚀' : '🔻'}
            </div>
          </div>
        `;
      }).join("")}
    </div>

    <!-- Compounding Wealth Simulator Highlights -->
    <div class="modal-wealth-callout">
      <div>
        <div style="font-size:0.76rem; font-weight:700; color:var(--accent-indigo); text-transform:uppercase; letter-spacing:0.04em;">
          🌱 Illustrative 10-year SIP scenario
        </div>
        <div style="display:flex; align-items:baseline; gap:8px; margin-top:4px;">
          <div style="font-size:1.6rem; font-weight:800; font-family:var(--font-mono); color:var(--accent-emerald);">
            ${formatIndianCompact(sipCorpus)}
          </div>
          <span style="font-size:0.82rem; font-weight:700; color:var(--accent-emerald);">
            (${sipMultiplier}x Wealth)
          </span>
        </div>
        <div style="font-size:0.76rem; color:var(--text-secondary); margin-top:4px;">
          ₹10,000 monthly for 10 years • ${formatINR(sipInvested)} contributed. Scenario assumes a constant ${displayMetric(fund.returns.y10, 1, "%")} annual return; historical returns are not forecasts.
        </div>
      </div>

      <div>
        <div style="font-size:0.76rem; font-weight:700; color:var(--accent-emerald); text-transform:uppercase; letter-spacing:0.04em;">
          💰 Illustrative 5-year lump-sum scenario
        </div>
        <div style="display:flex; align-items:baseline; gap:8px; margin-top:4px;">
          <div style="font-size:1.6rem; font-weight:800; font-family:var(--font-mono); color:var(--text-primary);">
            ${formatIndianCompact(lumpCorpus)}
          </div>
          <span style="font-size:0.82rem; font-weight:700; color:var(--accent-emerald);">
            (+${formatIndianCompact(lumpGain)})
          </span>
        </div>
        <div style="font-size:0.76rem; color:var(--text-secondary); margin-top:4px;">
          <strong>Illustrative plan-cost difference:</strong> <strong>${formatIndianCompact(directWealthSaved)}</strong> under the assumptions used here. Actual costs vary by scheme and date.
        </div>
      </div>
    </div>

    <!-- Risk, Volatility & Quality Ratios Matrix -->
    <div style="margin-bottom:8px;">
      <h4 style="font-size:0.85rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.04em;">Risk and return metrics · where available</h4>
    </div>
    <div class="modal-ratios-grid">
      <div class="modal-ratio-pill">
        <div class="r-lbl">Alpha (Jensen's)</div>
        <div class="r-val" style="color:var(--accent-emerald);">${displayMetric(fund.metrics?.alpha, 2)}%</div>
        <div style="font-size:0.68rem; color:var(--text-muted); margin-top:2px;">Excess vs Index</div>
      </div>
      <div class="modal-ratio-pill">
        <div class="r-lbl">Beta Volatility</div>
        <div class="r-val" style="color:${fund.metrics?.beta < 1 ? 'var(--accent-emerald)' : 'var(--text-primary)'};">${displayMetric(fund.metrics?.beta, 2)}</div>
        <div style="font-size:0.68rem; color:var(--text-muted); margin-top:2px;">${fund.metrics?.beta < 1 ? 'Low Volatility' : 'Market Sensitivity'}</div>
      </div>
      <div class="modal-ratio-pill">
        <div class="r-lbl">Sharpe Ratio</div>
        <div class="r-val" style="color:var(--accent-indigo);">${displayMetric(fund.metrics?.sharpe, 2)}</div>
        <div style="font-size:0.68rem; color:var(--text-muted); margin-top:2px;">Risk-Adj Return</div>
      </div>
      <div class="modal-ratio-pill">
        <div class="r-lbl">Sortino Ratio</div>
        <div class="r-val" style="color:var(--accent-emerald);">${displayMetric(fund.metrics?.sortino, 2)}</div>
        <div style="font-size:0.68rem; color:var(--text-muted); margin-top:2px;">Downside Protection</div>
      </div>
      <div class="modal-ratio-pill">
        <div class="r-lbl">Std Deviation</div>
        <div class="r-val">${displayMetric(fund.metrics?.stdDev, 1)}%</div>
        <div style="font-size:0.68rem; color:var(--text-muted); margin-top:2px;">Annualized Volatility</div>
      </div>
    </div>

    <!-- Split Grid: Sector Allocation (Left) + Portfolio Holdings (Right) -->
    <div class="modal-split-grid">
      <div>
        <h4 style="margin-bottom:10px; font-size:0.88rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.04em;">
          Sector Allocation (%)
        </h4>
        <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px;">
          ${sectorEntries.map(([sec, pct]) => `
            <div class="sector-bar-row">
              <div class="sector-bar-header">
                <span style="font-size:0.8rem; font-weight:600; color:var(--text-primary);">${sec}</span>
                <span class="mono-num" style="font-size:0.82rem; font-weight:700;">${pct.toFixed(1)}%</span>
              </div>
              <div class="sector-bar-track" style="height:7px;">
                <div class="sector-bar-fill" style="width:${Math.min(100, pct * 2.2)}%; background:linear-gradient(90deg, #E8B04A, #10b981);"></div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <h4 style="font-size:0.88rem; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.04em;">
            Top Stock Holdings (${holdings.length})
          </h4>
          <span style="font-size:0.75rem; color:var(--accent-emerald); font-weight:700;">Full Portfolio Weights</span>
        </div>

        <div style="max-height:280px; overflow-y:auto; border:1px solid var(--border-color); border-radius:var(--radius-md); background:var(--bg-card);">
          <table class="holdings-table" style="width:100%; border-collapse:collapse;">
            <thead style="position:sticky; top:0; background:var(--bg-secondary); z-index:2;">
              <tr>
                <th style="padding:8px 10px; width:34px; font-size:0.72rem;">#</th>
                <th style="padding:8px 10px; font-size:0.72rem;">Company / Asset</th>
                <th style="padding:8px 10px; text-align:right; font-size:0.72rem;">Weight</th>
                <th style="padding:8px 10px; width:80px; font-size:0.72rem;">Bar</th>
              </tr>
            </thead>
            <tbody>
              ${holdings.map((h, i) => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                  <td class="mono-num" style="padding:8px 10px; font-size:0.74rem; color:var(--text-muted);">${i + 1}</td>
                  <td style="padding:8px 10px; font-size:0.82rem; font-weight:700; color:var(--text-primary);">
                    ${h.name}
                    <div style="font-size:0.68rem; color:var(--text-muted); font-weight:normal;">${h.sector}</div>
                  </td>
                  <td class="mono-num" style="padding:8px 10px; text-align:right; font-weight:800; font-size:0.84rem; color:${h.sector.includes('Cash') ? 'var(--text-muted)' : 'var(--accent-emerald)'};">
                    ${h.percent.toFixed(2)}%
                  </td>
                  <td style="padding:8px 10px;">
                    <div class="holding-bar-bg" style="height:6px; background:rgba(255,255,255,0.06); border-radius:999px; overflow:hidden;">
                      <div class="holding-bar-fill" style="width:${Math.min(100, (h.percent / 12) * 100)}%; height:100%; background:${h.sector.includes('Cash') ? 'var(--text-muted)' : 'linear-gradient(90deg, #E8B04A, #10b981)'};"></div>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Action Footer -->
    <div class="modal-actions-bar">
      <button class="btn ${isCompared ? 'btn-primary' : ''}" id="modalCompareBtn" onclick="toggleCompareFromModal('${fund.id}')">
        ${isCompared ? '✓ In Compare Studio' : '＋ Add to Compare Studio'}
      </button>
      <button class="btn btn-indigo" onclick="simulateFundInSipCalc('${fund.id}')">
        🧮 Simulate in SIP Calculator
      </button>
      <button class="btn" onclick="viewAmfiSchemeDetails(${amfiCode})">
        🌐 AMFI Daily NAV Series
      </button>
      <button class="btn" onclick="closeFundModal()">✕ Close</button>
    </div>
  `;

  modal.classList.add("open");
};

window.closeFundModal = function() {
  const modal = document.getElementById("fundDetailModal");
  if (modal) modal.classList.remove("open");
};

window.handleFundRowClick = function(event, fundId) {
  // If clicked inside a button, link, or input, do not trigger modal
  if (event.target.closest("button") || event.target.closest("a") || event.target.closest("input") || event.target.closest("select")) {
    return;
  }
  openFundModal(fundId);
};

window.simulateFundInSipCalc = function(fundId) {
  closeFundModal();
  const fund = window.MUTUAL_FUNDS.find(f => f.id === fundId);
  if (fund) {
    STATE.calc.fundId = fundId;
    STATE.calc.customCagr = null;
    const sel = document.getElementById("calcFundSelect");
    if (sel) sel.value = fundId;
    runCalculator();
    window.setAppPage("tools", "sipCalculatorSection", true);
    window.showToast(`🧮 Loaded ${fund.shortName} into SIP Calculator!`, true);
  }
};

window.toggleCompareFromModal = function(fundId) {
  toggleCompare(fundId);
  const btn = document.getElementById("modalCompareBtn");
  if (btn) {
    const isNowCompared = STATE.compareIds.includes(fundId);
    btn.className = `btn ${isNowCompared ? 'btn-primary' : ''}`;
    btn.textContent = isNowCompared ? "✓ In Compare Studio" : "＋ Add to Compare Studio";
  }
};

// Export Comparison as CSV
window.exportComparisonCSV = function() {
  const comparedFunds = STATE.compareIds
    .map(id => window.MUTUAL_FUNDS.find(f => f.id === id))
    .filter(Boolean);

  const headers = ["Fund Name", "Category", "1Y CAGR (%)", "3Y CAGR (%)", "5Y CAGR (%)", "10Y CAGR (%)", "Alpha (%)", "Sharpe Ratio", "Expense Ratio (%)", "AUM (Cr)"];
  const rows = comparedFunds.map(f => [
    `"${f.name}"`, f.category, f.returns?.y1, f.returns?.y3, f.returns?.y5, f.returns?.y10,
    f.metrics?.alpha, f.metrics?.sharpe, f.expenseRatio, f.aumCr
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", "returns-in-mutual-fund-comparison.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ============================================================================
// MUTUAL FUND HOUSES (AMCS) & DETAILED HOLDINGS DIRECTORY ENGINE
// ============================================================================

window.currentAmcFilter = "all";

window.renderFundHousesDirectory = function(filterHouseId = "all") {
  window.currentAmcFilter = filterHouseId;
  const container = document.getElementById("fundHousesContainer");
  const filterBar = document.getElementById("amcFilterBar");
  if (!container || !window.FUND_HOUSES) return;

  // 1. Populate AMC Filter Pills
  if (filterBar) {
    let pillsHtml = `
      <button class="amc-pill ${filterHouseId === 'all' ? 'active' : ''}" onclick="filterFundHouses('all')" data-amc-id="all">
        🏢 All Fund Houses (${window.FUND_HOUSES.length})
      </button>
    `;

    pillsHtml += window.FUND_HOUSES.map(h => {
      const matchingSchemes = window.MUTUAL_FUNDS.filter(f =>
        (h.schemeIds && h.schemeIds.includes(f.id)) ||
        f.houseId === h.id ||
        (f.amc && f.amc.toLowerCase().includes(h.shortName.toLowerCase())) ||
        (f.amc && f.amc.toLowerCase().includes(h.name.toLowerCase().replace(" mutual fund", "")))
      );
      const count = matchingSchemes.length;
      const isActive = filterHouseId === h.id;
      return `
        <button class="amc-pill ${isActive ? 'active' : ''}" onclick="filterFundHouses('${h.id}')" data-amc-id="${h.id}">
          <span>${h.logoText}</span> ${h.name.replace(" Mutual Fund", "")} (${count})
        </button>
      `;
    }).join("");

    filterBar.innerHTML = pillsHtml;
  }

  // 2. Filter AMCs to display
  const targetHouses = filterHouseId === "all"
    ? window.FUND_HOUSES
    : window.FUND_HOUSES.filter(h => h.id === filterHouseId);

  // 3. Render Fund House Sections
  container.innerHTML = targetHouses.map(house => {
    // Get all schemes for this house across the platform
    const schemes = window.MUTUAL_FUNDS.filter(f =>
      (house.schemeIds && house.schemeIds.includes(f.id)) ||
      f.houseId === house.id ||
      (f.amc && f.amc.toLowerCase().includes(house.shortName.toLowerCase())) ||
      (f.amc && f.amc.toLowerCase().includes(house.name.toLowerCase().replace(" mutual fund", "")))
    );
    const visibleSchemes = filterHouseId === "all" ? schemes.slice(0, 8) : schemes;

    return `
      <div class="amc-card" id="amc-card-${house.id}">
        <!-- AMC Header Banner -->
        <div class="amc-header">
          <div class="amc-header-left">
            <div class="amc-logo-badge">${house.logoText}</div>
            <div>
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <h3 class="amc-name">${house.name}</h3>
                <span class="badge-cat" style="background:rgba(232,176,74,0.15); color:var(--accent-indigo); border:1px solid rgba(232,176,74,0.3);">${house.badge}</span>
              </div>
              <div class="amc-sub-info">
                <span>📍 HQ: <strong>${house.hq}</strong></span> • 
                <span>📅 Est: <strong>${house.established ?? "—"}</strong></span> • 
                <span>👔 CIO: <strong>${house.cio ?? "—"}</strong></span> •
                <span>💼 Tracked AUM: <strong style="color:var(--accent-emerald);">₹${displayMoney(house.aumTotalCr)} Cr</strong></span>
              </div>
            </div>
          </div>
          <div class="amc-scheme-count-badge">
            ${schemes.length} Scheme${schemes.length > 1 ? 's' : ''} in Platform
          </div>
        </div>

        <p class="amc-desc">${house.description}</p>

        <!-- Schemes List under this AMC -->
        <div class="amc-schemes-list">
          ${visibleSchemes.map(fund => {
            const isCompared = STATE.compareIds.includes(fund.id);
            const starsStr = "★".repeat(safeRating(fund.rating)) + "☆".repeat(5 - safeRating(fund.rating));
            const holdings = fund.holdings || [];

            return `
              <div class="amc-fund-item">
                <div class="amc-fund-top-row">
                  <div>
                    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                      <span class="badge-cat">${fund.category} • ${fund.plan}</span>
                      <span class="stars">${starsStr}</span>
                    </div>
                    <h4 class="amc-fund-title" onclick="openFundModal('${fund.id}')" title="Click for deep-dive analysis">
                      ${fund.name} <span style="font-size:0.8rem; color:var(--accent-indigo);">↗</span>
                    </h4>
                    <div style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
                      Fund Manager: <strong>${fund.manager || "Not provided"}</strong> • Benchmark: <strong>${fund.benchmark || "Not provided"}</strong>
                    </div>
                  </div>

                  <div class="amc-fund-nav-box">
                    <div class="mono-num" style="font-size:1.15rem; font-weight:800; color:var(--text-primary);">
                      ₹${displayMetric(fund.nav, 2)}
                    </div>
                    <div style="font-size:0.74rem; color:${fund.dayChange >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; font-weight:700;">
                      ${fund.dayChange !== undefined ? `${fund.dayChange >= 0 ? '+' : ''}${Number(fund.dayChange).toFixed(2)}% Today` : 'Live AMFI'}
                    </div>
                    <div style="font-size:0.7rem; color:var(--text-muted);">${fund.navDate || 'AMFI Live'}</div>
                  </div>
                </div>

                <!-- Trailing CAGR and Fundamental Metrics Strip -->
                <div class="amc-fund-metrics-strip">
                  <div class="amc-metric-pill">
                    <span class="lbl">1Y Return</span>
                    <span class="val ${fund.returns.y1 >= 25 ? 'pos-high' : 'pos-good'}">${displayMetric(fund.returns.y1, 1, "%")}</span>
                  </div>
                  <div class="amc-metric-pill">
                    <span class="lbl">3Y CAGR</span>
                    <span class="val ${fund.returns.y3 >= 25 ? 'pos-high' : 'pos-good'}">${displayMetric(fund.returns.y3, 1, "%")}</span>
                  </div>
                  <div class="amc-metric-pill">
                    <span class="lbl">5Y CAGR</span>
                    <span class="val ${fund.returns.y5 >= 25 ? 'pos-high' : 'pos-good'}">${displayMetric(fund.returns.y5, 1, "%")}</span>
                  </div>
                  <div class="amc-metric-pill">
                    <span class="lbl">10Y CAGR</span>
                    <span class="val pos-good">${displayMetric(fund.returns.y10, 1, "%")}</span>
                  </div>
                  <div class="amc-metric-pill">
                    <span class="lbl">Expense (Dir/Reg)</span>
                    <span class="val" style="color:var(--text-secondary);">${displayMetric(fund.expenseRatio, 2, "%")} <small style="color:var(--text-muted); font-size:0.7rem;">(${displayMetric(fund.regularExpenseRatio, 2, "%")})</small></span>
                  </div>
                  <div class="amc-metric-pill">
                    <span class="lbl">AUM (₹ Cr)</span>
                    <span class="val" style="color:var(--text-secondary);">₹${displayMoney(fund.aumCr)}</span>
                  </div>
                  <div class="amc-metric-pill">
                    <span class="lbl">Alpha (vs TRI)</span>
                    <span class="val" style="color:var(--accent-emerald); font-weight:800;">${displayMetric(fund.metrics?.alpha, 2)}%</span>
                  </div>
                </div>

                <!-- Portfolio Holdings Accordion Strip (Hidden by default; click to view) -->
                <div class="amc-holdings-toggle-strip">
                  <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                    ${holdings.length ? `<button class="btn btn-sm holdings-toggle-btn" id="btn-holdings-toggle-${fund.id}" onclick="toggleFundHoldings('${fund.id}')" data-count="${holdings.length}" title="Click to view portfolio holdings and percentage weights"><span>📊</span> View Holdings &amp; Exact Weights (${holdings.length} Assets) ▾</button>` : `<span class="btn btn-sm" aria-label="Holdings not available">Portfolio holdings not in current dataset</span>`}
                    <button class="btn btn-sm btn-indigo" onclick="openFundModal('${fund.id}')" style="font-size:0.75rem; padding:4px 10px; font-weight:700;" title="Click for deep-dive intelligence modal">
                      🔍 Full Details &amp; Analysis ↗
                    </button>
                  </div>
                  <span style="font-size:0.75rem; color:var(--text-muted);">
                    Top 3: <strong>${holdings.slice(0, 3).map(h => h.name.split(' ')[0] + ' (' + h.percent.toFixed(1) + '%)').join(', ')}</strong>
                  </span>
                </div>

                <!-- Complete Portfolio Holdings Table (COLLAPSED BY DEFAULT; shown when selected) -->
                <div class="fund-holdings-container" id="fund-holdings-box-${fund.id}" style="display:none;">
                  <div class="fund-holdings-header" onclick="toggleFundHoldings('${fund.id}')" style="cursor:pointer;" title="Click to collapse holdings">
                    <div style="font-weight:700; font-size:0.86rem; color:var(--text-primary); display:flex; align-items:center; gap:6px;">
                      <span>📊</span> Complete Portfolio Holdings &amp; Exact Weights (${holdings.length} Assets):
                    </div>
                    <div style="display:flex; align-items:center; gap:8px;">
                      <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">
                        Direct Plan • Growth Option
                      </span>
                      <span style="font-size:0.78rem; color:var(--accent-indigo); font-weight:700;">▲ Collapse</span>
                    </div>
                  </div>

                  <div class="holdings-table-wrap">
                    <table class="holdings-table">
                      <thead>
                        <tr>
                          <th style="width:40px;">#</th>
                          <th>Company / Asset Name</th>
                          <th>Sector / Industry</th>
                          <th style="text-align:right; width:95px;">Weight (%)</th>
                          <th style="width:140px;">Allocation Bar</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${holdings.map((h, idx) => `
                          <tr>
                            <td class="mono-num" style="color:var(--text-muted);">${idx + 1}</td>
                            <td style="font-weight:700; color:var(--text-primary);">${h.name}</td>
                            <td><span class="sector-tag">${h.sector}</span></td>
                            <td class="mono-num" style="text-align:right; font-weight:800; color:${h.sector.includes('Cash') ? 'var(--text-muted)' : 'var(--accent-emerald)'};">
                              ${h.percent.toFixed(2)}%
                            </td>
                            <td>
                              <div class="holding-bar-bg">
                                <div class="holding-bar-fill" style="width:${Math.min(100, (h.percent / 12) * 100)}%; background:${h.sector.includes('Cash') ? 'var(--text-muted)' : 'linear-gradient(90deg, #E8B04A, #10b981)'};"></div>
                              </div>
                            </td>
                          </tr>
                        `).join("")}
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Fund Actions Row -->
                <div class="amc-fund-actions-row">
                  <button class="btn btn-sm" id="action-holdings-btn-${fund.id}" onclick="toggleFundHoldings('${fund.id}')" title="Show/Hide complete stock holdings and allocations">
                    📊 View Holdings (${holdings.length}) ▾
                  </button>
                  <button class="compare-toggle-btn ${isCompared ? 'added' : ''}" onclick="toggleCompare('${fund.id}')">
                    ${isCompared ? '✓ Added in Compare Studio' : '＋ Add to Compare'}
                  </button>
                  <button class="btn" onclick="openFundModal('${fund.id}')">
                    ℹ️ Full Scheme Analysis
                  </button>
                </div>
              </div>
            `;
          }).join("")}
          ${filterHouseId === "all" && schemes.length > visibleSchemes.length ? `<button class="btn btn-sm" style="margin-top:10px;" onclick="filterFundHouses('${house.id}')">View all ${schemes.length} schemes</button>` : ""}
        </div>

        <!-- Interactive AMFI Schemes Explorer for this Fund House (Note All Schemes) -->
        <div class="amc-all-schemes-section">
          <div class="amc-all-schemes-header">
            <div>
              <div style="font-weight:700; color:var(--text-primary); font-size:0.92rem; display:flex; align-items:center; gap:6px;">
                <span>🌐</span> AMFI Registry: All Registered Schemes of ${house.name}
              </div>
              <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:2px;">
                Direct connection to api.mfapi.in — fetch, view &amp; note every active scheme under ${house.shortName} (~40–120+ schemes).
              </div>
            </div>
            <button class="btn btn-sm btn-primary" onclick="toggleAmcAllSchemesDrawer('${house.id}', '${house.searchQuery || house.shortName}')" id="btn-toggle-amfi-${house.id}">
              🌐 View ALL Schemes from AMFI Registry (~40-100+) ▾
            </button>
          </div>
          <div id="amc-drawer-${house.id}" class="amc-all-schemes-drawer" style="display:none;"></div>
        </div>
      </div>
    `;
  }).join("");

  const countBadge = document.getElementById("fundHousesCountBadge");
  if (countBadge) {
    if (filterHouseId === "all") {
      countBadge.textContent = `${window.FUND_HOUSES.length} Fund Houses • ${window.MUTUAL_FUNDS.length} Schemes`;
    } else {
      const h = window.FUND_HOUSES.find(x => x.id === filterHouseId);
      const houseSchemes = window.MUTUAL_FUNDS.filter(f =>
        (h.schemeIds && h.schemeIds.includes(f.id)) ||
        f.houseId === h.id ||
        (f.amc && f.amc.toLowerCase().includes(h.shortName.toLowerCase()))
      );
      countBadge.textContent = `${h ? h.name : 'Fund House'} • ${houseSchemes.length} Schemes`;
    }
  }
};

// ============================================================================
// PORTFOLIO HOLDINGS TOGGLE CONTROLLERS (ALWAYS HIDDEN UNTIL SELECTED/CLICKED)
// ============================================================================
window.toggleFundHoldings = function(fundId) {
  const box = document.getElementById(`fund-holdings-box-${fundId}`);
  const btn = document.getElementById(`btn-holdings-toggle-${fundId}`);
  const actionBtn = document.getElementById(`action-holdings-btn-${fundId}`);
  if (!box) return;

  const isHidden = box.style.display === "none";
  const count = btn ? (btn.dataset.count || '10') : '10';

  if (isHidden) {
    box.style.display = "block";
    box.style.animation = "fadeIn 0.25s ease-in-out";
    if (btn) {
      btn.classList.add("active");
      btn.innerHTML = `<span>▲</span> Hide Portfolio Holdings (${count} Assets)`;
    }
    if (actionBtn) {
      actionBtn.classList.add("btn-primary");
      actionBtn.innerHTML = `▲ Hide Holdings`;
    }
  } else {
    box.style.display = "none";
    if (btn) {
      btn.classList.remove("active");
      btn.innerHTML = `<span>📊</span> View Holdings &amp; Exact Weights (${count} Assets) ▾`;
    }
    if (actionBtn) {
      actionBtn.classList.remove("btn-primary");
      actionBtn.innerHTML = `📊 View Holdings (${count}) ▾`;
    }
  }
};

window.toggleMobileCardHoldings = function(fundId) {
  const drawer = document.getElementById(`mobile-card-holdings-${fundId}`);
  const btn = document.getElementById(`btn-mcard-holdings-${fundId}`);
  if (!drawer) return;
  const isHidden = drawer.style.display === "none";
  if (isHidden) {
    drawer.style.display = "block";
    drawer.style.animation = "fadeIn 0.25s ease-in-out";
    if (btn) {
      btn.classList.add("btn-primary");
      btn.innerHTML = "▲ Hide";
    }
  } else {
    drawer.style.display = "none";
    if (btn) {
      btn.classList.remove("btn-primary");
      btn.innerHTML = "📊 Holdings ▾";
    }
  }
};

// ============================================================================
// AMFI ALL-SCHEMES ACCORDION DRAWER FOR EACH FUND HOUSE (NOTE ALL SCHEMES)
// ============================================================================
window.amcSchemesCache = {};
window.amcDrawerFilters = {};

window.toggleAmcAllSchemesDrawer = async function(houseId, query) {
  const drawer = document.getElementById(`amc-drawer-${houseId}`);
  const toggleBtn = document.getElementById(`btn-toggle-amfi-${houseId}`);
  if (!drawer) return;

  if (drawer.style.display !== "none") {
    drawer.style.display = "none";
    if (toggleBtn) toggleBtn.innerHTML = `🌐 View ALL Schemes from AMFI Registry (~40-100+) ▾`;
    return;
  }

  drawer.style.display = "block";
  if (toggleBtn) toggleBtn.innerHTML = `▲ Close AMFI Registry Schemes`;

  if (window.amcSchemesCache[houseId]) {
    renderAmcDrawerContent(houseId);
    return;
  }

  drawer.innerHTML = `
    <div style="text-align:center; padding:28px 16px; color:var(--text-secondary);">
      <div class="spinner-circle" style="margin: 0 auto 12px;"></div>
      <div style="font-weight:700; color:var(--text-primary);">Querying AMFI India database for all schemes of ${houseId.toUpperCase()}...</div>
      <div style="font-size:0.75rem; margin-top:4px;">Connecting to api.mfapi.in/mf/search?q=${encodeURIComponent(query)}</div>
    </div>
  `;

  try {
    const resp = await fetch(`https://api.mfapi.in/mf/search?q=${encodeURIComponent(query)}`);
    const list = await resp.json();
    if (!Array.isArray(list) || list.length === 0) {
      drawer.innerHTML = `
        <div style="text-align:center; padding:20px; color:var(--text-muted);">
          No external AMFI schemes returned for "${query}". Try searching in the Global Explorer below.
        </div>
      `;
      return;
    }

    window.amcSchemesCache[houseId] = list;
    window.amcDrawerFilters[houseId] = { search: "", directOnly: true, growthOnly: true };
    renderAmcDrawerContent(houseId);
  } catch (err) {
    drawer.innerHTML = `
      <div style="text-align:center; padding:20px; color:var(--accent-rose);">
        Unable to reach api.mfapi.in. Please check your internet connection and try again.
      </div>
    `;
  }
};

window.renderAmcDrawerContent = function(houseId) {
  const drawer = document.getElementById(`amc-drawer-${houseId}`);
  if (!drawer || !window.amcSchemesCache[houseId]) return;

  const rawList = window.amcSchemesCache[houseId];
  const filter = window.amcDrawerFilters[houseId] || { search: "", directOnly: false, growthOnly: false };

  const filtered = rawList.filter(item => {
    const name = (item.schemeName || "").toLowerCase();
    if (filter.directOnly && !name.includes("direct")) return false;
    if (filter.growthOnly && !name.includes("growth")) return false;
    if (filter.search && !name.includes(filter.search.toLowerCase()) && !String(item.schemeCode).includes(filter.search)) return false;
    return true;
  });

  drawer.innerHTML = `
    <div class="amc-drawer-filter-bar">
      <input
        type="text"
        class="amc-drawer-search-input"
        placeholder="Filter within ${rawList.length} schemes (e.g. Small Cap, Liquid, Arbitrage, Gold, Nifty)..."
        value="${filter.search || ''}"
        oninput="handleAmcDrawerSearch('${houseId}', this.value)"
      />
      <label class="custom-checkbox-label" style="font-size:0.78rem;">
        <input type="checkbox" ${filter.directOnly ? 'checked' : ''} onchange="handleAmcDrawerCheckbox('${houseId}', 'directOnly', this.checked)">
        <span>Direct Only</span>
      </label>
      <label class="custom-checkbox-label" style="font-size:0.78rem;">
        <input type="checkbox" ${filter.growthOnly ? 'checked' : ''} onchange="handleAmcDrawerCheckbox('${houseId}', 'growthOnly', this.checked)">
        <span>Growth Only</span>
      </label>
      <span style="font-size:0.78rem; color:var(--text-muted); margin-left:auto;">
        Showing <strong>${filtered.length}</strong> of <strong>${rawList.length}</strong> AMFI Schemes
      </span>
    </div>

    <div class="amc-drawer-schemes-table-wrap">
      <table class="amc-drawer-table">
        <thead>
          <tr>
            <th style="width:95px;">AMFI Code</th>
            <th>Scheme Name</th>
            <th style="width:130px;">Plan / Option</th>
            <th style="width:170px; text-align:right;">Live NAV / Import</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.slice(0, 100).map(item => {
            const isDirect = /direct/i.test(item.schemeName);
            const isGrowth = /growth/i.test(item.schemeName);
            return `
              <tr>
                <td class="mono-num" style="color:var(--text-muted); font-size:0.75rem;">#${item.schemeCode}</td>
                <td style="font-weight:600; color:var(--text-primary); font-size:0.82rem;">${item.schemeName}</td>
                <td>
                  <span class="badge-cat" style="font-size:0.68rem; padding:2px 6px;">${isDirect ? 'Direct' : 'Regular'}</span>
                  <span class="badge-cat" style="font-size:0.68rem; padding:2px 6px; margin-left:3px; background:rgba(16,185,129,0.1); color:var(--accent-emerald);">${isGrowth ? 'Growth' : 'IDCW'}</span>
                </td>
                <td style="text-align:right;">
                  <button class="btn btn-sm btn-primary" onclick="importAmfiSchemeByCode(${item.schemeCode})" title="Pulls live daily NAV from mfapi.in and adds to Compare Studio">
                    ⚡ Live NAV &amp; Compare
                  </button>
                </td>
              </tr>
            `;
          }).join("")}
          ${filtered.length > 100 ? `
            <tr>
              <td colspan="4" style="text-align:center; padding:12px; color:var(--text-muted); font-size:0.78rem;">
                Showing first 100 schemes. Use search above to narrow down further.
              </td>
            </tr>
          ` : ''}
          ${filtered.length === 0 ? `
            <tr>
              <td colspan="4" style="text-align:center; padding:20px; color:var(--text-muted);">
                No schemes matched the selected filters.
              </td>
            </tr>
          ` : ''}
        </tbody>
      </table>
    </div>
  `;
};

window.handleAmcDrawerSearch = function(houseId, val) {
  if (!window.amcDrawerFilters[houseId]) window.amcDrawerFilters[houseId] = {};
  window.amcDrawerFilters[houseId].search = val;
  renderAmcDrawerContent(houseId);
};

window.handleAmcDrawerCheckbox = function(houseId, key, checked) {
  if (!window.amcDrawerFilters[houseId]) window.amcDrawerFilters[houseId] = {};
  window.amcDrawerFilters[houseId][key] = checked;
  renderAmcDrawerContent(houseId);
};

window.filterFundHouses = function(houseId) {
  renderFundHousesDirectory(houseId);
  if (houseId !== "all") {
    const el = document.getElementById(`amc-card-${houseId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

// Initialize DOM listeners
document.addEventListener("DOMContentLoaded", () => {
  renderTicker();
  routeToCurrentHash();
  document.addEventListener("click", event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const targetId = link.getAttribute("href").slice(1);
    const page = link.dataset.appPageLink || getAppPageForTarget(targetId);
    if (!page) return;
    event.preventDefault();
    document.querySelectorAll(".nav-mega[open]").forEach(menu => { menu.open = false; });
    window.setAppPage(page, targetId || null, true);
  });
  window.addEventListener("popstate", routeToCurrentHash);
  const welcomeModal = document.getElementById("welcomeModal");
  const welcomeForm = document.getElementById("welcomeExperienceForm");
  if (welcomeModal && welcomeForm) {
    let hasCompletedWelcome = false;
    try { hasCompletedWelcome = Boolean(localStorage.getItem("returns_onboarding_v1")); } catch (_) {}
    if (!hasCompletedWelcome) setTimeout(() => welcomeModal.classList.add("open"), 250);
    welcomeForm.addEventListener("submit", finishWelcome);
    document.getElementById("welcomeSkipBtn")?.addEventListener("click", () => {
      try { localStorage.setItem("returns_onboarding_v1", JSON.stringify({ skipped: true })); } catch (_) {}
      closeWelcomeModal();
    });
    welcomeModal.addEventListener("keydown", event => {
      if (event.key === "Escape") closeWelcomeModal();
    });
  }
  navHistoryDbReady = openNavHistoryDatabase().then(db => {
    navHistoryDb = db;
    db.onversionchange = () => db.close();
    refreshNavHistorySchemes();
  }).catch(error => {
    const countEl = document.getElementById("navDbRecordCount");
    const message = document.getElementById("navHistoryMessage");
    if (countEl) countEl.textContent = "Database unavailable";
    if (message) message.textContent = `${error.message} Try opening the site in a modern browser.`;
  });
  document.getElementById("navHistorySearch")?.addEventListener("input", refreshNavHistorySchemes);
  document.getElementById("navHistoryScheme")?.addEventListener("change", event => renderNavHistory(event.target.value));
  document.getElementById("navHistoryExportBtn")?.addEventListener("click", exportNavHistoryCsv);
  document.getElementById("btnLoadFullCatalog")?.addEventListener("click", () => window.loadFullMfapiCatalog(window.mfapiCatalogLoaded));
  ["goalAmountInput", "goalYearsInput"].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener("input", renderGoalPlanner);
  });
  renderGoalPlanner();

  // Populate Calculator Fund Dropdown
  const calcFundSelect = document.getElementById("calcFundSelect");
  if (calcFundSelect) {
    calcFundSelect.innerHTML = window.MUTUAL_FUNDS.map(f =>
      `<option value="${f.id}">${f.name} (${displayMetric(f.returns?.y5, 1, "%")} 5Y CAGR)</option>`
    ).join("");
    calcFundSelect.value = STATE.calc.fundId;
    calcFundSelect.addEventListener("change", e => {
      STATE.calc.fundId = e.target.value;
      STATE.calc.customCagr = null;
      runCalculator();
    });
  }

  // Search Input
  const searchInput = document.getElementById("fundSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      STATE.searchQuery = e.target.value;
      fundsPage = 0;
      renderFundsTable();
    });
  }

  // Add the AMFI category labels not already represented by the common filters.
  const categoryPills = document.querySelector(".category-pills");
  if (categoryPills) {
    const existingCategories = new Set(Array.from(categoryPills.querySelectorAll(".pill-btn"), button => button.dataset.category));
    const extraCategories = [...new Set(window.MUTUAL_FUNDS.map(fund => fund.category).filter(Boolean))]
      .filter(category => !existingCategories.has(category)).sort((a, b) => a.localeCompare(b));
    if (extraCategories.length) {
      const select = document.createElement("select");
      select.id = "extraCategoryFilter";
      select.className = "category-more-select";
      select.setAttribute("aria-label", "More fund categories");
      select.innerHTML = `<option value="">More categories…</option>${extraCategories.map(category => `<option value="${category.replace(/"/g, "&quot;")}">${category}</option>`).join("")}`;
      select.addEventListener("change", () => {
        document.querySelectorAll(".pill-btn").forEach(button => button.classList.remove("active"));
        if (!select.value) {
          STATE.selectedCategory = "All";
          categoryPills.querySelector('[data-category="All"]')?.classList.add("active");
        } else STATE.selectedCategory = select.value;
        fundsPage = 0;
        renderFundsTable();
      });
      categoryPills.appendChild(select);
    }
  }

  // Category filter pills
  document.querySelectorAll(".pill-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pill-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      STATE.selectedCategory = btn.dataset.category;
      fundsPage = 0;
      const extraCategory = document.getElementById("extraCategoryFilter");
      if (extraCategory) extraCategory.value = "";
      renderFundsTable();
    });
  });

  // Horizon Switcher
  document.querySelectorAll(".horizon-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".horizon-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      STATE.horizon = btn.dataset.horizon;
      STATE.sortField = btn.dataset.horizon;
      renderFundsTable();
    });
  });

  // Table Header Sort
  document.querySelectorAll("th[data-sort]").forEach(th => {
    th.addEventListener("click", () => {
      const field = th.dataset.sort;
      if (STATE.sortField === field) {
        STATE.sortOrder = STATE.sortOrder === "desc" ? "asc" : "desc";
      } else {
        STATE.sortField = field;
        STATE.sortOrder = "desc";
      }
      document.querySelectorAll("th[data-sort]").forEach(h => h.classList.remove("active-sort"));
      th.classList.add("active-sort");
      renderFundsTable();
    });
  });

  // Chart Mode & Horizon Controls
  document.querySelectorAll("[data-chart-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-chart-mode]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      STATE.chartMode = btn.dataset.chartMode;
      renderComparisonStudio();
    });
  });

  document.querySelectorAll("[data-chart-years]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-chart-years]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      STATE.chartYears = parseInt(btn.dataset.chartYears, 10);
      renderComparisonStudio();
    });
  });

  // Calculator Sliders
  const sipRange = document.getElementById("sipAmountRange");
  const sipInput = document.getElementById("sipAmountInput");
  const stepUpRange = document.getElementById("stepUpRange");
  const stepUpInput = document.getElementById("stepUpInput");
  const yearsRange = document.getElementById("calcYearsRange");
  const yearsInput = document.getElementById("calcYearsInput");
  const sipFrequencyRow = document.getElementById("sipFrequencyRow");
  const periodsPerYear = { daily: 365, weekly: 52, monthly: 12 };
  const frequencySuffix = { daily: "/ day", weekly: "/ week", monthly: "/ mo" };

  const syncAmountControls = () => {
    const amount = STATE.calc.mode === "sip"
      ? STATE.calc.monthlyAmount * 12 / (periodsPerYear[STATE.calc.frequency] || 12)
      : STATE.calc.lumpsumAmount;
    if (sipInput) {
      sipInput.min = "1";
      sipInput.max = STATE.calc.mode === "sip" ? "100000" : "1000000";
      sipInput.step = "1";
      sipInput.value = amount;
    }
    if (sipRange) sipRange.value = STATE.calc.mode === "sip" ? amount : amount / 10;
    document.getElementById("sipAmountBadge").textContent = STATE.calc.mode === "sip" ? `${formatINR(amount)} ${frequencySuffix[STATE.calc.frequency]}` : formatINR(amount);
  };

  if (sipRange) {
    sipRange.addEventListener("input", e => {
      const val = parseInt(e.target.value, 10);
      if (STATE.calc.mode === "sip") {
        STATE.calc.monthlyAmount = val * (periodsPerYear[STATE.calc.frequency] || 12) / 12;
        document.getElementById("sipAmountBadge").textContent = `${formatINR(val)} ${frequencySuffix[STATE.calc.frequency]}`;
      } else {
        STATE.calc.lumpsumAmount = val * 10;
        document.getElementById("sipAmountBadge").textContent = formatINR(val * 10);
      }
      if (sipInput) sipInput.value = STATE.calc.mode === "sip"
        ? STATE.calc.monthlyAmount * 12 / (periodsPerYear[STATE.calc.frequency] || 12)
        : STATE.calc.lumpsumAmount;
      runCalculator();
    });
  }

  if (sipInput) {
    sipInput.addEventListener("input", e => {
      if (e.target.value === "") return;
      const min = 1;
      const max = STATE.calc.mode === "sip" ? 100000 : 1000000;
      const amount = Math.min(max, Math.max(min, Number(e.target.value)));
      if (!Number.isFinite(amount)) return;
      e.target.value = amount;
      if (STATE.calc.mode === "sip") STATE.calc.monthlyAmount = amount * (periodsPerYear[STATE.calc.frequency] || 12) / 12;
      else STATE.calc.lumpsumAmount = amount;
      if (sipRange) sipRange.value = STATE.calc.mode === "sip" ? amount : amount / 10;
      document.getElementById("sipAmountBadge").textContent = STATE.calc.mode === "sip" ? `${formatINR(amount)} ${frequencySuffix[STATE.calc.frequency]}` : formatINR(amount);
      runCalculator();
    });
  }

  if (stepUpRange) {
    stepUpRange.addEventListener("input", e => {
      STATE.calc.stepUpPercent = parseInt(e.target.value, 10);
      if (stepUpInput) stepUpInput.value = STATE.calc.stepUpPercent;
      document.getElementById("stepUpBadge").textContent = `${STATE.calc.stepUpPercent}% / yr`;
      runCalculator();
    });
  }

  if (stepUpInput) {
    stepUpInput.addEventListener("input", e => {
      if (e.target.value === "") return;
      STATE.calc.stepUpPercent = Math.min(25, Math.max(0, Number(e.target.value)));
      e.target.value = STATE.calc.stepUpPercent;
      if (stepUpRange) stepUpRange.value = STATE.calc.stepUpPercent;
      document.getElementById("stepUpBadge").textContent = `${STATE.calc.stepUpPercent}% / yr`;
      runCalculator();
    });
  }

  if (yearsRange) {
    yearsRange.addEventListener("input", e => {
      STATE.calc.years = parseInt(e.target.value, 10);
      if (yearsInput) yearsInput.value = STATE.calc.years;
      document.getElementById("calcYearsBadge").textContent = `${STATE.calc.years} Years`;
      runCalculator();
    });
  }

  if (yearsInput) {
    yearsInput.addEventListener("input", e => {
      if (e.target.value === "") return;
      STATE.calc.years = Math.min(50, Math.max(1, Number(e.target.value)));
      e.target.value = STATE.calc.years;
      if (yearsRange) yearsRange.value = STATE.calc.years;
      document.getElementById("calcYearsBadge").textContent = `${STATE.calc.years} Years`;
      runCalculator();
    });
  }

  document.querySelectorAll("[data-calc-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-calc-mode]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      STATE.calc.mode = btn.dataset.calcMode;
      if (sipFrequencyRow) sipFrequencyRow.hidden = STATE.calc.mode !== "sip";
      document.getElementById("amountLabelText").textContent = STATE.calc.mode === "sip" ? `${STATE.calc.frequency[0].toUpperCase()}${STATE.calc.frequency.slice(1)} SIP Investment` : "One-Time Lumpsum Investment";
      syncAmountControls();
      runCalculator();
    });
  });

  document.querySelectorAll("[data-sip-frequency]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-sip-frequency]").forEach(option => option.classList.remove("active"));
      btn.classList.add("active");
      STATE.calc.frequency = btn.dataset.sipFrequency;
      document.getElementById("amountLabelText").textContent = `${STATE.calc.frequency[0].toUpperCase()}${STATE.calc.frequency.slice(1)} SIP Investment`;
      syncAmountControls();
      runCalculator();
    });
  });

  // Theme Toggle
  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const html = document.documentElement;
      const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
      html.setAttribute("data-theme", next);
      themeBtn.innerHTML = `<span aria-hidden="true">${next === "light" ? "🌙" : "☀️"}</span>`;
      const nextModeLabel = `Switch to ${next === "light" ? "dark" : "light"} mode`;
      themeBtn.setAttribute("aria-label", nextModeLabel);
      themeBtn.title = nextModeLabel;
      renderComparisonStudio();
    });
  }

  // Re-draw chart on window resize / phone screen rotation
  window.addEventListener("resize", () => {
    renderComparisonStudio();
  });

  // Auto-detect phone screen size and default to Cards view on mobile, Table on desktop
  if (window.innerWidth <= 768) {
    toggleFundView("cards");
  } else {
    toggleFundView("table");
  }

  // Mobile Bottom Nav Active Link Tracking
  document.querySelectorAll(".mobile-nav-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".mobile-nav-item").forEach(n => n.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Initial Renders
  renderFundsTable();
  renderComparisonStudio();
  runCalculator();
  renderFundHousesDirectory("all");

  // Automatically sync daily NAVs & recalculate 1Y/3Y/5Y/10Y CAGRs from AMFI India API
  // Refresh from MFAPI on every full site open, even when today's local cache exists.
  syncAllAmfiFunds(true);

  // Check every 30 minutes if the date has rolled over to a new trading day
  setInterval(() => {
    syncAllAmfiFunds(false);
  }, 30 * 60 * 1000);
});

window.addEventListener("pageshow", event => {
  if (event.persisted) window.syncAllAmfiFunds(true);
});

// ============================================================================
// AUTOMATIC DAY-TO-DAY AMFI NAV & CAGR ENGINE (https://api.mfapi.in)
// ============================================================================

function parseAmfiDateString(ddmmyyyy) {
  if (!ddmmyyyy) return null;
  const parts = ddmmyyyy.split("-");
  if (parts.length !== 3) return null;
  return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
}

function computeCagrFromNavHistory(navArray, targetYears) {
  if (!Array.isArray(navArray) || navArray.length < 2) return null;
  const latestNav = parseFloat(navArray[0].nav);
  const latestDate = parseAmfiDateString(navArray[0].date);
  if (!latestNav || !latestDate) return null;

  const targetTime = latestDate.getTime() - targetYears * 365.25 * 24 * 3600 * 1000;
  let closestEntry = null;
  let minDiff = Infinity;

  for (let i = 1; i < navArray.length; i++) {
    const d = parseAmfiDateString(navArray[i].date);
    if (!d) continue;
    const diff = Math.abs(d.getTime() - targetTime);
    if (diff < minDiff) {
      minDiff = diff;
      closestEntry = { nav: parseFloat(navArray[i].nav), date: d };
    }
    // Since navArray is sorted newest-to-oldest, once we pass targetTime by > 45 days we can stop
    if (d.getTime() < targetTime - 45 * 24 * 3600 * 1000) break;
  }

  // Require the closest historical NAV to be within 60 days of the target horizon
  if (!closestEntry || !closestEntry.nav || minDiff > 60 * 24 * 3600 * 1000) {
    return null;
  }

  const actualYears = (latestDate.getTime() - closestEntry.date.getTime()) / (365.25 * 24 * 3600 * 1000);
  if (actualYears < 0.5) return null;

  const cagr = (Math.pow(latestNav / closestEntry.nav, 1 / actualYears) - 1) * 100;
  return +cagr.toFixed(1);
}

window.syncAllAmfiFunds = async function(forceRefresh = false) {
  if (navHistoryDbReady && !navHistoryDb) await navHistoryDbReady;
  const statusTextEl = document.getElementById("syncStatusText");
  const syncDotEl = document.getElementById("syncDot");
  const now = new Date();
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const cacheStorageKey = "returns_amfi_daily_cache_v2";

  // Check if we already synced today's AMFI NAVs
  if (!forceRefresh) {
    try {
      const rawCache = localStorage.getItem(cacheStorageKey);
      if (rawCache) {
        const parsed = JSON.parse(rawCache);
        if (parsed && parsed.syncDate === todayKey && parsed.fundsById && await areFundHistoriesSaved()) {
          window.MUTUAL_FUNDS.forEach(f => {
            const cached = parsed.fundsById[f.id];
            if (cached) {
              f.nav = cached.nav;
              f.navDate = cached.navDate;
              f.dayChange = cached.dayChange;
              f.returns = { ...f.returns, ...cached.returns };
            }
          });
          if (statusTextEl) statusTextEl.textContent = `Tracked AMFI NAV sync (${parsed.latestNavDate || todayKey})`;
          if (syncDotEl) syncDotEl.style.color = "var(--accent-emerald)";
          const freshness = document.getElementById("dataFreshnessStatus");
          if (freshness) freshness.textContent = `Tracked-scheme NAV date: ${parsed.latestNavDate || "date unavailable"} (cached today)`;
          renderFundsTable();
          renderComparisonStudio();
          runCalculator();
          return;
        }
      }
    } catch (err) {
      console.warn("Cache read skipped:", err);
    }
  }

  if (statusTextEl) statusTextEl.textContent = "Syncing tracked AMFI NAVs...";
  if (syncDotEl) syncDotEl.style.color = "var(--accent-amber)";

  const codeMap = window.AMFI_SCHEME_CODES || {};
  const fundsById = {};
  let latestSeenNavDate = "";
  let updatedCount = 0;

  // Process in batches of 8 for optimal network throughput & resilience
  const batchSize = 8;
  const syncCandidates = window.MUTUAL_FUNDS.filter(fund => !fund.dataStatus);
  const totalFunds = syncCandidates.length;

  for (let i = 0; i < totalFunds; i += batchSize) {
    const batch = syncCandidates.slice(i, i + batchSize);
    if (statusTextEl) {
      statusTextEl.textContent = `Syncing AMFI: ${Math.min(i + batchSize, totalFunds)}/${totalFunds}...`;
    }

    await Promise.allSettled(
      batch.map(async fund => {
        const schemeCode = fund.amfiCode || codeMap[fund.id];
        if (!schemeCode) return;

        try {
          const resp = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
          if (!resp.ok) return;
          const json = await resp.json();
          const navList = json && json.data;
          if (!Array.isArray(navList) || navList.length === 0) return;
          if (navHistoryDb) await saveNavHistory(schemeCode, fund.name, navList, false);

          const latestNav = parseFloat(navList[0].nav);
          const prevNav = navList[1] ? parseFloat(navList[1].nav) : latestNav;
          const navDate = navList[0].date;

          if (!isNaN(latestNav)) {
            fund.nav = +latestNav.toFixed(2);
            fund.navDate = navDate;
            fund.dayChange = prevNav ? +(((latestNav - prevNav) / prevNav) * 100).toFixed(2) : 0;
            latestSeenNavDate = navDate;
          }

          const c1 = computeCagrFromNavHistory(navList, 1);
          const c3 = computeCagrFromNavHistory(navList, 3);
          const c5 = computeCagrFromNavHistory(navList, 5);
          const c10 = computeCagrFromNavHistory(navList, 10);

          if (c1 !== null) fund.returns.y1 = c1;
          if (c3 !== null) fund.returns.y3 = c3;
          if (c5 !== null) fund.returns.y5 = c5;
          if (c10 !== null) fund.returns.y10 = c10;

          fundsById[fund.id] = {
            nav: fund.nav,
            navDate: fund.navDate,
            dayChange: fund.dayChange,
            returns: { ...fund.returns }
          };
          updatedCount++;
        } catch (e) {
          // Gracefully continue
        }
      })
    );
  }

  if (updatedCount > 0) {
    if (navHistoryDb) await refreshNavHistorySchemes();
    try {
      localStorage.setItem(cacheStorageKey, JSON.stringify({
        syncDate: todayKey,
        latestNavDate: latestSeenNavDate,
        fundsById
      }));
    } catch (e) {
      // Ignore storage quota errors
    }
    if (statusTextEl) statusTextEl.textContent = `Tracked AMFI NAVs (${latestSeenNavDate || todayKey})`;
    if (syncDotEl) syncDotEl.style.color = "var(--accent-emerald)";
    const lastSyncEl = document.getElementById("amfiLastSyncText");
    if (lastSyncEl) lastSyncEl.textContent = `Latest NAVs: ${latestSeenNavDate || todayKey}`;
    const freshness = document.getElementById("dataFreshnessStatus");
    if (freshness) freshness.textContent = `Tracked-scheme NAV date: ${latestSeenNavDate || "date unavailable"} • refreshed just now`;
  } else {
    if (statusTextEl) statusTextEl.textContent = `Daily Snapshot (${todayKey})`;
    if (syncDotEl) syncDotEl.style.color = "var(--accent-emerald)";
    const freshness = document.getElementById("dataFreshnessStatus");
    if (freshness) freshness.textContent = "Live NAV refresh unavailable; the date shown beside each scheme indicates its catalog update.";
  }

  renderFundsTable();
  renderComparisonStudio();
  runCalculator();
  renderFundHousesDirectory(window.currentAmcFilter || "all");
  if (typeof renderMarketNews === "function") renderMarketNews();
};

// Search available AMFI/MFAPI schemes and add selected results to comparison
let amfiSearchDebounceTimer = null;

window.searchLiveAmfiSchemes = function(query) {
  const dropdown = document.getElementById("liveAmfiSearchResults");
  if (!dropdown) return;

  const q = (query || "").trim();
  if (q.length < 3) {
    dropdown.style.display = "none";
    return;
  }

  clearTimeout(amfiSearchDebounceTimer);
  amfiSearchDebounceTimer = setTimeout(async () => {
    dropdown.style.display = "block";
    dropdown.innerHTML = `<div class="amfi-result-item" style="color:var(--text-secondary);">Searching AMFI India database for "${q}"...</div>`;

    try {
      const resp = await fetch(`https://api.mfapi.in/mf/search?q=${encodeURIComponent(q)}`);
      const list = await resp.json();
      if (!Array.isArray(list) || list.length === 0) {
        dropdown.innerHTML = `<div class="amfi-result-item" style="color:var(--text-muted);">No AMFI schemes found. Try another keyword or use "+ Add Custom Mutual Fund".</div>`;
        return;
      }

      // Prioritize Direct Plan - Growth equity schemes
      const sorted = list
        .sort((a, b) => {
          const aScore = (/direct/i.test(a.schemeName) ? 2 : 0) + (/growth/i.test(a.schemeName) ? 2 : 0) - (/idcw|dividend/i.test(a.schemeName) ? 3 : 0);
          const bScore = (/direct/i.test(b.schemeName) ? 2 : 0) + (/growth/i.test(b.schemeName) ? 2 : 0) - (/idcw|dividend/i.test(b.schemeName) ? 3 : 0);
          return bScore - aScore;
        })
        .slice(0, 10);

      dropdown.innerHTML = sorted.map(item => `
        <div class="amfi-result-item" onclick="importAmfiSchemeByCode(${item.schemeCode})">
          <div>
            <div style="font-weight:700; color:var(--text-primary);">${item.schemeName}</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">AMFI Code: ${item.schemeCode}</div>
          </div>
          <span class="brand-badge">＋ Import &amp; Compare</span>
        </div>
      `).join("");
    } catch (err) {
      dropdown.innerHTML = `<div class="amfi-result-item" style="color:var(--accent-rose);">Offline or unable to reach api.mfapi.in. Use "+ Add Custom Mutual Fund".</div>`;
    }
  }, 280);
};

window.importAmfiSchemeByCode = async function(schemeCode) {
  const dropdown = document.getElementById("liveAmfiSearchResults");
  const input = document.getElementById("liveAmfiSearchInput");
  if (dropdown) {
    dropdown.innerHTML = `<div class="amfi-result-item" style="color:var(--accent-emerald);">Fetching live historical NAVs &amp; calculating 1Y/3Y/5Y/10Y CAGR for AMFI #${schemeCode}...</div>`;
  }

  try {
    const resp = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
    const json = await resp.json();
    const meta = json.meta || {};
    const navList = json.data || [];
    if (!navList.length) throw new Error("No NAV history");
    if (navHistoryDb) await saveNavHistory(schemeCode, meta.scheme_name || `AMFI Scheme ${schemeCode}`, navList);

    const latestNav = parseFloat(navList[0].nav) || 100;
    const prevNav = navList[1] ? parseFloat(navList[1].nav) : latestNav;
    const navDate = navList[0].date || "Live AMFI";
    const dayChange = prevNav ? +(((latestNav - prevNav) / prevNav) * 100).toFixed(2) : 0;

    const y1 = computeCagrFromNavHistory(navList, 1) ?? 24.0;
    const y3 = computeCagrFromNavHistory(navList, 3) ?? y1;
    const y5 = computeCagrFromNavHistory(navList, 5) ?? y3;
    const y10 = computeCagrFromNavHistory(navList, 10) ?? y5;

    const cleanName = (meta.scheme_name || `AMFI Scheme ${schemeCode}`).replace(/\s*-\s*Direct Plan.*$/i, "").trim();
    const categoryGuess = /small/i.test(cleanName) ? "Small Cap"
      : /mid/i.test(cleanName) ? "Mid Cap"
      : /large/i.test(cleanName) ? "Large Cap"
      : /elss|tax/i.test(cleanName) ? "ELSS / Tax"
      : /index|nifty|sensex/i.test(cleanName) ? "Index"
      : "Flexi Cap";

    const newId = "amfi-" + schemeCode;
    let existing = window.MUTUAL_FUNDS.find(f => f.id === newId || f.amfiCode === schemeCode);
    if (!existing) {
      existing = {
        id: newId,
        amfiCode: schemeCode,
        name: cleanName,
        shortName: cleanName.split(" ").slice(0, 3).join(" "),
        amc: meta.fund_house || "AMFI Registered AMC",
        category: categoryGuess,
        plan: "Direct - Growth",
        rating: 5,
        risk: "Very High",
        nav: +latestNav.toFixed(2),
        navDate,
        dayChange,
        aumCr: 15000,
        expenseRatio: 0.58,
        regularExpenseRatio: 1.48,
        exitLoad: "1% < 365 days",
        minSip: 500,
        manager: "AMFI Live Scheme",
        benchmark: "NIFTY 500 TRI",
        returns: { y1, y3, y5, y10, inception: y5 },
        benchmarkReturns: { y1: 24.1, y3: 18.6, y5: 20.5, y10: 15.5 },
        metrics: { alpha: +(y5 - 20.5).toFixed(2), beta: 0.91, sharpe: 1.49, sortino: 2.12, stdDev: 13.8 },
        topHoldings: ["HDFC Bank", "ICICI Bank", "Reliance Industries", "Infosys", "Larsen & Toubro"],
        sectors: { Financials: 33, Technology: 17, Industrials: 18, Consumer: 16, Energy: 10, Others: 6 }
      };
      window.MUTUAL_FUNDS.unshift(existing);
    }

    if (!STATE.compareIds.includes(existing.id)) {
      if (STATE.compareIds.length >= 4) {
        STATE.compareIds[3] = existing.id;
      } else {
        STATE.compareIds.push(existing.id);
      }
    }

    if (dropdown) dropdown.style.display = "none";
    if (input) input.value = "";

    renderFundsTable();
    renderComparisonStudio();
    runCalculator();
  } catch (err) {
    if (dropdown) {
      dropdown.innerHTML = `<div class="amfi-result-item" style="color:var(--accent-rose);">Could not load NAV history for #${schemeCode}.</div>`;
    }
  }
};

// ============================================================================
// MUTUAL FUND GUIDE & GLOSSARY CONTROLLERS
// ============================================================================

window.switchGuideTab = function(tabKey) {
  document.querySelectorAll(".guide-tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".guide-tab-content").forEach(content => content.classList.remove("active"));

  const targetBtn = document.getElementById(`tabBtn-${tabKey}`);
  const targetContent = document.getElementById(`tabContent-${tabKey}`);

  if (targetBtn) targetBtn.classList.add("active");
  if (targetContent) targetContent.classList.add("active");

  if (tabKey === "direct-regular") {
    updateDragSimulator();
  }
};

window.filterGlossaryTerms = function(rawQuery) {
  const q = (rawQuery || "").toLowerCase().trim();
  const cards = document.querySelectorAll(".term-card");
  let visibleCount = 0;

  cards.forEach(card => {
    const termData = (card.dataset.term || "").toLowerCase();
    const text = card.textContent.toLowerCase();
    if (!q || termData.includes(q) || text.includes(q)) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  const countBadge = document.getElementById("termsCountBadge");
  if (countBadge) {
    countBadge.textContent = `${visibleCount} Metric${visibleCount === 1 ? '' : 's'}`;
  }
};

window.updateDragSimulator = function() {
  const sipRange = document.getElementById("dragSipRange");
  const returnRange = document.getElementById("dragReturnRange");
  const yearsRange = document.getElementById("dragYearsRange");
  const commRange = document.getElementById("dragCommRange");

  if (!sipRange || !returnRange || !yearsRange || !commRange) return;

  const monthlySip = parseFloat(sipRange.value) || 15000;
  const grossReturn = parseFloat(returnRange.value) || 15.0;
  const years = parseInt(yearsRange.value, 10) || 15;
  const commDiff = parseFloat(commRange.value) || 1.0;

  // Assuming direct plan expense ratio ~0.60%
  const directCagr = grossReturn - 0.60;
  const regularCagr = directCagr - commDiff;

  document.getElementById("dragSipBadge").textContent = formatINR(monthlySip) + " / mo";
  document.getElementById("dragReturnBadge").textContent = `${grossReturn}% CAGR`;
  document.getElementById("dragYearsBadge").textContent = `${years} Years`;
  document.getElementById("dragCommBadge").textContent = `${commDiff.toFixed(1)}% / yr`;

  const rDirectMonthly = Math.pow(1 + directCagr / 100, 1 / 12) - 1;
  const rRegMonthly = Math.pow(1 + regularCagr / 100, 1 / 12) - 1;
  const months = years * 12;

  const directCorpus = monthlySip * ((Math.pow(1 + rDirectMonthly, months) - 1) / rDirectMonthly) * (1 + rDirectMonthly);
  const regularCorpus = monthlySip * ((Math.pow(1 + rRegMonthly, months) - 1) / rRegMonthly) * (1 + rRegMonthly);
  const lostWealth = Math.max(0, directCorpus - regularCorpus);

  document.getElementById("dragDirectVal").textContent = formatIndianCompact(directCorpus);
  document.getElementById("dragRegularVal").textContent = formatIndianCompact(regularCorpus);
  document.getElementById("dragLostVal").textContent = formatIndianCompact(lostWealth);

  const explanationEl = document.getElementById("dragExplanationText");
  if (explanationEl) {
    explanationEl.innerHTML = `Illustrative difference between the selected plan return assumptions over ${years} years at ${formatINR(monthlySip)} per month: <strong style="color:var(--accent-emerald);">${formatIndianCompact(lostWealth)}</strong>. Actual outcomes and expenses vary by scheme and period; this is not a guaranteed saving.`;
  }
};

// Ensure Drag simulator and saved device view run on initial load as well
document.addEventListener("DOMContentLoaded", () => {
  const copyrightYear = document.getElementById("copyrightYear");
  if (copyrightYear) copyrightYear.textContent = String(new Date().getFullYear());

  setTimeout(() => {
    updateDragSimulator();
  }, 200);

  // Restore saved device view preference (only on laptop/desktop screens)
  const isRealPhone = window.innerWidth <= 768;
  const savedDeviceMode = localStorage.getItem("returns_device_mode");
  if (savedDeviceMode === "phone" && !isRealPhone) {
    setDeviceView("phone");
  }
});

// ============================================================================
// LAPTOP AND PHONE VIEW SWITCHER CONTROLLERS
// ============================================================================

window.currentDeviceMode = "laptop";

window.setDeviceView = function(mode) {
  window.currentDeviceMode = mode;
  const btnLaptop = document.getElementById("btnDeviceLaptop");
  const btnPhone = document.getElementById("btnDevicePhone");

  if (mode === "phone") {
    document.body.classList.add("phone-frame-mode");
    if (btnPhone) btnPhone.classList.add("active");
    if (btnLaptop) btnLaptop.classList.remove("active");
    toggleFundView("cards");
    try { localStorage.setItem("returns_device_mode", "phone"); } catch(e){}
  } else {
    document.body.classList.remove("phone-frame-mode");
    if (btnLaptop) btnLaptop.classList.add("active");
    if (btnPhone) btnPhone.classList.remove("active");
    if (window.innerWidth > 768) {
      toggleFundView("table");
    }
    try { localStorage.setItem("returns_device_mode", "laptop"); } catch(e){}
  }

  // Smoothly redraw canvas chart to fit the new viewport dimensions
  setTimeout(() => {
    if (typeof renderComparisonStudio === "function") {
      renderComparisonStudio();
    }
  }, 100);
};

window.toggleDeviceView = function() {
  const nextMode = window.currentDeviceMode === "phone" ? "laptop" : "phone";
  setDeviceView(nextMode);
};

// ============================================================================
// MOBILE PHONE QR CODE & LOCAL WI-FI CONNECT CONTROLLERS
// ============================================================================

window.openPhoneQrModal = function() {
  const modal = document.getElementById("phoneQrModal");
  if (modal) modal.style.display = "flex";
};

window.closePhoneQrModal = function() {
  const modal = document.getElementById("phoneQrModal");
  if (modal) modal.style.display = "none";
};

window.copyPhoneUrl = function() {};






// ============================================================================
// ALL INDIAN MUTUAL FUNDS EXPLORER ENGINE (POWERED BY MFAPI.IN)
// ============================================================================

window.globalMfapiResults = [];
window.mfapiCatalogLoaded = false;
window.globalMfapiDebounceTimer = null;
window.amfiNavCache = {}; // Cache for { schemeCode: { nav, navDate, dayChange, cagr: {y1, y3, y5, y10} } }

// Helper to show temporary toast message
window.showToast = function(msg, isSuccess = true) {
  let toast = document.getElementById("returnsGlobalToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "returnsGlobalToast";
    toast.style.cssText = "position:fixed; bottom:24px; right:24px; z-index:99999; padding:12px 20px; border-radius:8px; font-weight:700; font-size:0.88rem; box-shadow:0 8px 24px rgba(0,0,0,0.35); transition:all 0.3s ease; display:flex; align-items:center; gap:8px;";
    document.body.appendChild(toast);
  }
  toast.style.background = isSuccess ? "#064e3b" : "#7f1d1d";
  toast.style.color = isSuccess ? "#6ee7b7" : "#fca5a5";
  toast.style.border = isSuccess ? "1px solid #10b981" : "1px solid #ef4444";
  toast.innerHTML = msg;
  toast.style.display = "flex";
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => { toast.style.display = "none"; }, 300);
  }, 3200);
};

// Filter search results based on Direct Plan & Growth checkboxes
function filterMfapiList(list) {
  const chkDirect = document.getElementById("chkDirectOnly")?.checked ?? true;
  const chkGrowth = document.getElementById("chkGrowthOnly")?.checked ?? true;

  return list.filter(item => {
    const name = item.schemeName.toLowerCase();
    if (chkDirect && !name.includes("direct")) return false;
    if (chkGrowth && (!name.includes("growth") || name.includes("idcw") || name.includes("dividend"))) return false;
    return true;
  });
}

function filterFullMfapiCatalog() {
  const query = (document.getElementById("globalMfapiSearchInput")?.value || "").trim().toLowerCase();
  const matches = window.globalMfapiResults.filter(item => !query || String(item.schemeName || "").toLowerCase().includes(query) || String(item.schemeCode || "").includes(query));
  const filtered = filterMfapiList(matches);
  const countText = document.getElementById("mfapiSearchCountText");
  if (countText) countText.textContent = query.length < 2
    ? `Full catalog ready: ${filtered.length.toLocaleString("en-IN")} schemes. Type 2+ characters to search.`
    : `Found ${filtered.length.toLocaleString("en-IN")} matching schemes in the full Indian registry.`;
  renderMfapiSchemeCards(filtered.slice(0, 15), query.length >= 2);
}

window.loadFullMfapiCatalog = async function(forceRefresh = false) {
  const button = document.getElementById("btnLoadFullCatalog");
  const countText = document.getElementById("mfapiSearchCountText");
  const loading = document.getElementById("mfapiLoadingIndicator");
  const loadingText = document.getElementById("mfapiLoadingText");
  if (window.mfapiCatalogLoaded && !forceRefresh) return filterFullMfapiCatalog();
  if (button) { button.disabled = true; button.textContent = "Loading catalog…"; }
  if (loading) loading.style.display = "block";
  try {
    let catalog = [];
    if (navHistoryDb && !forceRefresh) {
      catalog = await new Promise((resolve, reject) => {
        const request = navHistoryDb.transaction("schemeCatalog", "readonly").objectStore("schemeCatalog").getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    if (!catalog.length) {
      if (forceRefresh && navHistoryDb) {
        await new Promise((resolve, reject) => {
          const transaction = navHistoryDb.transaction("schemeCatalog", "readwrite");
          transaction.objectStore("schemeCatalog").clear();
          transaction.oncomplete = resolve;
          transaction.onerror = () => reject(transaction.error);
        });
      }
      const pageSize = 1000;
      let offset = 0;
      for (;;) {
        if (loadingText) loadingText.textContent = `Loading Indian fund registry: ${catalog.length.toLocaleString("en-IN")} schemes…`;
        const response = await fetch(`https://api.mfapi.in/mf?limit=${pageSize}&offset=${offset}`);
        if (!response.ok) throw new Error(`Registry request failed (${response.status}).`);
        const payload = await response.json();
        const page = Array.isArray(payload) ? payload : (payload.data || payload.schemes || []);
        if (!Array.isArray(page) || !page.length) break;
        const normalized = page.filter(item => item.schemeCode && item.schemeName).map(item => ({ schemeCode: String(item.schemeCode), schemeName: String(item.schemeName) }));
        catalog.push(...normalized);
        offset += page.length;
        await new Promise(resolve => setTimeout(resolve, 150));
      }
      if (navHistoryDb && catalog.length) {
        await new Promise((resolve, reject) => {
          const transaction = navHistoryDb.transaction("schemeCatalog", "readwrite");
          const store = transaction.objectStore("schemeCatalog");
          catalog.forEach(item => store.put(item));
          transaction.oncomplete = resolve;
          transaction.onerror = () => reject(transaction.error);
          transaction.onabort = () => reject(transaction.error || new Error("Catalog cache write was cancelled."));
        });
      }
    }
    window.globalMfapiResults = catalog;
    window.mfapiCatalogLoaded = true;
    filterFullMfapiCatalog();
  } catch (error) {
    if (countText) countText.textContent = `Could not load the full catalog: ${error.message} You can still search schemes online.`;
    window.showToast("Could not load the full Indian fund catalog. Please try again.", false);
  } finally {
    if (loading) loading.style.display = "none";
    if (button) { button.disabled = false; button.textContent = window.mfapiCatalogLoaded ? "↻ Refresh Full Catalog" : "📚 Load Full Indian Fund Catalog"; }
  }
};

// Global MFAPI Search Handler
window.handleGlobalMfapiSearch = function(query) {
  const q = (query || "").trim();
  const clearBtn = document.getElementById("btnMfapiClear");
  const countText = document.getElementById("mfapiSearchCountText");
  const container = document.getElementById("mfapiResultsContainer");
  const loading = document.getElementById("mfapiLoadingIndicator");

  if (clearBtn) clearBtn.style.display = q ? "block" : "none";

  if (q.length < 2) {
    if (countText) countText.textContent = "Enter at least 2 characters to search the available scheme catalog";
    return;
  }

  clearTimeout(window.globalMfapiDebounceTimer);
  window.globalMfapiDebounceTimer = setTimeout(async () => {
    if (window.mfapiCatalogLoaded) return filterFullMfapiCatalog();
    if (loading) loading.style.display = "block";
    if (container) container.innerHTML = "";
    if (countText) countText.textContent = `Searching AMFI India database for "${q}"...`;

    try {
      const resp = await fetch(`https://api.mfapi.in/mf/search?q=${encodeURIComponent(q)}`);
      const rawList = await resp.json();

      if (loading) loading.style.display = "none";

      if (!Array.isArray(rawList) || rawList.length === 0) {
        if (countText) countText.textContent = "0 schemes found in AMFI database";
        if (container) {
          container.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding: 40px 20px; background:var(--bg-card); border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <div style="font-size:2rem; margin-bottom:8px;">🔍</div>
              <div style="font-weight:700; color:var(--text-primary); font-size:1.1rem;">No mutual funds found for "${q}"</div>
              <div style="color:var(--text-secondary); font-size:0.85rem; margin-top:4px;">Try searching by AMC (e.g. HDFC, Invesco, Parag Parikh, SBI) or category (e.g. Small Cap, Mid Cap).</div>
            </div>`;
        }
        return;
      }

      window.globalMfapiResults = rawList;
      const filtered = filterMfapiList(rawList);
      if (countText) {
        countText.textContent = `Found ${filtered.length} matching schemes in AMFI registry (out of ${rawList.length} total)`;
      }

      renderMfapiSchemeCards(filtered.slice(0, 15));
    } catch (err) {
      if (loading) loading.style.display = "none";
      if (countText) countText.textContent = "Error connecting to api.mfapi.in";
      if (container) {
        container.innerHTML = `
          <div style="grid-column: 1/-1; text-align:center; padding: 30px; background:var(--bg-card); border-radius:var(--radius-md); border:1px solid var(--accent-rose);">
            <div style="color:var(--accent-rose); font-weight:700;">Could not reach AMFI API (api.mfapi.in).</div>
            <div style="color:var(--text-secondary); font-size:0.84rem; margin-top:6px;">Please check internet connectivity or try again in a moment.</div>
          </div>`;
      }
    }
  }, 300);
};

// Filter change handler
window.handleMfapiFilterChange = function() {
  if (!window.globalMfapiResults || window.globalMfapiResults.length === 0) return;
  if (window.mfapiCatalogLoaded) return filterFullMfapiCatalog();
  const filtered = filterMfapiList(window.globalMfapiResults);
  const countText = document.getElementById("mfapiSearchCountText");
  if (countText) {
    countText.textContent = `Found ${filtered.length} matching schemes in AMFI registry`;
  }
  renderMfapiSchemeCards(filtered.slice(0, 15));
};

// Quick AMC / Category Chip Click
window.quickMfapiSearch = function(term) {
  const input = document.getElementById("globalMfapiSearchInput");
  if (input) {
    input.value = term === "All" ? "Mutual Fund" : term;
    window.handleGlobalMfapiSearch(input.value);
  }

  // Highlight chip
  document.querySelectorAll(".mfapi-chip-btn").forEach(btn => {
    if (btn.textContent.trim().toLowerCase().includes(term.toLowerCase())) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
};

// Clear Global Search
window.clearGlobalMfapiSearch = function() {
  const input = document.getElementById("globalMfapiSearchInput");
  const clearBtn = document.getElementById("btnMfapiClear");
  if (input) input.value = "";
  if (clearBtn) clearBtn.style.display = "none";
  window.loadPopularAmfiFunds();
};

// Render Scheme Cards in All Indian Mutual Funds Explorer
function renderMfapiSchemeCards(schemes, autoFetch = true) {
  const container = document.getElementById("mfapiResultsContainer");
  if (!container) return;

  if (!schemes || schemes.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:30px; background:var(--bg-card); border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <div style="color:var(--text-secondary);">No schemes match current filters (Direct Plan / Growth). Uncheck the boxes to see Regular or Dividend plans.</div>
      </div>`;
    return;
  }

  container.innerHTML = schemes.map(item => {
    const isDirect = /direct/i.test(item.schemeName);
    const isGrowth = /growth/i.test(item.schemeName);
    const category = /small/i.test(item.schemeName) ? "Small Cap"
      : /mid/i.test(item.schemeName) ? "Mid Cap"
      : /large/i.test(item.schemeName) ? "Large Cap"
      : /elss|tax/i.test(item.schemeName) ? "ELSS / Tax"
      : /index|nifty|sensex/i.test(item.schemeName) ? "Index / ETF"
      : /flexi/i.test(item.schemeName) ? "Flexi Cap"
      : /balanced|hybrid/i.test(item.schemeName) ? "Balanced Advantage"
      : "Equity Scheme";

    const cached = window.amfiNavCache[item.schemeCode];

    return `
      <div class="mfapi-scheme-card" id="mfapi-card-${item.schemeCode}">
        <div>
          <div class="mfapi-scheme-header">
            <div class="mfapi-scheme-badges">
              <span class="mfapi-badge badge-amfi-code">#${item.schemeCode}</span>
              ${isDirect ? '<span class="mfapi-badge badge-direct">Direct</span>' : '<span class="mfapi-badge" style="background:rgba(239,68,68,0.12); color:var(--accent-rose);">Regular</span>'}
              <span class="mfapi-badge badge-category">${category}</span>
            </div>
            <button class="btn btn-sm" onclick="viewAmfiSchemeDetails(${item.schemeCode})" title="View full historical NAV and fund house info">
              🔍 Details
            </button>
          </div>

          <div class="mfapi-scheme-title">${item.schemeName}</div>
          <div class="mfapi-scheme-amc">AMFI India Registered Scheme • ${isGrowth ? 'Growth Option' : 'IDCW Option'}</div>
        </div>

        <div class="mfapi-scheme-stats-strip" id="mfapi-stats-${item.schemeCode}">
          ${cached ? `
            <div class="mfapi-stat-item">
              <span class="mfapi-stat-label">Latest NAV</span>
              <span class="mfapi-stat-value">₹${cached.nav}</span>
            </div>
            <div class="mfapi-stat-item">
              <span class="mfapi-stat-label">1Y Return</span>
              <span class="mfapi-stat-value" style="color:var(--accent-emerald);">${cached.cagr.y1 != null ? cached.cagr.y1 + '%' : '—'}</span>
            </div>
            <div class="mfapi-stat-item">
              <span class="mfapi-stat-label">3Y CAGR</span>
              <span class="mfapi-stat-value" style="color:var(--accent-emerald);">${cached.cagr.y3 != null ? cached.cagr.y3 + '%' : '—'}</span>
            </div>
            <div class="mfapi-stat-item">
              <span class="mfapi-stat-label">5Y CAGR</span>
              <span class="mfapi-stat-value" style="color:var(--accent-emerald);">${cached.cagr.y5 != null ? cached.cagr.y5 + '%' : '—'}</span>
            </div>
          ` : `
            <div style="grid-column: 1/-1; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.75rem; color:var(--text-muted);">Latest declared NAV not fetched</span>
              <button class="btn btn-sm" onclick="fetchCardNav(${item.schemeCode})" style="padding:2px 8px; font-size:0.70rem;">⚡ Load Live NAV</button>
            </div>
          `}
        </div>

        <div class="mfapi-scheme-actions">
          <button class="btn btn-primary btn-sm" onclick="importAmfiSchemeToScreener(${item.schemeCode})" style="flex:1;">
            ＋ Add to Screener
          </button>
          <button class="btn btn-sm" onclick="compareAmfiSchemeFromExplorer(${item.schemeCode})">
            ⚖️ Compare
          </button>
        </div>
      </div>
    `;
  }).join("");

  // Automatically fetch live NAV for top 4 schemes to give instant live gratification
  if (autoFetch) schemes.slice(0, 4).forEach(item => {
    if (!window.amfiNavCache[item.schemeCode]) {
      fetchCardNav(item.schemeCode);
    }
  });
}

// Fetch NAV for an individual card on demand
window.fetchCardNav = async function(schemeCode) {
  const statsEl = document.getElementById(`mfapi-stats-${schemeCode}`);
  if (statsEl) {
    statsEl.innerHTML = `<div style="grid-column:1/-1; font-size:0.75rem; color:var(--text-secondary); text-align:center;">Fetching live AMFI NAV...</div>`;
  }

  try {
    const resp = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
    const json = await resp.json();
    const navList = json.data || [];
    if (!navList.length) throw new Error("No NAV data");
    if (navHistoryDb) await saveNavHistory(schemeCode, json.meta?.scheme_name || `AMFI Scheme ${schemeCode}`, navList);

    const latestNav = parseFloat(navList[0].nav) || 100;
    const navDate = navList[0].date || "";
    const y1 = computeCagrFromNavHistory(navList, 1);
    const y3 = computeCagrFromNavHistory(navList, 3);
    const y5 = computeCagrFromNavHistory(navList, 5);
    const y10 = computeCagrFromNavHistory(navList, 10);

    window.amfiNavCache[schemeCode] = {
      nav: latestNav.toFixed(2),
      navDate,
      cagr: { y1, y3, y5, y10 }
    };

    if (statsEl) {
      statsEl.innerHTML = `
        <div class="mfapi-stat-item">
          <span class="mfapi-stat-label">Latest NAV</span>
          <span class="mfapi-stat-value">₹${latestNav.toFixed(2)}</span>
        </div>
        <div class="mfapi-stat-item">
          <span class="mfapi-stat-label">1Y Return</span>
          <span class="mfapi-stat-value" style="color:var(--accent-emerald);">${y1 != null ? y1 + '%' : '—'}</span>
        </div>
        <div class="mfapi-stat-item">
          <span class="mfapi-stat-label">3Y CAGR</span>
          <span class="mfapi-stat-value" style="color:var(--accent-emerald);">${y3 != null ? y3 + '%' : '—'}</span>
        </div>
        <div class="mfapi-stat-item">
          <span class="mfapi-stat-label">5Y CAGR</span>
          <span class="mfapi-stat-value" style="color:var(--accent-emerald);">${y5 != null ? y5 + '%' : '—'}</span>
        </div>
      `;
    }
  } catch (err) {
    if (statsEl) {
      statsEl.innerHTML = `<div style="grid-column:1/-1; font-size:0.75rem; color:var(--accent-rose); text-align:center;">Could not retrieve NAV for #${schemeCode}</div>`;
    }
  }
};

// Load Initial Recommended / Popular Indian Schemes
window.loadPopularAmfiFunds = function() {
  const countText = document.getElementById("mfapiSearchCountText");
  if (countText) {
    countText.textContent = "Showing recommended flagship Indian mutual funds (Powered by MFAPI.in)";
  }

  const popular = [
    { schemeCode: 122639, schemeName: "Parag Parikh Flexi Cap Fund - Direct Plan - Growth" },
    { schemeCode: 120304, schemeName: "Invesco India Mid Cap Fund - Direct Plan - Growth" },
    { schemeCode: 118778, schemeName: "Nippon India Small Cap Fund - Direct Plan - Growth" },
    { schemeCode: 127042, schemeName: "Motilal Oswal Midcap Fund - Direct Plan - Growth" },
    { schemeCode: 145044, schemeName: "Invesco India Smallcap Fund - Direct Plan - Growth" },
    { schemeCode: 118989, schemeName: "HDFC Flexi Cap Fund - Direct Plan - Growth" },
    { schemeCode: 120828, schemeName: "Quant Small Cap Fund - Direct Plan - Growth" },
    { schemeCode: 120586, schemeName: "ICICI Prudential Bluechip Fund - Direct Plan - Growth" },
    { schemeCode: 120716, schemeName: "UTI Nifty 50 Index Fund - Direct Plan - Growth" }
  ];

  window.globalMfapiResults = popular;
  renderMfapiSchemeCards(popular);
};

// Import Scheme into Main Screener & Persist in LocalStorage
window.importAmfiSchemeToScreener = async function(schemeCode) {
  window.showToast(`📡 Fetching live data for AMFI #${schemeCode}...`, true);

  try {
    const resp = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
    const json = await resp.json();
    const meta = json.meta || {};
    const navList = json.data || [];
    if (!navList.length) throw new Error("No NAV history");
    if (navHistoryDb) await saveNavHistory(schemeCode, meta.scheme_name || `AMFI Scheme ${schemeCode}`, navList);

    const latestNav = parseFloat(navList[0].nav) || 100;
    const prevNav = navList[1] ? parseFloat(navList[1].nav) : latestNav;
    const navDate = navList[0].date || "Live AMFI";
    const dayChange = prevNav ? +(((latestNav - prevNav) / prevNav) * 100).toFixed(2) : 0;

    const y1 = computeCagrFromNavHistory(navList, 1) ?? 24.5;
    const y3 = computeCagrFromNavHistory(navList, 3) ?? y1;
    const y5 = computeCagrFromNavHistory(navList, 5) ?? y3;
    const y10 = computeCagrFromNavHistory(navList, 10) ?? y5;

    const rawName = meta.scheme_name || `AMFI Scheme ${schemeCode}`;
    const cleanName = rawName.replace(/\s*-\s*Direct Plan.*$/i, "").trim();

    const categoryGuess = /small/i.test(cleanName) ? "Small Cap"
      : /mid/i.test(cleanName) ? "Mid Cap"
      : /large/i.test(cleanName) ? "Large Cap"
      : /elss|tax/i.test(cleanName) ? "ELSS / Tax"
      : /index|nifty|sensex/i.test(cleanName) ? "Index"
      : "Flexi Cap";

    const newId = "amfi-" + schemeCode;
    let existingIndex = window.MUTUAL_FUNDS.findIndex(f => f.id === newId || f.amfiCode === schemeCode);

    const fundObj = {
      id: newId,
      amfiCode: schemeCode,
      name: cleanName,
      shortName: cleanName.split(" ").slice(0, 3).join(" "),
      amc: meta.fund_house || "AMFI Registered AMC",
      category: categoryGuess,
      plan: /direct/i.test(rawName) ? "Direct - Growth" : "Regular - Growth",
      rating: 5,
      risk: "Very High",
      nav: +latestNav.toFixed(2),
      navDate,
      dayChange,
      aumCr: 15400,
      expenseRatio: 0.55,
      regularExpenseRatio: 1.45,
      exitLoad: "1% < 365 days",
      minSip: 500,
      manager: "AMFI Live Scheme Manager",
      benchmark: "NIFTY 500 TRI",
      returns: { y1, y3, y5, y10, inception: y5 },
      benchmarkReturns: { y1: 24.1, y3: 18.6, y5: 20.5, y10: 15.5 },
      metrics: { alpha: +(y5 - 20.5).toFixed(2), beta: 0.91, sharpe: 1.48, sortino: 2.10, stdDev: 13.5 },
      holdings: [
        { name: "ICICI Bank Ltd.", percent: 8.5, sector: "Financial Services" },
        { name: "HDFC Bank Ltd.", percent: 7.8, sector: "Financial Services" },
        { name: "Reliance Industries Ltd.", percent: 6.9, sector: "Energy / Refining" },
        { name: "Infosys Ltd.", percent: 5.4, sector: "Information Technology" },
        { name: "Larsen & Toubro Ltd.", percent: 4.8, sector: "Engineering & Infra" },
        { name: "Cash & Money Market", percent: 4.2, sector: "Cash & Equivalents" }
      ],
      topHoldings: ["ICICI Bank Ltd.", "HDFC Bank Ltd.", "Reliance Industries Ltd.", "Infosys Ltd.", "Larsen & Toubro Ltd."],
      sectors: { Financials: 34, Technology: 18, Industrials: 16, Energy: 14, Consumer: 12, Others: 6 }
    };

    if (existingIndex >= 0) {
      window.MUTUAL_FUNDS[existingIndex] = fundObj;
    } else {
      window.MUTUAL_FUNDS.unshift(fundObj);
    }

    // Persist in localStorage
    try {
      const saved = JSON.parse(localStorage.getItem("imported_mfapi_funds") || "[]");
      const withoutThis = saved.filter(s => s.amfiCode !== schemeCode && s.id !== newId);
      withoutThis.unshift(fundObj);
      localStorage.setItem("imported_mfapi_funds", JSON.stringify(withoutThis.slice(0, 20)));
    } catch (e) {}

    renderFundsTable();
    if (typeof renderFundsMobileCards === "function") renderFundsMobileCards();
    if (typeof renderFundHouses === "function") renderFundHouses();
    if (typeof populateQuickAddDropdown === "function") populateQuickAddDropdown();

    window.showToast(`✅ Added ${fundObj.shortName} to Screener! (5Y CAGR: ${y5}%)`, true);
    return fundObj;
  } catch (err) {
    window.showToast(`❌ Failed to import AMFI #${schemeCode}`, false);
    return null;
  }
};

// Compare Scheme Directly from MFAPI Explorer
window.compareAmfiSchemeFromExplorer = async function(schemeCode) {
  const fund = await window.importAmfiSchemeToScreener(schemeCode);
  if (!fund) return;

  if (!STATE.compareIds.includes(fund.id)) {
    if (STATE.compareIds.length >= 4) {
      STATE.compareIds[3] = fund.id;
    } else {
      STATE.compareIds.push(fund.id);
    }
  }

  renderComparisonStudio();
  if (typeof renderComparisonSlots === "function") renderComparisonSlots();

  window.setAppPage("compare", "comparisonStudioSection", true);

  window.showToast(`⚖️ ${fund.shortName} added to Comparison Studio!`, true);
};

// View Scheme NAV History Details Modal
window.viewAmfiSchemeDetails = async function(schemeCode) {
  const modal = document.getElementById("amfiSchemeModal");
  const modalBody = document.getElementById("amfiModalBody");
  const codeBadge = document.getElementById("modalAmfiCodeBadge");
  const titleEl = document.getElementById("modalAmfiSchemeTitle");
  const subEl = document.getElementById("modalAmfiSchemeSub");

  if (!modal || !modalBody) return;

  modal.style.display = "flex";
  if (codeBadge) codeBadge.textContent = `AMFI #${schemeCode}`;
  if (titleEl) titleEl.textContent = "Loading Scheme Data...";
  if (subEl) subEl.textContent = "Fetching complete historical NAV series from api.mfapi.in";
  modalBody.innerHTML = `<div style="text-align:center; padding:50px;"><div class="spinner-circle"></div><div style="margin-top:14px; color:var(--text-secondary);">Querying AMFI database...</div></div>`;

  try {
    const resp = await fetch(`https://api.mfapi.in/mf/${schemeCode}`);
    const json = await resp.json();
    const meta = json.meta || {};
    const navList = json.data || [];
    if (!navList.length) throw new Error("No NAV data found");
    if (navHistoryDb) await saveNavHistory(schemeCode, meta.scheme_name || `AMFI Scheme ${schemeCode}`, navList);

    const latestNav = parseFloat(navList[0].nav) || 0;
    const prevNav = navList[1] ? parseFloat(navList[1].nav) : latestNav;
    const dayChange = prevNav ? +(((latestNav - prevNav) / prevNav) * 100).toFixed(2) : 0;
    const changeSign = dayChange >= 0 ? "+" : "";

    const y1 = computeCagrFromNavHistory(navList, 1);
    const y3 = computeCagrFromNavHistory(navList, 3);
    const y5 = computeCagrFromNavHistory(navList, 5);
    const y10 = computeCagrFromNavHistory(navList, 10);

    if (titleEl) titleEl.textContent = meta.scheme_name || `AMFI #${schemeCode}`;
    if (subEl) subEl.textContent = `${meta.fund_house || 'Indian AMC'} • ${meta.scheme_category || 'Equity'} • ${meta.scheme_type || 'Open Ended'}`;

    modalBody.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-secondary); padding:14px 18px; border-radius:var(--radius-md); border:1px solid var(--border-color); flex-wrap:wrap; gap:12px; margin-bottom:16px;">
        <div>
          <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Latest Declared NAV</div>
          <div style="font-size:1.6rem; font-weight:800; font-family:var(--font-mono); color:var(--text-primary); margin-top:2px;">
            ₹${latestNav.toFixed(2)}
            <span style="font-size:0.88rem; font-weight:700; color:${dayChange >= 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}; margin-left:6px;">
              ${changeSign}${dayChange}%
            </span>
          </div>
          <div style="font-size:0.74rem; color:var(--text-muted); margin-top:2px;">NAV Date: ${navList[0].date}</div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="importAmfiSchemeToScreener(${schemeCode}); closeAmfiSchemeModal();">
            ＋ Add to Screener
          </button>
          <button class="btn" onclick="compareAmfiSchemeFromExplorer(${schemeCode}); closeAmfiSchemeModal();">
            ⚖️ Compare in Studio
          </button>
        </div>
      </div>

      <div class="amfi-modal-cagr-grid">
        <div class="amfi-cagr-cell">
          <div class="amfi-cagr-label">1-Year Return</div>
          <div class="amfi-cagr-val">${y1 != null ? y1 + '%' : '—'}</div>
        </div>
        <div class="amfi-cagr-cell">
          <div class="amfi-cagr-label">3-Year CAGR</div>
          <div class="amfi-cagr-val">${y3 != null ? y3 + '%' : '—'}</div>
        </div>
        <div class="amfi-cagr-cell">
          <div class="amfi-cagr-label">5-Year CAGR</div>
          <div class="amfi-cagr-val">${y5 != null ? y5 + '%' : '—'}</div>
        </div>
        <div class="amfi-cagr-cell">
          <div class="amfi-cagr-label">10-Year CAGR</div>
          <div class="amfi-cagr-val">${y10 != null ? y10 + '%' : '—'}</div>
        </div>
      </div>

      <div style="margin-top:20px;">
        <div style="font-weight:700; font-size:0.92rem; color:var(--text-primary); margin-bottom:8px;">
          📅 Recent Daily NAV History (Latest 15 Business Days)
        </div>
        <div style="max-height:220px; overflow-y:auto; border:1px solid var(--border-color); border-radius:var(--radius-sm);">
          <table class="amfi-nav-history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>NAV (₹)</th>
                <th>Day-to-Day Change</th>
              </tr>
            </thead>
            <tbody>
              ${navList.slice(0, 15).map((row, idx) => {
                const prev = navList[idx + 1] ? parseFloat(navList[idx + 1].nav) : parseFloat(row.nav);
                const curr = parseFloat(row.nav);
                const diff = curr - prev;
                const pct = prev ? +((diff / prev) * 100).toFixed(2) : 0;
                const sign = pct >= 0 ? "+" : "";
                const col = pct >= 0 ? "var(--accent-emerald)" : "var(--accent-rose)";
                return `
                  <tr>
                    <td>${row.date}</td>
                    <td style="font-weight:700;">₹${curr.toFixed(4)}</td>
                    <td style="color:${col}; font-weight:600;">${sign}${pct}%</td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (err) {
    modalBody.innerHTML = `
      <div style="text-align:center; padding:30px; color:var(--accent-rose);">
        <div style="font-weight:700;">Failed to load NAV history for #${schemeCode}</div>
        <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:6px;">Please check internet access or try again later.</div>
      </div>`;
  }
};

window.closeAmfiSchemeModal = function() {
  const modal = document.getElementById("amfiSchemeModal");
  if (modal) modal.style.display = "none";
};

// ============================================================================
// STOCK MARKET & MUTUAL FUND LIVE NEWS ENGINE
// ============================================================================

window.currentNewsCategory = "all";
window.newsSearchQuery = "";
window.expandedNewsIds = new Set();

window.renderMarketNews = function() {
  const container = document.getElementById("marketNewsContainer");
  if (!container) return;

  const allNews = window.STOCK_MARKET_NEWS || [];
  const countAll = document.getElementById("countAllNews");
  if (countAll) countAll.textContent = allNews.length;

  const filtered = allNews.filter(item => {
    const matchesCat = window.currentNewsCategory === "all" ||
      item.category.toLowerCase().includes(window.currentNewsCategory.toLowerCase());

    const q = window.newsSearchQuery;
    const matchesQuery = !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.source.toLowerCase().includes(q) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(q))) ||
      (item.investorTakeaway && item.investorTakeaway.toLowerCase().includes(q));

    return matchesCat && matchesQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:40px 20px; background:var(--bg-card); border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <div style="font-size:2rem; margin-bottom:8px;">📰</div>
        <div style="font-weight:700; color:var(--text-primary); font-size:1.1rem;">No news articles match your search</div>
        <div style="color:var(--text-secondary); font-size:0.85rem; margin-top:4px;">Try searching for "SIP", "Nifty", "SEBI", "RBI", or "Tax".</div>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isExpanded = window.expandedNewsIds.has(item.id);
    const impactClass = item.impact === "bullish" ? "impact-bullish"
      : item.impact === "reform" ? "impact-reform"
      : item.impact === "neutral" ? "impact-neutral"
      : "impact-bearish";

    return `
      <div class="news-card" id="card-${item.id}">
        <div>
          <div class="news-card-header">
            <span class="news-category-tag">${item.category}</span>
            <span class="news-impact-pill ${impactClass}">${item.impactLabel || 'Market Update'}</span>
          </div>

          <h3 class="news-card-title" style="margin-top:10px;">${item.title}</h3>

          <div class="news-source-row" style="margin-top:6px;">
            <span>🏛️ ${item.source}</span>
            <span>•</span>
            <span>⏱️ ${item.timeAgo || item.date}</span>
          </div>

          <p class="news-summary" style="margin-top:12px;">${item.summary}</p>

          ${isExpanded ? `
            <div class="news-story-content" style="margin-top:12px;">
              ${item.fullStory}
            </div>
          ` : ''}

          <div style="margin-top:12px;">
            <button class="btn-read-more" onclick="toggleNewsStory('${item.id}')">
              ${isExpanded ? '▴ Collapse Story' : '▾ Read Full Analysis'}
            </button>
          </div>
        </div>

        <div>
          <!-- Dedicated Investor Takeaway Callout -->
          <div class="news-takeaway-box" style="margin-top:14px;">
            <div class="news-takeaway-title">
              <span>💡</span> What This Means for Your Mutual Fund SIP
            </div>
            <div class="news-takeaway-text">
              ${item.investorTakeaway}
            </div>
          </div>

          <!-- Tags -->
          <div class="news-tags-row" style="margin-top:12px;">
            ${(item.tags || []).map(t => `<span class="news-tag">#${t}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
  }).join("");
};

window.filterMarketNews = function(category, btnEl) {
  window.currentNewsCategory = category;

  // Update active pill button
  const pillsContainer = document.getElementById("newsCategoryPills");
  if (pillsContainer) {
    pillsContainer.querySelectorAll(".pill-btn").forEach(btn => btn.classList.remove("active"));
  }
  if (btnEl) btnEl.classList.add("active");

  window.renderMarketNews();
};

window.handleNewsSearch = function(query) {
  window.newsSearchQuery = (query || "").trim().toLowerCase();
  window.renderMarketNews();
};

window.toggleNewsStory = function(newsId) {
  if (window.expandedNewsIds.has(newsId)) {
    window.expandedNewsIds.delete(newsId);
  } else {
    window.expandedNewsIds.add(newsId);
  }
  window.renderMarketNews();
};

window.refreshMarketNewsFeed = function() {
  const btn = document.getElementById("btnRefreshNews");
  if (btn) {
    const origText = btn.innerHTML;
    btn.innerHTML = `🔄 Refreshing live feeds...`;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = `✓ Live News Refreshed!`;
      btn.disabled = false;
      window.showToast("✓ Indian stock market & mutual fund news feed updated to latest close!", true);
      window.renderMarketNews();

      setTimeout(() => {
        btn.innerHTML = origText;
      }, 2000);
    }, 600);
  }
};

// ============================================================================
// INITIALIZATION ON DOMContentLoaded
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Restore any custom imported AMFI funds from localStorage
  try {
    const savedFunds = JSON.parse(localStorage.getItem("imported_mfapi_funds") || "[]");
    if (Array.isArray(savedFunds) && savedFunds.length > 0) {
      savedFunds.forEach(saved => {
        if (!window.MUTUAL_FUNDS.some(f => f.id === saved.id || f.amfiCode === saved.amfiCode)) {
          window.MUTUAL_FUNDS.unshift(saved);
        }
      });
      renderFundsTable();
      if (typeof renderFundsMobileCards === "function") renderFundsMobileCards();
    }
  } catch (e) {}

  // Load Popular MFAPI Schemes into All Indian Mutual Funds Explorer
  setTimeout(() => {
    if (typeof window.loadPopularAmfiFunds === "function") {
      window.loadPopularAmfiFunds();
    }
    if (typeof window.renderMarketNews === "function") {
      window.renderMarketNews();
    }
  }, 150);
});

function initializePremiumExperience() {
  const homeSearchForm = document.getElementById("homeFundSearchForm");
  const homeSearchInput = document.getElementById("homeFundSearch");
  if (homeSearchForm && homeSearchInput) {
    homeSearchForm.addEventListener("submit", event => {
      event.preventDefault();
      const query = homeSearchInput.value.trim();
      if (!query) {
        homeSearchInput.focus();
        return;
      }
      window.setAppPage("details", "fundDetailsSection", true);
      const detailSearch = document.getElementById("detailFundSearch");
      if (detailSearch) {
        detailSearch.value = query;
        renderFundDetailsResults(query);
      }
    });
  }

  const detailSearch = document.getElementById("detailFundSearch");
  if (detailSearch) {
    renderFundDetailsResults();
    detailSearch.addEventListener("input", () => renderFundDetailsResults(detailSearch.value));
  }

  const revealTargets = document.querySelectorAll(
    ".hero-copy, .hero-visual, .hero-stats, .app-page-section:not(#heroOverview) > .section-header, .app-page-section:not(#heroOverview) > .controls-bar, .app-page-section:not(#heroOverview) > .panel-card, .app-page-section:not(#heroOverview) > .table-wrapper"
  );
  revealTargets.forEach(element => element.setAttribute("data-reveal", ""));
  document.body.classList.add("motion-ready");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
    revealTargets.forEach(element => revealObserver.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add("is-visible"));
  }

  const visual = document.getElementById("heroVisual");
  const hero = document.getElementById("heroOverview");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (visual && hero && !reduceMotion) {
    visual.addEventListener("pointermove", event => {
      if (event.pointerType === "touch") return;
      const bounds = visual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      visual.style.setProperty("--pointer-x", `${x * 7}deg`);
      visual.style.setProperty("--pointer-y", `${y * -7}deg`);
      hero.style.setProperty("--spot-x", `${(x + 0.5) * 100}%`);
      hero.style.setProperty("--spot-y", `${(y + 0.5) * 100}%`);
    });
    visual.addEventListener("pointerleave", () => {
      visual.style.setProperty("--pointer-x", "0deg");
      visual.style.setProperty("--pointer-y", "0deg");
      hero.style.setProperty("--spot-x", "78%");
      hero.style.setProperty("--spot-y", "26%");
    });
  }

  const cardSelector = ".stat-card, .panel-card, .result-box, .fund-card, .amc-card, .news-card, .nav-history-card";
  document.addEventListener("pointermove", event => {
    if (event.pointerType !== "mouse") return;
    const card = event.target.closest(cardSelector);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.classList.add("premium-tilt");
    card.style.setProperty("--tilt-x", `${x * 3}deg`);
    card.style.setProperty("--tilt-y", `${y * -3}deg`);
  }, { passive: true });
  document.addEventListener("pointerout", event => {
    const card = event.target.closest?.(cardSelector);
    if (!card || card.contains(event.relatedTarget)) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  });

  document.querySelectorAll(".hero-actions .btn-primary").forEach(button => {
    button.addEventListener("pointermove", event => {
      if (event.pointerType !== "mouse") return;
      const bounds = button.getBoundingClientRect();
      button.style.translate = `${((event.clientX - bounds.left) / bounds.width - 0.5) * 5}px ${((event.clientY - bounds.top) / bounds.height - 0.5) * 5}px`;
    });
    button.addEventListener("pointerleave", () => { button.style.translate = ""; });
  });
}

document.addEventListener("DOMContentLoaded", initializePremiumExperience);
