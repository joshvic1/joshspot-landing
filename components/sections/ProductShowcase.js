import styles from "@/styles/Section.module.css";

export default function ProductShowcase({ section }) {
  return (
    <section
      className={styles.section}
      style={{ background: section.bgColor, color: section.textColor }}
    >
      <div className={styles.container}>
        <h2
          className={styles.sectionTitle}
          dangerouslySetInnerHTML={{ __html: section.title }}
          style={{
            textAlign: section.titleAlignment || "center",
            color: section.titleColor || section.textColor,
          }}
        />

        <div className={styles.productGrid}>
          {section.products?.map((p, i) => (
            <div key={i} className={styles.productCard}>
              {p.image && <img src={p.image} className={styles.productImg} />}

              <h4 className={styles.productName}>{p.name}</h4>
              <p className={styles.productDesc}>{p.desc}</p>

              <div className={styles.productPrice}>₦{p.price}</div>

              <a href={p.link}>
                <button
                  className={styles.ctaPrimary}
                  style={{
                    background: section.buttonColor,
                    color: section.buttonTextColor,
                  }}
                >
                  {section.buttonText || "Buy Now"}
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
