import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { towns, nav } from '@/data';
import MiniSignup from './MiniSignup';
const col = 'space-y-2 text-sm text-birch-100/85';
export default function Footer() {
  return (
    <footer className="bg-pine-900 px-5 pb-8 pt-14 text-birch-100">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div><h3 className="mb-3 text-xl">Explore</h3><ul className={col}>{nav.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul></div>
        <div><h3 className="mb-3 text-xl">Towns</h3><ul className={col}>{towns.map((t) => <li key={t.slug}><Link href={`/towns/${t.slug}`}>{t.name}</Link></li>)}</ul></div>
        <div><h3 className="mb-3 text-xl">Stay Connected</h3>
          <MiniSignup />
          <div className="mt-4 flex gap-4"><Facebook aria-label="Facebook" /><Instagram aria-label="Instagram" /><Youtube aria-label="YouTube" /></div></div>
        <div><h3 className="mb-3 text-xl">About</h3><ul className={col}><li><Link href="mailto:hello@upnorth.org">Contact</Link></li><li><Link href="/list-your-business?type=event">Submit an event</Link></li><li><Link href="/list-your-business">List your business</Link></li></ul></div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-birch-100/15 pt-6 text-sm text-birch-100/70">
        <p>UpNorth.org, PO Box 000, Minocqua, WI 54548 · (715) 555-0100 · hello@upnorth.org</p><p>© UpNorth.org</p></div>
    </footer>
  );
}
