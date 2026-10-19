"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

export default function HeroCarousel({ photos, interval = 6000 }: { photos: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (photos.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % photos.length), interval);
    return () => clearInterval(t);
  }, [photos.length, paused, interval]);

  return (
    <div className="frame" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="frame-in">
        {photos.length === 0 ? (
          <div className="ph" style={{ position: "absolute", inset: 0 }}>Hero photos go here</div>
        ) : (
          photos.map((src, n) => (
            <img key={src} src={src} alt="" className={`slide${n === i ? " on" : ""}`} loading={n === 0 ? "eager" : "lazy"} />
          ))
        )}
        {photos.length > 1 && (
          <div className="dots">
            {photos.map((_, n) => (
              <button key={n} aria-label={`Show photo ${n + 1}`} className={n === i ? "on" : ""} onClick={() => setI(n)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}