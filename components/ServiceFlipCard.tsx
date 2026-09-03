"use client";

import { useId, useState } from "react";
import type { DsService } from "@/lib/digital-services";
import styles from "./ServiceFlipCard.module.css";

const FLOW_LINE = /^[\w\s]+(→[\w\s]+)+$/;

export function ServiceFlipCard({ service }: { service: DsService }) {
  const [flipped, setFlipped] = useState(false);
  const reactId = useId();
  const frontId = `${reactId}-front`;
  const backId = `${reactId}-back`;

  return (
    <div className={styles.card}>
      <div className={`${styles.inner} ${flipped ? styles.flipped : ""}`}>
        <div
          className={`${styles.face} ${styles.front}`}
          id={frontId}
          aria-hidden={flipped}
          onClick={() => setFlipped(true)}
        >
          <div className={styles.frontTop}>
            <h3 className={styles.title}>{service.title}</h3>
            {service.frontBody.map((p, i) => (
              <p key={i} className={styles.frontP}>
                {p}
              </p>
            ))}
          </div>
          <button
            type="button"
            className={styles.cueBtn}
            onClick={() => setFlipped(true)}
            aria-expanded={flipped}
            aria-controls={backId}
            tabIndex={flipped ? -1 : 0}
          >
            See what&rsquo;s underneath <span aria-hidden>→</span>
          </button>
        </div>

        <div className={`${styles.face} ${styles.back}`} aria-hidden={!flipped}>
          <div className={styles.backScroll} id={backId} tabIndex={flipped ? 0 : -1}>
            <h3 className={styles.backHeading}>{service.backHeading}</h3>
            {service.backIntro?.map((p, i) => (
              <p key={i} className={FLOW_LINE.test(p) ? styles.flowLine : styles.backP}>
                {p}
              </p>
            ))}
            <ul className={styles.backList}>
              {service.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {service.backClosing?.map((p, i) => (
              <p key={i} className={styles.backP}>
                {p}
              </p>
            ))}
          </div>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => setFlipped(false)}
            aria-expanded={flipped}
            aria-controls={frontId}
            tabIndex={flipped ? 0 : -1}
          >
            <span aria-hidden>←</span> Back
          </button>
        </div>
      </div>
    </div>
  );
}
