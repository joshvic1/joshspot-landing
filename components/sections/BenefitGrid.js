import styles from "@/styles/Section.module.css";

export default function BenefitGrid({ section }) {
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

        <div className={styles.benefitGrid}>
          {section.benefits?.map((b, i) => (
            <div key={i} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>{b.icon}</div>
              <h4 className={styles.benefitTitle}>{b.title}</h4>
              <p className={styles.benefitText}>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
