/**
 * Shared colour system for the Digital Services page. One confident,
 * sophisticated spectrum reused across How We Work, Operating
 * Environments, service blocks and other coloured sections so the page
 * reads as one designed system rather than six different palettes.
 */

export type DsSwatch = {
  bg: string;
  bgSoft: string;
  text: string;
  textMuted: string;
};

export const DS_SPECTRUM: DsSwatch[] = [
  { bg: "#ddd0f8", bgSoft: "#f4eefe", text: "#3b1f66", textMuted: "rgba(59,31,102,0.72)" }, // lavender
  { bg: "#dde3fb", bgSoft: "#f4eefe", text: "#29306b", textMuted: "rgba(41,48,107,0.72)" }, // periwinkle
  { bg: "#cfe3fb", bgSoft: "#eef2fd", text: "#163864", textMuted: "rgba(22,56,100,0.72)" }, // powder blue
  { bg: "#cdeee8", bgSoft: "#e9f8f7", text: "#0e4a3f", textMuted: "rgba(14,74,63,0.72)" }, // sage teal
  { bg: "#f7e8c8", bgSoft: "#fdf5e4", text: "#4a3512", textMuted: "rgba(74,53,18,0.72)" }, // warm sand
  { bg: "#f6d9cc", bgSoft: "#fdece4", text: "#6b2f1c", textMuted: "rgba(107,47,28,0.72)" }, // dusty terracotta
];

/** Cycle the spectrum for any index, wrapping cleanly. */
export function swatchAt(i: number): DsSwatch {
  return DS_SPECTRUM[i % DS_SPECTRUM.length];
}

/**
 * Pale, almost-white backgrounds for large panels (Selected Work stages) —
 * soft tints of WhatBit's actual product accent colours (lilac, teal,
 * violet, green), not invented hues.
 */
export const DS_PALE_STAGES = ["#f2eefb", "#eaf5f3", "#eef1fa", "#eaf6ee"];

/**
 * The full studio spectrum for Operating Environments — the one section
 * allowed to feel like "colour going down the screen". Purple through to
 * coral, eight confident stops for the eight conditions.
 */
export const DS_FULL_SPECTRUM: DsSwatch[] = [
  { bg: "#7b2ff7", bgSoft: "#f4eefe", text: "#ffffff", textMuted: "rgba(255,255,255,0.78)" }, // purple
  { bg: "#9155e8", bgSoft: "#f4eefe", text: "#ffffff", textMuted: "rgba(255,255,255,0.8)" }, // violet
  { bg: "#3e63dd", bgSoft: "#eef2fd", text: "#ffffff", textMuted: "rgba(255,255,255,0.8)" }, // blue
  { bg: "#1596c9", bgSoft: "#eaf6fb", text: "#ffffff", textMuted: "rgba(255,255,255,0.82)" }, // cyan
  { bg: "#0f9d6e", bgSoft: "#e9f7f1", text: "#ffffff", textMuted: "rgba(255,255,255,0.82)" }, // green
  { bg: "#3aa373", bgSoft: "#edf7f1", text: "#ffffff", textMuted: "rgba(255,255,255,0.82)" }, // green-teal
  { bg: "#e3a324", bgSoft: "#fdf5e4", text: "#221602", textMuted: "rgba(34,22,2,0.68)" }, // warm yellow
  { bg: "#e2622f", bgSoft: "#fdece4", text: "#ffffff", textMuted: "rgba(255,255,255,0.85)" }, // orange / coral
];
