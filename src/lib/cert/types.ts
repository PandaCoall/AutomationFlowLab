export type Row = Record<string, string>;

export type FieldKey = "name" | "email" | "course" | "date" | "score";

export type Mapping = Record<FieldKey, string>;

export type JobStatus = "pending" | "retry" | "sent" | "failed" | "skipped";

export type JobRow = {
  index: number;
  name: string;
  email: string;
  course: string;
  date: string;
  score: string;
  certId: string;
  status: JobStatus;
  attempts: number;
  note: string;
};

export type LayoutId = "classic" | "band" | "corner";
export type PaletteId = "seal" | "navy" | "forest";

export type Brand = {
  org: string;
  signatory: string;
  role: string;
  line: string;
  layout: LayoutId;
  palette: PaletteId;
  logo: string;
  logoSide: "left" | "right";
};

export const FIELD_LABEL: Record<FieldKey, string> = {
  name: "Learner name",
  email: "Email",
  course: "Course / level",
  date: "Completion date",
  score: "Score (optional)",
};

export const FIELDS: FieldKey[] = ["name", "email", "course", "date", "score"];
