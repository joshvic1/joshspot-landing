"use client";

import RichTextEditor from "@/components/admin/editors/RichTextEditor";

export default function FooterEditor({ draft, change, styles }) {
  return (
    <div>
      <div className={styles.field}>
        <label>Footer HTML Content</label>
        <RichTextEditor
          value={draft.text || ""}
          onChange={(v) => change("text", v)}
        />
      </div>
    </div>
  );
}
