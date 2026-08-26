"use client";

import { FormEvent, useState } from "react";
import { sendMagicLinkAction } from "@/lib/actions/app-actions";
import { Button, FormField, Input } from "@/components/ui";
import styles from "./public-screens.module.css";

export function SignInScreen() {
  const [email, setEmail] = useState("");
  const [magicLink, setMagicLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setMagicLink(null);
    try {
      const result = await sendMagicLinkAction(email);
      setMagicLink(result.verifyUrl);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <h1 className={styles.pageTitleSignIn}>Sign in</h1>
      <p className={styles.pageIntro} style={{ marginBottom: 22 }}>
        We&apos;ll email you a secure link — no password to remember.
      </p>
      <form onSubmit={handleSubmit}>
        <FormField id="email" label="Email address">
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </FormField>
        <Button type="submit" variant="primary" fullWidth disabled={pending}>
          {pending ? "Sending…" : "Send me a link"}
        </Button>
      </form>
      {magicLink ? (
        <div
          className={styles.formHint}
          style={{
            marginTop: 16,
            padding: 14,
            background: "var(--color-primary-tint)",
            borderRadius: 12,
          }}
        >
          <strong>Development mode:</strong> email delivery is not configured.
          Use this secure link to sign in:{" "}
          <a href={magicLink} style={{ wordBreak: "break-all" }}>
            {magicLink}
          </a>
        </div>
      ) : null}
      {error ? (
        <p className={styles.formHint} style={{ color: "var(--color-error)" }}>
          {error}
        </p>
      ) : null}
      <p className={styles.formHint}>
        Having trouble? A passkey or recovery option will also be available.
      </p>
    </div>
  );
}
