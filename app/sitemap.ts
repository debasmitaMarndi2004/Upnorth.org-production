import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo';
import { CATS } from '@/data/categories';
import { towns } from '@/data/towns';
import { listings } from '@/data/listings';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/ask', '/pricing', '/list-your-business', ...Object.keys(CATS).map((c) => `/${c}`), ...towns.map((t) => `/towns/${t.slug}`), ...listings.map((l) => `/listing/${l.slug}`)];
  return paths.map((p) => ({ url: `${SITE}${p}`, lastModified: new Date() }));
}
