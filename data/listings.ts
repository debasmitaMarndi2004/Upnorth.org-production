import { townName } from './towns';
import { img } from '@/lib/images';
const SLOT: Record<string, string | string[]> = { cabin: ['stay-cabin', 'stay-interior'], resort: ['stay-resort', 'stay-interior'], hotel: 'stay-hotel', bnb: 'stay-bnb', campground: 'stay-campground', 'supper-club': ['eat-supperclub', 'eat-fishfry'], restaurant: ['eat-lakeside', 'eat-fishfry'], brewery: 'eat-brewery', coffee: 'eat-coffee', bar: 'eat-tavern', fishing: 'todo-fishing', boating: 'todo-boating', 'atv-utv': 'todo-atv', snowmobiling: 'todo-snowmobile', hiking: 'todo-hiking', golf: 'todo-golf', sale: ['re-home', 're-bungalow'], land: 're-land', agents: ['re-home', 're-bungalow', 're-land'] };
// Real photos for this subtype, rotated per listing so neighbors don't all open on the same picture.
const pics = (sub: string, i: number) => { const p = ([] as string[]).concat(SLOT[sub] ?? []).flatMap((x) => [1, 2, 3, 4].map((n) => img(`${x}-${n}`))).filter(Boolean) as string[]; if (!p.length) return ['', '', '', '']; const r = i % p.length; return [...p.slice(r), ...p.slice(0, r)]; };
export type Listing = {
  id: string; slug: string; name: string; category: 'stay' | 'eat-drink' | 'things-to-do' | 'real-estate';
  subtype: string; town: string; priceRange?: string; tags: string[]; description: string; images: string[];
  isFeatured: boolean; isEnhanced: boolean; phone?: string; website?: string; address?: string; hours?: string;
};
const H: Record<string, string> = { stay: 'Check-in 3pm, check-out 11am', 'eat-drink': 'Wed to Sun, 11am to 9pm', 'things-to-do': 'Daily 7am to 6pm, seasonal', 'real-estate': 'Mon to Sat, 9am to 5pm' };
// category|subtype|name|town|price|tags|description|F (featured) or E (enhanced)
const rows = `
stay|cabin|Whitetail Point Cabins|minocqua|$$$|Dock,Waterfront,Pet Friendly|Six knotty-pine cabins on Lake Minocqua, each with a private dock and screened porch.|F
stay|resort|Loon Call Lodge|mercer|$$|Sauna,Canoes,Waterfront|Lakeside lodge with loaner canoes and a loon chorus at dusk.|F
stay|hotel|Hodag Pioneer Inn|rhinelander|$$|Free Breakfast,Pool,Pet Friendly|Downtown inn a short walk from Pioneer Park and the Hodag statue.|E
stay|bnb|Birch Bark B&B|eagle-river|$$|Breakfast,Fireplace,Adults Only|Historic home with a porch swing and wild blueberry pancakes.|E
stay|campground|Northern Highland Pines Campground|presque-isle|$|Fire Rings,Boat Launch,Quiet Hours|Wooded sites within a short paddle of Presque Isle Lake.|
stay|cabin|Musky Bay Cabins|boulder-junction|$$|Dock,Fish Cleaning Station,Boat Rental|Fishing-first cabins with a cleaning station and a bait shop next door.|
stay|resort|Rest Lake Resort|manitowish-waters|$$$|Waterfront,Restaurant,Pontoon Rental|Full-service resort with a pontoon fleet and a Friday fish fry.|
stay|campground|Cisco Chain Campsites|land-o-lakes|$|ATV Trail Access,Fire Rings,Waterfront|Rustic sites steps from ATV trails and the Cisco Chain.|
stay|hotel|Iron Range Motor Lodge|hurley-ironwood|$|Pet Friendly,Snowmobile Parking,Kitchenettes|Clean, simple rooms on Silver Street, close to the ski hills.|
eat-drink|supper-club|The Pine Knot Supper Club|eagle-river|$$|Relish Tray,Old Fashioneds,Fish Fry|Friday walleye fry and brandy old fashioneds since 1958.|F
eat-drink|supper-club|Rest Lake Supper Club|manitowish-waters|$$|Lake View,Prime Rib,Fish Fry|Prime rib Saturday, sunset over Rest Lake, and a proper relish tray.|F
eat-drink|restaurant|Walleye Landing|minocqua|$$|Patio,Dock Dining,Kids Menu|Pan-fried walleye with a dock you can boat up to.|E
eat-drink|brewery|Hodag Hop Brewing|rhinelander|$$|Taproom,Local Beer,Food Trucks|Small-batch pale ales and a cream ale named for a beast.|E
eat-drink|bar|The Sunken Stump Tavern|boulder-junction|$|Live Music,Pool Table,Pub Fare|Musky mounts on the wall and burgers as big as the fish stories.|
eat-drink|coffee|Morning Loon Coffee|mercer|$|Bakery,Free Wi-Fi,Pet Friendly|Cinnamon rolls and dark roast for the early paddlers.|
eat-drink|restaurant|Cisco Chain Diner|land-o-lakes|$|Breakfast All Day,Family Friendly|Biscuits and gravy before you hit the ATV trail.|
eat-drink|bar|Depot Street Saloon|hurley-ironwood|$|Historic Building,Pizza,Live Music|Old mining-town saloon with a pasty on the menu.|
eat-drink|brewery|Presque Isle Brew Shed|presque-isle|$$|Taproom,Patio,Dog Friendly|Tiny taproom with a firepit, open when the lights are on.|
things-to-do|fishing|Northern Lights Guide Service|boulder-junction|$$$|Guided,Musky,Gear Included|Full-day musky and walleye trips with a guide who knows every weed edge.|F
things-to-do|hiking|Turtle-Flambeau Loon Trail Tours|mercer|$$|Guided,Paddling,Wildlife|Sunrise paddles and portage hikes on the Flowage.|F
things-to-do|boating|Chain O’Lakes Pontoon Rentals|eagle-river|$$|Pontoons,Kayaks,Fishing Gear|Half-day and weekly pontoons for the 28-lake Chain.|E
things-to-do|golf|Northwood Golf Course|minocqua|$$|18 Holes,Pro Shop,Cart Rental|Tree-lined Northwoods golf with a clubhouse patio.|E
things-to-do|atv-utv|Iron County ATV Trail Rides|hurley-ironwood|$$|Guided,UTV Rental,Helmets Included|Guided rides on the Iron County trail network.|
things-to-do|snowmobiling|Trestle Snowmobile Tours|land-o-lakes|$$$|Guided,Sled Rental,Groomed Trails|Guided sled tours through the Ottawa National Forest edge.|
things-to-do|fishing|Presque Isle Musky Charters|presque-isle|$$$|Guided,Musky,Walleye|Guided musky and walleye trips on Presque Isle Lake.|
things-to-do|hiking|Heart of Vilas Bike and Ski|manitowish-waters|$|Bike Rentals,Fat Bikes,Ski Rentals|Bikes, fat bikes, and skis for the Heart of Vilas trail.|
things-to-do|boating|Hodag Kayak Outfitters|rhinelander|$|Kayaks,Canoes,Shuttles|Wisconsin River day trips with shuttle service.|
real-estate|sale|Lakefront Cape Cod on Kawaguesaga|minocqua|$$$|Waterfront,Dock,Sandy Bottom|Four-bedroom lake home with 100 feet of sandy frontage.|F
real-estate|land|40 Wooded Acres near Presque Isle|presque-isle|$$|Hunting,Wooded,Power Nearby|Forty acres of mixed hardwood, borders state land.|
real-estate|agents|Birchbark Realty Group|rhinelander|$|Lake Homes,Cabins,Land|Lake homes and hunting parcels across Oneida and Vilas.|E
real-estate|sale|Eagle River Chain Home|eagle-river|$$$|Waterfront,Boat House,Fireplace|Chain-front home with a boathouse and a stone fireplace.|
real-estate|land|Boulder Junction Hunting Parcel|boulder-junction|$$|Hunting,Wooded,Trail Access|Eighty acres with a two-track and a deer stand.|
real-estate|agents|Northwoods Lake Properties|minocqua|$|Waterfront,Vacation Homes|Agents who know which lakes have sandy shores.|
real-estate|sale|Manitowish Log Cabin|manitowish-waters|$$|Log Home,Woodstove,Snowmobile Trail|Log cabin on a snowmobile trail, two blocks from the lake.|
real-estate|land|Turtle Flowage Frontage|mercer|$$$|Waterfront,Undeveloped,Wildlife|Three acres of undeveloped Flowage frontage.|
real-estate|sale|Hurley Miner’s Bungalow|hurley-ironwood|$|Historic,Updated Kitchen,Garage|Restored bungalow near the Montreal River.|
`.trim().split('\n');
export const listings: Listing[] = rows.map((r, i) => {
  const [category, subtype, name, town, price, tags, description, flag] = r.split('|');
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return { id: `l${i + 1}`, slug, name, category, subtype, town, priceRange: price, tags: tags.split(','), description, images: pics(subtype, i),
    isFeatured: flag === 'F', isEnhanced: flag === 'E', phone: `(715) 555-01${String(10 + i).padStart(2, '0')}`,
    website: `https://${slug}.example.com`, address: `${100 + i * 17} Main St, ${townName(town)}, WI`, hours: H[category] } as Listing;
});
const rank = (l: Listing) => (l.isFeatured ? 0 : l.isEnhanced ? 1 : 2);
export const sortListings = (a: Listing[]) => [...a].sort((x, y) => rank(x) - rank(y) || x.name.localeCompare(y.name));
export const getListing = (slug: string) => listings.find((l) => l.slug === slug);
