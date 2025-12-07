"use client";

import RichTextEditor from "@/components/admin/editors/RichTextEditor";

export default function TestimonialsEditor({
  draft,
  change,
  updateItemInArray,
  removeArrayItem,
  addArrayItem,
  styles,
}) {
  return (
    <div>
      {/* MAIN TITLE */}
      <div className={styles.field}>
        <label>Section Title</label>
        <input
          className={styles.input}
          value={draft.title || ""}
          placeholder="e.g. What Our Customers Say"
          onChange={(e) => change("title", e.target.value)}
        />
      </div>

      <div className={styles.subTitle}>Testimonials</div>

      {draft.testimonials?.map((t, index) => (
        <div key={index} className={styles.testimonialItem}>
          {/* NAME */}
          <div className={styles.field}>
            <label>Name</label>
            <input
              className={styles.input}
              placeholder="Customer Name"
              value={t.name}
              onChange={(e) =>
                updateItemInArray("testimonials", index, {
                  name: e.target.value,
                })
              }
            />
          </div>

          {/* QUOTE - Rich Text Editor */}
          <div className={styles.field}>
            <label>Quote</label>
            <RichTextEditor
              value={t.quote || ""}
              onChange={(v) =>
                updateItemInArray("testimonials", index, { quote: v })
              }
            />
          </div>

          {/* STAR RATING */}
          <div className={styles.field}>
            <label>Stars (1–5)</label>
            <input
              type="number"
              min="1"
              max="5"
              className={styles.input}
              placeholder="5"
              value={t.stars}
              onChange={(e) =>
                updateItemInArray("testimonials", index, {
                  stars: Number(e.target.value),
                })
              }
            />
          </div>

          {/* REMOVE TESTIMONIAL */}
          <button
            className={styles.removeBtn}
            onClick={() => removeArrayItem("testimonials", index)}
          >
            ✖
          </button>
        </div>
      ))}

      {/* ADD NEW TESTIMONIAL */}
      <button
        className={styles.addMiniBtn}
        onClick={() =>
          addArrayItem("testimonials", {
            name: "New Customer",
            quote: "<p>This product is amazing!</p>",
            stars: 5,
          })
        }
      >
        + Add Testimonial
      </button>
    </div>
  );
}
