export type ProductSlug =
  | "orbit"
  | "axis"
  | "trace"
  | "vector"
  | "frame"
  | "field"
  | "arc"
  | "voda";

export const FRAME_APP_URL = "https://screen-fba.polina-67d.workers.dev/";
export const PACE_APP_URL = "https://orbit.whatbit.tech";
export const AXIS_APP_URL = "https://axis.whatbit.tech";
export const TRACE_APP_URL = "https://trace.whatbit.dev";

export const VODA_PRODUCT = {
  slug: "voda" as const,
  name: "VODA",
  tagline: "See the business as a graph. Then see what happens next.",
  description:
    "VODA is WhatBit's intelligence engine. It maps how work actually moves through a business, then runs predictive models against that map to say what's coming — a bottleneck, a risk, an opening.",
  accent: "#3452FF",
  accentHover: "#1E3AB8",
  selection: "#E1E7FF",
  gradient: "linear-gradient(135deg,#6E8CFF,#3452FF)",
  glow: "rgba(52,82,255,0.3)",
  notifyHover: "#6E8CFF",
};

export type WaitlistProduct = {
  slug: Exclude<ProductSlug, "orbit" | "axis" | "frame" | "trace" | "voda" | "vector">;
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
  { href: "/pace", label: "Pace" },
  { href: "/frame", label: "Frame" },
  { href: "/voda", label: "VODA" },
  { href: AXIS_APP_URL, label: "Axis" },
  { href: "/trace", label: "Trace" },
  { href: "/vector", label: "Vector" },
  { href: "/field", label: "Field" },
  { href: "/arc", label: "Arc" },
];
