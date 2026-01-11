"use client";

import RichTextEditor from "@/components/admin/editors/RichTextEditor";

export default function FinalCTAEditor({ draft, change, styles }) {
  return (
    <div>
      {/* CTA TITLE */}
      <div className={styles.field}>
        <label>Main Title</label>
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
      {/* <div className={styles.field}>
        <label>Button Text</label>
        <input
          className={styles.input}
          value={draft.buttonText || ""}
          onChange={(e) => change("buttonText", e.target.value)}
          placeholder="Order Now / Get Offer"
        />
      </div> */}
      {/* BUTTON LINK */}
      {/* <div className={styles.field}>
        <label>Button Link</label>
        <input
          className={styles.input}
          value={draft.buttonLink || ""}
          onChange={(e) => change("buttonLink", e.target.value)}
          placeholder="https://example.com"
        />
      </div> */}
      {/* NEW — BUTTON ALIGNMENT */}
      {/* <div className={styles.field}>
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
      </div> */}

      <div className={styles.field}>
        <label>Enable contact form</label>
        <select
          className={styles.input}
          value={draft.hasForm === true ? "yes" : "no"}
          onChange={(e) => change("hasForm", e.target.value === "yes")}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className={styles.field}>
        <label>Form - Name Label</label>
        <input
          className={styles.input}
          value={draft.formNameLabel ?? ""}
          onChange={(e) => change("formNameLabel", e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className={styles.field}>
        <label>Form - Phone/WhatsApp Label</label>
        <input
          className={styles.input}
          value={draft.formPhoneLabel ?? ""}
          onChange={(e) => change("formPhoneLabel", e.target.value)}
          placeholder="Enter your WhatsApp number"
        />
      </div>

      <div className={styles.field}>
        <label>Redirect URL after submit</label>
        <input
          className={styles.input}
          value={draft.formRedirect || ""}
          onChange={(e) => change("formRedirect", e.target.value)}
          placeholder="https://wa.me/234XXXXXXXXXX or a thank-you page"
        />
      </div>
    </div>
  );
}
