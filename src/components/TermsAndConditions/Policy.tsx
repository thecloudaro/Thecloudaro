"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ContentDescription from "@/components/ui/content-description";

interface PolicySection {
  id: string;
  title: string;
  content?: string | string[];
  subsections?: PolicySection[];
}

interface PolicyData {
  title: string;
  lastUpdated: string;
  breadcrumb: string;
  intro: string[];
  sections: PolicySection[];
}

interface PolicyProps {
  policyData: PolicyData;
}

const Policy: React.FC<PolicyProps> = ({ policyData }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(policyData.sections[0]?.id || "");
  const [indicatorTop, setIndicatorTop] = useState<number>(0);
  const [whiteLineHeight, setWhiteLineHeight] = useState<number>(0);
  const [whiteLineTop, setWhiteLineTop] = useState<number>(0);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const sidebarItemRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const sidebarListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getAllSectionIds = (sections: PolicySection[]): string[] => {
    let ids: string[] = [];
    sections.forEach(section => {
      ids.push(section.id);
      if (section.subsections) {
        ids = ids.concat(getAllSectionIds(section.subsections));
      }
    });
    return ids;
  };

  const itemIds = getAllSectionIds(policyData.sections);

  useEffect(() => {
    if (!isLoaded) return;

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        visibleEntries.sort((a, b) => {
          if (Math.abs(b.intersectionRatio - a.intersectionRatio) > 0.1) {
            return b.intersectionRatio - a.intersectionRatio;
          }
          return a.boundingClientRect.top - b.boundingClientRect.top;
        });
        
        const sectionId = visibleEntries[0].target.getAttribute('data-section-id');
        if (sectionId) {
          setActiveSection(sectionId);
        }
      }
    }, observerOptions);

    const sections = sectionRefs.current;
    const timeoutId = setTimeout(() => {
      Object.values(sections).forEach((section) => {
        if (section) {
          observer.observe(section);
        }
      });
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      Object.values(sections).forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [isLoaded, itemIds]);

  useEffect(() => {
    const activeItem = sidebarItemRefs.current[activeSection];
    if (activeItem && sidebarListRef.current) {
      const itemTop = activeItem.offsetTop - sidebarListRef.current.offsetTop;
      setIndicatorTop(itemTop);
    }
  }, [activeSection]);

  useEffect(() => {
    if (sidebarListRef.current && isLoaded) {
      const updateWhiteLineHeight = () => {
        if (sidebarListRef.current) {
          const firstItem = sidebarItemRefs.current[itemIds[0]];
          const lastItem = sidebarItemRefs.current[itemIds[itemIds.length - 1]];
          if (firstItem && lastItem && sidebarListRef.current) {
            const firstTop = firstItem.offsetTop - sidebarListRef.current.offsetTop;
            const lastTop = lastItem.offsetTop - sidebarListRef.current.offsetTop;
            const itemHeight = lastItem.offsetHeight;
            setWhiteLineTop(firstTop + (firstItem.offsetHeight / 2) - 1);
            setWhiteLineHeight(lastTop - firstTop + itemHeight);
          }
        }
      };
      
      const timeoutId = setTimeout(updateWhiteLineHeight, 500);
      window.addEventListener('resize', updateWhiteLineHeight);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', updateWhiteLineHeight);
      };
    }
  }, [isLoaded, itemIds]);

  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  const renderSection = (section: PolicySection) => (
    <div
      key={section.id}
      data-section-id={section.id}
      ref={(el) => { sectionRefs.current[section.id] = el; }}
      className="space-y-4 sm:space-y-6 mt-8 sm:mt-10"
    >
      <ContentDescription
        text={section.title}
        size="md"
        className="text-base sm:text-lg md:text-xl text-left !text-white font-bold"
      />
      {typeof section.content === 'string' ? (
        <p className="text-xs leading-relaxed text-[rgb(var(--policy-text-white))]">
          {section.content.split('\n').map((line, index) => (
            <span key={index}>{line}<br/></span>
          ))}
        </p>
      ) : Array.isArray(section.content) ? (
        <ul className="list-disc list-inside text-xs leading-relaxed text-[rgb(var(--policy-text-white))]">
          {section.content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.subsections && section.subsections.map(renderSection)}
    </div>
  );

  const sidebarItems = policyData.sections.map(section => ({ id: section.id, label: section.title }));

  return (
    <div 
      className="relative w-full min-h-screen pt-20 bg-[rgb(var(--policy-bg))]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16 md:gap-20 lg:gap-40">
          <div className="lg:col-span-2 lg:pr-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="text-xs" style={{ color: 'rgb(156 163 175)' }}>
                <Link href="/legal" className="hover:underline">Terms &amp; Conditions</Link>
                <span className="mx-2">›</span>
                <span>{policyData.breadcrumb}</span>
              </div>
              <ContentDescription
                text={policyData.title}
                size="xl"
                className="text-lg sm:text-xl md:text-2xl lg:text-4xl text-left !text-white font-bold leading-tight"
              />
              <p className="text-xs" style={{ color: 'rgb(156 163 175)' }}>
                Last updated: {policyData.lastUpdated}
              </p>
              <div className="space-y-4 sm:space-y-6 text-xs leading-relaxed" style={{ color: 'rgb(255 255 255)' }}>
                {policyData.intro.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              {policyData.sections.map(renderSection)}
            </motion.div>
          </div>
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="lg:sticky lg:top-20"
            >
              <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-0">
                <div className="relative">
                  {whiteLineHeight > 0 && (
                    <div 
                      className="absolute left-0 w-0.5"
                      style={{ 
                        backgroundColor: 'rgba(156, 163, 175, 0.5)',
                        top: `${whiteLineTop}px`,
                        height: `${whiteLineHeight}px`,
                        zIndex: 1
                      }}
                    />
                  )}
                  <motion.div
                    className="absolute left-0 w-1 h-6 sm:h-8 rounded-full z-10"
                    style={{ backgroundColor: 'rgb(59 130 246)' }}
                    animate={{
                      top: indicatorTop
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                  <ul ref={sidebarListRef} className="space-y-2 sm:space-y-3 relative pl-2">
                    {sidebarItems.map((item, index) => {
                      const isActive = activeSection === item.id;
                      return (
                        <li 
                          key={index} 
                          className="flex items-center"
                          ref={(el) => { sidebarItemRefs.current[item.id] = el; }}
                        >
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className={`text-xs hover:underline block text-left w-full flex items-center transition-all ${
                              isActive ? 'font-bold' : ''
                            }`}
                            style={{ 
                              color: 'rgb(255 255 255)',
                              paddingLeft: '12px'
                            }}
                          >
                            <span>{item.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
