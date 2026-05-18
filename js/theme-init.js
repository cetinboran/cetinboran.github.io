(function () {
  var storedTheme = localStorage.getItem("theme");
  var systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = storedTheme || (systemDark ? "dark" : "light");
})();
