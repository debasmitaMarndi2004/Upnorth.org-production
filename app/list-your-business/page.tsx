import { Suspense } from 'react';
import BusinessForm from '@/components/BusinessForm';
import { meta } from '@/lib/seo';
export const metadata = meta('List Your Business', 'Add or claim your Northwoods business on UpNorth.org.');
export default function ListYourBusiness() {
  return (<main className="mx-auto max-w-3xl px-5 pb-20 pt-28"><h1>List your business</h1><p className="mb-8 mt-3">Tell us about your business. We review every submission before it goes live.</p><Suspense fallback={<p>Loading…</p>}><BusinessForm /></Suspense></main>);
}
