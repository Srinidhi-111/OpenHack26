const BASE_URL = "http://localhost:8000";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Calls POST /analyze on the backend.
 * Throws ApiError with a human-readable message on any failure —
 * components can render err.message directly.
 */
export async function analyzeMessage(text) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  let res;
  try {
    res = await fetch(`${BASE_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });
  } catch (err) {
    if (err.name === "AbortError") {
      throw new ApiError(
        "The backend is taking too long to respond. Is it still running on localhost:8000?",
        0
      );
    }
    throw new ApiError(
      "Couldn't reach the backend. Make sure it's running on localhost:8000.",
      0
    );
  } finally {
    clearTimeout(timeoutId);
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // non-JSON response body — fall through, data stays null
  }

  if (!res.ok) {
    const message = data?.detail || `Request failed with status ${res.status}.`;
    throw new ApiError(message, res.status);
  }

  return data; // { risk_score, flagged_phrases, explanation }
}