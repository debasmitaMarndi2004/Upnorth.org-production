'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CATS } from '@/data/categories';
import { towns } from '@/data/towns';
import { listings, sortListings } from '@/data/listings';
import { events } from '@/data/events';
import FilterBar from './FilterBar';
import ListingCard from './ListingCard';
import EventCard from './EventCard';
import TownCard from './TownCard';
const PAGE = 12;
export default function CategoryBrowser({ cat }: { cat: string }) {
  const c = CATS[cat]; const sp = useSearchParams();
  const [town, setTown] = useState(sp.get('town') || 'all'); const [type, setType] = useState(sp.get('type') || 'all'); const [n, setN] = useState(PAGE);
  useEffect(() => setN(PAGE), [town, type]);
  const okTown = (t: string) => town === 'all' || t === town;
  let items: React.ReactNode[];
  if (cat === 'events') {
    const now = Date.now(); const lim = type === 'week' ? 7 : type === 'month' ? 31 : 1e4;
    items = events.filter((e) => { const d = (new Date(e.date + 'T12:00:00').getTime() - now) / 864e5; return okTown(e.town) && d > -1 && d < lim; })
      .sort((a, b) => a.date.localeCompare(b.date)).map((e) => <EventCard key={e.id} e={e} />);
  } else if (cat === 'explore') items = towns.filter((t) => okTown(t.slug)).map((t) => <TownCard key={t.slug} t={t} />);
  else items = sortListings(listings.filter((l) => l.category === cat && okTown(l.town) && (type === 'all' || l.subtype === type))).map((l) => <ListingCard key={l.id} l={l} />);
  return (
    <div className="mx-auto max-w-7xl px-5 pb-16">
      <FilterBar town={town} onTown={setTown} typeLabel={c.typeLabel} types={c.types} type={type} onType={setType} count={items.length} />
      {items.length === 0 ? <p className="py-16">No matches yet. Try another town or clear the filters.</p> : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.slice(0, n).map((x, i) => <div key={i} className="min-w-0">{x}</div>)}</div>)}
      {n < items.length && <button onClick={() => setN(n + PAGE)} className="mx-auto mt-8 block rounded-full bg-pine-900 px-8 py-3 font-medium text-birch-100">Load more</button>}
    </div>
  );
}
