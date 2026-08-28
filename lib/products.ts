export type ProductSlug =
  | "orbit"
  | "axis"
  | "trace"
  | "vector"
  | "frame"
  | "field"
  | "arc"
  | "voda";

export const FRAME_APP_URL = "https://frame.whatbit.dev";
/** When true, Frame's Pro pricing CTA switches from "Coming soon" to a live trial link. */
export const FRAME_COMMERCIAL_LIVE = false;
export const FRAME_FREE_URL = "https://frame.whatbit.dev";
export const FRAME_PRO_TRIAL_URL = "https://frame.whatbit.dev/trial";

export const FIELD_APP_URL = "https://field.whatbit.dev";
/** When true, Field's Pro pricing CTA switches from "Coming soon" to a live trial link. */
export const FIELD_COMMERCIAL_LIVE = false;
export const FIELD_FREE_URL = "https://field.whatbit.dev";
export const FIELD_PRO_TRIAL_URL = "https://field.whatbit.dev/trial";

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
  slug: Exclude<ProductSlug, "orbit" | "axis" | "frame" | "trace" | "voda" | "vector" | "field">;
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
