import { qsa } from "../modules/dom.js";

const hydrateLastUpdated = () => {
  qsa("[data-last-updated]").forEach((node) => {
    const raw = node.getAttribute("datetime");
    if (!raw) return;

    const date = new Date(raw);
    if (Number.isNaN(date.getTime())) return;

    node.textContent = new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  hydrateLastUpdated();
});
