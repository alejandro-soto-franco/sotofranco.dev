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

function unescapeHtml(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

export default function ClientKatex() {
  useEffect(() => {
    const skipTags = new Set(["CODE", "PRE", "SCRIPT", "STYLE", "TEXTAREA", "INPUT"]);

    const displayRegex = /\$\$([\s\S]+?)\$\$/g;
    const inlineRegex = /\$([^\$\n]+?)\$/g;

    // initialize global counter/map ONCE per page load
    if (!(window as any).__eqCounter) {
      (window as any).__eqCounter = 0;
      (window as any).__eqMap = {};
    }

    const labelRegex = /\\label\{([^}]+)\}/;

    function renderTextWithMath(text: string): { html: string; hasMatch: boolean } {
      // Reset regex state
      displayRegex.lastIndex = 0;
      inlineRegex.lastIndex = 0;

      let html = escapeHtml(text);
      let hasMatch = false;

      // Process display math
      html = html.replace(displayRegex, (match, content) => {
        hasMatch = true;
        try {
          content = unescapeHtml(content);
          content = content.replace(/\\label(\d+)/g, '\\label{$1}');
          const m = content.match(labelRegex);
          let label: string | null = null;
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

      // Process inline math
      html = html.replace(inlineRegex, (match, content) => {
        hasMatch = true;
        try {
          return katex.renderToString(unescapeHtml(content), { displayMode: false, throwOnError: false });
        } catch (e) {
          return `<span class="katex-error">${escapeHtml(String(e))}</span>`;
        }
      });

      return { html, hasMatch };
    }

    function replaceTextNode(node: Text) {
      const text = node.textContent || '';
      if (!text.includes('$')) return; // quick bail-out
      const { html, hasMatch } = renderTextWithMath(text);
      if (!hasMatch) return;
      const wrapper = document.createElement('span');
      wrapper.innerHTML = html;
      const frag = document.createDocumentFragment();
      while (wrapper.firstChild) frag.appendChild(wrapper.firstChild);
      node.parentNode?.replaceChild(frag, node);
    }

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
        
        if (hasOnlyTextAndInlineChildren && el.textContent && el.textContent.includes("$")) {
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
          
          const { html, hasMatch } = renderTextWithMath(fullText);
          if (hasMatch && html !== escapeHtml(fullText)) {
            console.log(`[ClientKatex] Replacing innerHTML`);
            el.innerHTML = html;
            return; // Don't recurse
          }
        }
        
        // Process text nodes inline within complex elements (mixed children)
        for (const child of Array.from(el.childNodes)) {
          if (child.nodeType === Node.TEXT_NODE) {
            replaceTextNode(child as Text);
          } else if (child.nodeType === Node.ELEMENT_NODE) {
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
      const tags = ['p', 'li', 'figcaption', 'blockquote', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      for (const tag of tags) {
        for (const el of Array.from(document.getElementsByTagName(tag))) {
          if (skipTags.has(el.tagName)) continue;
          if (!el.textContent || !el.textContent.includes('$')) continue;
          // Only process simple paragraphs (no complex children)
          const simple = Array.from(el.childNodes).every(c => c.nodeType === Node.TEXT_NODE || (c.nodeType === Node.ELEMENT_NODE && (c as Element).tagName === 'BR'));
          if (!simple) {
            // Mixed content paragraph: replace text nodes that contain math
            for (const child of Array.from(el.childNodes)) {
              if (child.nodeType === Node.TEXT_NODE) replaceTextNode(child as Text);
            }
            continue;
          }

          const fullText = el.textContent || '';
          const { html, hasMatch } = renderTextWithMath(fullText);
          if (hasMatch) el.innerHTML = html;
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
