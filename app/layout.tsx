import type { Metadata } from 'next';
import { Fraunces, Work_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteChrome from '@/components/SiteChrome';
import { SITE } from '@/lib/seo';
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' });
const work = Work_Sans({ subsets: ['latin'], variable: '--font-work' });
const desc = 'Cabins, supper clubs, events, and trails across Vilas and Oneida counties.';
export const metadata: Metadata = { metadataBase: new URL(SITE), title: { default: 'UpNorth.org | Northwoods of Northern Wisconsin', template: '%s | UpNorth.org' }, description: desc,
  openGraph: { title: 'UpNorth.org | Northwoods of Northern Wisconsin', description: desc, siteName: 'UpNorth.org', images: [{ url: '/og-share.jpg', width: 1200, height: 630 }], type: 'website', locale: 'en_US' }, twitter: { card: 'summary_large_image' } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={`${fraunces.variable} ${work.variable}`}><body className="overflow-x-hidden font-sans"><SiteChrome>{children}</SiteChrome></body></html>);
}
