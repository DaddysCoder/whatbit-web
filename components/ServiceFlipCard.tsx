"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { DsService } from "@/lib/digital-services";
import { useReducedMotionSafe } from "./motion/useMediaQuery";
import styles from "./ServiceFlipCard.module.css";

const FLOW_LINE = /^[\w\s]+(→[\w\s]+)+$/;

const subscribeNoop = () => () => {};

/** SSR-safe "has this component hydrated on the client" check, for portals. */
function useIsClient() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

export function ServiceFlipCard({ service }: { service: DsService }) {
  const [open, setOpen] = useState(false);
  const mounted = useIsClient();
  const reduceMotion = useReducedMotionSafe();
  const reactId = useId();
  const headingId = `${reactId}-heading`;
  const openBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) openBtnRef.current?.focus();
  }, [open]);

  return (
    <div className={styles.card}>
      <div className={styles.face}>
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
          ref={openBtnRef}
          className={styles.cueBtn}
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
        >
          See what&rsquo;s underneath <span aria-hidden>→</span>
        </button>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className={styles.overlay}
                role="presentation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.12 : 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  className={styles.modal}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={headingId}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }}
                  transition={{ duration: reduceMotion ? 0.12 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className={styles.closeBtn}
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                  >
                    <span aria-hidden>✕</span>
                  </button>

                  <div className={styles.modalScroll}>
                    <div className={styles.modalEyebrow}>{service.title}</div>
                    <h3 id={headingId} className={styles.modalHeading}>
                      {service.backHeading}
                    </h3>

                    {service.backIntro?.map((p, i) =>
                      FLOW_LINE.test(p) ? (
                        <div key={i} className={styles.flowLine}>
                          {p.split("→").map((part, j, arr) => (
                            <span key={j} className={styles.flowStep}>
                              {part.trim()}
                              {j < arr.length - 1 && (
                                <span className={styles.flowArrow} aria-hidden>
                                  →
                                </span>
                              )}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p key={i} className={styles.modalIntroP}>
                          {p}
                        </p>
                      )
                    )}

                    <div className={styles.itemGrid}>
                      {service.items.map((item) => (
                        <div key={item} className={styles.itemTile}>
                          <span className={styles.itemDot} aria-hidden />
                          {item}
                        </div>
                      ))}
                    </div>

                    {service.backClosing?.map((p, i) => (
                      <p key={i} className={styles.modalClosing}>
                        {p}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
