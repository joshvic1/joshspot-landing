// utils/uploadImage.js

// Max image size: 10MB (adjust if you want)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function uploadToServer(file) {
  const form = new FormData();
  form.append("image", file);

  const res = await fetch("http://localhost:5000/api/upload", {
    method: "POST",
    body: form,
  });

  const data = await res.json();
  return data.url;
}
