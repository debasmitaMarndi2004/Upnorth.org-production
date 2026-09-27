export * from './towns'; export * from './listings'; export * from './events'; export * from './categories';
// Typed local data. Swap each export for a Supabase query later; keep the types.
export type Highlight = { id: string; kind: string; title: string; body: string; tone: 'pine' | 'amber' | 'lake' | 'birch'; wide?: boolean; image?: string };




export const highlights: Highlight[] = [
  { id: 'h1', kind: 'Fishing report', title: 'Walleye are on the rock bars', body: 'Fathead minnows at dusk in 8 to 12 feet on Lake Tomahawk. Muskies are chasing big bucktails on Boulder area lakes.', tone: 'lake', wide: true },
  { id: 'h2', kind: 'Fall color', title: 'Maples at 60% near Presque Isle', body: 'Peak expected the first week of October. Best drive: County B to the Turtle Flowage.', tone: 'amber' },
  { id: 'h3', kind: 'Trail conditions', title: 'Heart of Vilas trail: dry and fast', body: 'Leaves on the surface, so brake early on the downhills.', tone: 'birch' },
  { id: 'h4', kind: 'Featured event', title: 'Beef-a-Rama, Oct 10', body: 'Minocqua’s beloved beef sandwich fest returns to Torpy Park.', tone: 'pine' },
  { id: 'h5', kind: 'Featured restaurant', title: 'The Pine Knot Supper Club', body: 'Ask for the table by the fireplace and start with the relish tray.', tone: 'birch' },
  { id: 'h6', kind: 'Featured cabin', title: 'Whitetail Point, cabin 4', body: 'Woodstove, screened porch, and a dock for the evening cast.', tone: 'pine', wide: true },
];

export const sections = [
  { title: 'Stay', href: '/stay', icon: 'Bed', blurb: 'Lakefront cabins, resorts, and campsites under the pines.' },
  { title: 'Eat & Drink', href: '/eat-drink', icon: 'Utensils', blurb: 'Supper clubs, fish fries, and brewpubs with a lake view.' },
  { title: 'Things to Do', href: '/things-to-do', icon: 'Compass', blurb: 'Fish, paddle, ride the trails, or chase a muskie.' },
  { title: 'Events', href: '/events', icon: 'CalendarDays', blurb: 'Derbies, farmers markets, and small-town festivals.' },
  { title: 'Explore', href: '/explore', icon: 'Map', blurb: 'Nine towns, hundreds of lakes, and one Northwoods.' },
  { title: 'Real Estate', href: '/real-estate', icon: 'Home', blurb: 'Lake homes, cabins, and wooded acreage.' },
];

