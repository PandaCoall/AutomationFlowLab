import type { LayoutId, PaletteId } from "./types";

export const LAYOUTS: { id: LayoutId; label: string }[] = [
  { id: "classic", label: "Classic frame" },
  { id: "band", label: "Side band" },
  { id: "corner", label: "Corner marks" },
];

export const PALETTES: {
  id: PaletteId;
  label: string;
  paper: string;
  ink: string;
  accent: string;
  mute: string;
  rgb: { paper: [number, number, number]; ink: [number, number, number]; accent: [number, number, number]; mute: [number, number, number] };
}[] = [
  {
    id: "seal",
    label: "Seal",
    paper: "#fffdf8",
    ink: "#1c1915",
    accent: "#8c3a2f",
    mute: "#6f675c",
    rgb: { paper: [1, 0.992, 0.973], ink: [0.11, 0.098, 0.082], accent: [0.549, 0.227, 0.184], mute: [0.435, 0.404, 0.361] },
  },
  {
    id: "navy",
    label: "Navy",
    paper: "#f7f5f1",
    ink: "#142033",
    accent: "#1e4d7b",
    mute: "#5c6878",
    rgb: { paper: [0.969, 0.961, 0.945], ink: [0.078, 0.125, 0.2], accent: [0.118, 0.302, 0.482], mute: [0.361, 0.408, 0.471] },
  },
  {
    id: "forest",
    label: "Forest",
    paper: "#f6f4ee",
    ink: "#1a241c",
    accent: "#2f5d45",
    mute: "#5e6b62",
    rgb: { paper: [0.965, 0.957, 0.933], ink: [0.102, 0.141, 0.11], accent: [0.184, 0.365, 0.271], mute: [0.369, 0.42, 0.384] },
  },
];

export function paletteOf(id: PaletteId) {
  return PALETTES.find((p) => p.id === id) ?? PALETTES[0];
}
