'use client';
import { towns } from '@/data/towns';
type P = { town: string; onTown: (v: string) => void; typeLabel?: string; types?: [string, string][]; type?: string; onType?: (v: string) => void; count: number };
const sel = 'ml-2 rounded border border-mist-200 bg-white px-3 py-2 text-sm';
export default function FilterBar({ town, onTown, typeLabel, types = [], type = 'all', onType, count }: P) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-mist-200 py-4">
      <label className="text-sm">Town<select value={town} onChange={(e) => onTown(e.target.value)} className={sel}><option value="all">All towns</option>{towns.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}</select></label>
      {types.length > 0 && <label className="text-sm">{typeLabel}<select value={type} onChange={(e) => onType?.(e.target.value)} className={sel}><option value="all">All</option>{types.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>}
      <span className="ml-auto text-sm">{count} {count === 1 ? 'result' : 'results'}</span>
    </div>
  );
}
