import AdminPanel from '@/components/AdminPanel';
export const metadata = { title: 'Admin', robots: { index: false, follow: false } };
export default function Admin() { return (<main className="mx-auto max-w-3xl px-5 pb-20 pt-28"><h1 className="mb-6">Review submissions</h1><AdminPanel /></main>); }
