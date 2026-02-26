import { useEffect, useState, useRef } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  height: number;
  offsetTop: number;
}

const sectionIds = [
  { id: 'hero', label: 'Hero' },
  { id: 'value-props', label: 'Value Props' },
  { id: 'together', label: 'Platform' },
  { id: 'readyshipper', label: 'ReadyShipper' },
  { id: 'readyreturns', label: 'ReadyReturns' },
  { id: 'alerts-analytics', label: 'Alerts & Analytics' },
  { id: 'stats', label: 'Stats' },
  { id: 'get-started', label: 'Get Started' },
];

export function CustomScrollbar({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLDivElement> }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [totalHeight, setTotalHeight] = useState(0);
  const [showLabel, setShowLabel] = useState(false);
  const labelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevActiveSectionRef = useRef<string>('hero');
  const isProgrammaticScrollRef = useRef<boolean>(false);

  // Separate effect to handle label timeout when active section changes
  useEffect(() => {
    // Only trigger if the active section actually changed and not during programmatic scroll
    if (prevActiveSectionRef.current !== activeSection && !isProgrammaticScrollRef.current) {
      prevActiveSectionRef.current = activeSection;
      
      // Show label when section changes
      setShowLabel(true);
      
      // Clear existing timeout
      if (labelTimeoutRef.current) {
        clearTimeout(labelTimeoutRef.current);
      }
      
      // Hide label after 2 seconds
      labelTimeoutRef.current = setTimeout(() => {
        setShowLabel(false);
      }, 2000);
    } else if (prevActiveSectionRef.current !== activeSection) {
      // Update the ref even during programmatic scroll, just don't show label
      prevActiveSectionRef.current = activeSection;
    }

    // Cleanup timeout on unmount
    return () => {
      if (labelTimeoutRef.current) {
        clearTimeout(labelTimeoutRef.current);
      }
    };
  }, [activeSection]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Calculate section heights and positions
    const calculateSections = () => {
      const sectionData: Section[] = [];
      let total = 0;

      sectionIds.forEach(({ id, label }) => {
        const element = container.querySelector(`#${id}`) as HTMLElement;
        if (element) {
          const height = element.offsetHeight;
          const offsetTop = element.offsetTop;
          sectionData.push({ id, label, height, offsetTop });
          total += height;
        }
      });

      setSections(sectionData);
      setTotalHeight(total);
    };

    calculateSections();

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(calculateSections);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [scrollContainerRef]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      setShowBackToTop(scrollTop > 300);
      setIsAtTop(scrollTop === 0);

      // Determine active section based on scroll position
      const containerTop = container.getBoundingClientRect().top;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = container.querySelector(`#${sections[i].id}`) as HTMLElement;
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top - containerTop <= 100) {
            if (activeSection !== sections[i].id) {
              setActiveSection(sections[i].id);
            }
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (labelTimeoutRef.current) {
        clearTimeout(labelTimeoutRef.current);
      }
    };
  }, [scrollContainerRef, sections, activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = scrollContainerRef.current?.querySelector(`#${sectionId}`);
    if (element) {
      isProgrammaticScrollRef.current = true;
      setShowLabel(false); // Hide any existing labels
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
        setShowLabel(true); // Show label when we arrive
        // Clear any existing timeout
        if (labelTimeoutRef.current) {
          clearTimeout(labelTimeoutRef.current);
        }
        // Hide label after 2 seconds
        labelTimeoutRef.current = setTimeout(() => {
          setShowLabel(false);
        }, 2000);
      }, 1000); // Wait for smooth scroll to complete
    }
  };

  const scrollToTop = () => {
    isProgrammaticScrollRef.current = true;
    setShowLabel(false);
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      setShowLabel(true);
      if (labelTimeoutRef.current) {
        clearTimeout(labelTimeoutRef.current);
      }
      labelTimeoutRef.current = setTimeout(() => {
        setShowLabel(false);
      }, 2000);
    }, 1000);
  };

  const scrollToBottom = () => {
    const container = scrollContainerRef.current;
    if (container) {
      isProgrammaticScrollRef.current = true;
      setShowLabel(false);
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
        setShowLabel(true);
        if (labelTimeoutRef.current) {
          clearTimeout(labelTimeoutRef.current);
        }
        labelTimeoutRef.current = setTimeout(() => {
          setShowLabel(false);
        }, 2000);
      }, 1000);
    }
  };

  const handleScrollButton = () => {
    if (isAtTop) {
      scrollToBottom();
    } else {
      scrollToTop();
    }
  };

  return (
    <>
      {/* Custom Scrollbar */}
      <div className="absolute right-6 top-8 bottom-16 w-2 rounded-full overflow-visible z-20">
        {/* Chapter markers */}
        {sections.map((section) => {
          const heightPercentage = (section.height / totalHeight) * 100;
          const topPercentage = (section.offsetTop / totalHeight) * 100;
          const isActive = activeSection === section.id;
          const isHovered = hoveredSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              className={`absolute left-0 w-full transition-all duration-500 ease-in-out rounded-full ${
                isActive || isHovered ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              style={{ 
                top: `calc(${topPercentage}% + ${sections.findIndex(s => s.id === section.id) * 2}px)`, 
                height: `calc(${heightPercentage}% - 2px)`,
              }}
              aria-label={`Go to ${section.label}`}
            >
              {/* Label pill - shows on active section with fade or on hover */}
              <span className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shadow-lg transition-opacity duration-500 pointer-events-none ${
                (isActive && showLabel) || isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scroll Navigation Button */}
      <button
        onClick={handleScrollButton}
        className="group absolute right-3 bottom-4 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:justify-end hover:pr-2 hover:pl-3 transition-all shadow-lg overflow-hidden w-8 hover:w-auto z-20"
        aria-label={isAtTop ? "Go to bottom" : "Back to top"}
      >
        <span className="hidden group-hover:block transition-opacity duration-200 text-xs font-mono mr-1 whitespace-nowrap">
          {isAtTop ? "Bottom" : "Top"}
        </span>
        {isAtTop ? <ArrowDown className="w-4 h-4 flex-shrink-0" /> : <ArrowUp className="w-4 h-4 flex-shrink-0" />}
      </button>
    </>
  );
}