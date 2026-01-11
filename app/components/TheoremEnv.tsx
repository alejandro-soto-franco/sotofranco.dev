"use client";
import { useEffect, useState } from "react";

type TheoremType = "theorem" | "definition" | "lemma" | "corollary" | "remark";

interface TheoremEnvProps {
  type: TheoremType;
  label?: string;
  title?: string;
  children: React.ReactNode;
}

// Global counters for each theorem type
declare global {
  interface Window {
    __theoremCounters?: Record<TheoremType, number>;
    __theoremMap?: Record<string, { type: TheoremType; number: number }>;
  }
}

export default function TheoremEnv({ type, label, title, children }: TheoremEnvProps) {
  const [number, setNumber] = useState<number | null>(null);

  useEffect(() => {
    // Initialize global counters
    if (!window.__theoremCounters) {
      window.__theoremCounters = {
        theorem: 0,
        definition: 0,
        lemma: 0,
        corollary: 0,
        remark: 0
      };
    }
    if (!window.__theoremMap) {
      window.__theoremMap = {};
    }

    let currentNumber: number;
    
    if (label) {
      // Check if this label already has a number
      const existing = window.__theoremMap[label];
      if (existing) {
        currentNumber = existing.number;
      } else {
        // Assign new number
        currentNumber = ++window.__theoremCounters[type];
        window.__theoremMap[label] = { type, number: currentNumber };
      }
    } else {
      // No label, just increment counter
      currentNumber = ++window.__theoremCounters[type];
    }

    setNumber(currentNumber);
  }, [type, label]);

  const typeDisplayNames: Record<TheoremType, string> = {
    theorem: "Theorem",
    definition: "Definition", 
    lemma: "Lemma",
    corollary: "Corollary",
    remark: "Remark"
  };

  const headerText = title 
    ? `${typeDisplayNames[type]} ${number} (${title}).`
    : `${typeDisplayNames[type]} ${number}.`;

  return (
    <div className={`theorem-env ${type}`} id={label ? `thm:${label}` : undefined}>
      <div className="theorem-header">
        {headerText}
      </div>
      <div className="theorem-body">
        {children}
      </div>
    </div>
  );
}