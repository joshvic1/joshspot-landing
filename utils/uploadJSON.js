// utils/uploadJSON.js

export async function uploadJSONToCloudinary(jsonData) {
  try {
    if (typeof jsonData !== "object") {
      throw new Error("Invalid JSON data passed to uploadJSONToCloudinary()");
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !preset) {
      console.error("Missing Cloudinary keys in .env");
      alert("Cloudinary upload failed: Missing environment variables.");
      return null;
    }

    // 🔑 Use domain to isolate tenants
    const domain =
      typeof window !== "undefined"
        ? window.location.hostname.replace(/\./g, "_")
        : "unknown_site";

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;

    const jsonBlob = new Blob([JSON.stringify(jsonData)], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("file", jsonBlob, `${domain}.json`);
    formData.append("upload_preset", preset);

    // ✅ Unique per site, replaced on every publish
    formData.append("public_id", `landing_pages/${domain}`);
    formData.append("resource_type", "raw");

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const result = await upload.json();

    if (!result.secure_url) {
      console.error("Cloudinary JSON upload error:", result);
      alert("Failed to publish changes. Check console for details.");
      return null;
    }

    return result.secure_url;
  } catch (error) {
    console.error("uploadJSONToCloudinary() failed:", error);
    alert("Publishing failed due to a network or JSON error.");
    return null;
  }
}
