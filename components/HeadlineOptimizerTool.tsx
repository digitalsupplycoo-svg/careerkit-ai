"use client";

import { useState } from "react";
import { analyzeHeadline, suggestHeadlines } from "@/lib/headlineOptimizer";
import { copyToClipboard } from "@/lib/clientFile";

export default function HeadlineOptimizerTool() {
  const [headline, setHeadline] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const analysis = showResults ? analyzeHeadline(headline) : null;
  const suggestions = showResults ? suggestHeadlines(headline) : [];

  async function handleCopy(id: string, text: string) {
    const ok = await copyToClipboard(text);
    setCopiedId(ok ? id : null);
    if (ok) setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 2000);
  }

  return (
    <div className="tool-panel">
      <div className="disclosure-note">
        Your headline is analyzed entirely in your browser using visible, checkable rules (length, structure,
        keywords, power words) — not a hidden AI model, and not LinkedIn&apos;s actual search ranking algorithm,
        which isn&apos;t public.
      </div>

      <div className="field">
        <label htmlFor="current-headline">Your current LinkedIn headline</label>
        <textarea
          id="current-headline"
          rows={3}
          placeholder="e.g. Marketing professional seeking new opportunities"
          value={headline}
          onChange={(e) => {
            setHeadline(e.target.value);
            setShowResults(false);
          }}
        />
      </div>

      <button type="button" onClick={() => setShowResults(true)} disabled={!headline.trim()}>
        Analyze &amp; suggest headlines
      </button>

      {analysis && (
        <div style={{ marginTop: "var(--space-4)" }}>
          <h2 className="tool-subheading">Analysis</h2>
          <p className="tool-result-figure">{analysis.score}/100</p>
          <ul>
            <li>
              Length: {analysis.length} characters
              {analysis.tooShort && " — quite short; there's room to say more about what you actually do"}
              {!analysis.withinLinkedInLimit && " — over LinkedIn's 220-character limit and will be cut off"}
              {analysis.truncatesInPreview &&
                analysis.withinLinkedInLimit &&
                " — front-load your strongest phrase, since search results and feeds preview only the first ~60 characters"}
            </li>
            <li>
              Structure: {analysis.hasSeparator ? "Uses a separator (| or •) to break up ideas" : "No separator found — consider splitting distinct ideas with a | or •"}
            </li>
            <li>
              Power words: {analysis.hasPowerWord ? "Includes an active, outcome-oriented verb" : "No strong action verb found (e.g. driving, building, leading)"}
            </li>
            <li>
              Specifics: {analysis.hasNumbers ? "Includes a number — good, numbers stand out" : "No numbers — a specific figure (team size, % growth, years) helps you stand out"}
            </li>
            {analysis.genericPhrasesFound.length > 0 && (
              <li>
                Contains generic phrasing that undersells you: &quot;{analysis.genericPhrasesFound.join('", "')}&quot;.
                Recruiters searching by skill or title won&apos;t find you through phrases like these — lead with
                what you do, not your job-search status.
              </li>
            )}
          </ul>

          <h2 className="tool-subheading">5 optimized headline templates</h2>
          <p>
            These are structural templates seeded from your headline, not finished copy — replace the bracketed
            placeholders with your own specifics before using one.
          </p>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                padding: "var(--space-2)",
                marginBottom: "var(--space-2)"
              }}
            >
              <p className="meta-text">{suggestion.label}</p>
              <p style={{ fontWeight: 600 }}>{suggestion.headline}</p>
              <button type="button" onClick={() => handleCopy(suggestion.id, suggestion.headline)}>
                {copiedId === suggestion.id ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
