"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { WorkExample } from "@/lib/digital-services";
import { DS_PALE_STAGES } from "@/lib/ds-palette";
import { useReducedMotionSafe } from "../motion/useMediaQuery";
import { Lightbox } from "./Lightbox";
import styles from "./WorkShowcase.module.css";

export function WorkShowcase({ items }: { items: WorkExample[] }) {
  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <Project key={item.title} item={item} index={i} />
      ))}
    </div>
  );
}

function Project({ item, index }: { item: WorkExample; index: number }) {
  const [failed, setFailed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const reduceMotion = useReducedMotionSafe();
  const reversed = index % 2 === 1;
  const stageColor = DS_PALE_STAGES[index % DS_PALE_STAGES.length];

  return (
    <section className={styles.project} style={{ background: stageColor }}>
      <div className={`${styles.inner} ${reversed ? styles.reversed : ""}`}>
        <motion.div
          className={styles.mediaCol}
          initial={{ opacity: 0, x: reversed ? 32 : -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className={styles.stage}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {failed ? (
              <div className={styles.imgMissing}>Image pending</div>
            ) : (
              <img
                src={item.image}
                alt={item.alt}
                className={styles.img}
                onError={() => setFailed(true)}
              />
            )}
            {!failed && (
              <button
                type="button"
                className={styles.viewBtn}
                onClick={() => setLightboxOpen(true)}
              >
                View larger <span aria-hidden>⤢</span>
              </button>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.contentCol}
          initial={{ opacity: 0, x: reversed ? -24 : 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1], delay: reduceMotion ? 0 : 0.08 }}
        >
          <div
            className={`${styles.badge} ${
              item.badgeTone === "concept" ? styles.badgeConcept : styles.badgeNeutral
            }`}
          >
            {item.badge}
          </div>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.body}>{item.body}</p>
          <div className={styles.meta}>{item.meta}</div>
        </motion.div>
      </div>

      {!failed && (
        <Lightbox src={item.image} alt={item.alt} open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
      )}
    </section>
  );
}
