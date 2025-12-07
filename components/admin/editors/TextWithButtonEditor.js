"use client";

import RichTextEditor from "@/components/admin/editors/RichTextEditor";

export default function TextWithButtonEditor({ draft, change, styles }) {
  return (
    <div>
      {/* HEADLINE */}
      <div className={styles.field}>
        <label>Headline / Title</label>
        <RichTextEditor
          value={draft.title || ""}
          onChange={(v) => change("title", v)}
        />
      </div>

      {/* DESCRIPTION */}
      <div className={styles.field}>
        <label>Description</label>
        <RichTextEditor
          value={draft.text || ""}
          onChange={(v) => change("text", v)}
        />
      </div>

      {/* BUTTON TEXT */}
      <div className={styles.field}>
        <label>Button Text</label>
        <input
          className={styles.input}
          value={draft.buttonText || ""}
          onChange={(e) => change("buttonText", e.target.value)}
          placeholder="Enter button label"
        />
      </div>

      {/* BUTTON LINK */}
      <div className={styles.field}>
        <label>Button Link</label>
        <input
          className={styles.input}
          value={draft.buttonLink || ""}
          onChange={(e) => change("buttonLink", e.target.value)}
          placeholder="https://your-link.com"
        />
      </div>

      {/* NEW — BUTTON ALIGNMENT */}
      <div className={styles.field}>
        <label>Button Alignment</label>
        <select
          className={styles.input}
          value={draft.buttonAlign || "left"}
          onChange={(e) => change("buttonAlign", e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
    </div>
  );
}
