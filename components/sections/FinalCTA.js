import { useState } from "react";
import styles from "@/styles/Section.module.css";

export default function FinalCTA({ section }) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  // --------------------------
  // Helper: clean phone number
  // --------------------------
  function normalizePhone(input) {
    let p = input.replace(/\D/g, ""); // remove non-digits

    // Convert 080 → 23480
    if (p.startsWith("0")) p = "234" + p.slice(1);
    if (p.startsWith("2340")) p = "234" + p.slice(4); // double zero handling

    return p;
  }

  // --------------------------
  // Form validation
  // --------------------------
  function validate() {
    if (!form.name || form.name.trim().length < 2) {
      return "Please enter a valid name.";
    }

    const cleaned = normalizePhone(form.phone);

    if (cleaned.length < 10 || cleaned.length > 15) {
      return "Please enter a valid WhatsApp number.";
    }

    return "";
  }

  // --------------------------
  // RATE LIMIT CHECK
  // --------------------------
  function isRateLimited() {
    const last = localStorage.getItem("last_submit_time");
    if (!last) return false;

    const diff = Date.now() - Number(last);
    return diff < 60000; // 60 seconds
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (isRateLimited()) {
      setError("Please wait a bit before submitting again.");
      return;
    }

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);

    const cleanedPhone = normalizePhone(form.phone);

    try {
      if (typeof window !== "undefined" && window.ttq) {
        window.ttq.track("CompleteRegistration");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-site-domain": window.location.hostname.toLowerCase(),
          },
          body: JSON.stringify({
            sectionId: section.id,
            sectionTitle: section.title,
            name: form.name.trim(),
            phone: cleanedPhone,
            meta: { createdAt: Date.now() },
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("last_submit_time", Date.now().toString());

        // 🔥 Redirect after success
        const redirectUrl = section.formRedirect || section.buttonLink || "/";
        window.location.href = redirectUrl;
        return;
      } else {
        setError("Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <section
      className={styles.section}
      id="order"
      style={{ background: section.bgColor, color: section.textColor }}
    >
      <div className={styles.container}>
        <h2
          className={styles.sectionTitle}
          dangerouslySetInnerHTML={{ __html: section.title }}
        />

        <p
          className={styles.sectionParagraph}
          dangerouslySetInnerHTML={{ __html: section.text }}
        />

        {/* If form enabled */}
        {section.hasForm && (
          <form className={styles.finalForm} onSubmit={handleSubmit}>
            {error && <div className={styles.formError}>{error}</div>}
            <label style={{ color: section.textColor, fontWeight: 700 }}>
              {section.formNameLabel || "Enter your name"}
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <label style={{ color: section.textColor, fontWeight: 700 }}>
              {section.formPhoneLabel || "Enter your WhatsApp number"}
            </label>

            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={styles.ctaBig}
              style={{
                background: section.buttonColor,
                color: section.buttonTextColor,
              }}
            >
              {loading ? "Redirecting to Whatsapp..." : section.buttonText}
            </button>
          </form>
        )}

        {!section.hasForm && section.buttonText && (
          <a href={section.buttonLink}>
            <button
              className={styles.ctaBig}
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
