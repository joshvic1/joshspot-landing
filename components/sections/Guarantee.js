export default function Guarantee({ section }) {
  return (
    <section style={{ background: section.bgColor, color: section.textColor }}>
      <div className="container guarantee">
        <h2 dangerouslySetInnerHTML={{ __html: section.title }} />
        <p dangerouslySetInnerHTML={{ __html: section.text }} />
      </div>
    </section>
  );
}
