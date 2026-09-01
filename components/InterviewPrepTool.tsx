"use client";

import { useState } from "react";
import { generateInterviewQuestions, type Seniority } from "@/lib/interviewPrep";
import { downloadTextFile, slugifyForFilename } from "@/lib/clientFile";

export default function InterviewPrepTool() {
  const [jobTitle, setJobTitle] = useState("");
  const [seniority, setSeniority] = useState<Seniority>("mid");
  const [industry, setIndustry] = useState("");
  const [showResults, setShowResults] = useState(false);

  const questions = showResults ? generateInterviewQuestions({ jobTitle, seniority, industry }) : [];

  function handleDownload() {
    const content = questions
      .map((q, i) => `${i + 1}. [${q.category}] ${q.question}\n\nHow to structure your answer: ${q.framework}\n`)
      .join("\n");
    downloadTextFile(`interview-prep-${slugifyForFilename(jobTitle || "role")}.txt`, content);
  }

  return (
    <div className="tool-panel">
      <div className="disclosure-note">
        This tool generates likely questions and answer frameworks — how to structure a strong answer — not
        scripted answers. It has no way to know your real work history, so the substance of every answer has to
        come from you.
      </div>

      <div className="field-row">
        <div className="field" style={{ flex: 1, minWidth: 200 }}>
          <label htmlFor="ip-job-title">Job title</label>
          <input
            id="ip-job-title"
            type="text"
            value={jobTitle}
            placeholder="e.g. Product Designer"
            onChange={(e) => {
              setJobTitle(e.target.value);
              setShowResults(false);
            }}
          />
        </div>
        <div className="field" style={{ flex: 1, minWidth: 160 }}>
          <label htmlFor="ip-seniority">Seniority</label>
          <select
            id="ip-seniority"
            value={seniority}
            onChange={(e) => {
              setSeniority(e.target.value as Seniority);
              setShowResults(false);
            }}
          >
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div className="field" style={{ flex: 1, minWidth: 200 }}>
          <label htmlFor="ip-industry">Industry</label>
          <input
            id="ip-industry"
            type="text"
            value={industry}
            placeholder="e.g. healthcare, fintech, retail"
            onChange={(e) => {
              setIndustry(e.target.value);
              setShowResults(false);
            }}
          />
        </div>
      </div>

      <button type="button" onClick={() => setShowResults(true)} disabled={!jobTitle.trim()}>
        Generate 10 questions
      </button>

      {showResults && questions.length > 0 && (
        <div style={{ marginTop: "var(--space-4)" }}>
          <div className="field-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <h2 className="tool-subheading" style={{ margin: 0 }}>
              Your 10 questions
            </h2>
            <button type="button" onClick={handleDownload}>
              Download as .txt
            </button>
          </div>
          {questions.map((q, i) => (
            <div
              key={q.id}
              style={{
                borderBottom: "1px solid var(--color-border)",
                padding: "var(--space-2) 0"
              }}
            >
              <p className="meta-text">
                {i + 1}. {q.category}
              </p>
              <p style={{ fontWeight: 600 }}>{q.question}</p>
              <p>{q.framework}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
