// utils/adminApi.js

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://joshspot-landing-backend-production.up.railway.app";

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
  const res = await fetch(`${BACKEND_URL}/api/page`, {
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
  });

  if (!res.ok) {
    throw new Error("Failed to load page");
  }

  return res.json();
}

/* ---------------- SAVE PAGE (AUTOSAVE) ---------------- */
export async function savePage(page) {
  const res = await fetch(`${BACKEND_URL}/api/page`, {
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

  const res = await fetch(`${BACKEND_URL}/api/upload`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  const data = await res.json();
  return data.url;
}

/* ---------------- DELETE IMAGE ---------------- */
export async function deleteImageOnServer(url) {
  const res = await fetch(`${BACKEND_URL}/api/upload/delete`, {
    method: "POST",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ url }),
  });

  const data = await res.json();
  return data.success;
}
