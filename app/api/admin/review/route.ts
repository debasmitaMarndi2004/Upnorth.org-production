import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase';
export async function POST(req: Request) {
  const sb = await requireAdmin(req); if (!sb) return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  const { id, action } = await req.json().catch(() => ({}));
  if (!id || !['approve', 'reject'].includes(action)) return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  if (action === 'approve') {
    const { data: s } = await sb.from('listing_submissions').select('*').eq('id', id).single();
    if (!s) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const slug = `${s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${String(id).slice(0, 4)}`;
    const { error } = await sb.from('listings').insert({ slug, name: s.name, category: s.category, subtype: s.subtype, town: s.town, address: s.address, phone: s.phone, website: s.website,
      description: s.description, is_featured: s.tier === 'featured', is_enhanced: s.tier === 'enhanced' || s.tier === 'featured' });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  }
  await sb.from('listing_submissions').update({ status: action === 'approve' ? 'approved' : 'rejected' }).eq('id', id);
  return NextResponse.json({ ok: true });
}
