import styles from "@/styles/Section.module.css";

export default function TextBlock({ section }) {
  return (
    <section
      className={styles.section}
      style={{ background: section.bgColor, color: section.textColor }}
    >
      <div className={styles.container}>
        <h3
          className={styles.sectionSubtitle}
          dangerouslySetInnerHTML={{ __html: section.title }}
        />

        <p
          className={styles.sectionParagraph}
          dangerouslySetInnerHTML={{ __html: section.text }}
        />
      </div>
    </section>
  );
}
