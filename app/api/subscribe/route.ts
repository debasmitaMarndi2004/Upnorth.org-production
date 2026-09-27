import { NextResponse } from 'next/server';
import { subscribers } from '@/data/store';
import { serviceClient } from '@/lib/supabase';
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({ email: '' }));
  const e = String(email ?? '').trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(e)) return NextResponse.json({ ok: false, message: 'Enter a valid email address.' }, { status: 400 });
  const apiKey = process.env.NEWSLETTER_API_KEY;
  // TODO: set NEWSLETTER_API_KEY (Mailchimp, ConvertKit, or Resend audiences) and add the provider call here.
  void apiKey;
  if (!subscribers.includes(e)) subscribers.push(e); // in-memory copy for demo mode
  const sb = serviceClient();
  if (sb) { try { await sb.from('subscribers').upsert({ email: e }); } catch {} }
  return NextResponse.json({ ok: true });
}
