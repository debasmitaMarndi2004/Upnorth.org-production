'use client';
import { motion } from 'framer-motion';
import { img } from '@/lib/images';
import Photo from './Photo';
import AskBar from './AskBar';
// The page's one motion moment: fade and rise once on load.
export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center">
      <Photo src={img('hero')} label="Northwoods lake at dawn, white pines and mist" className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-pine-900/60 via-pine-900/20 to-pine-900/70" />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }} className="relative z-10 flex w-full flex-col items-center px-5 pt-16 text-center text-birch-100">
        <h1 className="max-w-3xl">Where do you want to go Up North?</h1>
        <p className="mb-8 mt-4 text-lg text-birch-100/90">Cabins, supper clubs, muskie lakes, and snowmobile trails across Vilas and Oneida counties.</p>
        <AskBar />
      </motion.div>
    </section>
  );
}
