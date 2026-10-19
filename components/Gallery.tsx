"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

export default function Gallery({ photos, label }: { photos: string[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null);
  if (photos.length === 0) {
    return <div className="gal">{[1, 2, 3, 4, 5, 6].map((n) => <div key={n} className="ph">{label} photo {n}</div>)}</div>;
  }
  const go = (d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length));
  return (
    <>
      <div className="gal">
        {photos.map((src, i) => (
          <button key={src} onClick={() => setOpen(i)} aria-label={`Open ${label} photo ${i + 1}`}>
            <img src={src} alt={`${label} photo ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lb" onClick={() => setOpen(null)}>
          <img src={photos[open]} alt={`${label} photo ${open + 1}`} onClick={(e) => e.stopPropagation()} />
          <button style={{ top: 20, right: 20 }} onClick={() => setOpen(null)} aria-label="Close">×</button>
          <button style={{ left: 20 }} onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous">‹</button>
          <button style={{ right: 20 }} onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next">›</button>
        </div>
      )}
    </>
  );
}
