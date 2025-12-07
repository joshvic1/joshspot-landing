import styles from "@/styles/Section.module.css";

export default function Testimonials({ section }) {
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

        <div className={styles.testimonialGrid}>
          {section.testimonials?.map((t, i) => (
            <div key={i} className={styles.testimonialBox}>
              <div className={styles.testimonialStars}>
                {"⭐".repeat(t.stars)}
              </div>

              <p className={styles.testimonialQuote}>"{t.quote}"</p>

              <small className={styles.testimonialName}>– {t.name}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
