'use client';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
const prompts = ['Find me a lakefront cabin for 8 near Minocqua with a dock', 'Plan a 3-day fall weekend around Presque Isle', 'Where are the fish biting this week?'];
// Completed in Part 3 (AI search). Single entry point for every Ask UpNorth submit.
export function handleAskUpNorth(query: string) { window.location.assign(`/ask?q=${encodeURIComponent(query)}`); }
export default function AskBar({ autoFocus = false }: { autoFocus?: boolean }) {
  const [i, setI] = useState(0); const [q, setQ] = useState('');
  useEffect(() => { const t = setInterval(() => setI((n) => (n + 1) % prompts.length), 3500); return () => clearInterval(t); }, []);
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) handleAskUpNorth(q.trim()); }} className="flex w-full max-w-2xl items-center gap-2 rounded-full bg-birch-100 p-2 pl-5">
      <Search className="h-5 w-5 shrink-0 text-lake-700" aria-hidden />
      <input value={q} onChange={(e) => setQ(e.target.value)} autoFocus={autoFocus} aria-label="Ask UpNorth" placeholder={prompts[i]} className="min-w-0 flex-1 bg-transparent py-2 text-base text-ink-900 placeholder:text-ink-900/50 focus:outline-none" />
      <button className="rounded-full bg-amber-500 px-4 py-2.5 font-medium text-ink-900 sm:px-5"><span className="sm:hidden">Ask</span><span className="hidden sm:inline">Ask UpNorth</span></button>
    </form>
  );
}
