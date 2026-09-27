'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
type Sub = { id: string; status: string; name: string; category: string; town: string; tier: string; description: string; claim?: string };
const url = process.env.NEXT_PUBLIC_SUPABASE_URL, anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const sb = url && anon ? createClient(url, anon) : null;
const inp = 'w-full rounded border border-mist-200 bg-white px-3 py-2.5';
export default function AdminPanel() {
  const [token, setToken] = useState(''); const [subs, setSubs] = useState<Sub[]>([]); const [msg, setMsg] = useState(''); const [f, setF] = useState({ email: '', password: '' });
  if (!sb) return <p className="rounded border border-mist-200 bg-white p-5">Supabase isn’t configured yet. Add the Supabase variables from <code>.env.example</code> to turn on the admin screen.</p>;
  const auth = (t = token) => ({ Authorization: `Bearer ${t}` });
  async function load(t: string) { const r = await fetch('/api/admin/submissions', { headers: auth(t) }); if (!r.ok) { setMsg('This account isn’t an admin.'); return; } setSubs((await r.json()).submissions); }
  async function login(e: React.FormEvent) {
    e.preventDefault(); setMsg(''); const { data, error } = await sb!.auth.signInWithPassword(f);
    if (error || !data.session) { setMsg('Email or password is wrong.'); return; }
    setToken(data.session.access_token); load(data.session.access_token);
  }
  async function review(id: string, action: string) {
    const r = await fetch('/api/admin/review', { method: 'POST', headers: { ...auth(), 'Content-Type': 'application/json' }, body: JSON.stringify({ id, action }) });
    setMsg(r.ok ? '' : (await r.json()).error); load(token);
  }
  if (!token) return (<form onSubmit={login} className="max-w-sm space-y-3"><input required type="email" placeholder="Admin email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} className={inp} />
    <input required type="password" placeholder="Password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} className={inp} />
    {msg && <p role="alert" className="text-sm">{msg}</p>}<button className="rounded-full bg-pine-900 px-6 py-3 text-birch-100">Sign in</button></form>);
  return (<div className="space-y-4">{msg && <p role="alert">{msg}</p>}{subs.length === 0 && <p>No submissions yet.</p>}
    {subs.map((s) => (<article key={s.id} className="rounded-md border border-mist-200 bg-white p-4"><h3 className="text-xl">{s.name}</h3>
      <p className="text-sm">{s.category} in {s.town} · {s.tier} tier · <b>{s.status}</b>{s.claim ? ` · claims ${s.claim}` : ''}</p><p className="mt-2 text-sm">{s.description}</p>
      {s.status === 'pending' && <div className="mt-3 flex gap-2"><button onClick={() => review(s.id, 'approve')} className="rounded-full bg-pine-900 px-5 py-2.5 text-birch-100">Approve</button>
        <button onClick={() => review(s.id, 'reject')} className="rounded-full border border-mist-200 px-5 py-2.5">Reject</button></div>}</article>))}</div>);
}
