// Single source of truth for business tiers. Visitors are never charged.
export type TierKey = 'free' | 'enhanced' | 'featured';
export const TIERS: { key: TierKey; name: string; price: string; blurb: string; features: string[] }[] = [
  { key: 'free', name: 'Free', price: '$0', blurb: 'A basic listing so visitors can find you.', features: ['Name, category, and town', 'One photo', 'Short description'] },
  { key: 'enhanced', name: 'Enhanced', price: '$29–$49', blurb: 'Stand out in your category.', features: ['Full photo gallery', 'Priority placement within your category', 'Contact and website links'] },
  { key: 'featured', name: 'Featured', price: '$99–$199', blurb: 'The most visibility Up North.', features: ['Everything in Enhanced', 'Homepage carousel', 'Top-of-category placement', 'Amber "Featured" badge'] },
];
export const CONTACT_EMAIL = 'hello@upnorth.org';
