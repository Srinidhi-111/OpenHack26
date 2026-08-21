const BANDS = [
  { max: 0.34, label: "Looks safe", ta: "பாதுகாப்பானது", color: "bg-risk-safe", text: "text-risk-safe" },
  { max: 0.67, label: "Use caution", ta: "எச்சரிக்கை", color: "bg-risk-caution", text: "text-risk-caution" },
  { max: 1.01, label: "High risk", ta: "ஆபத்து", color: "bg-risk-danger", text: "text-risk-danger" },
];

function getBand(score) {
  return BANDS.find((b) => score <= b.max) ?? BANDS[BANDS.length - 1];
}

export default function RiskMeter({ score }) {
  const clamped = Math.min(1, Math.max(0, score));
  const band = getBand(clamped);
  const pct = Math.round(clamped * 100);

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-2">
        <span className={`font-display font-semibold tracking-wide ${band.text}`}>
          {band.ta} · {band.label}
        </span>
        <span className="font-display text-2xl font-semibold text-paper-50">
          {pct}
          <span className="text-sm text-paper-400">/100</span>
        </span>
      </div>
      <div className="relative h-3 rounded-full bg-ink-700 overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-[34%] bg-risk-safe/20" />
          <div className="w-[33%] bg-risk-caution/20" />
          <div className="w-[33%] bg-risk-danger/20" />
        </div>
        <div
          className={`absolute top-0 left-0 h-full rounded-full ${band.color} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}