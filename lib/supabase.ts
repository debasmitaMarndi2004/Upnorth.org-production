import { createClient } from '@supabase/supabase-js';
// Returns null when Supabase env vars are missing, so every caller falls back to demo mode.
export const serviceClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
};
// Admin = a Supabase Auth user whose email matches ADMIN_EMAIL, verified from the bearer token.
export async function requireAdmin(req: Request) {
  const sb = serviceClient(); const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!sb || !token) return null;
  const { data } = await sb.auth.getUser(token); const email = data.user?.email?.toLowerCase();
  return email && email === process.env.ADMIN_EMAIL?.toLowerCase() ? sb : null;
}
