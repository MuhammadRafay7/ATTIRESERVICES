-- ===========================================================================
-- Attire Services — CMS schema
--
-- Deliberately five tables rather than one per content type. Everything the
-- site renders is either:
--   settings       one row  · brand, contact, SEO
--   theme          one row  · design tokens (CSS custom properties)
--   content_items  many     · every list on the site, keyed by `collection`
--   pages          many     · routes, nav labels, per-page SEO
--   sections       many     · ordered blocks on a page, add/remove/reorder
--
-- Keeping the lists in one `content_items` table means the admin needs one
-- list editor rather than a dozen, which is what keeps the panel simple.
-- Shape lives in `data` jsonb so a new field never needs a migration.
-- ===========================================================================

create extension if not exists "pgcrypto";

-- --- helper: keep updated_at honest ----------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- --- 1. settings (single row, enforced by the boolean pk) ------------------
create table if not exists public.settings (
  id         boolean primary key default true check (id),
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- --- 2. theme (single row) -------------------------------------------------
create table if not exists public.theme (
  id         boolean primary key default true check (id),
  tokens     jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- --- 3. content_items ------------------------------------------------------
create table if not exists public.content_items (
  id         uuid primary key default gen_random_uuid(),
  collection text not null,
  position   integer not null default 0,
  published  boolean not null default true,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists content_items_collection_position_idx
  on public.content_items (collection, position);

-- --- 4. pages --------------------------------------------------------------
create table if not exists public.pages (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  description text,
  nav_label   text,
  nav_order   integer not null default 0,
  in_nav      boolean not null default true,
  published   boolean not null default true,
  hero        jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- --- 5. sections -----------------------------------------------------------
-- `type` selects the renderer; `data` carries that renderer's props. An admin
-- adds a section by choosing a type, and deletes one by removing the row.
create table if not exists public.sections (
  id         uuid primary key default gen_random_uuid(),
  page_slug  text not null references public.pages (slug) on update cascade on delete cascade,
  type       text not null,
  position   integer not null default 0,
  published  boolean not null default true,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sections_page_position_idx
  on public.sections (page_slug, position);

-- --- triggers --------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['settings', 'theme', 'content_items', 'pages', 'sections']
  loop
    execute format('drop trigger if exists touch_%1$s on public.%1$s', t);
    execute format(
      'create trigger touch_%1$s before update on public.%1$s
       for each row execute function public.touch_updated_at()', t);
  end loop;
end $$;

-- ===========================================================================
-- Row level security
--
-- Anonymous visitors get read-only access to published content. Nothing here
-- grants write access: the admin panel writes with the secret key, which is a
-- service role and bypasses RLS entirely. That means a leaked publishable key
-- can never be used to edit the site.
-- ===========================================================================
alter table public.settings      enable row level security;
alter table public.theme         enable row level security;
alter table public.content_items enable row level security;
alter table public.pages         enable row level security;
alter table public.sections      enable row level security;

drop policy if exists "public read settings" on public.settings;
create policy "public read settings" on public.settings
  for select to anon, authenticated using (true);

drop policy if exists "public read theme" on public.theme;
create policy "public read theme" on public.theme
  for select to anon, authenticated using (true);

drop policy if exists "public read published content" on public.content_items;
create policy "public read published content" on public.content_items
  for select to anon, authenticated using (published);

drop policy if exists "public read published pages" on public.pages;
create policy "public read published pages" on public.pages
  for select to anon, authenticated using (published);

drop policy if exists "public read published sections" on public.sections;
create policy "public read published sections" on public.sections
  for select to anon, authenticated using (published);
