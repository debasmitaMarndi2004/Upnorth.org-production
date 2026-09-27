// Local mock data layer. In-memory only, so it resets on restart and on serverless cold starts.
// TODO(Supabase): replace with tables `listing_submissions` and `subscribers`.
export type Submission = { id: string; status: 'pending review'; createdAt: string; claim?: string; name: string; category: string; subtype: string; town: string; address: string; phone: string; website: string; description: string; tier: string };
export const submissions: Submission[] = [];
export const subscribers: string[] = [];
