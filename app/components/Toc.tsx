'use client';

import dynamic from 'next/dynamic';

// Props interface for the wrapper
interface TocWrapperProps {
  position?: 'left' | 'right';
  showNumbers?: boolean;
  collapsible?: boolean;
  excludeMainTitle?: boolean;
  className?: string;
}

const TableOfContents = dynamic(() => import('./TableOfContents'), {
  ssr: false,
  loading: () => null, // No loading spinner needed for TOC
});

// Simple TOC (like Wikipedia style)
export function SimpleToc({ position = 'right', className }: Pick<TocWrapperProps, 'position' | 'className'>) {
  return (
    <TableOfContents
      position={position}
      showNumbers={false}
      collapsible={false}
      excludeMainTitle={true}
      className={className}
    />
  );
}

// Numbered TOC (academic style)
export function NumberedToc({ position = 'right', className }: Pick<TocWrapperProps, 'position' | 'className'>) {
  return (
    <TableOfContents
      position={position}
      showNumbers={true}
      collapsible={false}
      excludeMainTitle={true}
      className={className}
    />
  );
}

// Collapsible TOC (space-saving)
export function CollapsibleToc({ position = 'right', className }: Pick<TocWrapperProps, 'position' | 'className'>) {
  return (
    <TableOfContents
      position={position}
      showNumbers={false}
      collapsible={true}
      excludeMainTitle={true}
      className={className}
    />
  );
}

// Fully customizable TOC
export default function Toc(props: TocWrapperProps) {
  return <TableOfContents {...props} />;
}