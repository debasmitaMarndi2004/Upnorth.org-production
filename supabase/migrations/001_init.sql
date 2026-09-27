-- Run in Supabase: SQL Editor > paste > Run. Then create an admin user under Authentication > Users.
create table towns (slug text primary key, name text not null, county text, blurb text, intro text, lakes text[] default '{}', known_for text, nearest text, nearby text[] default '{}', region text default 'wisconsin');
create table listings (id text primary key default gen_random_uuid()::text, slug text unique not null, name text not null, category text not null, subtype text, town text references towns(slug),
  price_range text, tags text[] default '{}', description text, images text[] default '{}', is_featured boolean default false, is_enhanced boolean default false,
  phone text, website text, address text, hours text, region text default 'wisconsin', created_at timestamptz default now());
create table events (id text primary key default gen_random_uuid()::text, title text not null, date date not null, venue text, town text references towns(slug), image text, region text default 'wisconsin');
create table listing_submissions (id uuid primary key default gen_random_uuid(), status text not null default 'pending' check (status in ('pending','approved','rejected')),
  claim text, name text not null, category text, subtype text, town text, address text, phone text, website text, description text, tier text default 'free', created_at timestamptz default now());
create table subscribers (email text primary key, created_at timestamptz default now());
alter table towns enable row level security; alter table listings enable row level security; alter table events enable row level security;
alter table listing_submissions enable row level security; alter table subscribers enable row level security;
create policy "public read" on towns for select using (true);
create policy "public read" on listings for select using (true);
create policy "public read" on events for select using (true);
-- listing_submissions and subscribers have no public policies: only the server (service-role key) can touch them.
