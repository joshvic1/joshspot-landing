"use client";

import RichTextEditor from "@/components/admin/editors/RichTextEditor";

export default function SimpleTextEditor({ draft, change, styles }) {
  return (
    <div>
      {/* TITLE */}
      <div className={styles.field}>
        <label>Title</label>
        <RichTextEditor
          value={draft.title || ""}
          onChange={(v) => change("title", v)}
        />
      </div>

      {/* MAIN TEXT */}
      <div className={styles.field}>
        <label>Text</label>
        <RichTextEditor
          value={draft.text || ""}
          onChange={(v) => change("text", v)}
        />
      </div>
    </div>
  );
}
