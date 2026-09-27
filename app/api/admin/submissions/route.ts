import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  const sb = await requireAdmin(req); if (!sb) return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  const { data } = await sb.from('listing_submissions').select('*').order('created_at', { ascending: false });
  return NextResponse.json({ submissions: data ?? [] });
}
