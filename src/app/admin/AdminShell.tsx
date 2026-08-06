"use client";

import {
  ChevronDown,
  ChevronsUpDown,
  ExternalLink,
  LogOut,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import { cn } from "@/lib/cn";
import { AdminDialog } from "./ui";
import { adminNav } from "./nav";
import { signOut } from "./actions";

/**
 * Admin shell — console sidebar, mobile drawer, user menu.
 *
 * Structured after the Occuin console: collapsible nav groups rather than one
 * long flat list, and account actions folded into a footer menu. Collapsing
 * matters here — twenty-four destinations in five groups do not fit a viewport,
 * and a scrolling sidebar means the account controls disappear off the bottom.
 * With only the active group open, everything fits without a scrollbar.
 *
 * Sign-out runs through a server action; this admin never holds the secret key
 * client-side.
 */
export function AdminShell({
  children,
  brandName,
  logoUrl,
  email,
}: {
  children: React.ReactNode;
  brandName: string;
  logoUrl?: string;
  email: string;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [signingOut, startSignOut] = useTransition();

  /** The group containing the current page, so it opens on arrival. */
  const activeGroup =
    adminNav.find((g) => g.links.some((l) => l.href === pathname))?.title ??
    adminNav[0].title;

  const [openGroups, setOpenGroups] = useState<string[]>([activeGroup]);

  // Keep the active group expanded as the route changes, and close the drawer.
  const [navPath, setNavPath] = useState(pathname);
  if (pathname !== navPath) {
    setNavPath(pathname);
    setMenuOpen(false);
    setUserMenu(false);
    if (!openGroups.includes(activeGroup)) {
      setOpenGroups((prev) => [...prev, activeGroup]);
    }
  }

  const userMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!userMenu) return;
    function onDown(event: MouseEvent) {
      if (!userMenuRef.current?.contains(event.target as Node)) setUserMenu(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setUserMenu(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [userMenu]);

  function toggleGroup(title: string) {
    setOpenGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-[var(--admin-rail)] text-on-deep">
      {/* Brand */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4">
        <Link href="/admin" className="flex min-w-0 items-center gap-2.5 rounded-md">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary CMS host
            <img
              src={logoUrl}
              alt=""
              className="h-9 w-9 shrink-0 rounded-md border border-white/15 bg-white/5 object-contain p-1"
            />
          ) : (
            <span
              aria-hidden
              className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brass-soft font-display text-sm font-semibold text-deep"
            >
              {brandName.charAt(0).toUpperCase()}
            </span>
          )}
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-semibold text-on-deep">
              {brandName}
            </span>
            <span className="block text-xs text-on-deep-muted">Console</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className="grid h-8 w-8 cursor-pointer place-items-center rounded-md text-on-deep-muted hover:bg-white/10 hover:text-on-deep lg:hidden"
        >
          <X size={16} aria-hidden />
          <span className="sr-only">Close menu</span>
        </button>
      </div>

      {/* Collapsible groups */}
      <nav
        aria-label="Admin sections"
        className="min-h-0 flex-1 overflow-y-auto px-2.5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {adminNav.map((group) => {
          const expanded = openGroups.includes(group.title);
          const hasActive = group.links.some((l) => l.href === pathname);

          return (
            <div key={group.title} className="mb-1">
              <button
                type="button"
                onClick={() => toggleGroup(group.title)}
                aria-expanded={expanded}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-xs font-medium uppercase tracking-[0.1em] transition-colors",
                  hasActive
                    ? "text-brass-soft"
                    : "text-on-deep-muted hover:bg-white/5 hover:text-on-deep",
                )}
              >
                {group.title}
                <ChevronDown
                  size={14}
                  aria-hidden
                  className={cn(
                    "shrink-0 transition-transform duration-200",
                    expanded ? "rotate-0" : "-rotate-90",
                  )}
                />
              </button>

              {expanded && (
                <ul className="mt-0.5 flex flex-col gap-0.5 pb-1">
                  {group.links.map((link) => {
                    const Icon = link.icon as LucideIcon | undefined;
                    const active = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          title={link.hint}
                          className={cn(
                            "flex items-center gap-2.5 rounded-md py-2 pl-2.5 pr-3 text-sm transition-colors",
                            active
                              ? "bg-accent text-white"
                              : "text-on-deep-muted hover:bg-white/5 hover:text-on-deep",
                          )}
                        >
                          {Icon ? (
                            <Icon size={15} aria-hidden className="shrink-0" />
                          ) : null}
                          <span className="truncate">{link.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {/* Account menu */}
      <div ref={userMenuRef} className="relative border-t border-white/10 p-2.5">
        {userMenu && (
          <div className="absolute bottom-full left-2.5 right-2.5 mb-1 overflow-hidden rounded-lg border border-white/12 bg-[var(--admin-rail-2)] shadow-xl">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-on-deep-muted transition-colors hover:bg-white/5 hover:text-on-deep"
            >
              View public site
              <ExternalLink size={14} aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => {
                setUserMenu(false);
                setLogoutOpen(true);
              }}
              className="flex w-full cursor-pointer items-center gap-2.5 border-t border-white/10 px-3 py-2.5 text-left text-sm text-on-deep-muted transition-colors hover:bg-critical/25 hover:text-white"
            >
              <LogOut size={14} aria-hidden />
              Sign out
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setUserMenu((v) => !v)}
          aria-expanded={userMenu}
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-white/5"
        >
          <span
            aria-hidden
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-semibold text-on-deep"
          >
            {email.charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs text-on-deep">{email}</span>
            <span className="block text-xs text-on-deep-muted">Administrator</span>
          </span>
          <ChevronsUpDown size={14} aria-hidden className="shrink-0 text-on-deep-muted" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas text-fg">
      <AdminDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={() => startSignOut(() => signOut())}
        title="Sign out?"
        description="You'll need to sign in again to make further changes."
        confirmLabel="Sign out"
        busy={signingOut}
      />

      {menuOpen ? (
        <div
          aria-hidden
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-90 bg-gray-950/60 backdrop-blur-sm lg:hidden"
        />
      ) : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-100 w-64 transition-transform duration-200 lg:hidden",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {sidebar}
      </aside>

      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        {sidebar}
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-64">
        <header className="sticky top-0 z-50 flex h-14 items-center gap-3 border-b border-line bg-canvas/85 px-4 backdrop-blur-md sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            className="flex cursor-pointer items-center gap-2 rounded-md border border-line-strong px-3 py-1.5 text-sm text-fg"
          >
            <Menu size={16} aria-hidden />
            Menu
          </button>
          <span className="truncate text-sm font-semibold text-fg">
            {brandName}
          </span>
        </header>

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
