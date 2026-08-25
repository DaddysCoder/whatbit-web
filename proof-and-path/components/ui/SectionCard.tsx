import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import styles from "./SectionCard.module.css";

export type SectionCardEyebrowVariant =
  | "default"
  | "caution"
  | "positive"
  | "source";

interface SectionCardBaseProps {
  eyebrow?: ReactNode;
  eyebrowVariant?: SectionCardEyebrowVariant;
  title?: ReactNode;
  action?: ReactNode;
  meta?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export interface SectionCardProps
  extends SectionCardBaseProps,
    Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  interactive?: false;
}

export interface InteractiveSectionCardProps
  extends SectionCardBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "title"> {
  interactive: true;
}

function eyebrowClass(variant: SectionCardEyebrowVariant): string {
  switch (variant) {
    case "caution":
      return styles.eyebrowCaution;
    case "positive":
      return styles.eyebrowPositive;
    case "source":
      return styles.eyebrowSource;
    default:
      return styles.eyebrow;
  }
}

function SectionCardContent({
  eyebrow,
  eyebrowVariant = "default",
  title,
  action,
  meta,
  footer,
  children,
}: SectionCardBaseProps) {
  return (
    <>
      {eyebrow ? (
        <p className={eyebrowClass(eyebrowVariant)}>{eyebrow}</p>
      ) : null}
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      {children ? <div className={styles.body}>{children}</div> : null}
      {action ? <p className={styles.action}>{action}</p> : null}
      {meta ? <p className={styles.meta}>{meta}</p> : null}
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </>
  );
}

export function SectionCard(props: SectionCardProps | InteractiveSectionCardProps) {
  const {
    eyebrow,
    eyebrowVariant = "default",
    title,
    action,
    meta,
    footer,
    interactive = false,
    className,
    children,
    ...rest
  } = props;

  const classes = [
    interactive ? styles.card : styles.cardStatic,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const contentProps = {
    eyebrow,
    eyebrowVariant,
    title,
    action,
    meta,
    footer,
    children,
  };

  if (interactive) {
    const { type = "button", ...buttonProps } =
      rest as ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button type={type} className={classes} {...buttonProps}>
        <SectionCardContent {...contentProps} />
      </button>
    );
  }

  return (
    <div className={classes} {...(rest as HTMLAttributes<HTMLDivElement>)}>
      <SectionCardContent {...contentProps} />
    </div>
  );
}
