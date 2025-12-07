"use client";

import { useRef, useEffect, useState } from "react";
import editorStyles from "@/styles/admin/RichTextEditor.module.css";

import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiList,
  FiListOl,
  FiLink2,
  FiRotateCcw,
  FiRotateCw,
} from "react-icons/fi";

export default function RichTextEditor({ value, onChange, label }) {
  const editorRef = useRef(null);

  const [active, setActive] = useState({
    bold: false,
    italic: false,
    underline: false,
    h: "",
    left: false,
    center: false,
    right: false,
  });

  // ======================
  //  UPDATE ACTIVE STATES
  // ======================
  const updateActiveStates = () => {
    setActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),

      h: document.queryCommandValue("formatBlock")?.toLowerCase(), // "h1", "h2", "p"

      left: document.queryCommandState("justifyLeft"),
      center: document.queryCommandState("justifyCenter"),
      right: document.queryCommandState("justifyRight"),
    });
  };

  // selection change listener
  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveStates);
    return () =>
      document.removeEventListener("selectionchange", updateActiveStates);
  }, []);

  // initialize value ONCE
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || "";
    }
  }, []);

  // EXEC COMMAND
  const exec = (cmd, arg = null) => {
    document.execCommand(cmd, false, arg);
    editorRef.current?.focus();
    updateActiveStates();
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  };

  const applyHeading = (lvl) => {
    exec("formatBlock", lvl ? `<h${lvl}>` : "<p>");
  };

  return (
    <div className={editorStyles.editorBlock}>
      {label && <label>{label}</label>}

      {/* ================= TOOLBAR ================= */}
      <div className={editorStyles.toolbar}>
        <button onClick={() => exec("undo")}>
          <FiRotateCcw />
        </button>

        <button onClick={() => exec("redo")}>
          <FiRotateCw />
        </button>

        {/* Bold */}
        <button
          className={active.bold ? editorStyles.activeBtn : ""}
          onClick={() => exec("bold")}
        >
          <FiBold />
        </button>

        {/* Italic */}
        <button
          className={active.italic ? editorStyles.activeBtn : ""}
          onClick={() => exec("italic")}
        >
          <FiItalic />
        </button>

        {/* Underline */}
        <button
          className={active.underline ? editorStyles.activeBtn : ""}
          onClick={() => exec("underline")}
        >
          <FiUnderline />
        </button>

        {/* Headings */}
        <select
          className={editorStyles.headingSelect}
          value={
            active.h === "h1"
              ? "1"
              : active.h === "h2"
              ? "2"
              : active.h === "h3"
              ? "3"
              : ""
          }
          onChange={(e) => applyHeading(e.target.value)}
        >
          <option value="">P</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
        </select>

        {/* Lists */}
        <button onClick={() => exec("insertUnorderedList")}>
          <FiList />
        </button>
        <button onClick={() => exec("insertOrderedList")}>
          <FiList />
        </button>

        {/* Alignment */}
        <button
          className={active.left ? editorStyles.activeBtn : ""}
          onClick={() => exec("justifyLeft")}
        >
          <FiAlignLeft />
        </button>

        <button
          className={active.center ? editorStyles.activeBtn : ""}
          onClick={() => exec("justifyCenter")}
        >
          <FiAlignCenter />
        </button>

        <button
          className={active.right ? editorStyles.activeBtn : ""}
          onClick={() => exec("justifyRight")}
        >
          <FiAlignRight />
        </button>

        {/* Text Color */}
        <label className={editorStyles.colorBtn}>
          <input
            type="color"
            onChange={(e) => exec("foreColor", e.target.value)}
          />
        </label>

        {/* Highlight */}
        <label className={editorStyles.colorBtn}>
          <input
            type="color"
            onChange={(e) => exec("hiliteColor", e.target.value)}
          />
        </label>

        <button onClick={insertLink}>
          <FiLink2 />
        </button>
      </div>

      {/* ================= EDITOR ================= */}
      <div
        ref={editorRef}
        className={editorStyles.customEditor}
        contentEditable
        data-placeholder="Write here..."
        onInput={(e) => onChange(e.target.innerHTML)}
      />
    </div>
  );
}
