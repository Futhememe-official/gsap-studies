import type { StudyRoute } from "@/shared/models/StudyRoute.model";

export const studies: StudyRoute[] = [
  {
    id: "study-01",
    title: "Basic Animations",
    description: "gsap.to, gsap.from, gsap.fromTo e easing",
    path: "/study-01",
    tag: "basic",
    difficulty: "beginner",
  },
  {
    id: "study-02",
    title: "ScrollTrigger",
    description: "Animações acionadas por scroll com pin e scrub",
    path: "/study-02",
    tag: "scroll",
    difficulty: "intermediate",
  },
  {
    id: "study-03",
    title: "Timeline",
    description: "Sequências complexas com gsap.timeline",
    path: "/study-03",
    tag: "timeline",
    difficulty: "intermediate",
  },
  {
    id: "study-04",
    title: "Menu",
    description: "Menu expansivo e animado via gsap",
    path: "/study-04",
    tag: "component",
    difficulty: "intermediate",
  },
];

export function getStudyById(id: string): StudyRoute | undefined {
  return studies.find((s) => s.id === id);
}
