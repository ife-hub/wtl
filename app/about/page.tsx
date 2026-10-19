import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import PageHeader from "@/components/PageHeader";
import Cta from "@/components/Cta";
import { about } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <PageHeader eyebrow="Who We Are" title="Women who know God, know themselves and lead" intro={about.teaser} />

      <section>
        <Reveal className="w two">
          <div className="stack">
            <div className="eyebrow">Our Story</div>
            <h2>How it began</h2><div className="rule" />
            {about.story.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <Photo src={about.photo} label="Story photo" className="tall" />
        </Reveal>
      </section>

      <section className="dark">
        <Reveal className="w">
          <div className="cards" style={{ marginTop: 0 }}>
            <div className="card"><div className="eyebrow">Mission</div><p style={{ fontSize: 18, color: "var(--ink)" }}>{about.mission}</p></div>
            <div className="card"><div className="eyebrow">Vision</div><p style={{ fontSize: 18, color: "var(--ink)" }}>{about.vision}</p></div>
          </div>
          <div className="stats">
            {about.stats.map((s) => <div className="stat" key={s.label}><b>{s.n}</b>{s.label}</div>)}
          </div>
        </Reveal>
      </section>

      <section>
        <Reveal className="w">
          <div className="eyebrow">What We Value</div><h2>Our core values</h2><div className="rule" />
          <div className="cards">
            {about.values.map((v, i) => (
              <div className="card" key={v.title}><b>{String(i + 1).padStart(2, "0")}</b><h3>{v.title}</h3><p>{v.text}</p></div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="dark">
        <Reveal className="w two" >
          <div>
            <div className="eyebrow">What We Believe</div><h2>Our foundation</h2><div className="rule" />
            <ul className="who" style={{ gridTemplateColumns: "1fr" }}>{about.beliefs.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
          <div>
            <div className="eyebrow">Our Journey</div><h2>Milestones</h2>
            <div className="tl">
              {about.milestones.map((m) => (
                <div key={m.title}><b>{m.year}</b><h3 style={{ fontSize: 24 }}>{m.title}</h3><p>{m.text}</p></div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
            <section>
        <Reveal className="w two">
          <Photo src={about.photo2} label="Community photo" className="tall" />
          <div className="stack">
            <div className="eyebrow">{about.moment.eyebrow}</div>
            <h2>{about.moment.title}</h2><div className="rule" />
            {about.moment.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Reveal>
      </section>
      <Cta title="Be part of what God is doing" text="Join the Discipleship Program or partner with us to raise the next generation of women leaders." primary={{ label: "Join the Program", href: "/discipleship" }} secondary={{ label: "Become a Partner", href: "/partnership" }} />
    </>
  );
}
