import { redirect } from "next/navigation";

/** The header menu is a collection like any other; keep one editor for it. */
export default function NavigationPage() {
  redirect("/admin/content/nav");
}
