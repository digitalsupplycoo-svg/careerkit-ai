"use client";

import { useEffect, useState } from "react";

interface JobEntry {
  id: string;
  company: string;
  role: string;
  status: "Applied" | "Interviewing" | "Offer" | "Rejected";
  appliedOn: string;
}

const STORAGE_KEY = "careerkit-job-tracker-entries";

function loadEntries(): JobEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as JobEntry[]) : [];
  } catch {
    return [];
  }
}

export default function JobTrackerTool() {
  const [entries, setEntries] = useState<JobEntry[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setEntries(loadEntries());
  }, []);

  function persist(next: JobEntry[]) {
    setEntries(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function addEntry() {
    if (!company.trim() || !role.trim()) return;
    const entry: JobEntry = {
      id: crypto.randomUUID(),
      company: company.trim(),
      role: role.trim(),
      status: "Applied",
      appliedOn: new Date().toISOString().slice(0, 10)
    };
    persist([entry, ...entries]);
    setCompany("");
    setRole("");
  }

  function updateStatus(id: string, status: JobEntry["status"]) {
    persist(entries.map((e) => (e.id === id ? { ...e, status } : e)));
  }

  function removeEntry(id: string) {
    persist(entries.filter((e) => e.id !== id));
  }

  return (
    <div className="tool-panel">
      <div className="field-row">
        <input
          aria-label="Company"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          aria-label="Role"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button type="button" onClick={addEntry}>
          Add
        </button>
      </div>

      {entries.length === 0 ? (
        <p>No applications tracked yet. Add one above — it&apos;s saved only in this browser.</p>
      ) : (
        <table className="tool-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Applied</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.company}</td>
                <td>{entry.role}</td>
                <td>{entry.appliedOn}</td>
                <td>
                  <select
                    value={entry.status}
                    onChange={(e) => updateStatus(entry.id, e.target.value as JobEntry["status"])}
                  >
                    <option>Applied</option>
                    <option>Interviewing</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>
                </td>
                <td>
                  <button type="button" onClick={() => removeEntry(entry.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
