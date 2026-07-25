import type { ToolIconName } from "@/lib/tools";

interface ToolIconProps {
  name: ToolIconName;
}

const SHARED_PROPS = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true
};

/** Minimal hand-drawn outline icons — no icon library dependency, colors inherit via currentColor. */
export default function ToolIcon({ name }: ToolIconProps) {
  switch (name) {
    case "checklist":
      return (
        <svg {...SHARED_PROPS}>
          <rect x="5" y="3.5" width="14" height="17" rx="2" />
          <path d="M9 3.5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.5" />
          <path d="M8.5 11.5l2 2 3.5-4" />
          <path d="M8.5 16.5h7" />
        </svg>
      );
    case "salary":
      return (
        <svg {...SHARED_PROPS}>
          <path d="M4 19V10" />
          <path d="M10 19V5" />
          <path d="M16 19v-7" />
          <path d="M20 19H2" />
          <path d="M15 3l2.5 2.5L20 3" />
        </svg>
      );
    case "keyword":
      return (
        <svg {...SHARED_PROPS}>
          <rect x="4" y="3" width="12" height="15" rx="1.5" />
          <path d="M7 7.5h6M7 10.5h6M7 13.5h3.5" />
          <circle cx="16.5" cy="16.5" r="3" />
          <path d="M18.8 18.8L21 21" />
        </svg>
      );
    case "tracker":
      return (
        <svg {...SHARED_PROPS}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18" />
          <path d="M8 13h1M8 16h1M12 13h4M12 16h2.5" />
        </svg>
      );
    default:
      return null;
  }
}
