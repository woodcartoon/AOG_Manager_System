(function () {
    "use strict";

    var themes = ["light", "dark", "night"];
    var labels = {
        light: "Light mode",
        dark: "Dark mode",
        night: "Night mode"
    };
    var stored = window.localStorage.getItem("aog_theme");
    var current = themes.indexOf(stored) === -1 ? "light" : stored;

    function applyTheme(theme) {
        current = theme;
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem("aog_theme", theme);

        document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
            button.textContent = labels[current];
            button.setAttribute("aria-label", "Switch theme. Current: " + labels[current]);
            button.title = "Switch theme. Current: " + labels[current];
        });
    }

    applyTheme(current);

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
            button.addEventListener("click", function () {
                var next = (themes.indexOf(current) + 1) % themes.length;
                applyTheme(themes[next]);
            });
        });
        applyTheme(current);
    });
})();
