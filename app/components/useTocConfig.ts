import { useEffect, useState } from 'react';

interface TocConfig {
  position: 'left' | 'right';
  mobileBreakpoint: number;
  headingSelector: string;
  containerSelector: string;
  showNumbers: boolean;
  collapsible: boolean;
  excludeMainTitle: boolean;
}

export const defaultTocConfig: TocConfig = {
  position: 'right',
  mobileBreakpoint: 1024,
  headingSelector: 'h1, h2, h3, h4, h5, h6',
  containerSelector: 'main',
  showNumbers: true,
  collapsible: false,
  excludeMainTitle: true,
};

export function useTocConfig(overrides: Partial<TocConfig> = {}): TocConfig {
  return { ...defaultTocConfig, ...overrides };
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
  number?: string;
}