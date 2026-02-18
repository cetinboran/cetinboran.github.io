const domainFromMeta = document.querySelector('meta[name="site-domain"]')?.content?.trim();
const domainFromData = document.documentElement.dataset.domain?.trim();
const configuredDomain = domainFromMeta || domainFromData;

export const BASE_URL = configuredDomain ? `https://${configuredDomain}`.replace(/\/+$/, "") : window.location.origin;

export const qs = (selector, root = document) => root.querySelector(selector);
export const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

export const byId = (id) => document.getElementById(id);

export const on = (target, eventName, handler, options) => {
  if (!target) return;
  target.addEventListener(eventName, handler, options);
};

export const toAbsoluteUrl = (path = "/") => {
  if (!path) return BASE_URL;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, `${BASE_URL}/`).toString();
};

export const setCurrentYear = (selector = "[data-current-year]") => {
  qsa(selector).forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
};
