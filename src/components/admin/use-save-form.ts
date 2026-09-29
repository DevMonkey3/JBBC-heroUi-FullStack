"use client";

import { startTransition, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type State = { ok: boolean; id?: string; error?: string };

/**
 * Shared plumbing for the admin create/edit forms.
 *
 * Submits through `startTransition` instead of the form `action` prop so React
 * does not reset uncontrolled fields after a save, and reacts to each action
 * result exactly once (the page props change on every `router.refresh()`, so an
 * effect keyed on them would toast and refresh forever).
 */
export function useSaveForm<S extends State>({
  state,
  action,
  isEdit,
  redirect,
}: {
  state: S;
  action: (formData: FormData) => void;
  isEdit: boolean;
  redirect: (id: string) => string;
}) {
  const router = useRouter();
  const handled = useRef(state);

  useEffect(() => {
    if (handled.current === state) return;
    handled.current = state;
    if (state.ok && state.id) {
      toast.success(isEdit ? "保存しました" : "作成しました");
      router.push(redirect(state.id));
      router.refresh();
    } else if (!state.ok && state.error) {
      toast.error(state.error);
    }
  }, [state, router, isEdit, redirect]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  }

  return { onSubmit };
}
