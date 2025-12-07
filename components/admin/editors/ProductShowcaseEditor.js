"use client";

import { deleteImageOnServer } from "@/utils/adminApi";

export default function ProductShowcaseEditor({
  draft,
  change,
  updateItemInArray,
  removeArrayItem,
  addArrayItem,
  uploadImage,
  styles,
}) {
  async function handleDeleteImage(imgUrl, index) {
    if (!imgUrl) return alert("No image to delete.");

    const confirmDel = confirm("Delete this image from Cloudinary?");
    if (!confirmDel) return;

    const success = await deleteImageOnServer(imgUrl);

    if (!success) {
      alert("Failed to delete image.");
      return;
    }

    updateItemInArray("products", index, { image: "" });
  }

  return (
    <div>
      {/* SECTION TITLE */}
      <div className={styles.field}>
        <label>Section Title</label>
        <input
          className={styles.input}
          value={draft.title || ""}
          onChange={(e) => change("title", e.target.value)}
          placeholder="e.g. Featured Products"
        />
      </div>

      {/* TITLE ALIGNMENT */}
      <div className={styles.field}>
        <label>Title Alignment</label>
        <select
          className={styles.input}
          value={draft.titleAlignment || "center"}
          onChange={(e) => change("titleAlignment", e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      {/* TITLE COLOR */}
      <div className={styles.field}>
        <label>Title Color</label>
        <input
          type="color"
          className={styles.colorInput}
          value={draft.titleColor || "#000000"}
          onChange={(e) => change("titleColor", e.target.value)}
        />
      </div>

      {/* HEADER BACKGROUND */}
      <div className={styles.field}>
        <label>Title Background</label>
        <input
          type="color"
          className={styles.colorInput}
          value={draft.headerBackground || "#ffffff"}
          onChange={(e) => change("headerBackground", e.target.value)}
        />
      </div>

      <div className={styles.subTitle}>Products</div>

      {draft.products?.map((p, index) => {
        async function handleUploadClick() {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";

          input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            const url = await uploadImage(file);
            if (!url) return alert("Upload failed");

            updateItemInArray("products", index, { image: url });
          };

          input.click();
        }

        return (
          <div key={index} className={styles.productCard}>
            <div className={styles.productFields}>
              <input
                className={styles.input}
                placeholder="Product Name"
                value={p.name}
                onChange={(e) =>
                  updateItemInArray("products", index, { name: e.target.value })
                }
              />

              <input
                className={styles.input}
                placeholder="Short Description"
                value={p.desc}
                onChange={(e) =>
                  updateItemInArray("products", index, { desc: e.target.value })
                }
              />

              <input
                className={styles.input}
                placeholder="Price"
                value={p.price}
                onChange={(e) =>
                  updateItemInArray("products", index, {
                    price: e.target.value,
                  })
                }
              />

              <input
                className={styles.input}
                placeholder="Button Link"
                value={p.link}
                onChange={(e) =>
                  updateItemInArray("products", index, { link: e.target.value })
                }
              />
            </div>

            {/* IMAGE PREVIEW + DELETE */}
            <div className={styles.imageSection}>
              {p.image ? (
                <div className={styles.imageWrapper}>
                  <img src={p.image} className={styles.productThumb} />

                  <button
                    className={styles.removeBtnSmall}
                    onClick={() => handleDeleteImage(p.image, index)}
                  >
                    ✖
                  </button>
                </div>
              ) : (
                <div className={styles.placeholderThumb}>No Image</div>
              )}

              <button className={styles.uploadBtn} onClick={handleUploadClick}>
                Upload Image
              </button>
            </div>

            {/* DELETE ENTIRE PRODUCT */}
            <button
              className={styles.removeBtn}
              onClick={async () => {
                if (p.image) {
                  const ok = confirm("Delete product AND its image?");
                  if (ok) await deleteImageOnServer(p.image);
                }
                removeArrayItem("products", index);
              }}
            >
              ✖
            </button>
          </div>
        );
      })}

      {draft.products?.length < 6 ? (
        <button
          className={styles.addMiniBtn}
          onClick={() =>
            addArrayItem("products", {
              name: "New Product",
              desc: "Description…",
              price: "",
              link: "",
              image: "",
            })
          }
        >
          + Add Product
        </button>
      ) : (
        <p className={styles.limitWarning}>Maximum of 6 products allowed.</p>
      )}
    </div>
  );
}
