import { useState } from "react";
import MessageInput from "./components/MessageInput";
import ResultPanel from "./components/ResultPanel";
import ErrorBanner from "./components/ErrorBanner";
import LoadingState from "./components/LoadingState";
import { analyzeMessage, ApiError } from "./lib/api";

export default function App() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [result, setResult] = useState(null);
  const [analyzedText, setAnalyzedText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed) {
      setStatus("error");
      setErrorMessage("Paste a message first — there's nothing to check yet.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const data = await analyzeMessage(trimmed);
      setResult(data);
      setAnalyzedText(trimmed);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof ApiError ? err.message : "Something unexpected went wrong."
      );
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 md:py-16">
      <header className="w-full max-w-2xl mb-8">
        <h1 className="font-display text-3xl font-bold text-paper-50">
          Meiyaa <span className="text-brand">·</span>{" "}
          <span className="text-paper-400 font-normal text-xl">மெய்யா?</span>
        </h1>
        <p className="text-paper-400 mt-1">
          Paste a suspicious WhatsApp or SMS message — Tamil, English, or mixed — and see why it looks risky.
        </p>
      </header>

      <main className="w-full max-w-2xl rounded-3xl bg-ink-800 border border-ink-600 p-6 md:p-8">
        <MessageInput
          value={text}
          onChange={setText}
          onSubmit={handleSubmit}
          disabled={status === "loading"}
        />

        {status === "loading" && <LoadingState />}
        {status === "error" && (
          <ErrorBanner message={errorMessage} onRetry={handleSubmit} />
        )}
        {status === "success" && result && (
          <ResultPanel result={result} originalText={analyzedText} />
        )}
      </main>

      <footer className="w-full max-w-2xl mt-6 text-center text-xs text-paper-400">
        Prototype built for OpenHack '26 — not a substitute for verifying with your bank.
      </footer>
    </div>
  );
}
