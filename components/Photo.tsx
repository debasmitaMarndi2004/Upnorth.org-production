// Renders a real image when src is set, otherwise a labeled pine block.
export default function Photo({ src, label, className = '' }: { src?: string; label: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-pine-900 to-lake-700 ${className}`}>
      {src ? <img src={src} alt={label} className="absolute inset-0 h-full w-full object-cover" />
        : <span className="absolute bottom-2 left-3 text-xs text-birch-100/70">Photo: {label}</span>}
    </div>
  );
}
