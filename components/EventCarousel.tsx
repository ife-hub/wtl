"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";

export default function EventCarousel({
  photos,
  label,
  interval = 5000,
}: {
  photos: string[];
  label: string;
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const n = photos.length;

  // Only autoplay while on screen, so every event isn't animating at once
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (n < 2 || hover || !visible || open !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), interval);
    return () => clearInterval(t);
  }, [n, hover, visible, open, interval]);

  // Lightbox keyboard support
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((x) => (x === null ? x : (x + 1) % n));
      if (e.key === "ArrowLeft") setOpen((x) => (x === null ? x : (x - 1 + n) % n));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, n]);

  if (n === 0) {
    return (
      <div className="ecar">
        <div className="frame"><div className="frame-in"><div className="ph" style={{ position: "absolute", inset: 0 }}>{label} photos</div></div></div>
      </div>
    );
  }

  const step = (d: number) => setI((x) => (x + d + n) % n);
  const go = (d: number) => setOpen((x) => (x === null ? x : (x + d + n) % n));

  return (
    <div className="ecar" ref={root}>
      <div className="frame" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className="frame-in">
          {photos.map((src, k) => (
            <img key={src} src={src} alt={`${label} photo ${k + 1}`} className={`slide${k === i ? " on" : ""}`} loading={k === 0 ? "eager" : "lazy"} />
          ))}

          <button type="button" className="ecar-open" aria-label={`Enlarge ${label} photo ${i + 1}`} onClick={() => setOpen(i)} />

          {n > 1 && (
            <>
              <button type="button" className="ecar-btn prev" aria-label="Previous photo" onClick={() => step(-1)}>‹</button>
              <button type="button" className="ecar-btn next" aria-label="Next photo" onClick={() => step(1)}>›</button>
              <div className="dots">
                {photos.map((_, k) => (
                  <button key={k} type="button" aria-label={`Show photo ${k + 1}`} className={k === i ? "on" : ""} onClick={() => setI(k)} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {open !== null && (
        <div className="lb" onClick={() => setOpen(null)}>
          <img src={photos[open]} alt={`${label} photo ${open + 1}`} onClick={(e) => e.stopPropagation()} />
          <button style={{ top: 20, right: 20 }} onClick={() => setOpen(null)} aria-label="Close">×</button>
          {n > 1 && (
            <>
              <button style={{ left: 20 }} onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous">‹</button>
              <button style={{ right: 20 }} onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next">›</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}