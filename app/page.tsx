/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import HeroCarousel from "@/components/HeroCarousel";
import { heroPhotos } from "@/lib/hero";
import { about, partnership, discipleship, upcoming } from "@/lib/content";

export default function Home() {
  const next = upcoming[0];
  return (
    <>
      <header className="hero" id="top">
        <div className="w hero-grid">
          <div className="hero-text">
            <Image className="hero-logo" src="/logo.png" alt="Woman That Leads logo" width={300} height={153} priority />
            <h1>Raising godly, equipped,<br /><em>purpose-driven</em> leaders</h1>
            <p>Discipling and forming women to know God, understand their identity, walk in their calling and thrive in their God-given assignments.</p>
            <div className="hero-btns">
              <Link className="btn" href="/partnership">Become a Partner</Link>
              <Link className="btn o" href="/programmes">Upcoming Programmes</Link>
            </div>
          </div>
          <HeroCarousel photos={heroPhotos} />
        </div>
      </header>

      <section>
        <Reveal className="w two">
          <div>
            <div className="eyebrow">Who We Are</div>
            <h2>A community of women becoming leaders</h2><div className="rule" />
            <p>{about.teaser}</p>
            <ul className="who">{about.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <p style={{ marginTop: 28 }}><Link className="btn" href="/about">Our story</Link></p>
          </div>
          <Photo src={about.photo} label="Photo placeholder" className="tall" />
        </Reveal>
      </section>

      <section className="dark">
        <Reveal className="w">
          <div className="eyebrow">Partnership</div>
          <h2>Invest in the leaders of tomorrow</h2><div className="rule" />
          <p style={{ maxWidth: 760 }}>{partnership.invite}</p>
          <div className="cards">
            {partnership.areas.slice(0, 3).map((a, i) => (
              <div className="card" key={a.title}>
                <b>{String(i + 1).padStart(2, "0")}</b><h3>{a.title}</h3><p>{a.text}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 36 }}><Link className="btn" href="/partnership">Explore partnership</Link></p>
        </Reveal>
      </section>

      <section>
        <Reveal className="w">
          <div className="eyebrow">Discipleship Program</div>
          <h2>Formed to follow. Equipped to lead.</h2><div className="rule" />
          <p style={{ maxWidth: 700 }}>{discipleship.intro}</p>
          <div className="steps">
            {discipleship.stages.map((s) => (<div key={s.n}><b>{s.n}</b><h3>{s.title}</h3><p>{s.summary}</p></div>))}
          </div>
          <p style={{ marginTop: 36 }}><Link className="btn" href="/discipleship">See the program</Link></p>
        </Reveal>
      </section>

      <section className="dark">
        <Reveal className="w">
          <div className="eyebrow">{upcoming.length === 1 ? "Next Programme" : "Upcoming Programmes"}</div>
          <h2>Join us next</h2><div className="rule" />
          {upcoming.length === 1 ? (
            <div className="feature">
              <div className="poster">
                {next.poster ? <img src={next.poster} alt={`${next.title} poster`} /> : <div className="ph tall">Poster</div>}
              </div>
              <div>
                <span className="tag">Save the date</span>
                <h3>{next.title}</h3>
                {next.subtitle && <div className="sub">{next.subtitle}</div>}
                {next.scripture && <div className="scr">{next.scripture}</div>}
                <ul className="fmeta">
                  <li><b>Date</b><span>{next.day} {next.month} {next.year}</span></li>
                  <li><b>Time</b><span>{next.time}</span></li>
                  <li><b>Venue</b><span>{next.venue}</span></li>
                  {next.convener && <li><b>Convener</b><span>{next.convener}</span></li>}
                  {next.guest && <li><b>Guest</b><span>{next.guest}</span></li>}
                </ul>
                <p style={{ maxWidth: 560 }}>{next.desc}</p>
                                <div className="hero-btns" style={{ marginTop: 26 }}>
                  {next.registerUrl ? (
                    <a className="btn" href={next.registerUrl} target="_blank" rel="noopener noreferrer">Register Now</a>
                  ) : (
                    <Link className="btn" href="/programmes#register">Register</Link>
                  )}
                </div>
                {next.contact && (
                  <p style={{ marginTop: 18, fontSize: 15, color: "#e9d9e3" }}>
                    For more enquiries, contact: <a href={`tel:${next.contact}`} style={{ color: "var(--gold)" }}>{next.contact}</a>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <>
              {upcoming.map((u, i) => (
                <div className="up" key={i} style={{ color: "var(--ink)" }}>
                  <div className="d"><b>{u.day}</b>{u.month}</div>
                  <div><h3>{u.title}</h3><p>{u.time} · {u.venue}</p></div>
                  <Link className="btn" href={u.registerUrl || "/programmes#register"}>Register</Link>
                </div>
              ))}
              <p style={{ marginTop: 36 }}><Link className="btn o" style={{ marginLeft: 0 }} href="/programmes">All programmes</Link></p>
            </>
          )}
        </Reveal>
      </section>
    </>
  );
}