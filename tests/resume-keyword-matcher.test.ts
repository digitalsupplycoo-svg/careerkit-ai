import { describe, expect, it } from "vitest";
import { tokenize, topTerms } from "@/components/ResumeKeywordMatcherTool";

describe("resume keyword matcher tokenizer", () => {
  it("lowercases and strips punctuation", () => {
    expect(tokenize("Payments, Fraud-Detection!")).toEqual(
      expect.arrayContaining(["payments", "fraud-detection"])
    );
  });

  it("filters out short and stopword tokens", () => {
    const tokens = tokenize("the team will work with a job for us and them");
    expect(tokens).toEqual([]);
  });

  it("keeps meaningful multi-character terms", () => {
    const tokens = tokenize("Kubernetes deployment pipeline for microservices");
    expect(tokens).toContain("kubernetes");
    expect(tokens).toContain("deployment");
    expect(tokens).toContain("pipeline");
    expect(tokens).toContain("microservices");
  });

  it("ranks topTerms by frequency, most frequent first", () => {
    const terms = topTerms("python python python sql sql java", 3);
    const ordered = [...terms.keys()];
    expect(ordered[0]).toBe("python");
    expect(terms.get("python")).toBe(3);
    expect(terms.get("sql")).toBe(2);
  });

  it("respects the limit parameter", () => {
    const terms = topTerms("alpha beta gamma delta epsilon zeta", 2);
    expect(terms.size).toBe(2);
  });
});
