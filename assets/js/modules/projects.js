import { byId, qsa } from "./dom.js";

export const initProjectFilters = ({
  cardsSelector = "[data-project-card]",
  searchSelector = "#project-search",
  tagSelector = "[data-tag-filter]",
  countSelector = "#project-results-count",
} = {}) => {
  const cards = qsa(cardsSelector);
  const searchInput = document.querySelector(searchSelector);
  const tagButtons = qsa(tagSelector);
  const resultCount = byId(countSelector?.replace("#", ""));

  if (!cards.length) return;

  let activeTag = "all";

  const normalize = (text = "") => text.toLowerCase().trim();

  const applyFilters = () => {
    const query = normalize(searchInput?.value || "");
    let visibleCount = 0;

    cards.forEach((card) => {
      const tags = normalize(card.dataset.tags || "");
      const haystack = normalize(card.textContent || "");

      const passesTag = activeTag === "all" || tags.split(",").map((tag) => tag.trim()).includes(activeTag);
      const passesQuery = !query || haystack.includes(query);
      const shouldShow = passesTag && passesQuery;

      card.hidden = !shouldShow;
      card.setAttribute("aria-hidden", String(!shouldShow));

      if (shouldShow) visibleCount += 1;
    });

    if (resultCount) {
      resultCount.textContent = `${visibleCount} proje bulundu`;
    }
  };

  searchInput?.addEventListener("input", applyFilters);

  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTag = normalize(button.dataset.tagFilter || "all");

      tagButtons.forEach((node) => node.classList.toggle("is-active", node === button));
      applyFilters();
    });
  });

  applyFilters();
};
