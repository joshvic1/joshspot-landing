"use client";

import RichTextEditor from "@/components/admin/editors/RichTextEditor"; // ← your custom editor

export default function FAQEditor({
  draft,
  change,
  updateItemInArray,
  removeArrayItem,
  addArrayItem,
  styles,
}) {
  return (
    <div className={styles.faqWrapper}>
      {/* TITLE INPUT */}
      <div className={styles.field}>
        <label className={styles.label}>FAQ Section Title</label>
        <input
          className={styles.input}
          value={draft.title || ""}
          onChange={(e) => change("title", e.target.value)}
          placeholder="Frequently Asked Questions"
        />
      </div>

      <div className={styles.subHead}>FAQ Items</div>

      {/* FAQ ITEMS */}
      {draft.faqs?.map((item, index) => (
        <div key={index} className={styles.faqCard}>
          {/* QUESTION */}
          <input
            className={styles.input}
            placeholder="Question"
            value={item.q}
            onChange={(e) =>
              updateItemInArray("faqs", index, { q: e.target.value })
            }
          />

          {/* ANSWER — CUSTOM EDITOR */}
          <RichTextEditor
            value={item.a}
            onChange={(v) => updateItemInArray("faqs", index, { a: v })}
          />

          {/* REMOVE BUTTON */}
          <button
            className={styles.removeFaq}
            onClick={() => removeArrayItem("faqs", index)}
          >
            ✕
          </button>
        </div>
      ))}

      {/* ADD BUTTON */}
      <button
        className={styles.addFaqBtn}
        onClick={() =>
          addArrayItem("faqs", {
            q: "New Question",
            a: "<p>Your answer…</p>",
          })
        }
      >
        + Add FAQ Item
      </button>
    </div>
  );
}
