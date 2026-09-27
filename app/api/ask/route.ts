import { NextResponse } from 'next/server';
import { listings, type Listing } from '@/data/listings';
import { towns, townName } from '@/data/towns';
export const dynamic = 'force-dynamic';
const SYSTEM = 'You are the UpNorth.org Northwoods travel concierge for Northern Wisconsin. Given the visitor\'s request, recommend specific lodging, dining, and activities from the provided UpNorth.org listings data — matching town, group size, dates, and stated preferences. Reply conversationally in 2–4 sentences, then list 3–5 specific picks.';
const CATS: [string, RegExp][] = [['stay', /cabin|stay|lodg|resort|hotel|camp|sleep|dock/], ['eat-drink', /eat|dinner|supper|fish fry|restaurant|brew|coffee|\bbar\b|drink/], ['things-to-do', /fish|musky|walleye|paddle|kayak|hik|trail|bike|snowmobil|atv|golf|boat|pontoon|things to do/], ['real-estate', /\bbuy|real estate|\bland\b|for sale|agent|acre/]];

function mock(query: string) {
  const q = query.toLowerCase(); const words = (q.match(/[a-z']+/g) ?? []).filter((w) => w.length > 3);
  const town = towns.find((t) => q.includes(t.name.toLowerCase()) || q.includes(t.slug.replace(/-/g, ' ')) || (t.slug === 'hurley-ironwood' && /hurley|ironwood/.test(q)));
  let cats = CATS.filter(([, re]) => re.test(q)).map(([c]) => c);
  if (!cats.length) cats = ['stay', 'eat-drink', 'things-to-do'];
  const score = (l: Listing) => {
    const hay = `${l.name} ${l.subtype} ${l.tags.join(' ')} ${l.description}`.toLowerCase();
    let s = words.filter((w) => hay.includes(w)).length + (cats.includes(l.category) ? 2 : 0) + (l.isFeatured ? 0.5 : l.isEnhanced ? 0.25 : 0);
    if (town) s += l.town === town.slug ? 3 : town.nearby.includes(l.town) ? 1 : 0;
    return s;
  };
  const picks = [...listings].sort((a, b) => score(b) - score(a)).slice(0, 5);
  const size = q.match(/(?:for|group of|party of)\s+(\d+)/)?.[1];
  const reply = `${town ? `${town.name} is a fine home base (${town.blurb.toLowerCase()}).` : 'Happy to help you plan a Northwoods trip.'}${size ? ` For a group of ${size}, ask each host about sleeping capacity and dock space.` : ''}${/fish|musky|walleye/.test(q) ? ' Fall is prime time for walleye at dusk and muskies on big bucktails.' : ''} Here are ${picks.length} picks, starting with ${picks[0].name} in ${townName(picks[0].town)}. Tap a card for hours, contact info, and a map.`;
  return { reply, ids: picks.map((p) => p.id) };
}

async function callLLM(apiKey: string, query: string) {
  const data = listings.map((l) => `${l.id}|${l.name}|${l.category}/${l.subtype}|${townName(l.town)}|${l.priceRange}|${l.tags.join(',')}|${l.description}`).join('\n');
  const user = `Listings (id|name|type|town|price|tags|description):\n${data}\n\nVisitor request: ${query}\n\nAfter your reply, end with one line: IDS: id1,id2,id3 (3 to 5 ids from the list).`;
  let text = '';
  if (apiKey.startsWith('sk-ant')) {
    const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-sonnet-5', max_tokens: 700, system: SYSTEM, messages: [{ role: 'user', content: user }] }) });
    text = (await r.json()).content?.[0]?.text ?? '';
  } else {
    const r = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }] }) });
    text = (await r.json()).choices?.[0]?.message?.content ?? '';
  }
  const ids = (text.match(/IDS:\s*(.+)$/im)?.[1] ?? '').split(/[,\s]+/).filter((id) => listings.some((l) => l.id === id));
  if (!text || !ids.length) return null;
  return { reply: text.replace(/IDS:.*$/im, '').trim(), ids };
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const query = String(body?.query ?? '').slice(0, 500).trim();
  if (!query) return NextResponse.json({ reply: 'Tell me what you’re looking for, like a cabin, a fish fry, or a fall weekend.', ids: [], demo: true });
  const apiKey = process.env.AI_API_KEY;
  // TODO: set AI_API_KEY in .env.local — get a key from console.anthropic.com (Claude) or platform.openai.com (GPT)
  if (apiKey) { try { const r = await callLLM(apiKey, query); if (r) return NextResponse.json({ ...r, demo: false }); } catch {} }
  return NextResponse.json({ ...mock(query), demo: true }); // demo mode or LLM failure: local keyword match
}
