import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import EnquiryForm from "@/components/EnquiryForm";
import FeaturedProgramme from "@/components/FeaturedProgramme";
import { upcoming } from "@/lib/content";

export const metadata: Metadata = { title: "Upcoming Programmes" };

export default function Programmes() {
  return (
    <>
      <PageHeader eyebrow="Upcoming Programmes" title="Join us next" intro="Gatherings, trainings and outreaches you can be part of. Reserve your place below." />

      {upcoming.map((u, i) => (
        <section key={i}>
          <Reveal className="w">
            <FeaturedProgramme p={u} light />
          </Reveal>
        </section>
      ))}
    </>
  );
}