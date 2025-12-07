"use client";

import * as Dialog from "@radix-ui/react-dialog";
import styles from "@/styles/admin/Modal.module.css";
import { useEffect, useState } from "react";

// --- IMPORT MINI EDITORS ---
import SimpleTextWithButtonEditor from "../editors/TextWithButtonEditor";
import SimpleTextEditor from "../editors/SimpleTextEditor";
import ProductShowcaseEditor from "../editors/ProductShowcaseEditor";
import GalleryEditor from "../editors/GalleryEditor";
import FAQEditor from "../editors/FAQEditor";
import FinalCTAEditor from "../editors/FinalCTAEditor";
import FooterEditor from "../editors/FooterEditor";
import CountdownEditor from "../editors/CountdownEditor";
import TestimonialsEditor from "../editors/TestimonialsEditor";

export default function EditSectionModal({
  open,
  setOpen,
  section,
  updateSection,
  uploadImage,
}) {
  const [draft, setDraft] = useState(null);

  // Load draft when modal opens
  useEffect(() => {
    if (section) {
      setDraft(JSON.parse(JSON.stringify(section))); // deep clone
    }
  }, [section]);

  if (!draft) return null;

  // General change handler
  function change(key, value) {
    setDraft({ ...draft, [key]: value });
  }

  function addArrayItem(key, newItem) {
    const arr = draft[key] ? [...draft[key], newItem] : [newItem];
    setDraft({ ...draft, [key]: arr });
  }

  function updateItemInArray(key, index, data) {
    const arr = [...draft[key]];
    arr[index] = { ...arr[index], ...data };
    setDraft({ ...draft, [key]: arr });
  }

  function removeArrayItem(key, index) {
    const arr = [...draft[key]];
    arr.splice(index, 1);
    setDraft({ ...draft, [key]: arr });
  }

  // Allowed button section types
  const buttonSections = [
    "textWithButton",
    "productShowcase",
    "finalCTA",
    "countdown",
  ];

  // Select correct editor
  function renderEditor() {
    const editorProps = {
      draft,
      change,
      styles,
      addArrayItem,
      updateItemInArray,
      removeArrayItem,
      uploadImage,
    };

    switch (draft.type) {
      case "textWithButton":
        return <SimpleTextWithButtonEditor {...editorProps} />;
      case "text":
        return <SimpleTextEditor {...editorProps} />;
      case "productShowcase":
        return <ProductShowcaseEditor {...editorProps} />;
      case "testimonials":
        return <TestimonialsEditor {...editorProps} />;
      case "gallery":
        return <GalleryEditor {...editorProps} />;
      case "faq":
        return <FAQEditor {...editorProps} />;
      case "finalCTA":
        return <FinalCTAEditor {...editorProps} />;
      case "footer":
        return <FooterEditor {...editorProps} />;
      case "countdown":
        return <CountdownEditor {...editorProps} />;
      default:
        return <p>No editor found for this section type.</p>;
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />

        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>Edit Section</Dialog.Title>
          <Dialog.Close className={styles.closeBtn}>✖</Dialog.Close>

          {/* BACKGROUND COLOR */}
          <div className={styles.row}>
            <label>Background Color</label>
            <div className={styles.inlineColor}>
              <input
                type="color"
                value={draft.bgColor || "#ffffff"}
                onChange={(e) => change("bgColor", e.target.value)}
              />
              <input
                className={styles.input}
                value={draft.bgColor || "#ffffff"}
                onChange={(e) => change("bgColor", e.target.value)}
              />
            </div>
          </div>

          {/* TEXT COLOR */}
          <div className={styles.row}>
            <label>Text Color</label>
            <div className={styles.inlineColor}>
              <input
                type="color"
                value={draft.textColor || "#000000"}
                onChange={(e) => change("textColor", e.target.value)}
              />
              <input
                className={styles.input}
                value={draft.textColor || "#000000"}
                onChange={(e) => change("textColor", e.target.value)}
              />
            </div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* CONDITIONAL BUTTON FIELDS */}
          {/* ------------------------------------------------------ */}

          {buttonSections.includes(draft.type) && (
            <>
              {/* BUTTON TEXT + TEXT COLOR */}
              <div className={styles.row}>
                <label>Button Text</label>
                <div className={styles.inputWithColor}>
                  <input
                    className={styles.input}
                    value={draft.buttonText || ""}
                    placeholder="Enter button text"
                    onChange={(e) => change("buttonText", e.target.value)}
                  />
                  <input
                    type="color"
                    className={styles.colorBoxMini}
                    value={draft.buttonTextColor || "#ffffff"}
                    onChange={(e) => change("buttonTextColor", e.target.value)}
                  />
                </div>
              </div>

              {/* BUTTON LINK + BACKGROUND COLOR */}
              <div className={styles.row}>
                <label>Button Link</label>
                <div className={styles.inputWithColor}>
                  <input
                    className={styles.input}
                    placeholder="https://example.com"
                    value={draft.buttonLink || ""}
                    onChange={(e) => change("buttonLink", e.target.value)}
                  />
                  <input
                    type="color"
                    className={styles.colorBoxMini}
                    value={draft.buttonColor || "#000000"}
                    onChange={(e) => change("buttonColor", e.target.value)}
                  />
                </div>
              </div>

              {/* BUTTON ALIGNMENT */}
              <div className={styles.row}>
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
            </>
          )}

          {/* DYNAMIC SECTION EDITOR */}
          <div className={styles.editorWrapper}>{renderEditor()}</div>

          {/* SAVE BUTTON */}
          <button
            className={styles.saveBtn}
            onClick={() => {
              updateSection(draft.id, draft);
              setOpen(false);
            }}
          >
            Save & Close
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
