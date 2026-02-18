import { BASE_URL, on, qsa } from "./dom.js";

const normalizeHref = (href = "") => {
  try {
    const url = new URL(href, window.location.origin);
    return `${url.pathname.replace(/\/$/, "") || "/"}${url.hash}`;
  } catch {
    return href;
  }
};

const setLinkState = (activeHref) => {
  const active = normalizeHref(activeHref);

  qsa("[data-nav-link]").forEach((link) => {
    const isActive = normalizeHref(link.getAttribute("href") || "") === active;

    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const pagePathToNavHref = () => {
  const path = window.location.pathname.replace(/\/$/, "");

  if (path === "" || path === "/index.html") {
    return `${BASE_URL}/#home`;
  }

  if (path.startsWith("/projects")) {
    return `${BASE_URL}/#projects`;
  }

  return `${BASE_URL}/#contact`;
};

export const initStickyNav = () => {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  on(window, "scroll", update, { passive: true });
  update();
};

export const initActiveNav = () => {
  const navLinks = qsa("[data-nav-link]");
  const validHashes = navLinks
    .map((link) => {
      try {
        return new URL(link.href).hash;
      } catch {
        return "";
      }
    })
    .filter(Boolean);

  const sections = qsa("section[id]").filter((section) => validHashes.includes(`#${section.id}`));

  if (!sections.length || (window.location.pathname !== "/" && window.location.pathname !== "/index.html")) {
    setLinkState(pagePathToNavHref());
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setLinkState(`${BASE_URL}/#${entry.target.id}`);
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
};

export const initNav = () => {
  initStickyNav();
  initActiveNav();
};
