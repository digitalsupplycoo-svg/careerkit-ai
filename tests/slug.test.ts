import { describe, expect, it } from "vitest";
import { slugify, isValidSlug } from "@/lib/slug";

describe("slugify", () => {
  it("lowercases and hyphenates spaces", () => {
    expect(slugify("How to Ask for a Raise")).toBe("how-to-ask-for-a-raise");
  });

  it("strips punctuation", () => {
    expect(slugify("What's Next? A Guide.")).toBe("what-s-next-a-guide");
  });

  it("collapses runs of non-alphanumeric characters into a single hyphen", () => {
    expect(slugify("A --- B")).toBe("a-b");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  !!Leading and Trailing!!  ")).toBe("leading-and-trailing");
  });

  it("uses the provided fallback for empty or fully-stripped input", () => {
    expect(slugify("", "untitled")).toBe("untitled");
    expect(slugify("!!!", "untitled")).toBe("untitled");
  });

  it("defaults the fallback to 'untitled' when none is given", () => {
    expect(slugify("")).toBe("untitled");
  });
});

describe("isValidSlug", () => {
  it("accepts lowercase-hyphenated slugs", () => {
    expect(isValidSlug("how-to-ask-for-a-raise")).toBe(true);
    expect(isValidSlug("a")).toBe(true);
    expect(isValidSlug("a1-b2")).toBe(true);
  });

  it("rejects uppercase, spaces, underscores, and leading/trailing hyphens", () => {
    expect(isValidSlug("How-To")).toBe(false);
    expect(isValidSlug("how to")).toBe(false);
    expect(isValidSlug("how_to")).toBe(false);
    expect(isValidSlug("-how-to")).toBe(false);
    expect(isValidSlug("how-to-")).toBe(false);
    expect(isValidSlug("")).toBe(false);
  });

  it("every output of slugify (with non-empty input) is itself a valid slug", () => {
    const samples = ["Hello World!", "  Weird   Spacing  ", "Already-valid-slug", "123 Numbers"];
    for (const s of samples) {
      expect(isValidSlug(slugify(s))).toBe(true);
    }
  });
});
