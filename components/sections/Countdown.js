import styles from "@/styles/Section.module.css";
import CountdownEditor from "@/components/admin/editors/CountdownEditor";

export default function Countdown({ section }) {
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

        <CountdownEditor
          deadline={section.deadline}
          textColor={section.textColor}
        />

        {section.buttonText && (
          <a href={section.buttonLink}>
            <button
              className={styles.ctaUrgent}
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
