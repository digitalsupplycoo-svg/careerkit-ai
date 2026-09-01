"use client";

import { useState } from "react";
import { generateCoverLetters, type CoverLetterTone, type CoverLetterVariant } from "@/lib/coverLetter";
import { copyToClipboard, downloadTextFile, slugifyForFilename } from "@/lib/clientFile";

export default function CoverLetterGeneratorTool() {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [tone, setTone] = useState<CoverLetterTone>("formal");
  const [variants, setVariants] = useState<CoverLetterVariant[] | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function handleGenerate() {
    setVariants(
      generateCoverLetters({
        companyName,
        jobTitle,
        applicantName,
        skills: [skill1, skill2, skill3],
        tone
      })
    );
  }

  async function handleCopy(variant: CoverLetterVariant) {
    const ok = await copyToClipboard(variant.body);
    setCopiedId(ok ? variant.id : null);
    if (ok) setTimeout(() => setCopiedId((current) => (current === variant.id ? null : current)), 2000);
  }

  function handleDownload(variant: CoverLetterVariant) {
    const filename = `cover-letter-${slugifyForFilename(companyName || "draft")}-${variant.id}.txt`;
    downloadTextFile(filename, variant.body);
  }

  return (
    <div className="tool-panel">
      <div className="disclosure-note">
        Everything here runs in your browser. Nothing you type is sent to a server or stored anywhere. These are
        starting drafts built from simple templates, not an AI model — read each one and edit it until it sounds
        like you before sending it anywhere.
      </div>

      <div className="field-row">
        <div className="field" style={{ flex: 1, minWidth: 200 }}>
          <label htmlFor="company-name">Company name</label>
          <input
            id="company-name"
            type="text"
            value={companyName}
            placeholder="e.g. Acme Corp"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="field" style={{ flex: 1, minWidth: 200 }}>
          <label htmlFor="job-title">Job title</label>
          <input
            id="job-title"
            type="text"
            value={jobTitle}
            placeholder="e.g. Product Manager"
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="applicant-name">Your name (used for the sign-off)</label>
        <input
          id="applicant-name"
          type="text"
          value={applicantName}
          placeholder="e.g. Jordan Lee"
          onChange={(e) => setApplicantName(e.target.value)}
        />
      </div>

      <div className="field-row">
        <div className="field" style={{ flex: 1, minWidth: 160 }}>
          <label htmlFor="skill-1">Key skill 1</label>
          <input id="skill-1" type="text" value={skill1} onChange={(e) => setSkill1(e.target.value)} />
        </div>
        <div className="field" style={{ flex: 1, minWidth: 160 }}>
          <label htmlFor="skill-2">Key skill 2</label>
          <input id="skill-2" type="text" value={skill2} onChange={(e) => setSkill2(e.target.value)} />
        </div>
        <div className="field" style={{ flex: 1, minWidth: 160 }}>
          <label htmlFor="skill-3">Key skill 3</label>
          <input id="skill-3" type="text" value={skill3} onChange={(e) => setSkill3(e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="tone">Tone</label>
        <select id="tone" value={tone} onChange={(e) => setTone(e.target.value as CoverLetterTone)}>
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
        </select>
      </div>

      <button type="button" onClick={handleGenerate}>
        Generate 3 drafts
      </button>

      {variants && (
        <div style={{ marginTop: "var(--space-4)" }}>
          {variants.map((variant) => (
            <div key={variant.id} className="tool-panel" style={{ marginTop: "var(--space-3)", maxWidth: "none" }}>
              <h3 className="tool-subheading">{variant.label}</h3>
              <p className="meta-text">{variant.approach}</p>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "inherit",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                  padding: "var(--space-2)",
                  background: "var(--color-accent-soft)"
                }}
              >
                {variant.body}
              </pre>
              <div className="field-row" style={{ marginBottom: 0 }}>
                <button type="button" onClick={() => handleCopy(variant)}>
                  {copiedId === variant.id ? "Copied!" : "Copy to clipboard"}
                </button>
                <button type="button" onClick={() => handleDownload(variant)}>
                  Download as .txt
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
