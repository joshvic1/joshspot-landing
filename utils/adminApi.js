const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"; // fallback for local dev

// Utility to get token
function getAuthHeaders(extra = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  return {
    Authorization: token ? `Bearer ${token}` : "",
    ...extra,
  };
}

/* ---------------------------- FETCH SECTIONS ---------------------------- */
export async function fetchSections() {
  const res = await fetch(`${BASE_URL}/api/page`);
  const data = await res.json();
  return data.sections || [];
}

export async function fetchPage() {
  const token = localStorage.getItem("auth_token");

  const res = await fetch(`${BASE_URL}/api/page`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      : {},
  });

  const data = await res.json();

  if (data.error === "Unauthorized") {
    throw new Error("Unauthorized");
  }

  return data;
}

/* ---------------------------- SAVE PAGE ---------------------------- */
export async function savePage(page) {
  const token = localStorage.getItem("auth_token");

  const res = await fetch(`${BASE_URL}/api/page`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(page),
  });

  return await res.json();
}

/* ---------------------------- IMAGE UPLOAD ---------------------------- */
export async function uploadImageToServer(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: getAuthHeaders(), // DO NOT set content-type
    body: formData,
  });

  const data = await res.json();
  return data.url;
}

/* ---------------------------- DELETE IMAGE ---------------------------- */
export async function deleteImageOnServer(url) {
  try {
    const res = await fetch(`${BASE_URL}/api/upload/delete`, {
      method: "POST",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("Delete failed:", err);
    return false;
  }
}
