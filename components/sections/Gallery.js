import styles from "@/styles/Section.module.css";

export default function Gallery({ section }) {
  return (
    <section className={styles.section} style={{ background: section.bgColor }}>
      <div className={styles.container}>
        <div className={styles.galleryGrid}>
          {section.images?.map((img, i) => (
            <img key={i} src={img} className={styles.galleryImg} />
          ))}
        </div>
      </div>
    </section>
  );
}
