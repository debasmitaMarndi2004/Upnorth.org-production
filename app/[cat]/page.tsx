import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CATS } from '@/data/categories';
import { meta } from '@/lib/seo';
import { img } from '@/lib/images';
import Banner from '@/components/Banner';
import CategoryBrowser from '@/components/CategoryBrowser';
export const dynamicParams = false;
export const generateMetadata = ({ params }: { params: { cat: string } }) => { const c = CATS[params.cat]; return c ? meta(`${c.title} in the Northwoods`, c.desc) : {}; };
export const generateStaticParams = () => Object.keys(CATS).map((cat) => ({ cat }));
export default function CategoryPage({ params }: { params: { cat: string } }) {
  const c = CATS[params.cat]; if (!c) notFound();
  return (<main><Banner src={img('cat-' + params.cat)} title={c.title} desc={c.desc} label={c.photo} crumbs={[['Home', '/'], [c.title]]} /><Suspense fallback={<p className="p-8">Loading…</p>}><CategoryBrowser cat={params.cat} /></Suspense></main>);
}
