'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { nav } from '@/data';
import AskBar from './AskBar';
export default function Header() {
  const [scrolled, setScrolled] = useState(false); const [drawer, setDrawer] = useState(false); const [ask, setAsk] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  const solid = scrolled || drawer || ask;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 text-birch-100 transition-colors duration-300 ${solid ? 'bg-pine-900' : 'bg-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="font-display text-2xl font-semibold">UpNorth.org</Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((s) => (
            <div key={s.label} className="group relative">
              <Link href={s.href} className="flex items-center gap-1 px-3 py-5 text-sm font-medium">{s.label}<ChevronDown className="h-3.5 w-3.5" aria-hidden /></Link>
              <ul className="invisible absolute left-0 top-full min-w-56 rounded-b bg-birch-100 py-2 text-ink-900 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                {s.links.map(([l, h]) => <li key={h}><Link href={h} className="block px-4 py-2 text-sm hover:bg-mist-200">{l}</Link></li>)}
              </ul>
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setAsk(!ask)} aria-label="Open Ask UpNorth" className="rounded-full p-3 hover:bg-white/10"><Search className="h-5 w-5" /></button>
          <Link href="/list-your-business" className="hidden rounded-full border border-birch-100/40 bg-pine-900 px-4 py-2 text-sm font-medium text-birch-100 sm:block">List Your Business</Link>
          <button onClick={() => setDrawer(true)} aria-label="Open menu" className="p-2.5 lg:hidden"><Menu className="h-6 w-6" /></button>
        </div>
      </div>
      {ask && <div className="flex justify-center px-5 pb-4"><AskBar autoFocus /></div>}
      {drawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={() => setDrawer(false)}>
          <aside onClick={(e) => e.stopPropagation()} className="h-full w-80 max-w-[85%] overflow-y-auto bg-pine-900 p-5">
            <button onClick={() => setDrawer(false)} aria-label="Close menu" className="mb-4 ml-auto block p-2"><X className="h-6 w-6" /></button>
            {nav.map((s) => (
              <details key={s.label} className="border-b border-birch-100/15 py-3">
                <summary className="cursor-pointer py-1 font-display text-xl">{s.label}</summary>
                <ul className="mt-2 space-y-2 pl-2">{s.links.map(([l, h]) => <li key={h}><Link href={h} onClick={() => setDrawer(false)}>{l}</Link></li>)}</ul>
              </details>
            ))}
            <Link href="/list-your-business" className="mt-6 block rounded-full bg-amber-500 px-4 py-3 text-center font-medium text-ink-900">List Your Business</Link>
          </aside>
        </div>
      )}
    </header>
  );
}
