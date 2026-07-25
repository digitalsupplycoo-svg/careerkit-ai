"use client";

import { useMemo, useState } from "react";

// A small, deliberately boring stopword list — this is plain word-frequency
// matching, not semantic understanding. See the tool page copy for what this
// tool does and doesn't do.
const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "but", "of", "to", "in", "on", "for", "with",
  "at", "by", "from", "up", "about", "into", "over", "after", "is", "are",
  "was", "were", "be", "been", "being", "as", "it", "its", "this", "that",
  "these", "those", "you", "your", "we", "our", "will", "shall", "can",
  "may", "have", "has", "had", "do", "does", "did", "not", "no", "if",
  "than", "then", "so", "such", "who", "which", "what", "their", "them",
  "they", "job", "role", "work", "team", "years", "year", "experience",
  "including", "etc", "using", "use", "per"
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+.#\s-]/g, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOPWORDS.has(w) && !/^\d+$/.test(w));
}

export function topTerms(text: string, limit: number): Map<string, number> {
  const counts = new Map<string, number>();
  for (const word of tokenize(text)) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return new Map([...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit));
}

export default function ResumeKeywordMatcherTool() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const result = useMemo(() => {
    if (!resume.trim() || !jobDescription.trim()) return null;

    const jdTerms = topTerms(jobDescription, 30);
    const resumeWords = new Set(tokenize(resume));

    const matched: string[] = [];
    const missing: string[] = [];
    for (const [term, count] of jdTerms) {
      (resumeWords.has(term) ? matched : missing).push(`${term} (${count}×)`);
    }

    const coverage = jdTerms.size > 0 ? Math.round((matched.length / jdTerms.size) * 100) : 0;

    return { matched, missing, coverage, totalTerms: jdTerms.size };
  }, [resume, jobDescription]);

  return (
    <div className="tool-panel">
      <div className="disclosure-note">
        Everything here runs in your browser. Your resume and job description text are never sent to a
        server or stored anywhere — refreshing the page clears both fields. This is plain word-frequency
        matching, not an AI or semantic analysis, so treat it as a rough prompt for what to double-check,
        not a verdict on your resume.
      </div>

      <div className="field">
        <label htmlFor="jd-input">Job description</label>
        <textarea
          id="jd-input"
          rows={8}
          placeholder="Paste the job description text here"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="resume-input">Your resume text</label>
        <textarea
          id="resume-input"
          rows={8}
          placeholder="Paste your resume text here"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
      </div>

      {result && (
        <div>
          <p>
            <strong>{result.coverage}%</strong> of the job description&apos;s {result.totalTerms} most frequent
            distinctive terms also appear somewhere in your resume text.
          </p>

          {result.missing.length > 0 && (
            <>
              <h3 className="tool-subheading">Frequent job description terms not found in your resume</h3>
              <p>
                Not every term needs to appear verbatim — some may already be covered by a synonym or a more
                specific phrase in your resume. Use this as a list to sanity-check, not a checklist to
                mechanically stuff in.
              </p>
              <ul>
                {result.missing.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </>
          )}

          {result.matched.length > 0 && (
            <>
              <h3 className="tool-subheading">Terms already covered</h3>
              <ul>
                {result.matched.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
