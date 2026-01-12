// utils/adminApi.js

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

/* ---------------- DOMAIN HEADER ---------------- */
function getDomainHeaders(extra = {}) {
  if (typeof window === "undefined") return extra;

  return {
    "x-site-domain": window.location.hostname.toLowerCase(),
    ...extra,
  };
}

/* ---------------- AUTH HEADERS ---------------- */
function getAuthHeaders(extra = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

function getDomainHeader() {
  if (typeof window === "undefined") return {};
  return { "x-site-domain": window.location.hostname.toLowerCase() };
}

/* ---------------- FETCH PAGE ---------------- */
export async function fetchPage() {
  const res = await fetch(`${API_BASE}/api/page`, {
    headers: {
      ...getAuthHeaders(),
      ...getDomainHeaders({ "Content-Type": "application/json" }),
    },
  });

  if (!res.ok) {
    throw new Error("Failed to load page");
  }

  return res.json();
}

/* ---------------- SAVE PAGE ---------------- */
export async function savePage(page) {
  const res = await fetch(`${API_BASE}/api/page`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      ...getDomainHeaders({ "Content-Type": "application/json" }),
    },
    body: JSON.stringify({
      ...page,
      lastKnownUpdate: page.updatedAt, // 🔥 ADD THIS
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to save page");
  }

  return res.json();
}

/* ---------------- IMAGE UPLOAD ---------------- */
export async function uploadImageToServer(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      ...getDomainHeaders(), // 🔥 REQUIRED
    },
    body: formData,
  });

  const data = await res.json();
  return data.url;
}

/* ---------------- DELETE IMAGE ---------------- */
export async function deleteImageOnServer(url) {
  const res = await fetch(`${API_BASE}/api/upload/delete`, {
    method: "POST",
    headers: {
      ...getAuthHeaders({ "Content-Type": "application/json" }),
      ...getDomainHeaders(), // 🔥 REQUIRED
    },
    body: JSON.stringify({ url }),
  });

  const data = await res.json();
  return data.success;
}
