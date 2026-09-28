'use client';

import Link from 'next/link';
import { Search, MapPin, Instagram, Youtube, Facebook, ArrowUpRight, Home as HomeIcon, CalendarDays, Utensils, BedDouble, Compass } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { label: 'Outdoors', href: '/things-to-do', icon: Compass },
  { label: 'Places to Stay', href: '/stay', icon: BedDouble },
  { label: 'Eat & Drink', href: '/eat-drink', icon: Utensils },
  { label: 'Events', href: '/events', icon: CalendarDays },
  { label: 'Towns', href: '/explore', icon: MapPin },
  { label: 'Real Estate', href: '/real-estate', icon: HomeIcon },
];

const cards = [
  { title: 'Explore the Outdoors', body: 'Fishing, boating, hiking, snowmobiling and more. Adventure is always in season.', link: 'See Activities', href: '/things-to-do', image: '/images/todo-boating-1.jpg', tag: 'DISCOVER' },
  { title: 'Find a Place to Stay', body: 'Cabins, resorts, vacation rentals and unique stays across the Northwoods.', link: 'Browse Stays', href: '/stay', image: '/images/stay-cabin-2.jpg', tag: 'STAY AWHILE' },
  { title: 'Great Food & Local Flavor', body: 'From lakeside bars to fine dining, find your next favorite spot.', link: 'View Restaurants', href: '/eat-drink', image: '/images/eat-lakeside-1.jpg', tag: 'SAVOR' },
  { title: 'Charming Towns', body: 'Discover unique shops, events and friendly communities.', link: 'Explore Towns', href: '/explore', image: '/images/town-minocqua.jpg', tag: 'WANDER' },
];

function PineMark({ light = false }: { light?: boolean }) {
  return <span className={`uphome-mark${light ? ' is-light' : ''}`} aria-hidden><i /><i /><i /></span>;
}

function HomeLogo({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`uphome-logo${light ? ' is-light' : ''}`}><PineMark light={light} /><span><strong>Upnorth.org</strong><small>EXPLORE · STAY · DO · BELONG</small></span></Link>;
}

export default function Homepage() {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState('');

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setNotice(query.trim() ? `Searching Up North for “${query.trim()}”` : 'Try a town, lake, activity or event.');
  };

  const submitNewsletter = async (event: React.FormEvent) => {
    event.preventDefault();
    try { await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }); } catch {}
    setNotice('You’re on the list — welcome Up North!');
    setEmail('');
  };

  return (
    <div className="uphome">
      <header className="uphome-header">
        <HomeLogo />
        <nav className="uphome-nav" aria-label="Primary navigation">
          <Link href="/things-to-do">Things To Do</Link>
          <Link href="/stay">Places to Stay</Link>
          <Link href="/eat-drink">Eat &amp; Drink</Link>
          <Link href="/explore">Towns</Link>
          <Link href="/events">Events</Link>
          <Link href="/explore">Guides</Link>
          <Link href="/real-estate">Real Estate</Link>
          <Link href="/explore">More <span aria-hidden>⌄</span></Link>
        </nav>
        <div className="uphome-head-actions">
          <button type="button" aria-label="Search" onClick={() => document.getElementById('uphome-search')?.focus()}><Search size={16} strokeWidth={1.8} /></button>
          <Link href="/explore" className="uphome-trip"><span className="uphome-trip-label">Plan Your Trip</span></Link>
        </div>
        <details className="uphome-mobile-menu"><summary aria-label="Open menu">☰</summary><div>{categories.map(({ label, href }) => <Link key={label} href={href}>{label}</Link>)}</div></details>
      </header>

      <main>
        <section className="uphome-hero">
          <div className="uphome-hero-bg" />
          <div className="uphome-hero-shade" />
          <div className="uphome-hero-content">
            <h1>Life’s Better Up North.</h1>
            <p className="uphome-hero-subtitle">Lakes. Forests. Small Towns. Big Memories.</p>
            <form className="uphome-search" onSubmit={submitSearch}>
              <Search size={15} aria-hidden />
              <input id="uphome-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search towns, lakes, activities, cabins, events..." aria-label="Search towns, lakes, activities, cabins and events" />
              <button type="submit">Search</button>
            </form>
            <Link href="/explore" className="uphome-scribble"><span>Explore</span><span>Unwind</span><span>Reconnect</span><b>↗</b></Link>
          </div>
          <div className="uphome-category-row">{categories.map(({ label, href, icon: Icon }, index) => <Link href={href} className={`uphome-category${index === 0 ? ' is-active' : ''}`} key={label}><span><Icon size={19} strokeWidth={1.5} /></span><small>{label}</small></Link>)}</div>
          <div className="uphome-location"><MapPin size={11} /> Presque Isle, WI<br />and beyond...</div>
        </section>

        <section className="uphome-discover">
          <div className="uphome-section-heading"><p className="uphome-kicker">THE NORTH IS CALLING</p><h2>Discover the Northwoods</h2><p>Your guide to everything Up North — from weekend getaways to year-round living.</p></div>
          <div className="uphome-card-grid">{cards.map((card) => <article className="uphome-card" key={card.title}><div className="uphome-card-image" style={{ backgroundImage: `url(${card.image})` }}><span>{card.tag}</span></div><div className="uphome-card-copy"><h3>{card.title}</h3><p>{card.body}</p><Link href={card.href}>{card.link} <b>→</b></Link></div></article>)}</div>
        </section>

        <section className="uphome-life">
          <div className="uphome-life-bg" /><div className="uphome-life-shade" />
          <div className="uphome-life-inner"><div className="uphome-life-copy"><h2>More Than a Destination.<br />A Way of Life.</h2><p>Whether you’re visiting, investing, or making it home, Upnorth.org connects you to the people, places and opportunities that make the Northwoods special.</p><Link href="/explore" className="uphome-outline">Learn More About Upnorth.org <span>→</span></Link></div><div className="uphome-newsletter"><h3>Stay in the Know</h3><p>Get the latest events, travel ideas, real estate listings and Northwoods stories.</p><form onSubmit={submitNewsletter}><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" aria-label="Your email address" /><button type="submit">Subscribe</button></form><small>No spam. Just Great Up North content.</small></div></div>
        </section>
      </main>

      <footer className="uphome-footer"><div className="uphome-footer-main"><HomeLogo light /><div className="uphome-footer-links"><Link href="/explore">About</Link><Link href="mailto:hello@upnorth.org">Contact</Link><Link href="/list-your-business">Advertise</Link><Link href="/list-your-business">Add Your Business</Link><Link href="/privacy">Privacy</Link></div><div className="uphome-socials"><a href="https://facebook.com" aria-label="Facebook"><Facebook size={13} /></a><a href="https://instagram.com" aria-label="Instagram"><Instagram size={13} /></a><a href="https://youtube.com" aria-label="YouTube"><Youtube size={13} /></a></div><p className="uphome-footer-note">The North<br /><em>Awaits You.</em></p></div><div className="uphome-footer-bottom"><span>© 2026 Upnorth.org</span><span>Made for the ones who know.</span></div></footer>
      {notice && <button className="uphome-toast" onClick={() => setNotice('')} aria-label="Dismiss message">{notice}</button>}
    </div>
  );
}
