"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  const active = (h: string) => path === h || path.startsWith(h + "/");

  return (
    <nav>
      <div className="w">
        <Link href="/"><Image src="/logo.png" alt="Woman That Leads" width={86} height={44} priority /></Link>
        <ul>
          {nav.map((n) => (
            <li key={n.href}><Link href={n.href} className={active(n.href) ? "active" : ""}>{n.label}</Link></li>
          ))}
        </ul>
        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "×" : "☰"}</button>
      </div>
      {open && (
        <div className="mnav">
          {nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </div>
      )}
    </nav>
  );
}
