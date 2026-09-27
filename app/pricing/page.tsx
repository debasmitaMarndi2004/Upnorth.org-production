import PricingCards from '@/components/PricingCards';
import { meta } from '@/lib/seo';
export const metadata = meta('Business Listing Pricing', 'Free, Enhanced, and Featured listings for Northwoods businesses. Visitors never pay.');
export default function Pricing() {
  return (<main className="mx-auto max-w-7xl px-5 pb-20 pt-28"><h1>List your business Up North</h1><p className="mb-10 mt-3">Visitors always browse for free. Pick the visibility your business needs.</p><PricingCards /></main>);
}
