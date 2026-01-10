// utils/uploadImage.js

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function uploadToServer(file) {
  if (!file) return null;

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Image exceeds 10MB limit");
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  if (!token) {
    throw new Error("Not authenticated");
  }

  const form = new FormData();
  form.append("image", file);

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  const data = await res.json();

  if (!data.url) {
    throw new Error("Upload failed");
  }

  return data.url;
}
