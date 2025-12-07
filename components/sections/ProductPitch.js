import styles from "@/styles/Section.module.css";

export default function ProductPitch({ section }) {
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

        <ul className={styles.pitchList}>
          {section.bullets?.map((b, i) => (
            <li key={i} className={styles.pitchItem}>
              {b}
            </li>
          ))}
        </ul>

        {section.buttonText && (
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
        )}
      </div>
    </section>
  );
}
