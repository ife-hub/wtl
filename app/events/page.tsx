import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import EventCarousel from "@/components/EventCarousel"; 
import Cta from "@/components/Cta";
import { events } from "@/lib/content";
import HeroCarousel from "@/components/HeroCarousel";

export const metadata: Metadata = { title: "Past Events" };

export default function Events() {
  return (
    <>
      <PageHeader eyebrow="Past Events" title="Moments of impact" intro="A look back at gatherings where women encountered God, discovered purpose and were equipped to lead." />
      <div className="w">
        {events.map((e, i) => (
          <Reveal key={i} className="evt">
            <div className="eyebrow">Event {String(i + 1).padStart(2, "0")}</div>
            <h2>{e.title}</h2>
            <div className="meta"><span>{e.date}</span><span>{e.venue}</span><span>{e.attendance}</span></div>
            <p className="lead"><strong style={{ fontWeight: 500 }}>Theme:</strong> {e.theme}</p>
            <p style={{ marginTop: 14, maxWidth: 780 }}>{e.summary}</p>
            <div className="tags" style={{ marginTop: 18 }}>{e.highlights.map((h) => <span key={h}>{h}</span>)}</div>
            {e.testimonies.map((t) => (
              <div className="tq" key={t.name}>“{t.quote}”<small>{t.name}</small></div>
            ))}
            <EventCarousel photos={e.photos} label={e.title} />      
          </Reveal>
        ))}
      </div>
      <Cta title="Be there at the next one" text="See what is coming up and reserve your place." primary={{ label: "Upcoming Programmes", href: "/programmes" }} />
    </>
  );
}
