import Link from "next/link";

type L = { label: string; href: string };
export default function Cta({ title, text, primary, secondary }: { title: string; text: string; primary: L; secondary?: L }) {
  return (
    <section className="dark" style={{ padding: "72px 0", textAlign: "center" }}>
      <div className="w">
        <h2 style={{ marginBottom: 14 }}>{title}</h2>
        <p style={{ maxWidth: 600, margin: "0 auto 28px" }}>{text}</p>
        <div className="hero-btns" style={{ justifyContent: "center" }}>
          <Link className="btn" href={primary.href}>{primary.label}</Link>
          {secondary && <Link className="btn o" href={secondary.href}>{secondary.label}</Link>}
        </div>
      </div>
    </section>
  );
}
