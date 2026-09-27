import Link from 'next/link';
import type { Town } from '@/data/towns';
import Photo from './Photo';
export default function TownCard({ t }: { t: Town }) {
  return (<Link href={`/towns/${t.slug}`} className="block"><Photo src={t.image} label={t.name} className="aspect-[4/3] rounded-t-full" /><h3 className="mt-3 text-xl">{t.name}</h3><p className="text-sm">{t.blurb}</p></Link>);
}
