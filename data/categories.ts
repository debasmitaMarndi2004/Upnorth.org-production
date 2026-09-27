import { towns } from './towns';
type Cat = { title: string; desc: string; photo: string; typeLabel: string; types: [string, string][] };
export const CATS: Record<string, Cat> = {
  stay: { title: 'Stay', desc: 'Lakefront cabins, resorts, and campsites under the pines.', photo: 'Cabin dock at sunrise', typeLabel: 'Type', types: [['cabin', 'Cabins'], ['resort', 'Resorts'], ['hotel', 'Hotels'], ['bnb', 'B&Bs'], ['campground', 'Campgrounds']] },
  'eat-drink': { title: 'Eat & Drink', desc: 'Supper clubs, fish fries, and taprooms with a lake view.', photo: 'Supper club dining room', typeLabel: 'Type', types: [['restaurant', 'Restaurants'], ['supper-club', 'Supper clubs'], ['bar', 'Bars'], ['brewery', 'Breweries'], ['coffee', 'Coffee']] },
  'things-to-do': { title: 'Things to Do', desc: 'Fish, paddle, ride the trails, or chase a muskie.', photo: 'Boat on a misty lake', typeLabel: 'Activity', types: [['fishing', 'Fishing'], ['boating', 'Boating'], ['atv-utv', 'ATV/UTV'], ['snowmobiling', 'Snowmobiling'], ['hiking', 'Hiking'], ['golf', 'Golf']] },
  events: { title: 'Events', desc: 'Derbies, harvest markets, and small-town festivals.', photo: 'Festival at the lakefront', typeLabel: 'When', types: [['week', 'This week'], ['month', 'This month']] },
  explore: { title: 'Explore', desc: 'Nine towns, hundreds of lakes, and one Northwoods.', photo: 'Aerial view of lakes and pines', typeLabel: '', types: [] },
  'real-estate': { title: 'Real Estate', desc: 'Lake homes, cabins, and wooded acreage.', photo: 'Lake home with a dock', typeLabel: 'Type', types: [['sale', 'For sale'], ['land', 'Land'], ['agents', 'Agents']] },
};
export const nav = Object.entries(CATS).map(([k, c]) => ({
  label: c.title, href: `/${k}`,
  links: (k === 'explore' ? [['All towns', '/explore'], ...towns.slice(0, 5).map((t) => [t.name, `/towns/${t.slug}`])] : c.types.map(([v, l]) => [l, `/${k}?type=${v}`])) as [string, string][],
}));
export const typeLabel = (cat: string, v: string) => CATS[cat]?.types.find(([x]) => x === v)?.[1] ?? v;
