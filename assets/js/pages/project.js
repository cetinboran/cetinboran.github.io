import { qsa, toAbsoluteUrl } from "../modules/dom.js";

const hydrateAbsoluteLinks = () => {
  qsa("a[data-path]").forEach((anchor) => {
    if (!(anchor instanceof HTMLAnchorElement)) return;
    const path = anchor.dataset.path;
    if (!path) return;
    anchor.href = toAbsoluteUrl(path);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  hydrateAbsoluteLinks();
});
