import { NextResponse } from 'next/server';
import { submissions } from '@/data/store';
import { serviceClient } from '@/lib/supabase';
export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const s = (k: string) => String(b?.[k] ?? '').slice(0, 2000).trim();
  if (!s('name') || !s('town')) return NextResponse.json({ ok: false, message: 'Business name and town are required.' }, { status: 400 });
  const entry = { id: `sub_${Date.now()}`, status: 'pending review' as const, createdAt: new Date().toISOString(), claim: s('claim') || undefined,
    name: s('name'), category: s('category'), subtype: s('subtype'), town: s('town'), address: s('address'), phone: s('phone'), website: s('website'), description: s('description'), tier: s('tier') || 'free' };
  submissions.push(entry); // in-memory copy, used when Supabase isn't configured
  const sb = serviceClient();
  if (sb) { try { const { id: _i, createdAt: _c, status: _s, ...row } = entry; await sb.from('listing_submissions').insert(row); } catch {} }
  // TODO: set EMAIL_API_KEY (Resend: resend.com/api-keys, or SendGrid) to email the team about each new submission.
  const emailKey = process.env.EMAIL_API_KEY;
  if (emailKey) {
    try {
      await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${emailKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: 'UpNorth <onboarding@resend.dev>', to: ['hello@upnorth.org'], subject: `New listing: ${entry.name}`, text: JSON.stringify(entry, null, 2) }) });
    } catch {}
  }
  return NextResponse.json({ ok: true, id: entry.id });
}
