'use client';
import { useState } from 'react';
// Stub: wired to a real provider in Part 3.
export async function handleSubscribe(email: string) {
  try { await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }); } catch {} // always show success
}
export default function Newsletter() {
  const [email, setEmail] = useState(''); const [done, setDone] = useState(false);
  return (
    <section className="bg-pine-900 px-5 py-16 text-birch-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div><h2>Stay Up North</h2><p className="mt-2 text-birch-100/85">Fishing reports, fall color updates, and the week’s fish fries, once a week.</p></div>
        <form onSubmit={async (e) => { e.preventDefault(); await handleSubscribe(email); setDone(true); }} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" aria-label="Email address" className="min-w-0 flex-1 rounded-full px-5 py-3 text-ink-900" />
          <button className="rounded-full bg-amber-500 px-6 py-3 font-medium text-ink-900">{done ? 'You’re on the list' : 'Sign up'}</button>
        </form>
      </div>
    </section>
  );
}
