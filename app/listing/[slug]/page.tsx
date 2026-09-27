import Link from 'next/link';
import { notFound } from 'next/navigation';
import { listings, getListing, sortListings } from '@/data/listings';
import { townName, forTown } from '@/data/towns';
import { CATS, typeLabel } from '@/data/categories';
import Gallery from '@/components/Gallery';
import Breadcrumbs from '@/components/Breadcrumbs';
import ListingCard from '@/components/ListingCard';
import SectionHeader from '@/components/SectionHeader';
import MapBox from '@/components/MapBox';
import { meta } from '@/lib/seo';
export const dynamicParams = false;
export const generateMetadata = ({ params }: { params: { slug: string } }) => { const l = getListing(params.slug); return l ? meta(`${l.name}: ${typeLabel(l.category, l.subtype)} in ${townName(l.town)}, WI`, l.description) : {}; };
export const generateStaticParams = () => listings.map((l) => ({ slug: l.slug }));
export default function ListingPage({ params }: { params: { slug: string } }) {
  const l = getListing(params.slug); if (!l) notFound();
  const town = townName(l.town);
  const nearby = forTown(sortListings(listings.filter((x) => x.id !== l.id)), l.town, 4);
  const ld = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: l.name, description: l.description, telephone: l.phone, url: l.website, priceRange: l.priceRange,
    address: { '@type': 'PostalAddress', streetAddress: l.address?.split(',')[0], addressLocality: town, addressRegion: 'WI', addressCountry: 'US' } };
  return (
    <main className="mx-auto max-w-7xl px-5 pb-16 pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumbs items={[['Home', '/'], [CATS[l.category].title, `/${l.category}`], [l.name]]} />
      <Gallery images={l.images} name={l.name} />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div>
          <p className="mb-1 text-sm"><span className="rounded bg-mist-200 px-2 py-1">{typeLabel(l.category, l.subtype)}</span> <Link href={`/towns/${l.town}`} className="ml-2 text-lake-700 underline">{town}</Link></p>
          <h1 className="mb-4">{l.name}</h1>
          <p>{l.description} Ask about seasonal availability, group rates, and what’s biting this week.</p>
          <ul className="my-6 flex flex-wrap gap-2">{l.tags.map((t) => <li key={t} className="rounded-full border border-lake-700/40 px-3 py-1 text-sm text-lake-700">{t}</li>)}</ul>
          <MapBox label={l.address} />
        </div>
        <aside className="h-fit space-y-3 rounded-md border border-mist-200 bg-white p-5 text-sm">
          <p><b>Address</b><br />{l.address}</p><p><b>Phone</b><br /><a href={`tel:${l.phone}`}>{l.phone}</a></p>
          <p><b>Website</b><br /><a href={l.website} className="break-all text-lake-700 underline">{l.website?.replace('https://', '')}</a></p>
          <p><b>Hours</b><br />{l.hours}</p>{l.priceRange && <p><b>Price range</b><br />{l.priceRange}</p>}
          <Link href={`/list-your-business?claim=${l.slug}`} className="block rounded-full bg-pine-900 px-4 py-3 text-center font-medium text-birch-100">Claim this listing</Link>
        </aside>
      </div>
      <section className="mt-14"><SectionHeader title={`Nearby listings in ${town}`} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{nearby.map((x) => <ListingCard key={x.id} l={x} />)}</div></section>
    </main>
  );
}
