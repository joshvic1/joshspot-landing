"use client";

import styles from "./PageLoader.module.css";

export default function PageLoader({ text = "Loading" }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <span />
        <span />
        <span />
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
