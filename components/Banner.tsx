import Photo from './Photo';
import Breadcrumbs from './Breadcrumbs';
export default function Banner({ title, desc, label, crumbs, src }: { src?: string; title: string; desc?: string; label: string; crumbs: [string, string?][] }) {
  return (
    <section className="relative flex h-80 items-end sm:h-96">
      <Photo src={src} label={label} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-pine-900/85 to-pine-900/20" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-8 text-birch-100"><Breadcrumbs items={crumbs} light /><h1>{title}</h1>{desc && <p className="mt-2 text-lg">{desc}</p>}</div>
    </section>
  );
}
