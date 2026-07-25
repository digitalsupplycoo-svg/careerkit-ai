import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/pageMetadata";

export const metadata = buildMetadata({
  path: "/about",
  title: "About CareerKit AI",
  description: "What CareerKit AI is, who it's for, and how the guides and tools are put together."
});

export default function AboutPage() {
  return (
    <div className="page-container article-content">
      <Breadcrumbs items={[{ name: "About" }]} />
      <h1>About CareerKit AI</h1>
      <p>
        CareerKit AI publishes practical, example-driven guides on job searching, resume writing, interviews, and
        workplace communication, alongside a small set of free browser-based tools. The site is built and edited
        by the CareerKit AI Editorial Team, a small group responsible for researching, writing, and reviewing every
        guide before publication.
      </p>
      <h2>Who this is for</h2>
      <p>
        Job seekers at any stage — new graduates, career changers, people returning to work after a break, and
        experienced professionals negotiating their next role — who want concrete, usable advice instead of
        generic platitudes.
      </p>
      <h2>How content is produced</h2>
      <p>
        Every guide is written specifically for this site. None of the content is copied, spun, auto-translated,
        or generated from a template and lightly edited. See our <a href="/editorial-policy">Editorial Policy</a>{" "}
        for details on how guides are researched, reviewed, and updated.
      </p>
      <h2>How the site is funded</h2>
      <p>
        CareerKit AI is intended to be supported in part by contextual, clearly labeled display advertising once
        the site is approved for that program. Advertising never determines the content or recommendations in a
        guide. See our <a href="/advertising-disclosure">Advertising Disclosure</a> for details.
      </p>
    </div>
  );
}
