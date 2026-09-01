"use client";

import { useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { marked } from "marked";
import { slugify, isValidSlug } from "@/lib/slug";
import { MIN_WORDS_INTERNAL_SAFEGUARD } from "@/lib/contentSafeguards";
import { publishArticle, type PublishState } from "@/app/admin/new-post/actions";

interface NewPostFormProps {
  categories: string[];
  existingSlugs: string[];
}

const NEW_CATEGORY_VALUE = "__new_category__";
const initialState: PublishState = {};

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending || disabled}>
      {pending ? "Publishing…" : "Publish"}
    </button>
  );
}

export default function NewPostForm({ categories, existingSlugs }: NewPostFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(categories[0] ?? NEW_CATEGORY_VALUE);
  const [newCategory, setNewCategory] = useState("");
  const [body, setBody] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const existingSlugSet = useMemo(() => new Set(existingSlugs), [existingSlugs]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value, ""));
    }
  }

  function handleSlugChange(value: string) {
    setSlugTouched(true);
    setSlug(value);
  }

  const normalizedSlug = slug.trim();
  const slugFormatValid = normalizedSlug.length > 0 && isValidSlug(normalizedSlug);
  const slugCollision = normalizedSlug.length > 0 && existingSlugSet.has(normalizedSlug);

  const wordCount = useMemo(() => {
    const trimmed = body.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [body]);

  const previewHtml = useMemo(() => {
    if (!showPreview) return "";
    // The exact same call lib/articles.ts makes for a real, published
    // article (`marked.parse(content)`) — this is not a separate preview
    // renderer, just the live pipeline run one step earlier.
    return marked.parse(body) as string;
  }, [body, showPreview]);

  const effectiveCategory = (category === NEW_CATEGORY_VALUE ? newCategory : category).trim();

  const [state, formAction] = useFormState(publishArticle, initialState);

  const canSubmit =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    effectiveCategory.length > 0 &&
    body.trim().length > 0 &&
    slugFormatValid &&
    !slugCollision;

  return (
    <form action={formAction}>
      <input type="hidden" name="slug" value={normalizedSlug} />
      <input type="hidden" name="category" value={effectiveCategory} />
      {/* The visible body textarea is unmounted while the preview is showing
          (replaced by the rendered-HTML div below), so it can't carry the
          submitted value on its own — this hidden input always mirrors the
          current body text regardless of which view is active. */}
      <input type="hidden" name="body" value={body} />

      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="slug-input">URL slug</label>
        <input id="slug-input" type="text" value={slug} onChange={(e) => handleSlugChange(e.target.value)} />
        <p className="meta-text">/articles/{normalizedSlug || "…"}</p>
        {normalizedSlug.length > 0 && !slugFormatValid && (
          <p role="alert" className="meta-text">
            Slug can only contain lowercase letters, numbers, and hyphens.
          </p>
        )}
        {slugCollision && (
          <p role="alert" className="meta-text">
            An article with this slug already exists — choose a different one.
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="description">Description (used as the meta description)</label>
        <textarea
          id="description"
          name="description"
          rows={2}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="category-select">Category</label>
        <select id="category-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
          <option value={NEW_CATEGORY_VALUE}>+ Add new category…</option>
        </select>
      </div>

      {category === NEW_CATEGORY_VALUE && (
        <div className="field">
          <label htmlFor="new-category">New category name</label>
          <input id="new-category" type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        </div>
      )}

      <div className="field">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label htmlFor="body">Body (Markdown)</label>
          <button type="button" onClick={() => setShowPreview((v) => !v)}>
            {showPreview ? "Edit" : "Preview"}
          </button>
        </div>
        {showPreview ? (
          <div
            className="article-content tool-content"
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius)",
              padding: "var(--space-3)",
              minHeight: "200px"
            }}
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        ) : (
          <textarea id="body" rows={20} required value={body} onChange={(e) => setBody(e.target.value)} />
        )}
        <p className="meta-text">
          {wordCount} word{wordCount === 1 ? "" : "s"}
          {wordCount < MIN_WORDS_INTERNAL_SAFEGUARD && (
            <>
              {" "}
              — under the site&apos;s {MIN_WORDS_INTERNAL_SAFEGUARD}-word internal safeguard, so this article won&apos;t
              carry an ad slot until it&apos;s expanded past that. You can still publish.
            </>
          )}
        </p>
      </div>

      {state?.error && (
        <p role="alert" className="disclosure-note" style={{ fontWeight: 600 }}>
          {state.error}
        </p>
      )}
      {state?.success && state.url && (
        <p role="status" className="disclosure-note" style={{ fontWeight: 600 }}>
          Published! It will go live at <a href={state.url}>{state.url}</a> once your host&apos;s auto-deploy picks
          up the new commit — usually a minute or two, not instant.
        </p>
      )}

      <SubmitButton disabled={!canSubmit} />
    </form>
  );
}
