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

    // initialize global counter/map ONCE per page load
    if (!(window as any).__eqCounter) {
      (window as any).__eqCounter = 0;
      (window as any).__eqMap = {};
    }

    const labelRegex = /\\label\{([^}]+)\}/;

    function processNode(node: Node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        if (skipTags.has(el.tagName)) return;
        
        // For leaf elements (P, SPAN, etc.), try to process all text content together
        // This handles cases where React splits text across multiple nodes
        const hasOnlyTextAndInlineChildren = Array.from(el.childNodes).every(child =>
          child.nodeType === Node.TEXT_NODE || 
          child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName === 'BR'
        );
        
        if (hasOnlyTextAndInlineChildren && el.textContent?.includes("$$")) {
          // Collect all text from this element
          let fullText = "";
          const textNodeArray: Array<{ node: Node; start: number; end: number }> = [];
          
          for (const child of Array.from(el.childNodes)) {
            if (child.nodeType === Node.TEXT_NODE) {
              const text = child.textContent || "";
              textNodeArray.push({
                node: child,
                start: fullText.length,
                end: fullText.length + text.length
              });
              fullText += text;
            }
          }
          
          console.log(`[ClientKatex] Element <${el.tagName}> fullText (${fullText.length} chars): ${fullText.substring(0, 100)}`);
          
          displayRegex.lastIndex = 0;
          inlineRegex.lastIndex = 0;

          let html = escapeHtml(fullText);
          let hasMatch = false;
          
          // Process display math
          html = html.replace(displayRegex, (match, content) => {
            hasMatch = true;
            console.log(`[ClientKatex] Found display math: ${match.substring(0, 50)}...`);
            try {
              // First, reconstruct braces that React may have split
              content = content.replace(/\\label(\d+)/g, '\\label{$1}');
              console.log(`[ClientKatex] After brace reconstruction: ${content.substring(0, 100)}...`);
              
              const m = content.match(labelRegex);
              let label = null;
              if (m) {
                label = m[1];
                content = content.replace(labelRegex, "").trim();
                console.log(`[ClientKatex] Found label: "${label}"`);
              }

              const rendered = katex.renderToString(content, { displayMode: true, throwOnError: false });

              if (label) {
                const counter = ++(window as any).__eqCounter;
                (window as any).__eqMap[label] = counter;
                console.log(`[ClientKatex] Assigned label "${label}" → ${counter}`);
                try {
                  window.dispatchEvent(new CustomEvent('eq-map-updated', { detail: { label, counter } }));
                } catch (e) {
                  /* ignore */
                }
                return `<span class="katex-eq" id="eq:${escapeHtml(label)}">${rendered}<span class="eqnum">(${counter})</span></span>`;
              }
              return rendered;
            } catch (e) {
              console.error(`[ClientKatex] Error rendering:`, e);
              return `<span class="katex-error">${escapeHtml(String(e))}</span>`;
            }
          });
          
          // Process inline math
          html = html.replace(inlineRegex, (match, content) => {
            hasMatch = true;
            try {
              return katex.renderToString(content, { displayMode: false, throwOnError: false });
            } catch (e) {
              return `<span class="katex-error">${escapeHtml(String(e))}</span>`;
            }
          });

          // If math was processed, replace element's innerHTML
          if (hasMatch && html !== escapeHtml(fullText)) {
            console.log(`[ClientKatex] Replacing innerHTML`);
            el.innerHTML = html;
            return; // Don't recurse
          }
        }
        
        // Recurse into child elements
        for (const child of Array.from(el.childNodes)) {
          if (child.nodeType === Node.ELEMENT_NODE) {
            processNode(child);
          }
        }
      }
    }

    // Process body contents (will handle content inserted later as well if you re-run)
    console.log(`[ClientKatex] Starting DOM scan at body`);
    const body = document.body;
    for (const child of Array.from(body.childNodes)) {
      processNode(child);
    }
    console.log(`[ClientKatex] DOM scan complete. Final map:`, (window as any).__eqMap);
    
    // Targeted pass: process paragraph-like elements to handle split text nodes robustly
    function processParagraphs() {
      const tags = ['p', 'li', 'figcaption', 'blockquote', 'div'];
      for (const tag of tags) {
        for (const el of Array.from(document.getElementsByTagName(tag))) {
          if (skipTags.has(el.tagName)) continue;
          if (!el.textContent || !el.textContent.includes('$$')) continue;
          // Only process simple paragraphs (no complex children)
          const simple = Array.from(el.childNodes).every(c => c.nodeType === Node.TEXT_NODE || (c.nodeType === Node.ELEMENT_NODE && (c as Element).tagName === 'BR'));
          if (!simple) continue;

          const fullText = el.textContent || '';
          displayRegex.lastIndex = 0;
          inlineRegex.lastIndex = 0;
          let html = escapeHtml(fullText);
          let hasMatch = false;

          html = html.replace(displayRegex, (match, content) => {
            hasMatch = true;
            try {
              content = content.replace(/\\label(\d+)/g, '\\label{$1}');
              const m = content.match(labelRegex);
              let label = null;
              if (m) {
                label = m[1];
                content = content.replace(labelRegex, '').trim();
              }
              const rendered = katex.renderToString(content, { displayMode: true, throwOnError: false });
              if (label) {
                const existing = (window as any).__eqMap && (window as any).__eqMap[label];
                let counter: number;
                if (existing !== undefined) {
                  counter = existing;
                } else {
                  counter = ++(window as any).__eqCounter;
                  (window as any).__eqMap[label] = counter;
                  try { window.dispatchEvent(new CustomEvent('eq-map-updated', { detail: { label, counter } })); } catch(e){}
                }
                return `<span class="katex-eq" id="eq:${escapeHtml(label)}">${rendered}<span class="eqnum">(${counter})</span></span>`;
              }
              return rendered;
            } catch (e) {
              return `<span class="katex-error">${escapeHtml(String(e))}</span>`;
            }
          });

          html = html.replace(inlineRegex, (match, content) => {
            hasMatch = true;
            try { return katex.renderToString(content, { displayMode: false, throwOnError: false }); } catch(e) { return `<span class="katex-error">${escapeHtml(String(e))}</span>`; }
          });

          if (hasMatch) {
            el.innerHTML = html;
          }
        }
      }
    }

    // Run targeted pass now
    processParagraphs();
    try {
      window.dispatchEvent(new CustomEvent('eq-map-ready', { detail: (window as any).__eqMap }));
    } catch (e) {
      /* ignore */
    }

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
