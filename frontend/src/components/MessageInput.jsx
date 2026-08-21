export default function MessageInput({ value, onChange, onSubmit, disabled }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label htmlFor="message" className="block text-sm text-paper-400 mb-2">
        Paste the message you want checked
      </label>
      <textarea
        id="message"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={6}
        placeholder="Anna, unga bank account la irundhu Rs.50,000 debit aagiruchu. Confirm panna indha link click pannunga: bit.ly/xyz123"
        className="w-full rounded-2xl bg-ink-700 border border-ink-600 px-4 py-3 text-paper-50
                   placeholder:text-paper-400/50 font-tamil text-base leading-relaxed
                   focus:outline-none focus:ring-2 focus:ring-brand/60 focus:border-brand/60
                   disabled:opacity-50 resize-none transition"
      />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-paper-400">{value.length} characters</span>
        <button
          type="submit"
          disabled={disabled}
          className="rounded-full bg-brand px-6 py-2.5 font-display font-semibold text-ink-900
                     hover:brightness-95 active:scale-[0.98] transition
                     disabled:opacity-50 disabled:pointer-events-none"
        >
          {disabled ? "Checking…" : "Check this message"}
        </button>
      </div>
    </form>
  );
}