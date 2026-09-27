'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Photo from './Photo';
export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0); const go = (d: number) => setI((i + d + images.length) % images.length);
  return (
    <div>
      <div className="relative"><Photo src={images[i] || undefined} label={`${name}, photo ${i + 1} of ${images.length}`} className="h-72 rounded-lg sm:h-[26rem]" />
        <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 rounded-full bg-birch-100 p-2"><ChevronLeft /></button>
        <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 rounded-full bg-birch-100 p-2"><ChevronRight /></button></div>
      <div className="mt-2 flex gap-2">{images.map((s, k) => <button key={k} onClick={() => setI(k)} aria-label={`Show photo ${k + 1}`} className={`h-14 min-w-0 flex-1 overflow-hidden rounded ${k === i ? 'ring-2 ring-amber-500' : ''}`}><Photo src={s || undefined} label="" className="h-full w-full" /></button>)}</div>
    </div>
  );
}
