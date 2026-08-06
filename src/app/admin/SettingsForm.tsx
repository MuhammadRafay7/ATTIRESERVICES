"use client";

import { useActionState } from "react";
import { saveSettings, type ActionResult } from "./actions";
import { AdminActionBar, AdminButton, AdminStatus } from "./ui";

/**
 * Wraps the settings action so a page can lay out its own fields and still get
 * consistent save/feedback behaviour.
 */
export function SettingsForm({ children }: { children: React.ReactNode }) {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    saveSettings,
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {children}
      <AdminActionBar>
        <AdminButton type="submit" busy={pending}>
          Save changes
        </AdminButton>
        <AdminStatus
          state={state ? (state.ok ? "saved" : "error") : "idle"}
          message={state?.message}
        />
      </AdminActionBar>
    </form>
  );
}
