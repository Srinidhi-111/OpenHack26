/**
 * Splits `text` into segments, marking which ones match any of `phrases`
 * (case-insensitive). Used to highlight flagged phrases inline in the
 * original message.
 */
export function splitWithHighlights(text, phrases) {
  const clean = (phrases || []).filter(Boolean);
  if (!clean.length) return [{ text, flagged: false }];

  const escaped = clean
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length); // longest first avoids partial-match splits

  if (!escaped.length) return [{ text, flagged: false }];

  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  return text
    .split(regex)
    .filter((chunk) => chunk !== "")
    .map((chunk) => ({
      text: chunk,
      flagged: escaped.some((p) => new RegExp(`^${p}$`, "i").test(chunk)),
    }));
}