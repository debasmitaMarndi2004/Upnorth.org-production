'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { listings } from '@/data/listings';
import ListingCard from './ListingCard';
type R = { reply: string; ids: string[]; demo?: boolean };
export default function AskResults() {
  const q = useSearchParams().get('q') || ''; const [r, setR] = useState<R | null>(null);
  useEffect(() => {
    if (!q) { setR(null); return; } let stop = false; setR(null);
    fetch('/api/ask', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: q }) }).then((x) => x.json()).then((d) => !stop && setR(d))
      .catch(() => !stop && setR({ reply: 'I couldn’t reach the concierge just now. Try again, or browse Stay, Eat & Drink, and Things to Do.', ids: [] }));
    return () => { stop = true; };
  }, [q]);
  const picks = (r?.ids ?? []).map((id) => listings.find((l) => l.id === id)).filter(Boolean) as typeof listings;
  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      {!q && <p>Try “a lakefront cabin for 8 near Minocqua” or “where are the fish biting this week?”</p>}
      {q && <p className="mb-4 text-sm">You asked: <i>{q}</i></p>}
      {q && !r && <p>Looking through the listings…</p>}
      {r && (<><div className="mb-8 max-w-3xl rounded-lg border border-mist-200 bg-white p-5"><p>{r.reply}</p>{r.demo && <p className="mt-3 text-xs opacity-70">Demo mode: picks come from UpNorth.org’s local listings.</p>}</div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{picks.map((l) => <ListingCard key={l.id} l={l} />)}</div></>)}
    </div>
  );
}
