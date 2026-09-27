import Link from 'next/link';
export default function SectionHeader({ title, href, label = 'See all' }: { title: string; href?: string; label?: string }) {
  return (<div className="mb-5 flex items-end justify-between gap-4"><h2>{title}</h2>{href && <Link href={href} className="shrink-0 text-lake-700 underline">{label}</Link>}</div>);
}
