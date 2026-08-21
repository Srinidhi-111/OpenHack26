export default function LoadingState() {
  return (
    <div className="mt-6 flex items-center gap-3 text-paper-400">
      <span className="h-4 w-4 rounded-full border-2 border-brand/30 border-t-brand animate-spin" />
      <span>Analyzing message…</span>
    </div>
  );
}