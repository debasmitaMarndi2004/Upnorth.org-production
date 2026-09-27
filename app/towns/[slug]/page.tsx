import { notFound } from 'next/navigation';
import { towns, getTown, forTown } from '@/data/towns';
import { listings, sortListings } from '@/data/listings';
import { events } from '@/data/events';
import { img } from '@/lib/images';
import Banner from '@/components/Banner';
import SectionHeader from '@/components/SectionHeader';
import ListingCard from '@/components/ListingCard';
import EventCard from '@/components/EventCard';
import TownCard from '@/components/TownCard';
import MapBox from '@/components/MapBox';
import { meta } from '@/lib/seo';
export const dynamicParams = false;
export const generateMetadata = ({ params }: { params: { slug: string } }) => { const t = getTown(params.slug); return t ? meta(`${t.name}, WI — Lodging, Dining & Things to Do`, t.intro.split('. ')[0] + '.') : {}; };
export const generateStaticParams = () => towns.map((t) => ({ slug: t.slug }));
const grid = 'grid gap-5 sm:grid-cols-2';
export default function TownPage({ params }: { params: { slug: string } }) {
  const t = getTown(params.slug); if (!t) notFound();
  const secs = [['Where to stay', 'stay'], ['Where to eat', 'eat-drink'], ['Things to do', 'things-to-do']] as const;
  return (
    <main>
      <Banner src={t.image} title={t.name} desc={t.blurb} label={`${t.name}, Wisconsin`} crumbs={[['Home', '/'], ['Explore', '/explore'], [t.name]]} />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0 space-y-14">
          <section><h2 className="mb-3">Welcome to {t.name}</h2><p>{t.intro}</p></section>
          {secs.map(([title, cat]) => (<section key={cat}><SectionHeader title={title} href={`/${cat}?town=${t.slug}`} />
            <div className={grid}>{forTown(sortListings(listings.filter((l) => l.category === cat)), t.slug, 4).map((l) => <ListingCard key={l.id} l={l} />)}</div></section>))}
          <section><SectionHeader title="Upcoming events" href={`/events?town=${t.slug}`} />
            <div className={grid}>{forTown(events, t.slug, 3).map((e) => <EventCard key={e.id} e={e} />)}</div></section>
          <section><h2 className="mb-5">Find your way</h2><MapBox label={`${t.name}, WI`} /></section>
        </div>
        <aside className="h-fit rounded-md border border-mist-200 bg-white p-5 lg:sticky lg:top-24">
          <h3 className="mb-3">Quick facts</h3>
          <dl className="space-y-3 text-sm"><div><dt className="font-semibold">Nearest lakes</dt><dd>{t.lakes.join(', ')}</dd></div>
            <div><dt className="font-semibold">Known for</dt><dd>{t.knownFor}</dd></div>
            <div><dt className="font-semibold">Nearest larger town</dt><dd>{t.nearest}</dd></div>
            <div><dt className="font-semibold">County</dt><dd>{t.county}</dd></div></dl>
        </aside>
      </div>
      <section className="mx-auto max-w-7xl px-5 pb-16"><h2 className="mb-5">Nearby towns</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{t.nearby.map((s) => <TownCard key={s} t={getTown(s)!} />)}</div></section>
    </main>
  );
}
