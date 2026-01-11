// utils/adminApi.js

// Always use same-origin requests (domain-aware)
const API_BASE = "";

// Utility to get auth headers
function getAuthHeaders(extra = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

/* ---------------- FETCH PAGE ---------------- */
export async function fetchPage() {
  const res = await fetch(`${API_BASE}/api/page`, {
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
  });

  if (!res.ok) {
    throw new Error("Failed to load page");
  }

  return res.json();
}

/* ---------------- SAVE PAGE (AUTOSAVE) ---------------- */
export async function savePage(page) {
  const res = await fetch(`${API_BASE}/api/page`, {
    method: "POST",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(page),
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
    headers: getAuthHeaders(),
    body: formData,
  });

  const data = await res.json();
  return data.url;
}

/* ---------------- DELETE IMAGE ---------------- */
export async function deleteImageOnServer(url) {
  const res = await fetch(`${API_BASE}/api/upload/delete`, {
    method: "POST",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ url }),
  });

  const data = await res.json();
  return data.success;
}
