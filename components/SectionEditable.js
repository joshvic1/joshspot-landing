"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import AddSectionModal from "@/components/admin/modals/AddSectionModal";
import EditSectionModal from "@/components/admin/modals/EditSectionModal";
import TikTokPixelModal from "@/components/admin/TikTokPixelModal";

import SectionRenderer from "@/components/sections/SectionRenderer";

import styles from "@/styles/admin/Editor.module.css";
import { fetchPage, savePage, uploadImageToServer } from "@/utils/adminApi";

/* ICONS */
const IconAdd = () => (
  <svg width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
    <path d="M10 4v12M4 10h12" />
  </svg>
);

const IconDrag = () => (
  <svg width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
    <circle cx="7" cy="7" r="1.4" />
    <circle cx="13" cy="7" r="1.4" />
    <circle cx="7" cy="13" r="1.4" />
    <circle cx="13" cy="13" r="1.4" />
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

/* ---------------------------------------------------
   MAIN EDITOR PAGE
--------------------------------------------------- */
export default function EditorPage() {
  const [page, setPage] = useState(null);
  const [sections, setSections] = useState([]);

  const [activeSection, setActiveSection] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showPixel, setShowPixel] = useState(false);

  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchPage().then((data) => {
      setPage(data);
      setSections(data.sections || []);
    });
  }, []);

  /* SAVE */
  function saveAll(updatedSections) {
    setSections(updatedSections);
    const updated = { ...page, sections: updatedSections };
    setPage(updated);
    savePage(updated);
  }

  function toggleHide(section) {
    const updated = sections.map((s) =>
      s.id === section.id ? { ...s, hidden: !s.hidden } : s
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

  const handleAdd = (type) => {
    const newSection = {
      id: crypto.randomUUID(),
      type,
      hidden: false,
      bgColor: "#ffffff",
      textColor: "#000000",
    };

    saveAll([...sections, newSection]);
  };

  const updateSection = (id, data) => {
    const updated = sections.map((s) => (s.id === id ? { ...s, ...data } : s));
    saveAll(updated);
  };

  if (!page) return <p>Loading...</p>;

  /* ---------------------------------------------------
     RENDER PREVIEW (thumbnail or full)
  --------------------------------------------------- */
  function Preview({ section }) {
    const isExpanded = expandedId === section.id;

    return (
      <div className={styles.previewWrapper}>
        {/* Section Title Header */}
        <div
          className={styles.previewHeader}
          onClick={() => setExpandedId(isExpanded ? null : section.id)}
        >
          <div className={styles.sectionName}>{section.type}</div>
          <div className={styles.expandIcon}>{isExpanded ? "▲" : "▼"}</div>
        </div>

        {/* Collapsed Mode = Thumbnail */}
        {!isExpanded && (
          <div className={styles.thumbnailSmall}>
            <SectionRenderer section={{ ...section, hidden: false }} />
          </div>
        )}

        {/* Expanded Mode = Full-width preview */}
        {isExpanded && (
          <div className={styles.fullPreview}>
            <SectionRenderer section={{ ...section, hidden: false }} />
          </div>
        )}
      </div>
    );
  }

  /* ---------------------------------------------------
     PAGE RENDER
  --------------------------------------------------- */
  return (
    <div className={styles.wrapper}>
      {/* HEADER */}
      <header className={styles.header}>
        <h2 className={styles.logo}>DVRX Builder</h2>

        <button className={styles.pixelBtn} onClick={() => setShowPixel(true)}>
          TikTok Pixel
        </button>

        <button className={styles.addBtn} onClick={() => setShowAdd(true)}>
          <IconAdd /> Add Section
        </button>
      </header>

      {/* PIXEL MODAL */}
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

      {/* DRAGGABLE SECTIONS */}
      <DragDropContext onDragEnd={handleDrag}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
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
                      className={styles.sectionBox}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        background: section.bgColor,
                        opacity: section.hidden ? 0.4 : 1,
                        ...provided.draggableProps.style,
                      }}
                    >
                      {/* Drag handle */}
                      <div
                        className={styles.dragHandle}
                        {...provided.dragHandleProps}
                      >
                        <IconDrag />
                      </div>

                      {/* Preview */}
                      <Preview section={section} />

                      {/* ACTION BUTTONS */}
                      <div className={styles.actions}>
                        <button
                          className={styles.actionBtn}
                          onClick={() => {
                            setActiveSection(section);
                            setShowEdit(true);
                          }}
                        >
                          <IconEdit /> Edit
                        </button>

                        <button
                          className={styles.actionBtn}
                          onClick={() => toggleHide(section)}
                        >
                          {section.hidden ? <IconShow /> : <IconHide />}
                          {section.hidden ? "Show" : "Hide"}
                        </button>

                        <button
                          className={styles.deleteBtn}
                          onClick={() => {
                            if (confirm("Delete this section?")) {
                              saveAll(
                                sections.filter((s) => s.id !== section.id)
                              );
                            }
                          }}
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

      {/* Modals */}
      <AddSectionModal open={showAdd} setOpen={setShowAdd} onAdd={handleAdd} />

      <EditSectionModal
        open={showEdit}
        setOpen={setShowEdit}
        section={activeSection}
        updateSection={updateSection}
        uploadImage={uploadImageToServer}
      />
    </div>
  );
}
