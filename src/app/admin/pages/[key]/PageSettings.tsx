"use client";

import { useActionState } from "react";
import { savePage, type ActionResult } from "../../actions";
import {
  AdminActionBar,
  AdminButton,
  AdminCard,
  AdminCheckbox,
  AdminGrid,
  AdminInput,
  AdminStatus,
  AdminTextarea,
} from "../../ui";

type Page = {
  slug: string;
  title: string;
  description: string | null;
  nav_label: string | null;
  nav_order: number;
  in_nav: boolean;
  published: boolean;
};

/** Title, search description and menu placement for one page. */
export function PageSettings({ page }: { page: Page }) {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    savePage,
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="slug" value={page.slug} />

      <AdminCard
        title="Search & title"
        description="What browsers and search engines show for this page."
      >
        <AdminGrid>
          <AdminInput label="Page title" name="title" defaultValue={page.title} wide />
          <AdminTextarea
            label="Search description"
            name="description"
            rows={3}
            defaultValue={page.description ?? ""}
            hint="Roughly 150–160 characters reads best in results."
          />
        </AdminGrid>
      </AdminCard>

      <AdminCard title="Menu" description="How this page appears in the header navigation.">
        <AdminGrid>
          <AdminInput label="Menu label" name="nav_label" defaultValue={page.nav_label ?? ""} />
          <AdminInput
            label="Menu order"
            name="nav_order"
            type="number"
            defaultValue={page.nav_order}
            hint="Lower numbers appear first."
          />
          <div className="flex flex-col gap-3 sm:col-span-2">
            <AdminCheckbox
              label="Show in menu"
              description="Uncheck to keep the page live but unlisted."
              name="in_nav"
              defaultChecked={page.in_nav}
            />
            <AdminCheckbox
              label="Page is live"
              description="Unchecking takes the page off the public site entirely."
              name="published"
              defaultChecked={page.published}
            />
          </div>
        </AdminGrid>
      </AdminCard>

      <AdminActionBar>
        <AdminButton type="submit" busy={pending}>
          Save page settings
        </AdminButton>
        <AdminStatus
          state={state ? (state.ok ? "saved" : "error") : "idle"}
          message={state?.message}
        />
      </AdminActionBar>
    </form>
  );
}
