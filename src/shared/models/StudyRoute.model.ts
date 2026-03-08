export interface StudyRoute {
  id: string;
  title: string;
  description: string;
  path: string;
  tag: StudyTag;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export type StudyTag =
  | "basic"
  | "scroll"
  | "timeline"
  | "svg"
  | "physics"
  | "text"
  | "component";

export const STUDY_TAG_COLORS: Record<StudyTag, string> = {
  basic: "#e8ff47",
  scroll: "#ff6b35",
  timeline: "#7c3aed",
  svg: "#06b6d4",
  physics: "#f43f5e",
  text: "#10b981",
  component: "#D9D9D9",
};
