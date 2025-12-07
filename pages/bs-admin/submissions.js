"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/admin/Submissions.module.css";
import s from "@/styles/admin/Editor.module.css";
import { useRouter } from "next/navigation";

export default function AdminSubmissionsPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1); // current page
  const [perPage] = useState(10); // submissions per page
  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      router.push("/bs-admin");
    } else {
      load();
    }
  }, []);

  async function load() {
    const token = localStorage.getItem("auth_token");

    const res = await fetch(
      "https://joshspot-landing-backend-production.up.railway.app/api/submissions",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    console.log("📥 RAW SUBMISSIONS:", data);

    if (data.error === "Unauthorized") {
      router.push("/bs-admin");
      return;
    }

    setItems(Array.isArray(data) ? data : []);
  }

  async function deleteItem(id) {
    if (!confirm("Delete this submission?")) return;

    await fetch(
      `https://joshspot-landing-backend-production.up.railway.app/api/submissions/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );

    load();
  }

  function formatPhone(p) {
    return `https://wa.me/${p.replace(/\D/g, "")}`;
  }
  const IconAdd = () => (
    <svg
      width="20"
      height="20"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
    >
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
  // PAGINATION LOGIC
  const totalPages = Math.ceil(items.length / perPage);
  const start = (page - 1) * perPage;
  const currentItems = items.slice(start, start + perPage);

  return (
    <>
      <header className={s.header}>
        <div className={s.headerRight}>
          <h2 className={s.logo}>FanStore</h2>
          <button className={s.pixelBtn} onClick={() => setShowPixel(true)}>
            Set Pixel
          </button>

          <button className={s.addBtn} onClick={() => setShowAdd(true)}>
            <IconAdd /> Add Section
          </button>
        </div>
        <div className={s.headerRight}>
          <button
            className={s.addBtn}
            onClick={() => router.push("/bs-admin/editor")}
          >
            Edit page
          </button>
          <button className={s.addBtn} onClick={() => router.push("/")}>
            Homepage
          </button>
        </div>
      </header>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Form Submissions</h2>

        {currentItems.map((s) => (
          <div key={s._id} className={styles.card}>
            <div className={styles.row}>
              <strong>Name:</strong> {s.name}
            </div>

            <div className={styles.row}>
              <strong>Phone:</strong> {s.phone}
            </div>

            <div className={styles.row}>
              <strong>Section:</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: s.sectionTitle }} />
            </div>

            <div className={styles.row}>
              <strong>Date:</strong> {new Date(s.createdAt).toLocaleString()}
            </div>

            <div className={styles.btnRow}>
              <button
                onClick={() => window.open(formatPhone(s.phone), "_blank")}
                className={`${styles.btn} ${styles.btnWhatsApp}`}
              >
                WhatsApp
              </button>

              <button
                onClick={() => deleteItem(s._id)}
                className={`${styles.btn} ${styles.btnDelete}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* PAGINATION */}
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === page;

            return (
              <button
                key={pageNum}
                className={isActive ? styles.pageBtnActive : styles.pageBtn}
                onClick={() => !isActive && setPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
