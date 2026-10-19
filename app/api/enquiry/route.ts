import { NextResponse } from "next/server";

const KINDS = ["partnership", "registration", "contact"];
const clip = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    console.error("[enquiry] invalid JSON body");
    return NextResponse.json({ ok: false, error: "bad body" }, { status: 400 });
  }

  // Honeypot: bots fill this field. Pretend success and drop it.
  if (body.website) {
    console.log("[enquiry] honeypot triggered, dropped");
    return NextResponse.json({ ok: true });
  }

  const payload = {
    kind: clip(body.kind, 20),
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    phone: clip(body.phone, 40),
    organization: clip(body.organization, 200),
    location: clip(body.location, 200),
    choice: clip(body.choice, 200),
    message: clip(body.message, 4000),
  };

  if (
    !KINDS.includes(payload.kind) ||
    !payload.name ||
    !/^\S+@\S+\.\S+$/.test(payload.email) ||
    !payload.choice
  ) {
    console.error("[enquiry] validation failed:", payload);
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  try {
    const url = process.env.APPS_SCRIPT_URL;
    console.log(
      "[enquiry] url set:", !!url,
      "| secret set:", !!process.env.APPS_SCRIPT_SECRET,
      "| kind:", payload.kind
    );
    if (!url) throw new Error("APPS_SCRIPT_URL is not set");

    const r = await fetch(url, {
      method: "POST",
      // text/plain avoids a CORS preflight; Apps Script reads the raw body anyway
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret: process.env.APPS_SCRIPT_SECRET, ...payload }),
      redirect: "follow",
    });

    const text = await r.text();
    console.log("[enquiry] apps script status:", r.status, "| body:", text.slice(0, 500));

    let result: { ok?: boolean; error?: string };
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Non-JSON response (likely a Google login/error page)");
    }
    if (!result.ok) throw new Error(result.error || "apps script returned ok:false");

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[enquiry] forward failed:", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 502 });
  }
}