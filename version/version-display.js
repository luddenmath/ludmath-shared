
(() => {
  "use strict";

  const VERSION_FILE = "version.json";

  // Prevent duplicate displays.
  if (document.getElementById("ludmath-version")) return;

  const style = document.createElement("style");

  style.textContent = `
    #ludmath-version {
      position: fixed;
      right: 12px;
      bottom: 10px;
      z-index: 99999;
      font: 11px/1.4 system-ui, sans-serif;
      color: #8b93a7;
      opacity: 0.7;
      cursor: default;
      user-select: none;
    }

    #ludmath-version:hover {
      opacity: 1;
    }
  `;

  document.head.appendChild(style);

  const display = document.createElement("div");
  display.id = "ludmath-version";
  display.textContent = "Version unavailable";

  document.body.appendChild(display);

  fetch(VERSION_FILE, { cache: "no-store" })
    .then(response => {
      if (!response.ok) {
        throw new Error("Version file unavailable");
      }

      return response.json();
    })
    .then(data => {
      const version = data.version || "Unknown";
      const commit = data.commit || "";
      const updated = data.updated || "";

      display.textContent =
        `${version}${commit ? " · " + commit : ""}`;

      display.title = updated
        ? `Last deployed: ${new Date(updated).toLocaleString()}`
        : "Deployment information unavailable";
    })
    .catch(error => {
      console.error("[LudMath Version]", error);
      display.textContent = "Version unavailable";
    });

})();
