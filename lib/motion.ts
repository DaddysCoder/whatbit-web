// Centralised motion configuration. Every primitive in components/motion
// pulls its physics from here so the feel stays consistent site-wide —
// change a value once, it changes everywhere.

export const motionTokens = {
  lift: 6, // px raised on hover
  liftStrong: 8, // px raised on hover for the flagship/priority card
  cardScale: 1.02,
  cardScaleStrong: 1.025,
  tapScale: 0.98,
  tiltMax: 1.6, // degrees — "felt, not seen"
  stagger: 0.06,
  staggerFast: 0.04,
};

// Physically-believable spring for direct interaction (hover/tap/tilt).
export const interactionSpring = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 0.8,
} as const;

// Slightly softer spring for larger surfaces (whole cards) so they don't
// feel twitchy at bigger displacement.
export const surfaceSpring = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.9,
} as const;

// Restrained, non-bouncy ease for scroll reveals — quick and settled,
// never cinematic.
export const revealTransition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
} as const;

export const revealViewport = { once: true, amount: 0.2, margin: "0px 0px -80px 0px" } as const;

// Entrance variants for elements that must stay a direct child of a CSS
// Grid/Flex container (e.g. a card in a grid) — where wrapping in an
// extra <StaggerItem> div would break `grid-column: span N` sizing.
// Pass this straight to the component's own `variants` prop so it
// inherits "hidden"/"visible" from an ancestor <StaggerGroup>.
export const cardEntranceVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: revealTransition },
};

export const cardEntranceVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};
