import styles from "@/styles/Section.module.css";

export default function ImageText({ section }) {
  return (
    <section
      className={styles.section}
      style={{ background: section.bgColor, color: section.textColor }}
    >
      <div className={styles.container}>
        <div className={styles.imageText}>
          {section.image && (
            <img src={section.image} className={styles.imageTextImg} />
          )}

          <div
            className={styles.imageTextContent}
            dangerouslySetInnerHTML={{ __html: section.text }}
          />
        </div>
      </div>
    </section>
  );
}
