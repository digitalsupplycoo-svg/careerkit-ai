"use client";

import { useState } from "react";
import { compareOffers, type JobOffer } from "@/lib/offerComparator";

type NumericField = keyof Omit<JobOffer, "label">;

const DEFAULT_OFFER: JobOffer = {
  label: "",
  annualSalary: 0,
  annualBonus: 0,
  remoteDaysPerWeek: 0,
  commuteMinutesOneWay: 0,
  growthRating: 3,
  cultureRating: 3
};

function OfferForm({
  title,
  offer,
  onChange
}: {
  title: string;
  offer: JobOffer;
  onChange: (field: NumericField | "label", value: string | number) => void;
}) {
  return (
    <div style={{ flex: 1, minWidth: 260 }}>
      <h3 className="tool-subheading">{title}</h3>
      <div className="field">
        <label>Company / offer name</label>
        <input type="text" value={offer.label} onChange={(e) => onChange("label", e.target.value)} placeholder={title} />
      </div>
      <div className="field">
        <label>Annual base salary ($)</label>
        <input
          type="number"
          min={0}
          value={offer.annualSalary}
          onChange={(e) => onChange("annualSalary", Number(e.target.value))}
        />
      </div>
      <div className="field">
        <label>Annual bonus / equity value ($)</label>
        <input
          type="number"
          min={0}
          value={offer.annualBonus}
          onChange={(e) => onChange("annualBonus", Number(e.target.value))}
        />
      </div>
      <div className="field">
        <label>Remote days per week (0–5)</label>
        <input
          type="number"
          min={0}
          max={5}
          value={offer.remoteDaysPerWeek}
          onChange={(e) => onChange("remoteDaysPerWeek", Number(e.target.value))}
        />
      </div>
      <div className="field">
        <label>One-way commute (minutes)</label>
        <input
          type="number"
          min={0}
          value={offer.commuteMinutesOneWay}
          onChange={(e) => onChange("commuteMinutesOneWay", Number(e.target.value))}
        />
      </div>
      <div className="field">
        <label>Growth potential, your rating (1–5)</label>
        <input
          type="number"
          min={1}
          max={5}
          value={offer.growthRating}
          onChange={(e) => onChange("growthRating", Number(e.target.value))}
        />
      </div>
      <div className="field">
        <label>Culture fit, your rating (1–5)</label>
        <input
          type="number"
          min={1}
          max={5}
          value={offer.cultureRating}
          onChange={(e) => onChange("cultureRating", Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default function OfferComparatorTool() {
  const [offerA, setOfferA] = useState<JobOffer>({ ...DEFAULT_OFFER, label: "Offer A" });
  const [offerB, setOfferB] = useState<JobOffer>({ ...DEFAULT_OFFER, label: "Offer B" });
  const [showResults, setShowResults] = useState(false);

  const result = showResults ? compareOffers(offerA, offerB) : null;

  function updateOffer(which: "A" | "B", field: NumericField | "label", value: string | number) {
    const setter = which === "A" ? setOfferA : setOfferB;
    setter((current) => ({ ...current, [field]: value }));
    setShowResults(false);
  }

  const labelA = offerA.label || "Offer A";
  const labelB = offerB.label || "Offer B";

  return (
    <div className="tool-panel" style={{ maxWidth: "none" }}>
      <div className="disclosure-note">
        This comparison runs entirely in your browser using the numbers and 1–5 ratings you enter — it has no
        access to real market data, so the growth and culture ratings are your own judgment, not an independent
        assessment.
      </div>

      <div className="field-row" style={{ alignItems: "flex-start" }}>
        <OfferForm title="Offer A" offer={offerA} onChange={(field, value) => updateOffer("A", field, value)} />
        <OfferForm title="Offer B" offer={offerB} onChange={(field, value) => updateOffer("B", field, value)} />
      </div>

      <button type="button" onClick={() => setShowResults(true)}>
        Compare offers
      </button>

      {result && (
        <div style={{ marginTop: "var(--space-4)" }}>
          <h2 className="tool-subheading">
            {result.overallWinner === "tie"
              ? "It's a statistical tie"
              : `${result.overallWinner === "A" ? labelA : labelB} comes out ahead`}
          </h2>
          <p className="tool-result-figure">
            {labelA}: {result.scoreA}/100 &nbsp;·&nbsp; {labelB}: {result.scoreB}/100
          </p>

          <div style={{ overflowX: "auto" }}>
            <table className="tool-table">
              <thead>
                <tr>
                  <th>Category (weight)</th>
                  <th>{labelA}</th>
                  <th>{labelB}</th>
                  <th>Edge</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row) => (
                  <tr key={row.category}>
                    <td>
                      {row.label} <span className="meta-text">({row.weight}%)</span>
                    </td>
                    <td>{row.valueA}</td>
                    <td>{row.valueB}</td>
                    <td>{row.winner === "tie" ? "Tie" : row.winner === "A" ? labelA : labelB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="meta-text" style={{ marginTop: "var(--space-2)" }}>
            Weights: compensation 35%, remote flexibility 15%, commute 15%, growth potential 20%, culture fit 15%.
            This is a decision-support tool, not financial advice — see our{" "}
            <a href="/disclaimer">Disclaimer</a>.
          </p>
        </div>
      )}
    </div>
  );
}
