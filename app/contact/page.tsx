import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import EnquiryForm from "@/components/EnquiryForm";
import { site, socials, contactTopics } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <PageHeader eyebrow="How to Reach Us" title="Let’s stay connected" intro="Follow us, send a message, or reach out about partnership." />

      <section>
        <Reveal className="w two" >
          <div className="stack">
            <div className="eyebrow">Get in Touch</div><h2>We would love to hear from you</h2><div className="rule" />
            <p><strong style={{ fontWeight: 500 }}>Email:</strong> <a href={`mailto:${site.email}`}>{site.email}</a></p>
            <p><strong style={{ fontWeight: 500 }}>WhatsApp:</strong> <a href={site.whatsapp}>{site.phone}</a></p>
            <p><strong style={{ fontWeight: 500 }}>Location:</strong> {site.location}</p>
            <p>{site.responseTime}</p>
            <h3 style={{ fontSize: 30, marginTop: 28 }}>Follow along</h3>
            <div className="soc light">{socials.map((s) => <a key={s.label} href={s.href}>{s.label}<small>{s.handle}</small></a>)}</div>
          </div>
          <div>
            <EnquiryForm kind="contact" options={contactTopics} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
