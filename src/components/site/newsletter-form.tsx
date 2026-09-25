"use client";

import { useState } from "react";
import { newsletter } from "@/content/footer";
import { cn } from "@/lib/utils";

type State = { kind: "idle" } | { kind: "busy" } | { kind: "done"; ok: boolean; message: string };

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ kind: "busy" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setEmail("");
        setState({ kind: "done", ok: true, message: newsletter.success });
      } else if (res.status === 409) {
        setState({ kind: "done", ok: false, message: newsletter.duplicate });
      } else {
        setState({ kind: "done", ok: false, message: newsletter.error });
      }
    } catch {
      setState({ kind: "done", ok: false, message: newsletter.error });
    }
  }

  const busy = state.kind === "busy";

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex overflow-hidden rounded-md border bg-white shadow-sm">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={newsletter.placeholder}
          aria-label={newsletter.placeholder}
          className="h-12 min-w-0 flex-1 px-4 text-base outline-none"
          disabled={busy}
        />
        <button
          type="submit"
          disabled={busy}
          className="bg-brand hover:bg-brand-dark h-12 px-6 font-semibold text-white transition-colors disabled:opacity-60"
        >
          {newsletter.submit}
        </button>
      </div>
      {state.kind === "done" && (
        <p
          role="status"
          className={cn("mt-2 text-sm", state.ok ? "text-green-700" : "text-red-600")}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
