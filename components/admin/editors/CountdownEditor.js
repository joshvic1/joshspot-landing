"use client";

import RichTextEditor from "@/components/admin/editors/RichTextEditor";
import styles from "@/styles/admin/CountdownEditor.module.css";

export default function CountdownEditor({ draft, change }) {
  return (
    <div className={styles.editorSection}>
      {/* TITLE (Uses Custom Rich Text Editor) */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Countdown Title</label>

        <RichTextEditor
          label=""
          value={draft.title || ""}
          onChange={(v) => change("title", v)}
        />
      </div>

      {/* DEADLINE */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Deadline (Date & Time)</label>
        <input
          type="datetime-local"
          value={draft.deadline || ""}
          onChange={(e) => change("deadline", e.target.value)}
        />
      </div>

      {/* BUTTON INPUTS */}
      <div className={styles.splitRow}>
        {/* BUTTON TEXT */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Button Text</label>
          <input
            className={styles.input}
            placeholder="Buy Now / Claim Offer"
            value={draft.buttonText || ""}
            onChange={(e) => change("buttonText", e.target.value)}
          />
        </div>

        {/* BUTTON LINK */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Button Link</label>
          <input
            className={styles.input}
            placeholder="https://example.com"
            value={draft.buttonLink || ""}
            onChange={(e) => change("buttonLink", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
