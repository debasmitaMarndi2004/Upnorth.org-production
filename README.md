# UpNorth.org

Northwoods discovery site (Next.js 14, TypeScript, Tailwind). Runs in **demo mode** with no API keys.

## Quick start

You need **Node.js 20 LTS** (https://nodejs.org) and an internet connection (fonts are downloaded at build time).

1. Extract the zip. On Windows use **Extract All** into a short folder such as `C:\upnorth`. Avoid OneDrive or Desktop folders that sync.
2. Open the `upnorth` folder. You must see `package.json` inside it.
3. Start:
   - **Windows:** double-click `SETUP-WINDOWS.bat`
   - **Mac / Linux:** run `bash setup.sh`
   - **By hand:** open a terminal inside the folder, then `npm install` and `npm run dev`
4. Open http://localhost:3000

## Demo mode

With every key empty (the default), the site works: Ask UpNorth uses local listings, the pricing buttons open a "contact us" modal, forms save to memory, maps show a placeholder. Copy `.env.example` to `.env.local` and fill values to switch features on. Restart the server after editing.

## Turn on real features

| Feature | Variables |
|---|---|
| Ask UpNorth AI | `AI_API_KEY` (an `sk-ant...` key uses Claude, anything else uses OpenAI) |
| Payments | `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ENHANCED`, `STRIPE_PRICE_FEATURED` |
| Emails on new listings | `EMAIL_API_KEY` (Resend) |
| Maps | `GOOGLE_MAPS_API_KEY` (Maps Embed API) |
| Database and admin | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL` |
| Sitemap and share links | `NEXT_PUBLIC_SITE_URL` |

Supabase: run `supabase/migrations/001_init.sql` in the SQL Editor, create an admin user under Authentication, then `npm run seed` (needs Node 20.6+). The site still reads its listings from `data/*.ts`; approved submissions are saved in the database but not yet shown on pages.

## Photos

Files live in `public/images/`. To add or replace one, save it with the slot name (for example `town-mercer.jpg`), and add the slot name to the list in `lib/images.ts`.

## Deploy

Push to GitHub, import the repo in Vercel, add the variables from `.env.example`, deploy.

## Troubleshooting

| Problem | Fix |
|---|---|
| `package.json not found` / `ENOENT` | The terminal is in the wrong folder. `cd` into the folder that contains `package.json`, or use `SETUP-WINDOWS.bat`, which finds it by itself. |
| `'node' is not recognized` | Install Node 20 LTS, then open a new terminal. |
| `Unsupported engine` / syntax errors | Node is too old. Install Node 20 LTS. |
| Build fails on `next/font` or fonts | No internet or a firewall blocks fonts.googleapis.com. |
| `EPERM`, `EBUSY`, or slow install | Move the folder out of OneDrive, pause antivirus, retry. |
| Port 3000 in use | `npm run dev -- -p 3001` |
| Strange errors after a failed install | Delete `node_modules`, then `npm install` again. |
| `npm WARN deprecated ...` | Normal. Ignore. |

Run `node scripts/check-setup.mjs` any time to see what is wrong.

## Folders

`app/` pages and API routes, `components/` UI, `data/` listings, towns, events, `config/pricing.ts` tiers, `lib/` helpers, `supabase/` SQL, `scripts/` seed and setup check.
