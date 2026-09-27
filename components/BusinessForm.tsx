'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TIERS, CONTACT_EMAIL } from '@/config/pricing';
import { CATS } from '@/data/categories';
import { towns } from '@/data/towns';
import { getListing } from '@/data/listings';
const inp = 'mt-1 w-full rounded border border-mist-200 bg-white px-3 py-2.5';
const CAT_KEYS = ['stay', 'eat-drink', 'things-to-do', 'real-estate'];
export default function BusinessForm() {
  const sp = useSearchParams(); const claim = sp.get('claim') || ''; const src = claim ? getListing(claim) : undefined;
  const [f, setF] = useState({ name: src?.name ?? '', category: src?.category ?? 'stay', subtype: src?.subtype ?? '', town: src?.town ?? '', address: src?.address ?? '', phone: src?.phone ?? '', website: src?.website ?? '', description: src?.description ?? '', tier: sp.get('tier') || 'free' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value, ...(k === 'category' ? { subtype: '' } : {}) });
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setStatus('sending');
    try { const r = await fetch('/api/listings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, claim }) }); setStatus(r.ok ? 'done' : 'error'); } catch { setStatus('error'); }
  }
  if (status === 'done') return (
    <div className="rounded-lg border border-mist-200 bg-white p-6"><h2>Thanks, we’ve got it</h2>
      <p className="mt-3"><b>{f.name}</b> is now <b>pending review</b>. We’ll check the details and email you when it’s live, usually within two business days.</p>
      {f.tier !== 'free' && <p className="mt-3">You chose the {f.tier} tier. We’ll follow up about payment, or you can <Link href="/pricing" className="text-lake-700 underline">compare tiers</Link> again.</p>}
      <Link href="/" className="mt-6 inline-block rounded-full bg-pine-900 px-6 py-3 text-birch-100">Back to UpNorth.org</Link></div>);
  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      {claim && <p className="rounded bg-mist-200 p-3 sm:col-span-2">{src ? `You’re claiming “${src.name}”. We prefilled what we have, so fix anything that’s out of date.` : 'You’re claiming an existing listing.'}</p>}
      <label className="sm:col-span-2">Business name<input required value={f.name} onChange={set('name')} className={inp} /></label>
      <label>Category<select value={f.category} onChange={set('category')} className={inp}>{CAT_KEYS.map((k) => <option key={k} value={k}>{CATS[k].title}</option>)}</select></label>
      <label>Subtype<select value={f.subtype} onChange={set('subtype')} className={inp}><option value="">Choose one</option>{CATS[f.category].types.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
      <label>Town<select required value={f.town} onChange={set('town')} className={inp}><option value="">Choose a town</option>{towns.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}</select></label>
      <label>Phone<input type="tel" value={f.phone} onChange={set('phone')} className={inp} /></label>
      <label className="sm:col-span-2">Address<input value={f.address} onChange={set('address')} className={inp} /></label>
      <label className="sm:col-span-2">Website<input type="url" value={f.website} onChange={set('website')} placeholder="https://" className={inp} /></label>
      <label className="sm:col-span-2">Description<textarea required rows={4} value={f.description} onChange={set('description')} className={inp} /></label>
      <fieldset className="sm:col-span-2"><legend className="mb-2">Listing tier</legend>
        <div className="grid gap-2 sm:grid-cols-3">{TIERS.map((t) => (<label key={t.key} className={`flex items-center gap-2 rounded border p-3 ${f.tier === t.key ? 'border-amber-500 bg-white' : 'border-mist-200'}`}><input type="radio" name="tier" checked={f.tier === t.key} onChange={() => setF({ ...f, tier: t.key })} />{t.name} ({t.price}/mo)</label>))}</div></fieldset>
      <div className="rounded border-2 border-dashed border-mist-200 p-4 text-sm sm:col-span-2">Photo upload is coming soon. After you submit, email photos to {CONTACT_EMAIL}.</div>
      {status === 'error' && <p className="text-sm sm:col-span-2" role="alert">We couldn’t save that just now. Check the form and try again, or email {CONTACT_EMAIL}.</p>}
      <button disabled={status === 'sending'} className="rounded-full bg-pine-900 px-6 py-3 font-medium text-birch-100 sm:col-span-2">{status === 'sending' ? 'Sending…' : 'Submit for review'}</button>
    </form>
  );
}
