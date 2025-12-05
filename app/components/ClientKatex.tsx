"use client";
import { useEffect } from "react";
import katex from "katex";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function ClientKatex() {
  useEffect(() => {
    const skipTags = new Set(["CODE", "PRE", "SCRIPT", "STYLE", "TEXTAREA", "INPUT"]);

    const displayRegex = /\$\$([\s\S]+?)\$\$/g;
    const inlineRegex = /\$(?!\s)([^\$\n]+?)(?!\s)\$/g;

    function processNode(node: Node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        if (!text) return;
        if (!displayRegex.test(text) && !inlineRegex.test(text)) return;

        // Reset regex state
        displayRegex.lastIndex = 0;
        inlineRegex.lastIndex = 0;

        // Escape html, then replace math with rendered katex HTML
        let html = escapeHtml(text)
          .replace(displayRegex, (_, content) => {
            try {
              return katex.renderToString(content, { displayMode: true, throwOnError: false });
            } catch (e) {
              return `<span class="katex-error">${escapeHtml(String(e))}</span>`;
            }
          })
          .replace(inlineRegex, (_, content) => {
            try {
              return katex.renderToString(content, { displayMode: false, throwOnError: false });
            } catch (e) {
              return `<span class="katex-error">${escapeHtml(String(e))}</span>`;
            }
          });

        const span = document.createElement("span");
        span.innerHTML = html;
        node.parentNode?.replaceChild(span, node);
        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        if (skipTags.has(el.tagName)) return;
        for (let child = el.firstChild; child; child = child.nextSibling) {
          processNode(child);
        }
      }
    }

    // Process body contents (will handle content inserted later as well if you re-run)
    processNode(document.body);

    // Optional: observe future mutations (e.g., client side navigation)
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of Array.from(m.addedNodes)) {
          processNode(node);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
