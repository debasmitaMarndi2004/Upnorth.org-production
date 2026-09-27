'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { TIERS, type TierKey } from '@/config/pricing';
import ContactModal from './ContactModal';
const look: Record<TierKey, string> = { free: 'border border-mist-200 bg-white', enhanced: 'bg-lake-700 text-birch-100', featured: 'bg-pine-900 text-birch-100 ring-4 ring-amber-500' };
export default function PricingCards() {
  const [modal, setModal] = useState(false); const [busy, setBusy] = useState(false);
  async function start(tier: TierKey) {
    setBusy(true);
    try { const d = await (await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tier }) })).json(); if (d.url) { window.location.assign(d.url); return; } } catch {}
    setBusy(false); setModal(true);
  }
  const btn = 'mt-6 block w-full rounded-full px-5 py-3 text-center font-medium';
  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {TIERS.map((t) => (
          <div key={t.key} className={`flex flex-col rounded-lg p-6 ${look[t.key]}`}>
            <h2 className="text-3xl">{t.name}</h2>
            <p className="mt-2 font-display text-4xl">{t.price}<span className="text-base font-sans">/mo</span></p>
            <p className="mt-2 text-sm opacity-90">{t.blurb}</p>
            <ul className="mt-5 flex-1 space-y-2">{t.features.map((f) => <li key={f} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-amber-500" aria-hidden /><span>{f}</span></li>)}</ul>
            {t.key === 'free' ? <Link href="/list-your-business?tier=free" className={`${btn} bg-pine-900 text-birch-100`}>Get Started</Link>
              : <button disabled={busy} onClick={() => start(t.key)} className={`${btn} bg-amber-500 text-ink-900`}>Get Started</button>}
          </div>))}
      </div>
      {modal && <ContactModal onClose={() => setModal(false)} />}
    </>
  );
}
