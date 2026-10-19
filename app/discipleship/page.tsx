import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import Faq from "@/components/Faq";
import EnquiryForm from "@/components/EnquiryForm";
import { discipleship as d, upcoming } from "@/lib/content";
import Photo from "@/components/Photo";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = { title: "Discipleship Program" };

export default function Discipleship() {
  return (
    <>
      <PageHeader eyebrow="Discipleship Program" title="Formed to follow. Equipped to lead." intro={d.intro} />

      <section>
        <Reveal className="w">
          <div className="eyebrow">At a Glance</div><h2>Programme details</h2><div className="rule" />
          <div className="cards" style={{ marginTop: 0 }}>
            {d.facts.map((f) => <div className="card" key={f.label}><div className="eyebrow">{f.label}</div><p style={{ fontSize: 18, color: "var(--ink)" }}>{f.value}</p></div>)}
          </div>
        </Reveal>
      </section>

            <section className="dark">
        <Reveal className="w two">
          <Photo src={d.photo} label="Discipleship photo" className="tall" />
          <div>
            <div className="eyebrow">{d.moment.eyebrow}</div>
            <h2>{d.moment.title}</h2><div className="rule" />
            {d.moment.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Reveal>
      </section>

      <section>
        <Reveal className="w">
          {/* <div className="eyebrow">In Pictures</div>
          <h2>Life in the program</h2><div className="rule" /> */}
          <Gallery photos={d.photos} label="Discipleship" />
        </Reveal>
      </section>

      <section>
        <Reveal className="w two">
          <div>
            <div className="eyebrow">Outcomes</div><h2>What you will walk away with</h2><div className="rule" />
            <ul className="who" style={{ gridTemplateColumns: "1fr" }}>{d.outcomes.map((o) => <li key={o}>{o}</li>)}</ul>
          </div>
          <div>
            <div className="eyebrow">Requirements</div><h2>Before you apply</h2><div className="rule" />
            <ul className="who" style={{ gridTemplateColumns: "1fr" }}>{d.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
        </Reveal>
      </section>

      <section className="dark">
        <Reveal className="w">
          <div className="eyebrow">Get Started</div><h2>{d.joinTitle}</h2><div className="rule" />
          <div className="steps">
            {d.join.map((s, i) => <div key={s.title}><b>{i + 1}</b><h3>{s.title}</h3><p>{s.text}</p></div>)}
          </div>
          <h2 style={{ marginTop: 72 }}>Questions</h2>
          <Faq items={d.faqs} />
        </Reveal>
      </section>

      <section id="register">
        <Reveal className="w">
          <div className="eyebrow">Register</div><h2>Apply to join</h2><div className="rule" />
          <EnquiryForm kind="registration" options={["Discipleship Program", ...upcoming.map((u) => u.title)]} />
          <p style={{ marginTop: 24 }}><Link href="/programmes" style={{ color: "var(--plum2)" }}>See all upcoming programmes →</Link></p>
        </Reveal>
      </section>
    </>
  );
}
