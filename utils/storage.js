// utils/storage.js

/* ===================================================
   LOCAL STORAGE KEYS (All storage keys in one place)
=================================================== */
const PAGE_DATA_KEY = "landing_page_data";
const JSON_URL_KEY = "landing_page_json_url";
const PIXEL_KEY = "tiktok_pixel_code";
const THEME_COLOR_KEY = "global_theme_color";

/* ===================================================
   PAGE CONTENT STORAGE (Sections for editor)
=================================================== */

// Save editor page data (sections array)
export function savePageData(data) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PAGE_DATA_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save page data:", e);
  }
}

// Get sections saved in localStorage (or empty array)
export function getPageData() {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(PAGE_DATA_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to parse page data:", e);
    return [];
  }
}

/* ===================================================
   CLOUDINARY JSON URL STORAGE
=================================================== */

export function saveJSONUrl(url) {
  if (typeof window === "undefined") return;
  localStorage.setItem(JSON_URL_KEY, url);
}

export function getJSONUrl() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(JSON_URL_KEY);
}

/* ===================================================
   TIKTOK PIXEL STORAGE
=================================================== */

export function savePixelCode(code) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PIXEL_KEY, code);
}

export function getPixelCode() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(PIXEL_KEY) || "";
}

/* ===================================================
   GLOBAL THEME COLOR STORAGE
=================================================== */

export function saveThemeColor(color) {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_COLOR_KEY, color);
}

export function getThemeColor() {
  if (typeof window === "undefined") return "#6a5dfc";
  return localStorage.getItem(THEME_COLOR_KEY) || "#6a5dfc";
}
