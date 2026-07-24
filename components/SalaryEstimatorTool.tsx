"use client";

import { useState } from "react";

/**
 * Purely arithmetic, transparent estimate — not a market-data lookup and not
 * financial or employment advice. See /disclaimer.
 */
export default function SalaryEstimatorTool() {
  const [baseSalary, setBaseSalary] = useState(70000);
  const [yearsExperience, setYearsExperience] = useState(3);
  const [highDemandSkills, setHighDemandSkills] = useState(1);

  const experienceAdjustment = Math.min(yearsExperience, 15) * 0.015;
  const skillsAdjustment = Math.min(highDemandSkills, 5) * 0.02;
  const totalMultiplier = 1 + experienceAdjustment + skillsAdjustment;

  const low = Math.round((baseSalary * totalMultiplier * 0.93) / 500) * 500;
  const target = Math.round((baseSalary * totalMultiplier) / 500) * 500;
  const high = Math.round((baseSalary * totalMultiplier * 1.1) / 500) * 500;

  return (
    <div className="tool-panel">
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="base" style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
          Typical posted salary for this role in your area
        </label>
        <input
          id="base"
          type="number"
          value={baseSalary}
          min={0}
          step={1000}
          onChange={(e) => setBaseSalary(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="years" style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
          Years of relevant experience
        </label>
        <input
          id="years"
          type="number"
          value={yearsExperience}
          min={0}
          max={40}
          onChange={(e) => setYearsExperience(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="skills" style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
          Number of in-demand skills for this role you have (0–5)
        </label>
        <input
          id="skills"
          type="number"
          value={highDemandSkills}
          min={0}
          max={5}
          onChange={(e) => setHighDemandSkills(Number(e.target.value))}
        />
      </div>

      <h2 style={{ fontSize: "1.05rem" }}>Suggested negotiation range</h2>
      <p style={{ fontSize: "1.3rem", fontWeight: 700 }}>
        ${low.toLocaleString()} – ${high.toLocaleString()}
      </p>
      <p>Anchor point: ${target.toLocaleString()}</p>
      <p style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>
        This is an educational estimate based on the numbers you entered, not a verified market-data lookup. See
        the explanation below before using it in a negotiation.
      </p>
    </div>
  );
}
