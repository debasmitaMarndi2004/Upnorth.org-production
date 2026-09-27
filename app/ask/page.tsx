import { Suspense } from 'react';
import AskResults from '@/components/AskResults';
import AskBar from '@/components/AskBar';
import { meta } from '@/lib/seo';
export const metadata = meta('Ask UpNorth', 'Tell the Northwoods concierge what you want to do, and get cabins, supper clubs, and outings that fit.');
export default function AskPage() {
  return (<main><section className="bg-pine-900 px-5 pb-8 pt-28 text-birch-100"><div className="mx-auto max-w-7xl"><h1 className="mb-5">Ask UpNorth</h1><AskBar /></div></section>
    <Suspense fallback={<p className="p-8">Loading…</p>}><AskResults /></Suspense></main>);
}
