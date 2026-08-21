import styles from "./BarMark.module.css";

type BarMarkProps = {
  size?: number;
  radius?: number;
  gradient: string;
  shadow?: string;
  float?: boolean;
};

export function BarMark({
  size = 44,
  radius = 13,
  gradient,
  shadow,
  float = false,
}: BarMarkProps) {
  const pad = size > 60 ? 15 : size > 50 ? 11 : 9;
  const gap = size > 60 ? 7 : size > 50 ? 5 : 4;
  const bar = size > 60 ? 8 : size > 50 ? 6 : 5;
  const h1 = size > 60 ? 18 : size > 50 ? 14 : 10;
  const h2 = size > 60 ? 30 : size > 50 ? 22 : 16;
  const h3 = size > 60 ? 14 : size > 50 ? 10 : 8;

  return (
    <div
      className={`${styles.mark} ${float ? styles.float : ""}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: gradient,
        paddingBottom: pad,
        gap,
        boxShadow: shadow,
      }}
    >
      <span style={{ width: bar, height: h1, borderRadius: bar / 2 }} />
      <span style={{ width: bar, height: h2, borderRadius: bar / 2 }} />
      <span style={{ width: bar, height: h3, borderRadius: bar / 2 }} />
    </div>
  );
}
