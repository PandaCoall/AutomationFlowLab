import type { Brand, JobRow, Mapping, Row } from "./types";
import { validEmail } from "./parse";

export function buildJobs(rows: Row[], mapping: Mapping, fallbackCourse: string): JobRow[] {
  const seen = new Set<string>();
  return rows.map((row, index) => {
    const name = (mapping.name && row[mapping.name]) || "";
    const email = ((mapping.email && row[mapping.email]) || "").trim().toLowerCase();
    const course = ((mapping.course && row[mapping.course]) || fallbackCourse).trim();
    const date = (mapping.date && row[mapping.date]) || "";
    const score = (mapping.score && row[mapping.score]) || "";
    const key = `${email}|${course}|${date}`;
    const duplicate = email && seen.has(key);
    if (email) seen.add(key);
    const certId = `CERT-${String(index + 1).padStart(4, "0")}`;
    let status: JobRow["status"] = "pending";
    let note = "Waiting";
    if (!name) {
      status = "failed";
      note = "Missing name";
    } else if (!validEmail(email)) {
      status = "failed";
      note = "Invalid email — will not send";
    } else if (duplicate) {
      status = "skipped";
      note = "Duplicate of an earlier row";
    }
    return {
      index,
      name,
      email,
      course,
      date,
      score,
      certId,
      status,
      attempts: 0,
      note,
    };
  });
}

/** Deterministic "throttle" so the queue shows a retry instead of a dead run. */
export function shouldThrottle(row: JobRow, attempt: number) {
  return attempt === 1 && row.index % 7 === 3;
}

export function subjectFor(row: JobRow, brand: Brand) {
  return `${brand.org}: your ${row.course} certificate`;
}
