export const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const applyTheme = (theme, labels = {}) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.setAttribute("aria-label", theme === "dark" ? labels.light : labels.dark);
  }
};

export const initTheme = (getLabels) => {
  const toggle = document.querySelector("[data-theme-toggle]");
  applyTheme(getInitialTheme(), getLabels());

  toggle?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, getLabels());
  });
};
