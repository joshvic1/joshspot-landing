import styles from "@/styles/Section.module.css";

export default function FAQ({ section }) {
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

        <div className={styles.faqList}>
          {section.faqs?.map((faq, i) => (
            <div key={i} className={styles.faqItem}>
              <h4 className={styles.faqQuestion}>{faq.q}</h4>
              <div
                className={styles.faqAnswer}
                dangerouslySetInnerHTML={{ __html: faq.a }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
