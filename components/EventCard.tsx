import Link from 'next/link';
import type { Event } from '@/data/events';
import { townName } from '@/data/towns';
import Photo from './Photo';
export default function EventCard({ e }: { e: Event }) {
  const d = new Date(e.date + 'T12:00:00');
  return (
    <Link href={`/events?town=${e.town}`} className="block h-full overflow-hidden border border-ink-900/20 bg-birch-100">
      <div className="relative"><Photo src={e.image} label={e.title} className="h-36" />
        <div className="absolute left-3 top-3 bg-amber-500 px-2.5 py-1 text-center leading-tight text-ink-900"><div className="text-xs font-medium">{d.toLocaleString('en-US', { month: 'short' })}</div><div className="font-display text-xl font-semibold">{d.getDate()}</div></div></div>
      <div className="p-4"><h3 className="text-lg">{e.title}</h3><p className="mt-1 text-sm">{e.venue}, {townName(e.town)}</p></div>
    </Link>
  );
}
