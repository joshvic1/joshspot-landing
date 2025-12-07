import styles from "@/styles/Section.module.css";

export default function TextWithButton({ section }) {
  return (
    <section
      className={styles.section}
      style={{ background: section.bgColor, color: section.textColor }}
    >
      <div className={styles.container}>
        <h2
          className={styles.sectionTitle}
          dangerouslySetInnerHTML={{ __html: section.title }}
        />

        <p
          className={styles.sectionParagraph}
          dangerouslySetInnerHTML={{ __html: section.text }}
        />

        {section.buttonText && (
          <div
            style={{
              textAlign: section.buttonAlign || "center",
              width: "100%",
              marginTop: 12,
            }}
          >
            <a href={section.buttonLink}>
              <button
                className={styles.ctaPrimary}
                style={{
                  background: section.buttonColor,
                  color: section.buttonTextColor,
                }}
              >
                {section.buttonText}
              </button>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
