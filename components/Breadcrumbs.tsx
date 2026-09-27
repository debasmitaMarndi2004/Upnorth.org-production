import Link from 'next/link';
export default function Breadcrumbs({ items, light }: { items: [string, string?][]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`mb-3 text-sm ${light ? 'text-birch-100/85' : 'text-ink-900/70'}`}>
      <ol className="flex flex-wrap gap-2">{items.map(([l, h], i) => (
        <li key={l} className="flex gap-2">{i > 0 && <span aria-hidden>/</span>}{h ? <Link href={h} className="underline">{l}</Link> : <span aria-current="page">{l}</span>}</li>))}</ol>
    </nav>
  );
}
