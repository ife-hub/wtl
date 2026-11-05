"use client";
import { useState } from "react";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: ignore */
    }
  }

  return (
    <button type="button" className="copy-btn" onClick={copy} aria-label={`Copy account number ${value}`}>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}