import { useEffect, useState } from 'react';
import { useTocConfig, TocItem } from './useTocConfig';

interface TableOfContentsProps {
  position?: 'left' | 'right';
  className?: string;
  showNumbers?: boolean;
  collapsible?: boolean;
  excludeMainTitle?: boolean;
}

export default function TableOfContents({ 
  position = 'right',
  className = '',
  showNumbers = false,
  collapsible = false,
  excludeMainTitle = true
}: TableOfContentsProps) {
  const config = useTocConfig({ 
    position, 
    showNumbers, 
    collapsible, 
    excludeMainTitle 
  });
  
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(!collapsible);

  useEffect(() => {
    const container = document.querySelector(config.containerSelector);
    if (!container) return;

    const headings = container.querySelectorAll(config.headingSelector);
    const items: TocItem[] = [];
    const numberingCounts = [0, 0, 0, 0, 0, 0]; // For h1-h6

    headings.forEach((heading, index) => {
      // Skip the main title if configured to do so
      if (config.excludeMainTitle && heading.tagName === 'H1' && index === 0) {
        return;
      }

      const id = heading.id || `heading-${index}`;
      if (!heading.id) {
        heading.id = id;
      }
      
      const level = parseInt(heading.tagName[1]);
      let number = '';
      
      if (config.showNumbers) {
        // Reset deeper level counts when we encounter a higher level
        for (let i = level; i < numberingCounts.length; i++) {
          if (i === level - 1) {
            numberingCounts[i]++;
          } else if (i > level - 1) {
            numberingCounts[i] = 0;
          }
        }
        
        // Generate number string (e.g., "1.2.3")
        const activeLevels = numberingCounts.slice(0, level).filter(n => n > 0);
        if (activeLevels.length > 0) {
          number = activeLevels.join('.') + '.';
        }
      }
      
      items.push({
        id,
        text: heading.textContent || '',
        level,
        number
      });
    });

    setTocItems(items);

    // Set up intersection observer for active link highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [config.containerSelector, config.headingSelector, config.excludeMainTitle, config.showNumbers]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (tocItems.length === 0) return null;

  const positionClasses = config.position === 'left' 
    ? 'left-4 xl:left-8' 
    : 'right-4 xl:right-8';

  return (
    <>
      {/* Table of Contents - Desktop only */}
      <nav
        className={`
          fixed top-20 ${positionClasses} z-40 w-48 max-h-[calc(100vh-6rem)]
          hidden lg:block
          ${className}
        `}
      >
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Contents
            </h3>
          </div>
          
          {/* TOC Items */}
          <div className="p-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
            <ul className="space-y-0.5">
              {tocItems.map((item, index) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToHeading(item.id)}
                    className={`
                      w-full text-left flex items-start py-1.5 px-2 text-xs rounded transition-all duration-200
                      hover:bg-gray-100 dark:hover:bg-gray-700/50
                      focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50
                      ${item.id === activeId 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-2 border-blue-500' 
                        : 'text-gray-700 dark:text-gray-300'
                      }
                    `}
                    style={{
                      paddingLeft: `${(item.level - 1) * 0.5 + 0.5}rem`
                    }}
                  >
                    {config.showNumbers && item.number && (
                      <span className="text-gray-400 dark:text-gray-500 mr-1.5 font-mono text-xs">
                        {item.number}
                      </span>
                    )}
                    <span className="leading-tight text-xs">{item.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}