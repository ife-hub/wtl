import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import PageHeader from "@/components/PageHeader";
import Cta from "@/components/Cta";
import { people } from "@/lib/content";

export const metadata: Metadata = { title: "The People of WTL" };

export default function People() {
  const [lead, ...team] = people;
  return (
    <>
      <PageHeader eyebrow="The People of WTL" title="The women behind the vision" intro="Meet the leaders and team serving women through WTL." />

      <section>
        <Reveal className="w feat">
          <div className="ph tall" style={{ padding: 0, overflow: "hidden" }}><Photo src={lead.photo} label="Leader photo" className="tall" /></div>
          <div className="stack">
            <div className="eyebrow">Leadership</div>
            <h2>{lead.name}</h2><div className="meta" style={{ margin: 0 }}><span>{lead.role}</span></div><div className="rule" />
            <p className="lead">{lead.bio}</p>
          </div>
        </Reveal>
      </section>

      <section className="dark">
        <Reveal className="w">
          <div className="eyebrow">The Team</div><h2>Serving together</h2><div className="rule" />
          <div className="ppl">
            {team.map((p, i) => (
              <div key={i}><Photo src={p.photo} label="Photo" /><h3>{p.name}</h3><div className="meta" style={{ justifyContent: "center", margin: "4px 0 10px" }}><span>{p.role}</span></div><p style={{ color: "#e9d9e3" }}>{p.bio}</p></div>
            ))}
          </div>
        </Reveal>
      </section>

      <Cta title="Serve with us" text="Want to use your gifts to help raise women leaders? We would love to hear from you." primary={{ label: "Get in touch", href: "/contact" }} />
    </>
  );
}
