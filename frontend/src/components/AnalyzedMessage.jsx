import { splitWithHighlights } from "../lib/highlight";

export default function AnalyzedMessage({ text, flaggedPhrases }) {
  const segments = splitWithHighlights(text, flaggedPhrases);

  return (
    <div className="rounded-2xl bg-paper-100 text-ink-900 px-5 py-4 shadow-lg shadow-black/20">
      <p className="font-tamil text-base leading-relaxed whitespace-pre-wrap">
        {segments.map((seg, i) =>
          seg.flagged ? (
            <mark
              key={i}
              className="bg-risk-danger/30 text-ink-900 rounded px-0.5 box-decoration-clone"
            >
              {seg.text}
            </mark>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </p>
    </div>
  );
}