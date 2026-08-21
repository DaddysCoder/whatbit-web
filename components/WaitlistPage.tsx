"use client";

import { useState } from "react";
import type { WaitlistProduct } from "@/lib/products";
import { BarMark } from "./BarMark";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import styles from "./WaitlistPage.module.css";

export function WaitlistPage({ product }: { product: WaitlistProduct }) {
  const [email, setEmail] = useState("");

  const mailto = `mailto:hello@whatbit.io?subject=${encodeURIComponent(
    `Notify me about ${product.name}`
  )}&body=${encodeURIComponent(email ? `Please notify ${email} when ${product.name} is ready.` : "")}`;

  return (
    <div
      className={styles.page}
      style={
        {
          ["--accent" as string]: product.accent,
          ["--accent-hover" as string]: product.accentHover,
          ["--selection" as string]: product.selection,
        } as React.CSSProperties
      }
    >
      <SiteNav variant="waitlist" accent={product.accent} />
      <div className={styles.body}>
        <BarMark
          size={76}
          radius={22}
          gradient={product.gradient}
          shadow={`0 30px 60px ${product.glow}`}
          float
        />
        <div className={styles.status}>IN DEVELOPMENT</div>
        <h1 className={styles.title}>
          {product.name} <span>by WhatBit</span>
        </h1>
        <p className={styles.tagline}>{product.tagline}</p>
        <p className={styles.copy}>
          We&apos;re still building this one. Leave your email and we&apos;ll let you know the moment it&apos;s ready.
        </p>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = mailto;
          }}
        >
          <input
            type="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <a href={mailto} className={styles.notify}>
            Notify me
          </a>
        </form>
      </div>
      <SiteFooter variant="tiny" />
    </div>
  );
}
