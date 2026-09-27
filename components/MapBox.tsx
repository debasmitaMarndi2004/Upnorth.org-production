export default function MapBox({ label }: { label?: string }) {
  // Maps Embed API keys are meant to be public: restrict this one by HTTP referrer in the Google Cloud console.
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (key && label) return <iframe title={`Map of ${label}`} loading="lazy" className="h-56 w-full rounded-md border border-mist-200" src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodeURIComponent(label)}`} />;
  return (<div role="img" aria-label="Map placeholder" className="flex h-56 items-center justify-center rounded-md border-2 border-dashed border-lake-700/50 bg-white px-3 text-center text-sm text-lake-700">Map: Google Maps API key needed{label ? ` (${label})` : ''}</div>);
}
