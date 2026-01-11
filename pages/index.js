// pages/index.js
"use client";

import { useEffect, useState } from "react";
import SectionRenderer from "@/components/sections/SectionRenderer";
import styles from "@/styles/Section.module.css";
import { fetchPage } from "@/utils/adminApi";

export default function Home() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetchPage().then((data) => setPage(data.page));
  }, []);

  if (!page) return <p>Loading...</p>;

  return (
    <div className={styles.page}>
      {page.sections?.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
