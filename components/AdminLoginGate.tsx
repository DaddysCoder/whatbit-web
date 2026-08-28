"use client";

import { useState } from "react";
import styles from "./AdminAiBlueprint.module.css";

export function AdminLoginGate({ onSignedIn }: { onSignedIn: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoggingIn(true);
    try {
      const res = await fetch("/api/admin/ai-blueprint/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error || "Incorrect password.");
        return;
      }
      setPassword("");
      onSignedIn();
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginCard} onSubmit={handleLogin}>
        <div className={styles.loginTitle}>WhatBit Admin</div>
        <div className={styles.loginSubtitle}>AI Blueprint reviewer sign-in</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.loginInput}
          autoFocus
        />
        {error ? <div className={styles.loginError}>{error}</div> : null}
        <button type="submit" className={styles.loginButton} disabled={loggingIn}>
          {loggingIn ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
