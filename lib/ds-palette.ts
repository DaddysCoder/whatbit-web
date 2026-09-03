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
  { bg: "#7b2ff7", bgSoft: "#f4eefe", text: "#ffffff", textMuted: "rgba(255,255,255,0.78)" }, // purple
  { bg: "#9b6ef3", bgSoft: "#f4eefe", text: "#ffffff", textMuted: "rgba(255,255,255,0.8)" }, // violet
  { bg: "#3e63dd", bgSoft: "#eef2fd", text: "#ffffff", textMuted: "rgba(255,255,255,0.8)" }, // blue
  { bg: "#0fa3a3", bgSoft: "#e9f8f7", text: "#ffffff", textMuted: "rgba(255,255,255,0.82)" }, // aqua / teal
  { bg: "#e3a324", bgSoft: "#fdf5e4", text: "#221602", textMuted: "rgba(34,22,2,0.68)" }, // warm yellow
  { bg: "#e2622f", bgSoft: "#fdece4", text: "#ffffff", textMuted: "rgba(255,255,255,0.85)" }, // coral
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
