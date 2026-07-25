"use client";

import { useState } from "react";
import Link from "next/link";
import { getFeaturedTool } from "@/lib/tools";

const TEASER_ITEMS = [
  { id: "numbers", label: "Uses numbers to show impact (e.g. “increased X by 20%”)" },
  { id: "dates", label: "Consistent date formatting throughout" },
  { id: "pdf", label: "Saved as a PDF, file named with your actual name" },
  { id: "keywords", label: "Key terms from the job posting show up somewhere in it" }
];

/**
 * A 4-item preview of the full Resume Checklist Generator, live in the hero.
 * Purely a self-assessment tally computed in the browser — nothing is sent
 * anywhere — that leads into the full, tailored checklist tool.
 */
export default function HeroChecklistTeaser() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const tool = getFeaturedTool();
  const score = Object.values(checked).filter(Boolean).length;

  function toggle(id: string) {
    setChecked((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <div className="hero-teaser">
      <p className="hero-teaser-label">Quick check — does your resume do this?</p>
      <ul className="hero-teaser-list">
        {TEASER_ITEMS.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={!!checked[item.id]}
                onChange={() => toggle(item.id)}
              />
              {item.label}
            </label>
          </li>
        ))}
      </ul>
      <div className="hero-teaser-result">
        <span>
          <span className="hero-teaser-score">{score}/4</span> quick wins
        </span>
        <Link href={tool.path} className="btn-primary">
          Get your full checklist →
        </Link>
      </div>
    </div>
  );
}
