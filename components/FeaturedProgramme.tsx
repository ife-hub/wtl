/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { upcoming } from "@/lib/content";

type Programme = (typeof upcoming)[number];

export default function FeaturedProgramme({
  p,
  light = false,
}: {
  p: Programme;
  light?: boolean;
}) {
  return (
    <div className={light ? "feature light" : "feature"}>
      <div className="poster">
        {p.poster ? (
          <img src={p.poster} alt={`${p.title} poster`} />
        ) : (
          <div className="ph tall">Poster</div>
        )}
      </div>
      <div>
        <span className="tag">Save the date</span>
        <h3 style={light ? { color: "var(--ink)" } : undefined}>{p.title}</h3>
        {p.subtitle && (
          <div className="sub" style={light ? { color: "#9a7430" } : undefined}>
            {p.subtitle}
          </div>
        )}
        {p.scripture && (
          <div
            className="scr"
            style={light ? { color: "#5a2147", opacity: 1 } : undefined}
          >
            {p.scripture}
          </div>
        )}
        <ul className="fmeta">
          <li><b>Date</b><span>{p.day} {p.month} {p.year}</span></li>
          <li><b>Time</b><span>{p.time}</span></li>
          <li><b>Venue</b><span>{p.venue}</span></li>
          {p.convener && <li><b>Convener</b><span>{p.convener}</span></li>}
          {p.guest && <li><b>Guest</b><span>{p.guest}</span></li>}
        </ul>
        <p style={{ maxWidth: 560 }}>{p.desc}</p>
        <div className="hero-btns" style={{ marginTop: 26 }}>
          {p.registerUrl ? (
            <a
              className="btn"
              href={p.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </a>
          ) : (
            <Link className="btn" href="#register">Register</Link>
          )}
        </div>
        {p.contact && (
          <p
            style={{
              marginTop: 18,
              fontSize: 15,
              color: light ? "var(--ink)" : "#e9d9e3",
            }}
          >
            For more enquiries, contact:{" "}
            <a
              href={`tel:${p.contact}`}
              style={{
                color: light ? "inherit" : "var(--gold)",
                textDecoration: light ? "underline" : "none",
              }}
            >
              {p.contact}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}