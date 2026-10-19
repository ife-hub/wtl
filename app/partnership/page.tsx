import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import Faq from "@/components/Faq";
import EnquiryForm from "@/components/EnquiryForm";
import { partnership as p } from "@/lib/content";

export const metadata: Metadata = { title: "Partnership" };

export default function Partnership() {
  return (
    <>
      <header className="page-hero">
        <div className="w phero">
          <div>
            <div className="eyebrow">Partnership</div>
            <h1>Invest in the leaders of tomorrow</h1>
            <p>{p.intro}</p>
            <div className="hero-btns" style={{ marginTop: 28 }}>
              <a className="btn" href="#enquire">Become a Partner</a>
              <a className="btn o" href="#ways">Ways to partner</a>
            </div>
            <p style={{ marginTop: 18, fontSize: 15 }}>Open to individuals, businesses, ministries and institutions.</p>
          </div>
          <div className="frame">
            <div className="frame-in"><Photo src={p.heroImage} label="Partnership photo" /></div>
          </div>
        </div>
      </header>

      <section>
        <Reveal className="w two">
          <div className="stack">
            <div className="eyebrow">An Invitation</div><h2>{p.meansTitle}</h2><div className="rule" />
            <p className="lead">{p.invite}</p>
            <p>{p.notMember}</p>
            {p.means.map((m) => <p key={m}>{m}</p>)}
            <p>{p.notNecessarily}</p>
          </div>
          <div className="quote" style={{ marginTop: 0 }}>{p.quote}</div>
        </Reveal>
      </section>

      <section className="dark">
        <Reveal className="w">
          <div className="eyebrow">Impact</div><h2>{p.whyTitle}</h2><div className="rule" />
          <p style={{ maxWidth: 760 }}>{p.why}</p>
          <p style={{ margin: "14px 0 0" }}>Through partnership, you can contribute towards:</p>
          <div className="cards">
            {p.areas.map((a, i) => (
              <div className="card" key={a.title}><b>{String(i + 1).padStart(2, "0")}</b><h3>{a.title}</h3><p>{a.text}</p></div>
            ))}
          </div>
          <p style={{ marginTop: 32, color: "var(--gold)" }}>{p.investment}</p>
        </Reveal>
      </section>

      <section id="ways">
        <Reveal className="w">
          <div className="eyebrow">Get Involved</div><h2>{p.waysTitle}</h2><div className="rule" />
          <p>{p.waysIntro}</p>
          <div className="cards">
            {p.ways.map((w) => <div className="card" key={w.title}><h3>{w.title}</h3><p>{w.text}</p></div>)}
          </div>
        </Reveal>
      </section>

            <section className="dark">
        <Reveal className="w two">
          <div>
            <div className="eyebrow">Fit</div>
            <h2>{p.whoTitle}</h2><div className="rule" />
            <p>{p.whoIntro}</p>
            <ul className="who" style={{ gridTemplateColumns: "1fr", marginTop: 18 }}>
              {p.who.map((w) => <li key={w}>{w}</li>)}
            </ul>
            <p className="lead" style={{ color: "var(--gold)", marginTop: 28 }}>
              You do not need to be an active member of WTL.
            </p>
            <p>{p.open}</p>
          </div>
          <Photo src={p.fitImage} label="Partner photo" className="tall" />
        </Reveal>
      </section>

      <section>
        <Reveal className="w">
          <div className="eyebrow">Process</div><h2>{p.stepsTitle}</h2><div className="rule" />
          <div className="steps">
            {p.steps.map((s, i) => <div key={s.title}><b>{i + 1}</b><h3>{s.title}</h3><p>{s.text}</p></div>)}
          </div>
          <h2 style={{ marginTop: 72 }}>Questions</h2>
          <Faq items={p.faqs} />
        </Reveal>
      </section>

      <section className="dark" id="enquire">
        <Reveal className="w">
          <div className="eyebrow">Partner With Us</div><h2>Send a partnership enquiry</h2><div className="rule" />
          <EnquiryForm kind="partnership" options={[...p.ways.map((w) => w.title), "Not sure yet"]} />
        </Reveal>
      </section>
    </>
  );
}