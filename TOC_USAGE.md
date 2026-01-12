# Table of Contents Component

A Wikipedia-style floating table of contents component for Next.js applications with math content.

## Features

- **Floating positioning**: Left or right sidebar
- **Mobile-friendly**: Collapsible hamburger menu on mobile devices
- **Active section highlighting**: Shows current section as user scrolls
- **Smooth scrolling**: Animated scroll to sections
- **Auto-generated IDs**: Creates heading IDs automatically if missing
- **Multiple styles**: Simple, numbered, and collapsible variants
- **Dark mode support**: Automatic theme switching
- **Accessible**: Proper ARIA labels and keyboard navigation

## Quick Start

### 1. Simple Wikipedia-style TOC

```tsx
import { SimpleToc } from "./components/Toc";

export default function Page() {
  return (
    <>
      <SimpleToc position="right" />
      <main>
        <h1>Your Page Title</h1>
        <h2>Section 1</h2>
        <h3>Subsection 1.1</h3>
        <h2>Section 2</h2>
        {/* Your content */}
      </main>
    </>
  );
}
```

### 2. Academic-style with numbering

```tsx
import { NumberedToc } from "./components/Toc";

export default function AcademicPage() {
  return (
    <>
      <NumberedToc position="left" />
      <main>{/* Your content */}</main>
    </>
  );
}
```

### 3. Space-saving collapsible TOC

```tsx
import { CollapsibleToc } from "./components/Toc";

export default function CompactPage() {
  return (
    <>
      <CollapsibleToc position="right" />
      <main>{/* Your content */}</main>
    </>
  );
}
```

### 4. Fully customizable

```tsx
import Toc from "./components/Toc";

export default function CustomPage() {
  return (
    <>
      <Toc 
        position="left"
        showNumbers={true}
        collapsible={false}
        excludeMainTitle={false}
        className="custom-toc"
      />
      <main>{/* Your content */}</main>
    </>
  );
}
```

## Props

### Common Props
- `position`: `'left' | 'right'` - TOC position (default: `'right'`)
- `className`: `string` - Additional CSS classes

### Full Component Props
- `showNumbers`: `boolean` - Show section numbering (default: `false`)
- `collapsible`: `boolean` - Allow collapsing on mobile (default: `false`)
- `excludeMainTitle`: `boolean` - Skip first H1 tag (default: `true`)

## Mobile Behavior

- **Desktop (≥1024px)**: Always visible, floating sidebar
- **Mobile (<1024px)**: Hidden by default with hamburger menu toggle
- **Overlay**: Dark overlay when open on mobile (tap to close)
- **Auto-close**: Closes automatically after selecting a section on mobile

## Styling

The component uses Tailwind classes and CSS custom properties for theming:

```css
/* Your global.css - already included */
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### Custom Styling

You can override styles by passing a `className`:

```tsx
<SimpleToc 
  position="right" 
  className="my-custom-toc bg-blue-50 border-blue-200" 
/>
```

## Heading Requirements

### Automatic ID Generation
The component automatically generates IDs for headings that don't have them:

```tsx
// This heading gets ID "heading-0"
<h2>Introduction</h2>

// This heading keeps its custom ID
<h2 id="custom-intro">Introduction</h2>
```

### Manual ID Assignment
For better SEO and linking, provide meaningful IDs:

```tsx
<h1 id="main-title">Page Title</h1>
<h2 id="introduction">Introduction</h2>
<h2 id="methodology">Methodology</h2>
<h3 id="data-collection">Data Collection</h3>
<h3 id="analysis">Analysis</h3>
<h2 id="results">Results</h2>
<h2 id="conclusion">Conclusion</h2>
```

## Advanced Configuration

### Custom Container Selector
By default, the TOC scans `main` for headings. You can modify this in `useTocConfig.ts`:

```ts
export const defaultTocConfig: TocConfig = {
  // ...
  containerSelector: '.article-content', // Custom container
  headingSelector: 'h2, h3, h4', // Only show h2-h4
  // ...
};
```

### Numbering Styles
Section numbering follows academic conventions:
- H2: 1., 2., 3.
- H3: 1.1., 1.2., 2.1.
- H4: 1.1.1., 1.1.2., 2.1.1.

## Accessibility

- **Keyboard navigation**: Focusable buttons with proper tab order
- **Screen readers**: Proper ARIA labels and semantic HTML
- **Focus management**: Visible focus indicators
- **Color contrast**: Meets WCAG guidelines

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (recent versions)
- **CSS features**: CSS Grid, Flexbox, CSS custom properties
- **JS features**: IntersectionObserver, dynamic imports

## Performance

- **Code splitting**: Dynamic imports prevent blocking main bundle
- **Intersection Observer**: Efficient scroll position detection
- **Minimal re-renders**: Optimized React hooks usage
- **SSR compatible**: No hydration mismatches

## Troubleshooting

### TOC not appearing
1. Ensure headings exist in the `main` element
2. Check that the page has sufficient content height for floating TOC
3. Verify heading hierarchy (don't skip levels like H1 → H3)

### Mobile toggle not working
1. Ensure the page imports the client component correctly
2. Check that Tailwind CSS is properly configured
3. Verify responsive classes are not being overridden

### Active highlighting issues
1. Check that headings have unique IDs
2. Ensure sufficient margin around headings for intersection observer
3. Verify scroll behavior isn't being prevented by other CSS

### Styling conflicts
1. Use specific classNames to override default styles
2. Check for Tailwind CSS purging configuration
3. Ensure dark mode classes are not being stripped