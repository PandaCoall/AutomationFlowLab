import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage, type PDFPage } from "pdf-lib";
import type { Brand, JobRow } from "./types";
import { paletteOf } from "./style";

const W = 841.89;
const H = 595.28;

function wrap(text: string, max: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function dataUrlBytes(dataUrl: string): Uint8Array | null {
  const comma = dataUrl.indexOf(",");
  if (comma < 0) return null;
  const b64 = dataUrl.slice(comma + 1);
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function embedLogo(doc: PDFDocument, dataUrl: string): Promise<PDFImage | null> {
  const bytes = dataUrlBytes(dataUrl);
  if (!bytes) return null;
  if (dataUrl.startsWith("data:image/png")) return doc.embedPng(bytes);
  if (dataUrl.startsWith("data:image/jpeg") || dataUrl.startsWith("data:image/jpg")) return doc.embedJpg(bytes);
  return null;
}

function centered(page: PDFPage, text: string, y: number, size: number, font: PDFFont, color: ReturnType<typeof rgb>) {
  const width = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: (W - width) / 2, y, size, font, color });
}

export async function certificatePdf(row: JobRow, brand: Brand): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([W, H]);
  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const serifBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const sans = await doc.embedFont(StandardFonts.Helvetica);
  const pal = paletteOf(brand.palette);
  const ink = rgb(...pal.rgb.ink);
  const accent = rgb(...pal.rgb.accent);
  const mute = rgb(...pal.rgb.mute);
  const paper = rgb(...pal.rgb.paper);
  const logo = brand.logo ? await embedLogo(doc, brand.logo) : null;

  page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: paper });

  if (brand.layout === "band") {
    page.drawRectangle({ x: 0, y: 0, width: 18, height: H, color: accent });
  } else if (brand.layout === "corner") {
    const m = 28;
    const len = 36;
    for (const [x1, y1, x2, y2] of [
      [m, H - m, m + len, H - m],
      [m, H - m, m, H - m - len],
      [W - m, H - m, W - m - len, H - m],
      [W - m, H - m, W - m, H - m - len],
      [m, m, m + len, m],
      [m, m, m, m + len],
      [W - m, m, W - m - len, m],
      [W - m, m, W - m, m + len],
    ] as const) {
      page.drawLine({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness: 1.4, color: accent });
    }
  } else {
    page.drawRectangle({ x: 22, y: 22, width: W - 44, height: H - 44, borderColor: ink, borderWidth: 1.4 });
    page.drawRectangle({ x: 30, y: 30, width: W - 60, height: H - 60, borderColor: accent, borderWidth: 0.6 });
  }

  if (logo) {
    const scale = Math.min(44 / logo.width, 44 / logo.height);
    const w = logo.width * scale;
    const h = logo.height * scale;
    const x = brand.logoSide === "right" ? W - 56 - w : 56;
    page.drawImage(logo, { x, y: H - 48 - h, width: w, height: h });
  }

  const orgY = logo ? H - 108 : H - 78;
  centered(page, brand.org.toUpperCase(), orgY, 11, sans, accent);
  centered(page, "CERTIFICATE OF COMPLETION", orgY - 28, 10, sans, mute);

  const name = row.name || "Learner";
  const nameSize = name.length > 28 ? 32 : 42;
  centered(page, name, orgY - 92, nameSize, serifBold, ink);
  centered(page, "has completed", orgY - 128, 14, serif, mute);

  const courseLines = wrap(row.course || "English Level 1", 42);
  let cy = orgY - 168;
  for (const line of courseLines) {
    centered(page, line, cy, 22, serifBold, ink);
    cy -= 28;
  }

  const meta = [row.date, row.score ? `Score ${row.score}` : "", row.certId].filter(Boolean).join("   ·   ");
  centered(page, meta, 168, 11, sans, mute);

  page.drawLine({ start: { x: 92, y: 128 }, end: { x: 292, y: 128 }, thickness: 0.7, color: ink });
  page.drawText(brand.signatory, { x: 92, y: 108, size: 12, font: serif, color: ink });
  page.drawText(brand.role, { x: 92, y: 92, size: 9, font: sans, color: mute });

  page.drawCircle({ x: W - 150, y: 118, size: 36, borderColor: accent, borderWidth: 1.2 });
  page.drawCircle({ x: W - 150, y: 118, size: 30, borderColor: accent, borderWidth: 0.5 });
  const sealLabel = "ISSUED";
  const sW = sans.widthOfTextAtSize(sealLabel, 8);
  page.drawText(sealLabel, { x: W - 150 - sW / 2, y: 114, size: 8, font: sans, color: accent });

  centered(page, brand.line, 52, 8, sans, mute);
  return doc.save();
}

export function fileNameFor(row: JobRow) {
  const slug = `${row.course}-${row.name}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return `${slug || "certificate"}-${row.certId}.pdf`;
}
