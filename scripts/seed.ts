// Usage: npm run seed  (needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local)
import { createClient } from '@supabase/supabase-js';
import { towns } from '../data/towns';
import { listings } from '../data/listings';
import { events } from '../data/events';
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const check = (label: string, error: { message: string } | null) => { if (error) { console.error(label, error.message); process.exit(1); } console.log('seeded', label); };
(async () => {
  check('towns', (await sb.from('towns').upsert(towns.map((t) => ({ slug: t.slug, name: t.name, county: t.county, blurb: t.blurb, intro: t.intro, lakes: t.lakes, known_for: t.knownFor, nearest: t.nearest, nearby: t.nearby })))).error);
  check('listings', (await sb.from('listings').upsert(listings.map((l) => ({ slug: l.slug, name: l.name, category: l.category, subtype: l.subtype, town: l.town, price_range: l.priceRange, tags: l.tags,
    description: l.description, images: [], is_featured: l.isFeatured, is_enhanced: l.isEnhanced, phone: l.phone, website: l.website, address: l.address, hours: l.hours })), { onConflict: 'slug' })).error);
  check('events', (await sb.from('events').insert(events.map((e) => ({ title: e.title, date: e.date, venue: e.venue, town: e.town })))).error);
})();
