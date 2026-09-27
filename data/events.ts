import { img } from '@/lib/images';
export type Event = { id: string; title: string; date: string; venue: string; town: string; image?: string };
// date|title|venue|town
export const events: Event[] = `
2026-09-26|Fall Fish Fry and Bonfire|Rest Lake Supper Club|manitowish-waters
2026-09-27|Chain O’Lakes Fall Color Paddle|Chain O’Lakes Landing|eagle-river
2026-10-03|Presque Isle Star Party|Presque Isle Town Park|presque-isle
2026-10-10|Beef-a-Rama|Torpy Park|minocqua
2026-10-11|Musky Fall Derby Weigh-In|Boulder Lodge Dock|boulder-junction
2026-10-17|Harvest Market at Pioneer Park|Pioneer Park|rhinelander
2026-10-24|Cisco Chain ATV Poker Run|Land O’Lakes Town Hall|land-o-lakes
2026-11-07|Trail Grooming Volunteer Day|Snowmobile Club Shed|land-o-lakes
2026-11-14|Loon Talk and Cider Night|Mercer Community Hall|mercer
`.trim().split('\n').map((r, i) => { const [date, title, venue, town] = r.split('|'); return { id: `e${i + 1}`, date, title, venue, town }; });
const EV: Record<string, string> = { e1: 'event-fish-fry', e2: 'event-paddle', e3: 'event-stars', e4: 'event-beef', e5: 'event-derby', e6: 'event-market', e7: 'event-atv', e8: 'event-trail', e9: 'event-loon' };
events.forEach((e) => { e.image = img(EV[e.id] ?? ''); });
