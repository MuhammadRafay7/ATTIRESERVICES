import { redirect } from "next/navigation";

/** The Pages group in the sidebar links straight to each page; land on Home. */
export default function PagesIndex() {
  redirect("/admin/pages/home");
}
