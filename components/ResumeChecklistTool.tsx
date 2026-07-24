"use client";

import { useMemo, useState } from "react";

type ExperienceLevel = "entry" | "mid" | "senior" | "career-change";

const BASE_ITEMS = [
  "Contact info includes a professional email and location (city/state or 'Remote')",
  "No spelling or grammar errors — read it aloud once, then have someone else read it",
  "Consistent date formatting throughout (e.g., 'Jan 2023 – Present')",
  "File is a PDF, unless the application explicitly requests another format",
  "File name includes your name, e.g., 'Firstname-Lastname-Resume.pdf'"
];

const LEVEL_ITEMS: Record<ExperienceLevel, string[]> = {
  entry: [
    "Education section includes relevant coursework, projects, or GPA if 3.5+",
    "Internships and part-time work are framed around transferable skills, not just duties",
    "At least one line quantifies an outcome (e.g., 'Increased X by Y%')"
  ],
  mid: [
    "Each bullet leads with an action verb and ends with a measurable result",
    "Most recent role has 4–6 bullets; older roles are trimmed to 2–3",
    "Skills section reflects tools you've used in the last 2 years, not everything ever touched"
  ],
  senior: [
    "Resume opens with a 2–3 line summary framing your scope and impact",
    "Bullets emphasize leadership, strategy, and business outcomes over task lists",
    "Older or less relevant roles are condensed into a single 'Earlier Experience' block"
  ],
  "career-change": [
    "A short summary explicitly bridges your past field to your target role",
    "Transferable skills are named directly, not left for the reader to infer",
    "Industry-specific jargon from your old field is translated into the new field's language"
  ]
};

export default function ResumeChecklistTool() {
  const [level, setLevel] = useState<ExperienceLevel>("mid");
  const [targetsAts, setTargetsAts] = useState(true);

  const items = useMemo(() => {
    const list = [...BASE_ITEMS, ...LEVEL_ITEMS[level]];
    if (targetsAts) {
      list.push(
        "Job title and key skills from the posting appear verbatim somewhere in the resume",
        "No tables, text boxes, or graphics that an ATS parser could misread",
        "Standard section headings used ('Experience', 'Education', 'Skills')"
      );
    }
    return list;
  }, [level, targetsAts]);

  return (
    <div className="tool-panel">
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="level" style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
          Experience level
        </label>
        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value as ExperienceLevel)}
        >
          <option value="entry">Entry-level / new graduate</option>
          <option value="mid">Mid-career</option>
          <option value="senior">Senior / leadership</option>
          <option value="career-change">Career change</option>
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>
          <input
            type="checkbox"
            checked={targetsAts}
            onChange={(e) => setTargetsAts(e.target.checked)}
          />{" "}
          Applying mostly through online systems that use resume-screening software (ATS)
        </label>
      </div>

      <h2 style={{ fontSize: "1.05rem" }}>Your checklist</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button type="button" onClick={() => window.print()}>
        Print this checklist
      </button>
    </div>
  );
}
