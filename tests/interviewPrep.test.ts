import { describe, expect, it } from "vitest";
import { generateInterviewQuestions } from "@/lib/interviewPrep";

describe("generateInterviewQuestions", () => {
  it("always returns exactly 10 questions", () => {
    for (const seniority of ["junior", "mid", "senior"] as const) {
      const questions = generateInterviewQuestions({ jobTitle: "Designer", seniority, industry: "tech" });
      expect(questions).toHaveLength(10);
    }
  });

  it("returns unique question ids", () => {
    const questions = generateInterviewQuestions({ jobTitle: "Designer", seniority: "mid", industry: "tech" });
    expect(new Set(questions.map((q) => q.id)).size).toBe(10);
  });

  it("every question has a non-empty framework, not a scripted answer", () => {
    const questions = generateInterviewQuestions({ jobTitle: "Nurse", seniority: "senior", industry: "healthcare" });
    for (const q of questions) {
      expect(q.framework.length).toBeGreaterThan(20);
    }
  });

  it("tailors questions by seniority", () => {
    const junior = generateInterviewQuestions({ jobTitle: "Analyst", seniority: "junior", industry: "finance" });
    const senior = generateInterviewQuestions({ jobTitle: "Analyst", seniority: "senior", industry: "finance" });
    expect(junior.some((q) => q.id === "junior-learning")).toBe(true);
    expect(senior.some((q) => q.id === "senior-influence")).toBe(true);
    expect(senior.some((q) => q.id === "junior-learning")).toBe(false);
  });

  it("weaves the job title and industry into the role/industry-specific questions", () => {
    const questions = generateInterviewQuestions({ jobTitle: "Backend Engineer", seniority: "mid", industry: "fintech" });
    const roleQ = questions.find((q) => q.id === "role-specific");
    const industryQ = questions.find((q) => q.id === "industry-specific");
    expect(roleQ?.question).toContain("Backend Engineer");
    expect(industryQ?.question).toContain("fintech");
  });

  it("always ends with the closing question", () => {
    const questions = generateInterviewQuestions({ jobTitle: "PM", seniority: "junior", industry: "retail" });
    expect(questions[questions.length - 1].id).toBe("questions-for-us");
  });
});
