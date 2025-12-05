"use client";
import { useEffect, useRef } from "react";
import katex from "katex";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function MathBlock({ tex, display = true }: { tex: string; display?: boolean }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const labelRegex = /\\label\{([^}]+)\}/;
    // ensure globals
    if (!(window as any).__eqCounter) {
      (window as any).__eqCounter = 0;
      (window as any).__eqMap = {};
    }

    let content = tex;
    let label: string | null = null;
    const m = content.match(labelRegex);
    if (m) {
      label = m[1];
      content = content.replace(labelRegex, "").trim();
      const existing = (window as any).__eqMap && (window as any).__eqMap[label];
      let counter: number;
      if (existing !== undefined) {
        counter = existing;
      } else {
        counter = ++(window as any).__eqCounter;
        (window as any).__eqMap[label] = counter;
        try { window.dispatchEvent(new CustomEvent('eq-map-updated', { detail: { label, counter } })); } catch(e){}
      }
    }

    try {
      const html = katex.renderToString(content, { displayMode: display, throwOnError: false });
      if (ref.current) {
        if (label) {
          ref.current.innerHTML = `<span class="katex-eq" id="eq:${escapeHtml(label)}">${html}<span class="eqnum">(${(window as any).__eqMap[label]})</span></span>`;
        } else {
          ref.current.innerHTML = html;
        }
      }
    } catch (e) {
      if (ref.current) ref.current.innerHTML = `<span class="katex-error">${escapeHtml(String(e))}</span>`;
    }
  }, [tex, display]);

  return <span ref={ref} />;
}
