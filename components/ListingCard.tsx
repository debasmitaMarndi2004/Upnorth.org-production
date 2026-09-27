import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Listing } from '@/data/listings';
import { townName } from '@/data/towns';
import { typeLabel } from '@/data/categories';
import Photo from './Photo';
export default function ListingCard({ l }: { l: Listing }) {
  const rating = (4 + ((parseInt(l.id.slice(1)) * 7) % 10) / 10).toFixed(1); // mock rating
  return (
    <Link href={`/listing/${l.slug}`} className="block h-full w-full min-w-0 overflow-hidden rounded-md border border-mist-200 bg-white">
      <div className="relative"><Photo src={l.images[0] || undefined} label={l.name} className="h-44" />
        {l.isFeatured && <span className="absolute left-3 top-3 rounded bg-amber-500 px-2 py-1 text-xs font-semibold text-ink-900">Featured</span>}
        {!l.isFeatured && l.isEnhanced && <span className="absolute left-3 top-3 rounded border border-mist-200 bg-birch-100 px-2 py-1 text-xs font-medium text-lake-700">Enhanced</span>}</div>
      <div className="p-4"><h3 className="text-xl">{l.name}</h3>
        <p className="text-sm text-lake-700">{typeLabel(l.category, l.subtype)} in {townName(l.town)}</p>
        <p className="mt-1 flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-amber-500 text-amber-500" aria-hidden />{rating}{l.priceRange && <span className="ml-2">{l.priceRange}</span>}</p>
        <p className="mt-2 text-sm">{l.description}</p></div>
    </Link>
  );
}
