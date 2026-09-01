import { describe, expect, it } from "vitest";
import { slugifyForFilename } from "@/lib/clientFile";

describe("slugifyForFilename", () => {
  it("lowercases and hyphenates spaces", () => {
    expect(slugifyForFilename("Acme Corp")).toBe("acme-corp");
  });

  it("strips punctuation", () => {
    expect(slugifyForFilename("Bob's Bagels, Inc.")).toBe("bob-s-bagels-inc");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugifyForFilename("  !!Weird Name!!  ")).toBe("weird-name");
  });

  it("falls back to 'download' for empty or fully-stripped input", () => {
    expect(slugifyForFilename("")).toBe("download");
    expect(slugifyForFilename("!!!")).toBe("download");
  });
});
