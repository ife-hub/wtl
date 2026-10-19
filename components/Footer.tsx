import Image from "next/image";
import Link from "next/link";
import { nav, site, socials } from "@/lib/content";

export default function Footer() {
  return (
    <footer>
      <div className="w foot">
        <div>
          <Image src="/logo.png" alt="Woman That Leads" width={120} height={61} style={{ height: "auto" }} />
          <p style={{ marginTop: 14, maxWidth: 300 }}>{site.tagline}.</p>
        </div>
        <div>
          <h4>Explore</h4>
          {nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </div>
        <div>
          <h4>Connect</h4>
          {socials.map((s) => <a key={s.label} href={s.href}>{s.label}</a>)}
        </div>
      </div>
      <div className="w copy">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
    </footer>
  );
}
