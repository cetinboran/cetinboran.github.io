import { qsa } from "./dom.js";

export const initRevealMotion = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    qsa(".reveal").forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const targets = qsa(".reveal");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );

  targets.forEach((target) => observer.observe(target));
};
