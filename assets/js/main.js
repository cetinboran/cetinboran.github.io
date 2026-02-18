import { setCurrentYear } from "./modules/dom.js";
import { initNav } from "./modules/nav.js";
import { initRevealMotion } from "./modules/motion.js";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initRevealMotion();
  setCurrentYear();
});
