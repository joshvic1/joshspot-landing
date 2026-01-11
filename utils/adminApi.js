const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://joshspot-landing-backend-production.up.railway.app";

function authHeaders() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : { "Content-Type": "application/json" };
}

/* -------- FETCH PAGE -------- */
export async function fetchPage() {
  const res = await fetch(`${BASE_URL}/api/page`, {
    headers: authHeaders(),
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to load page");

  return await res.json();
}

/* -------- SAVE PAGE -------- */
export async function savePage(page) {
  const res = await fetch(`${BASE_URL}/api/page`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(page),
  });

  if (!res.ok) throw new Error("Failed to save page");

  return await res.json();
}

/* ---------------- IMAGE UPLOAD ---------------- */
export async function uploadImageToServer(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  const data = await res.json();
  return data.url;
}

/* ---------------- DELETE IMAGE ---------------- */
export async function deleteImageOnServer(url) {
  const res = await fetch(`${BASE_URL}/api/upload/delete`, {
    method: "POST",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ url }),
  });

  const data = await res.json();
  return data.success;
}
