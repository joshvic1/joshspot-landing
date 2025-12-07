"use client";

import RichTextEditor from "@/components/admin/RichTextEditor";

export default function TextOnlyEditor({ draft, change, styles }) {
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

      {/* BODY TEXT */}
      <div className={styles.field}>
        <label>Body Text</label>
        <RichTextEditor
          value={draft.text || ""}
          onChange={(v) => change("text", v)}
        />
      </div>
    </div>
  );
}
