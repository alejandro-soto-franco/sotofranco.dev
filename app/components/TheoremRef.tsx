"use client";
import { useEffect, useState } from "react";

export default function TheoremRef({ label }: { label: string }) {
  const [ref, setRef] = useState<{ type: string; number: number } | null>(null);

  useEffect(() => {
    const trySet = () => {
      const theoremMap = window.__theoremMap || {};
      const theorem = theoremMap[label];
      if (theorem) setRef(theorem);
    };

    trySet();

    // Set up a polling interval to check for theorem updates
    const interval = setInterval(trySet, 100);
    
    return () => clearInterval(interval);
  }, [label]);

  if (ref === null) {
    return <span className="theorem-ref-loading">[{label}]</span>;
  }

  const typeNames: Record<string, string> = {
    theorem: "Theorem",
    definition: "Definition",
    lemma: "Lemma", 
    corollary: "Corollary",
    remark: "Remark"
  };

  return <a href={`#thm:${label}`}>{typeNames[ref.type]} {ref.number}</a>;
}