"use client";

import { useState, useEffect } from "react";
import styles from "@/styles/admin/PixelModal.module.css";

export default function TikTokPixelModal({
  open,
  setOpen,
  currentPixel,
  savePixel,
}) {
  const [pixel, setPixel] = useState(currentPixel || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPixel(currentPixel || "");
  }, [currentPixel]);

  if (!open) return null;

  async function handleSave() {
    setLoading(true);
    await savePixel(pixel);
    setLoading(false);
    setOpen(false);
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3 className={styles.title}>TikTok Pixel</h3>
        <p className={styles.desc}>
          Enter your TikTok Pixel ID. Example: <code>XXXXXXXXXX</code>
        </p>

        <input
          className={styles.input}
          value={pixel}
          onChange={(e) => setPixel(e.target.value)}
          placeholder="TikTok Pixel ID"
        />

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={() => setOpen(false)}>
            Cancel
          </button>

          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Pixel"}
          </button>
        </div>
      </div>

      {/* Click outside to close */}
      <div className={styles.overlay} onClick={() => setOpen(false)} />
    </div>
  );
}
