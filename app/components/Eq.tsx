"use client";
import { useEffect, useState } from "react";

export default function Eq({ label }: { label: string }) {
  const [num, setNum] = useState<number | null>(null);

  useEffect(() => {
    const trySet = () => {
      const eqMap = (window as any).__eqMap || {};
      const number = eqMap[label];
      if (number !== undefined) setNum(number);
    };

    trySet();

    const onUpdate = (e: any) => {
      trySet();
    };
    const onReady = (e: any) => {
      trySet();
    };

    window.addEventListener('eq-map-updated', onUpdate);
    window.addEventListener('eq-map-ready', onReady);
    return () => {
      window.removeEventListener('eq-map-updated', onUpdate);
      window.removeEventListener('eq-map-ready', onReady);
    };
  }, [label]);

  if (num === null) {
    return <span className="eq-ref-loading">[eq:{label}]</span>;
  }

  return <a href={`#eq:${label}`}>({num})</a>;
}
