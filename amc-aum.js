// Quarterly average AUM snapshots (₹ crore), sourced from AMFI's Jul–Sep 2026 data.
// AUM changes over time; keep the reporting period visible in the directory.
(() => {
  const snapshot = {
    period: "Jul–Sep 2026",
    source: "https://www.amfiindia.com/aum-data/average-aum",
    values: {
      "sbi": 1331480,
      "icici": 1214131,
      "hdfc": 995986,
      "nippon": 802859,
      "kotak": 633846,
      "aditya-birla-sun-life": 446390,
      "uti": 404210,
      "axis": 391509,
      "dsp": 247569,
      "mirae": 245364
    }
  };

  Object.entries(snapshot.values).forEach(([id, value]) => {
    const house = window.FUND_HOUSES?.find(item => item.id === id);
    if (!house) return;
    house.aumTotalCr = value;
    house.aumPeriod = snapshot.period;
    house.aumSource = snapshot.source;
  });

  const labelAum = () => {
    document.querySelectorAll(".amc-sub-info span").forEach(span => {
      if (!span.textContent.includes("Tracked AUM:")) return;
      span.innerHTML = span.innerHTML.replace(
        "Tracked AUM:",
        `AMFI average AUM (${snapshot.period}):`
      );
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", labelAum, { once: true });
  } else {
    labelAum();
  }
  new MutationObserver(labelAum).observe(document.documentElement, { childList: true, subtree: true });
})();

