import RiskMeter from "./RiskMeter";
import AnalyzedMessage from "./AnalyzedMessage";

export default function ResultPanel({ result, originalText }) {
  const { risk_score, flagged_phrases, explanation } = result;

  return (
    <div className="mt-6 space-y-5 animate-[fadeIn_0.3s_ease-out]">
      <RiskMeter score={risk_score} />
      <AnalyzedMessage text={originalText} flaggedPhrases={flagged_phrases} />

      {flagged_phrases?.length > 0 && (
        <div>
          <h3 className="text-sm text-paper-400 mb-2">Flagged phrases</h3>
          <div className="flex flex-wrap gap-2">
            {flagged_phrases.map((phrase, i) => (
              <span
                key={i}
                className="text-sm rounded-full bg-risk-danger/15 text-risk-danger border border-risk-danger/30 px-3 py-1"
              >
                {phrase}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-ink-700 border border-ink-600 px-5 py-4">
        <h3 className="text-sm text-paper-400 mb-1">Why it looks this way</h3>
        <p className="text-paper-50 leading-relaxed">{explanation}</p>
      </div>
    </div>
  );
}