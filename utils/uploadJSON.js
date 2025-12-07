// utils/uploadJSON.js

export async function uploadJSONToCloudinary(jsonData) {
  try {
    // Validate JSON
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

    // Cloudinary endpoint for RAW files (JSON)
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;

    // Convert JSON to Blob
    const jsonBlob = new Blob([JSON.stringify(jsonData)], {
      type: "application/json",
    });

    // Create form
    const formData = new FormData();
    formData.append("file", jsonBlob, "landing-page.json");
    formData.append("upload_preset", preset);

    // Fixed public ID means the JSON gets replaced every publish
    formData.append("public_id", "landing_page_data");
    formData.append("resource_type", "raw");

    // Upload
    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const result = await upload.json();

    // Error handling
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
