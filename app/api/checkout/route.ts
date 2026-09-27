import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const { tier } = await req.json().catch(() => ({ tier: '' }));
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const priceIds: Record<string, string | undefined> = { enhanced: process.env.STRIPE_PRICE_ENHANCED, featured: process.env.STRIPE_PRICE_FEATURED };
  // TODO before launch: create real Products/Prices in dashboard.stripe.com, paste the price IDs above,
  // and replace the mock checkout below with a real stripe.checkout.sessions.create() call.
  const price = priceIds[tier];
  if (!stripeSecretKey || !price) return NextResponse.json({ demo: true }); // client shows the friendly contact modal
  try {
    const origin = new URL(req.url).origin;
    const body = new URLSearchParams({ mode: 'subscription', 'line_items[0][price]': price, 'line_items[0][quantity]': '1', success_url: `${origin}/list-your-business?paid=${tier}`, cancel_url: `${origin}/pricing` });
    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', { method: 'POST', headers: { Authorization: `Bearer ${stripeSecretKey}`, 'Content-Type': 'application/x-www-form-urlencoded' }, body });
    const s = await r.json(); if (s.url) return NextResponse.json({ url: s.url });
  } catch {}
  return NextResponse.json({ demo: true });
}
