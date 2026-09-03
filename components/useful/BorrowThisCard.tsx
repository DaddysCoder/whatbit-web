import styles from "./BorrowThisCard.module.css";

type BorrowThisCardProps = {
  title: string;
  description: string;
  /** Inline band variant used at the end of Layout C's centered body column. */
  band?: boolean;
};

export function BorrowThisCard({ title, description, band = false }: BorrowThisCardProps) {
  return (
    <div className={`${styles.card} ${band ? styles.band : ""}`}>
      <div className={styles.eyebrow}>BORROW THIS</div>
      <div className={styles.title}>{title}</div>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
