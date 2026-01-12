"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import AddSectionModal from "@/components/admin/modals/AddSectionModal";
import EditSectionModal from "@/components/admin/modals/EditSectionModal";
import TikTokPixelModal from "@/components/admin/TikTokPixelModal";
import { useRouter } from "next/navigation";

import styles from "@/styles/admin/Editor.module.css";

import { fetchPage, savePage, uploadImageToServer } from "@/utils/adminApi";

/* ---------------------- ICONS ---------------------- */
const IconAdd = () => (
  <svg width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
    <path d="M10 4v12M4 10h12" />
  </svg>
);

const IconDrag = () => (
  <svg width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
    <circle cx="7" cy="7" r="1.5" />
    <circle cx="13" cy="7" r="1.5" />
    <circle cx="7" cy="13" r="1.5" />
    <circle cx="13" cy="13" r="1.5" />
  </svg>
);

const IconEdit = () => (
  <svg width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
    <path d="M12 2l4 4L6 16H2v-4z" />
  </svg>
);

const IconHide = () => (
  <svg width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
    <path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
    <circle cx="10" cy="10" r="3" />
  </svg>
);

const IconShow = () => (
  <svg width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
    <circle cx="10" cy="10" r="3" />
  </svg>
);

const IconDelete = () => (
  <svg width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2">
    <path d="M3 6h14M8 6v10M12 6v10M5 6l1-3h8l1 3" />
  </svg>
);

/* ---------------------- MAIN PAGE ---------------------- */

export default function EditorPage() {
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [sections, setSections] = useState([]);

  const [activeSection, setActiveSection] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showPixel, setShowPixel] = useState(false);

  /* Authentication Gate */
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/bs-admin"); // redirect to login
    }
  }, []);

  const [site, setSite] = useState(null);

  useEffect(() => {
    fetchPage().then((data) => {
      setPage(data.page);
      setSections(data.page?.sections || []);
      setSite(data.site);
    });
  }, []);

  function saveAll(updatedSections) {
    setSections(updatedSections);

    setPage((prev) => {
      if (!prev) return prev;

      const updated = {
        ...prev,
        sections: updatedSections,
      };

      savePage(updated).catch((err) => {
        if (err.message.includes("STALE_EDITOR")) {
          alert(
            "This page was updated in another tab. Please refresh to avoid overwriting changes."
          );
        }
      });

      return updated;
    });
  }
  useEffect(() => {
    function onFocus() {
      fetchPage().then((data) => {
        setPage(data.page);
        setSections(data.page.sections || []);
      });
    }

    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  function toggleHide(id) {
    const updated = sections.map((s) =>
      s.id === id ? { ...s, hidden: !s.hidden } : s
    );
    saveAll(updated);
  }

  function handleDrag(result) {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    saveAll(items);
  }

  function updateSection(id, data) {
    const updated = sections.map((s) => (s.id === id ? { ...s, ...data } : s));

    saveAll(updated);
  }

  /* ---------------------- CLEAN THUMBNAIL PREVIEW ---------------------- */
  function renderPreview(section) {
    return (
      <div className={styles.thumbWrapper}>
        {section.type === "imageText" && section.image && (
          <img src={section.image} className={styles.thumbImage} />
        )}

        {section.type === "productShowcase" && section.products?.[0]?.image && (
          <img src={section.products[0].image} className={styles.thumbImage} />
        )}

        {section.type === "gallery" && section.images?.[0] && (
          <img src={section.images[0]} className={styles.thumbImage} />
        )}

        <div>
          <h4
            className={styles.thumbTitle}
            style={{ color: section.textColor }}
            dangerouslySetInnerHTML={{ __html: section.title || "(No Title)" }}
          />

          <div
            className={styles.sectionLabel}
            style={{
              background: "rgba(0,0,0,0.2)",
              color: section.textColor || "#fff",
            }}
          >
            {section.type}
          </div>
        </div>
      </div>
    );
  }

  if (!page) return <p>Loading...</p>;

  /* ---------------------- RENDER PAGE ---------------------- */
  function createSection(type) {
    const base = {
      id: `${type}_${Date.now()}`,
      type,
      hidden: false,
      bgColor: "#ffffff",
      textColor: "#000000",
    };

    const presets = {
      text: { text: "Your text here" },
      textWithButton: {
        text: "Your text here",
        buttonText: "Click me",
        buttonLink: "#",
      },
      productShowcase: { title: "Products", products: [] },
      testimonials: { title: "Testimonials", testimonials: [] },
      gallery: { images: [] },
      faq: { title: "FAQs", faqs: [] },
      finalCTA: {
        title: "Final Call To Action",
        text: "Your CTA text",
        buttonText: "Get Started",
        buttonLink: "#",
      },
      footer: { text: "© 2025 Your Brand" },
      countdown: {
        title: "Offer Ends Soon",
        deadline: "",
        buttonText: "Claim Offer",
        buttonLink: "#",
      },
    };

    return { ...base, ...(presets[type] || {}) };
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerRight}>
          <h2 className={styles.logo}>{site?.name || "Dashboard"}</h2>

          <button
            className={styles.pixelBtn}
            onClick={() => setShowPixel(true)}
          >
            Set Pixel
          </button>

          <button className={styles.addBtn} onClick={() => setShowAdd(true)}>
            <IconAdd /> Add Section
          </button>
        </div>
        <div className={styles.headerRight}>
          <button
            className={styles.addBtn}
            onClick={() => router.push("/bs-admin/submissions")}
          >
            View Leads
          </button>
          <button className={styles.addBtn} onClick={() => router.push("/")}>
            View Homepage
          </button>
        </div>
      </header>

      <div className={styles.wrapper}>
        {/* PIXEL MODAL */}

        {/* SECTION LIST */}
        <DragDropContext onDragEnd={handleDrag}>
          <Droppable droppableId="editor">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.container}
              >
                {sections.map((section, index) => (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={styles.sectionCard}
                        style={{
                          background: section.bgColor || "#ffffff",
                          color: section.textColor || "#000000",
                          opacity: section.hidden ? 0.45 : 1,
                          ...provided.draggableProps.style,
                        }}
                      >
                        <div
                          className={styles.dragHandle}
                          {...provided.dragHandleProps}
                        >
                          <IconDrag />
                        </div>

                        {/* Thumbnail */}
                        <div className={styles.preview}>
                          <div>{renderPreview(section)}</div>
                        </div>

                        {/* Actions */}
                        <div className={styles.actions}>
                          <button
                            onClick={() => {
                              setActiveSection(section);
                              setShowEdit(true);
                            }}
                            className={styles.actionBtn}
                          >
                            <IconEdit /> Edit
                          </button>

                          <button
                            onClick={() => toggleHide(section.id)}
                            className={styles.actionBtn}
                          >
                            {section.hidden ? <IconShow /> : <IconHide />}
                            {section.hidden ? "Show" : "Hide"}
                          </button>

                          <button
                            onClick={() => {
                              if (confirm("Delete section?")) {
                                saveAll(
                                  sections.filter((s) => s.id !== section.id)
                                );
                              }
                            }}
                            className={styles.deleteBtn}
                          >
                            <IconDelete /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* MODALS */}
        <AddSectionModal
          open={showAdd}
          setOpen={setShowAdd}
          onAdd={(type) => {
            const newSection = createSection(type);
            const updated = [...sections, newSection];
            saveAll(updated);
          }}
        />

        <EditSectionModal
          open={showEdit}
          setOpen={setShowEdit}
          section={activeSection}
          updateSection={updateSection}
          uploadImage={uploadImageToServer}
        />

        <TikTokPixelModal
          open={showPixel}
          setOpen={setShowPixel}
          currentPixel={page.pixelCode || ""}
          savePixel={(pixel) => {
            const updated = { ...page, pixelCode: pixel };
            setPage(updated);
            savePage(updated);
          }}
        />
      </div>
    </>
  );
}
