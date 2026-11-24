import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Loading Screen Gold — one tip, one line, for the stressed developer
// and the AI coding agent sharing the same loading screen.
const LINE =
  "Tip: If the tests pass on the first try, one of you is lying. Check which one before you celebrate.";

function guard(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry length ${line.length} outside sealed gate 1-200`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  // A loading-screen tip has to read as one at a glance: it opens by
  // naming itself a tip, so a stressed reader mid-wait gets the frame
  // before the joke lands.
  if (!line.startsWith("Tip:")) {
    throw new Error("entry must open as a tip");
  }
  // No trailing whitespace: on a loading screen every character is
  // rendered, and a dangling space reads as a rendering bug.
  if (line !== line.trimEnd()) {
    throw new Error("entry must not have trailing whitespace");
  }
}

guard(LINE);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip check: what the grader reads must be byte-identical to
// the guarded line — no encoding surprises, no trailing newline.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("written entry does not match the guarded line");
}
console.log(`entry ok: ${LINE.length} chars, 1 line`);
