'use client';
import { useEffect } from 'react';
import { CONTACT_EMAIL } from '@/config/pricing';
export default function ContactModal({ onClose }: { onClose: () => void }) {
  useEffect(() => { const f = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f); }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-5" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="pay-title" onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-lg bg-birch-100 p-6">
        <h2 id="pay-title" className="text-2xl">Almost ready</h2>
        <p className="mt-3">Online payment setup is almost ready. Contact us to get listed today.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={`mailto:${CONTACT_EMAIL}?subject=Get%20listed%20on%20UpNorth.org`} className="rounded-full bg-pine-900 px-5 py-3 text-center font-medium text-birch-100">Email {CONTACT_EMAIL}</a>
          <button onClick={onClose} className="rounded-full border border-mist-200 px-5 py-3">Close</button>
        </div>
      </div>
    </div>
  );
}
