import * as XLSX from "xlsx";
import type { FieldKey, Mapping, Row } from "./types";

const HINTS: Record<FieldKey, string[]> = {
  name: ["name", "full name", "learner", "student", "fullname"],
  email: ["email", "e-mail", "mail"],
  course: ["course", "level", "programme", "program", "class", "module"],
  date: ["date", "completed", "completion", "issued"],
  score: ["score", "grade", "mark", "result"],
};

export async function parseSheet(file: File): Promise<{ headers: string[]; rows: Row[] }> {
  const buf = await file.arrayBuffer();
  const book = XLSX.read(buf, { type: "array", cellDates: true });
  const sheet = book.Sheets[book.SheetNames[0]];
  if (!sheet) return { headers: [], rows: [] };
  const raw = XLSX.utils.sheet_to_json<(string | number | Date | null)[]>(sheet, {
    header: 1,
    raw: false,
    defval: "",
  });
  const headerRow = (raw[0] ?? []).map((c) => String(c ?? "").trim());
  const headers = headerRow.filter(Boolean);
  const rows: Row[] = [];
  for (const line of raw.slice(1)) {
    const row: Row = {};
    let empty = true;
    headerRow.forEach((h, i) => {
      if (!h) return;
      const value = String(line?.[i] ?? "").trim();
      if (value) empty = false;
      row[h] = value;
    });
    if (!empty) rows.push(row);
  }
  return { headers, rows };
}

export function guessMapping(headers: string[]): Mapping {
  const used = new Set<string>();
  const pick = (key: FieldKey) => {
    const hit = headers.find((h) => {
      if (used.has(h)) return false;
      const n = h.toLowerCase().trim();
      return HINTS[key].some((hint) => n === hint || n.includes(hint));
    });
    if (hit) used.add(hit);
    return hit ?? "";
  };
  return {
    name: pick("name"),
    email: pick("email"),
    course: pick("course"),
    date: pick("date"),
    score: pick("score"),
  };
}

export function rowsToWorkbook(rows: Record<string, string>[], name: string): Blob {
  const sheet = XLSX.utils.json_to_sheet(rows);
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, name.slice(0, 31));
  const out = XLSX.write(book, { bookType: "xlsx", type: "array" }) as ArrayBuffer;
  return new Blob([out], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validEmail(value: string) {
  return EMAIL.test(value.trim());
}
