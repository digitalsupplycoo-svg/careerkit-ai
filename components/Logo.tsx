interface LogoMarkProps {
  /** Rendered size in px. Defaults to the header size. */
  size?: number;
}

/**
 * The CareerKit AI brand mark: a solid rounded square with a checkmark
 * knocked out of it.
 *
 * Built as ONE path with fillRule="evenodd" on purpose — the checkmark is a
 * real hole, not a second shape painted in a background color. That means the
 * mark needs no knowledge of what's behind it: it inherits `currentColor` and
 * stays correct on white, on the black hero, on the footer, and in dark mode,
 * with no per-context overrides.
 */
export function LogoMark({ size = 28 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 0h18a7 7 0 0 1 7 7v18a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7ZM9 13l4.8 4.8L23.4 8.2v6l-9.6 9.6L9 19v-6Z"
      />
    </svg>
  );
}

/**
 * Full logo lockup (mark + wordmark) used in the site header. The wordmark
 * stays real text rather than SVG paths so it renders in the site's actual
 * font, stays selectable, and is read correctly by screen readers.
 */
export default function Logo() {
  return (
    <span className="logo-lockup">
      <LogoMark />
      <span className="logo-wordmark">
        CareerKit<span className="logo-wordmark-ai">AI</span>
      </span>
    </span>
  );
}
