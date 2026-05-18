import { applyTheme, initTheme } from "./theme.js";
import { getThemeLabels, initLanguage } from "./language.js";

const initHeader = () => {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  const closeNav = () => {
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  toggle?.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav?.classList.toggle("is-open", !expanded);
    document.body.classList.toggle("nav-open", !expanded);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
};

document.addEventListener("DOMContentLoaded", () => {
  initLanguage(() => applyTheme(document.documentElement.dataset.theme || "light", getThemeLabels()));
  initTheme(getThemeLabels);
  initHeader();

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
});
