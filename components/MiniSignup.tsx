'use client';
import { useState } from 'react';
import { handleSubscribe } from './Newsletter';
export default function MiniSignup() {
  const [email, setEmail] = useState(''); const [done, setDone] = useState(false);
  return (<form onSubmit={async (e) => { e.preventDefault(); await handleSubscribe(email); setDone(true); }} className="flex gap-2">
    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" placeholder="Email" className="min-w-0 flex-1 rounded px-3 py-2.5 text-ink-900" />
    <button className="rounded bg-amber-500 px-4 py-2.5 text-sm font-medium text-ink-900">{done ? 'Thanks' : 'Join'}</button></form>);
}
