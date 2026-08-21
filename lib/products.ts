export type ProductSlug =
  | "orbit"
  | "axil"
  | "trace"
  | "vector"
  | "frame"
  | "field"
  | "arc";

export type WaitlistProduct = {
  slug: Exclude<ProductSlug, "orbit">;
  name: string;
  tagline: string;
  accent: string;
  accentHover: string;
  selection: string;
  gradient: string;
  glow: string;
};

export const WAITLIST_PRODUCTS: WaitlistProduct[] = [
  {
    slug: "axil",
    name: "Axil",
    tagline: "The point where new work starts.",
    accent: "#F2925C",
    accentHover: "#D9502C",
    selection: "#FCE8DA",
    gradient: "linear-gradient(135deg,#F7A876,#F2925C)",
    glow: "rgba(242,146,92,0.3)",
  },
  {
    slug: "trace",
    name: "Trace",
    tagline: "A record of how you got here.",
    accent: "#1FBFA3",
    accentHover: "#0E8F71",
    selection: "#D6F5EE",
    gradient: "linear-gradient(135deg,#3FD4B8,#1FBFA3)",
    glow: "rgba(31,191,163,0.3)",
  },
  {
    slug: "vector",
    name: "Vector",
    tagline: "Direction, and how fast.",
    accent: "#8B5CF6",
    accentHover: "#5B21B6",
    selection: "#EDE4FB",
    gradient: "linear-gradient(135deg,#B294F5,#8B5CF6)",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    slug: "frame",
    name: "Frame",
    tagline: "The shape you build inside.",
    accent: "#E8542E",
    accentHover: "#B5391B",
    selection: "#FBDDD3",
    gradient: "linear-gradient(135deg,#F07655,#E8542E)",
    glow: "rgba(232,84,46,0.3)",
  },
  {
    slug: "field",
    name: "Field",
    tagline: "Everywhere your data lives, together.",
    accent: "#0E8F71",
    accentHover: "#0A6B55",
    selection: "#D2F0E6",
    gradient: "linear-gradient(135deg,#22B393,#0E8F71)",
    glow: "rgba(14,143,113,0.3)",
  },
  {
    slug: "arc",
    name: "Arc",
    tagline: "The shape of getting there.",
    accent: "#7C4FD1",
    accentHover: "#5B21B6",
    selection: "#E9DEFA",
    gradient: "linear-gradient(135deg,#9B7BE0,#5B21B6)",
    glow: "rgba(91,33,182,0.3)",
  },
];

export const PRODUCT_LINKS: { href: string; label: string }[] = [
  { href: "/orbit", label: "Orbit" },
  { href: "/axil", label: "Axil" },
  { href: "/trace", label: "Trace" },
  { href: "/vector", label: "Vector" },
  { href: "/frame", label: "Frame" },
  { href: "/field", label: "Field" },
  { href: "/arc", label: "Arc" },
];
