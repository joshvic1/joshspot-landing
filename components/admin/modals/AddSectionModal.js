import * as Dialog from "@radix-ui/react-dialog";
import styles from "@/styles/admin/AddModal.module.css";

import {
  FiType,
  FiEdit3,
  FiPackage,
  FiStar,
  FiImage,
  FiHelpCircle,
  FiSpeaker,
  FiFileText,
  FiClock,
} from "react-icons/fi";

export default function AddSectionModal({ open, setOpen, onAdd }) {
  const sectionTypes = [
    { key: "textWithButton", name: "Text + Button", icon: <FiType /> },
    { key: "text", name: "Text Only", icon: <FiEdit3 /> },
    { key: "productShowcase", name: "Product Showcase", icon: <FiPackage /> },
    { key: "testimonials", name: "Testimonials", icon: <FiStar /> },
    { key: "gallery", name: "Image Gallery", icon: <FiImage /> },
    { key: "faq", name: "FAQ Section", icon: <FiHelpCircle /> },
    { key: "finalCTA", name: "Final Call To Action", icon: <FiSpeaker /> },
    { key: "footer", name: "Footer Section", icon: <FiFileText /> },
    { key: "countdown", name: "Countdown Timer", icon: <FiClock /> },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />

        <Dialog.Content className={styles.modal}>
          <Dialog.Title className={styles.title}>Add New Section</Dialog.Title>
          <Dialog.Close className={styles.closeBtn}>✖</Dialog.Close>

          <div className={styles.list}>
            {sectionTypes.map((item) => (
              <button
                key={item.key}
                className={styles.itemBtn}
                onClick={() => {
                  onAdd(item.key);
                  setOpen(false);
                }}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
