export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="mt-6 rounded-2xl bg-risk-danger/10 border border-risk-danger/30 px-5 py-4 flex items-start justify-between gap-4">
      <div>
        <p className="font-display font-semibold text-risk-danger">Couldn't check that message</p>
        <p className="text-sm text-paper-400 mt-1">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="shrink-0 text-sm font-semibold text-risk-danger underline underline-offset-2 hover:no-underline"
        >
          Retry
        </button>
      )}
    </div>
  );
}