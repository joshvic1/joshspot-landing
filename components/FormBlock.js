function FormBlock({ section, onSubmit }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handle(e) {
    e.preventDefault();
    if (!phone || !name) {
      alert("Please enter name and phone.");
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ name, phone, sectionTitle: section.title });
      setName("");
      setPhone("");
    } catch (err) {
      console.error(err);
      alert("Submit failed");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handle} style={{ maxWidth: 520, margin: "18px auto 0" }}>
      <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
        <label style={{ fontSize: 14, fontWeight: 600 }}>
          {section.formNameLabel || "Enter your name"}
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={section.formNameLabel || "Full name"}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #e6e6e6",
          }}
        />
        <label style={{ fontSize: 14, fontWeight: 600 }}>
          {section.formPhoneLabel || "Enter your WhatsApp number"}
        </label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={section.formPhoneLabel || "WhatsApp number"}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #e6e6e6",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          className={styles.ctaPrimary}
          style={{
            background: section.buttonColor || "#111",
            color: section.buttonTextColor || "#fff",
          }}
        >
          {loading ? "Sending..." : section.buttonText || "Submit"}
        </button>
      </div>
    </form>
  );
}
