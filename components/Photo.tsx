/* eslint-disable @next/next/no-img-element */
// Shows a photo if `src` is set, otherwise a labelled placeholder block.
export default function Photo({ src, label, className = "" }: { src?: string; label: string; className?: string }) {
  if (src) return <img src={src} alt={label} className={className} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
  return <div className={`ph ${className}`}>{label}</div>;
}