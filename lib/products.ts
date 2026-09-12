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
export const FRAME_COMMERCIAL_LIVE = true;
export const FRAME_FREE_URL = "https://frame.whatbit.dev";
export const FRAME_PRO_TRIAL_URL = "https://frame.whatbit.dev/trial";

export const FIELD_APP_URL = "https://field.whatbit.dev";
/** When true, Field's Pro pricing CTA switches from "Coming soon" to a live trial link. */
export const FIELD_COMMERCIAL_LIVE = true;
export const FIELD_FREE_URL = "https://field.whatbit.dev";
export const FIELD_PRO_TRIAL_URL = "https://field.whatbit.dev/trial";

export const PACE_APP_URL = "https://orbit.whatbit.tech";
export const AXIS_APP_URL = "https://axis.whatbit.tech";
export const TRACE_APP_URL = "https://trace.whatbit.dev";

// Configurable standalone AI Blueprint app origin; empty until the owner
// approves the domain. Marketing derives terms/privacy/open-app links from it.
export const AI_BLUEPRINT_APP_URL = process.env.NEXT_PUBLIC_AI_BLUEPRINT_APP_URL ?? "";

export const VODA_PRODUCT = {
  slug: "voda" as const,
  name: "VODA",
  tagline: "See the business as a graph. Then see what happens next.",
  description:
    "VODA is an intelligence engine in development. It is being designed to map how work moves through a business and test predictive models against that map to surface potential bottlenecks, risks and openings.",
  accent: "#3452FF",
  accentHover: "#1E3AB8",
  selection: "#E1E7FF",
  gradient: "linear-gradient(135deg,#6E8CFF,#3452FF)",
  glow: "rgba(52,82,255,0.3)",
  notifyHover: "#6E8CFF",
};

export const PRODUCT_LINKS: { href: string; label: string }[] = [
  { href: "/pace", label: "Pace" },
  { href: "/frame", label: "Frame" },
  { href: AXIS_APP_URL, label: "Axis" },
  { href: "/trace", label: "Trace" },
  { href: "/vector", label: "Vector" },
  { href: "/field", label: "Field" },
  { href: "/arc", label: "Arc" },
  { href: "/ai-blueprint", label: "AI Blueprint" },
];
