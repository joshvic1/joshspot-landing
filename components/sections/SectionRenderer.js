import styles from "@/styles/Section.module.css";

import ProductPitch from "./ProductPitch";
import ImageText from "./ImageText";
import BenefitGrid from "./BenefitGrid";
import Guarantee from "./Guarantee";
import TextWithButton from "./TextWithButton";
import TextBlock from "./TextBlock";
import ProductShowcase from "./ProductShowcase";
import Testimonials from "./Testimonials";
import Gallery from "./Gallery";
import FAQ from "./FAQ";
import FinalCTA from "./FinalCTA";
import Countdown from "./Countdown";

export default function SectionRenderer({ section }) {
  if (!section || section.hidden) return null;

  const map = {
    productPitch: ProductPitch,
    imageText: ImageText,
    benefitGrid: BenefitGrid,
    guarantee: Guarantee,
    textWithButton: TextWithButton,
    text: TextBlock,
    productShowcase: ProductShowcase,
    testimonials: Testimonials,
    gallery: Gallery,
    faq: FAQ,
    finalCTA: FinalCTA,
    countdown: Countdown,
  };

  const Component = map[section.type] ?? null;
  if (!Component) return null;

  return (
    <section
      className={styles.section}
      style={{ background: section.bgColor, color: section.textColor }}
    >
      <Component section={section} />
    </section>
  );
}
