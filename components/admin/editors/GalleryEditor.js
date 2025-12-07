"use client";

import { useRef } from "react";
import { deleteImageOnServer } from "@/utils/adminApi";

export default function GalleryEditor({
  draft,
  addArrayItem,
  removeArrayItem,
  uploadImage,
  styles,
}) {
  const fileInputRef = useRef();
  async function handleUpload(e) {
    if (draft.images?.length >= 6) {
      alert("Maximum of 6 images allowed.");
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) addArrayItem("images", url);

    fileInputRef.current.value = "";
  }
  async function handleDelete(img, index) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    const success = await deleteImageOnServer(img);

    if (success) {
      removeArrayItem("images", index);
    } else {
      alert("Failed to delete image from server.");
    }
  }

  return (
    <div>
      {/* TITLE */}
      <div className={styles.subTitle}>Gallery Images</div>

      {/* IMAGE GRID */}
      <div className={styles.galleryGrid}>
        {draft.images?.map((img, index) => (
          <div key={index} className={styles.galleryItem}>
            <img src={img} className={styles.galleryThumb} />

            <button
              className={styles.removeBtn}
              onClick={() => handleDelete(img, index)}
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      {/* ADD IMAGE BUTTON */}
      {draft.images?.length < 6 && (
        <label className={styles.uploadBtn}>
          + Upload Image
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </label>
      )}
    </div>
  );
}
