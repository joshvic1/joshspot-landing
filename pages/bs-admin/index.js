"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/admin/Login.module.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Invalid login");
        setLoading(false);
        return;
      }

      localStorage.setItem("auth_token", data.token);
      router.push("/bs-admin/editor");
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.logo}>FanStore Admin</h1>
        <p className={styles.subtitle}>Sign in to continue</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@xxxx.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <input
              type="password"
              placeholder="•••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>

          <button className={styles.btn} disabled={loading}>
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
