import { qsa, toAbsoluteUrl } from "../modules/dom.js";
import { initProjectFilters } from "../modules/projects.js";

const hydrateProjectLinks = () => {
  qsa("[data-path]").forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) return;
    const path = link.dataset.path;
    if (!path) return;
    link.href = toAbsoluteUrl(path);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  hydrateProjectLinks();
  initProjectFilters();
});
