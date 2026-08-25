export interface LogoMarkProps {
  className?: string;
  width?: number;
  height?: number;
}

export function LogoMark({ className, width = 30, height = 14 }: LogoMarkProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 120 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="18"
        y="16"
        width="26"
        height="26"
        rx="6"
        fill="none"
        stroke="#0F9D74"
        strokeWidth="5"
      />
      <rect x="50" y="24" width="26" height="26" rx="6" fill="#0F9D74" />
      <path
        d="M80 37 L96 37 M90 30 L98 37 L90 44"
        stroke="#0F9D74"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
