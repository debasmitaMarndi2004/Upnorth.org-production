export const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://upnorth.org';
export const meta = (title: string, description: string) => ({ title, description, openGraph: { title: `${title} | UpNorth.org`, description, siteName: 'UpNorth.org', images: [{ url: '/og-share.jpg', width: 1200, height: 630 }], type: 'website' as const } });
