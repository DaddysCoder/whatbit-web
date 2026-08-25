"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, FormField, Input } from "@/components/ui";
import styles from "./public-screens.module.css";

export function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
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
          />
        </FormField>
        <Button type="submit" variant="primary" fullWidth>
          Send me a link
        </Button>
      </form>
      <p className={styles.formHint}>
        Having trouble? A passkey or recovery option will also be available.
      </p>
    </div>
  );
}
