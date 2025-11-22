"use client";

import { useEffect, useRef, useState } from "react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import { ChevronLeft, ChevronRight, Globe, Mail, Orbit, Server } from "lucide-react";
import FrequentlyBTCard from "./FrequentlyBTCard";

const frequentlyBoughtItems = [
  {
    title: "Spacemail",
    plan: "Pro",
    bulletOne: "1 mailbox per domain",
    bulletTwo: "5 GB of storage per mailbox",
    price: "$0.88",
    icon: Mail,
    gradient: "bg-gradient-to-br from-[rgba(var(--hosting-frequently-gradient-spacemail-from))] via-[rgba(var(--hosting-frequently-gradient-spacemail-via))] to-[rgba(var(--hosting-frequently-gradient-spacemail-to))]"
  },
  {
    title: "EasyWP",
    plan: "Turbo",
    bulletOne: "1 cloud-powered WordPress website",
    bulletTwo: "50 GB SSD storage",
    price: "$9.88",
    oldPrice: "$18.88",
    icon: Orbit,
    gradient: "bg-gradient-to-br from-[rgba(var(--hosting-frequently-gradient-easywp-from))] via-[rgba(var(--hosting-frequently-gradient-easywp-via))] to-[rgba(var(--hosting-frequently-gradient-easywp-to))]"
  },
  {
    title: "Starlight™ Virtual Machines",
    plan: "Standard 1",
    bulletOne: "1 core CPU",
    bulletTwo: "2 GiB RAM",
    price: "$4.90",
    icon: Server,
    gradient: "bg-gradient-to-br from-[rgba(var(--hosting-frequently-gradient-starlight-from))] via-[rgba(var(--hosting-frequently-gradient-starlight-via))] to-[rgba(var(--hosting-frequently-gradient-starlight-to))]"
  },
  {
    title: "Web Hosting",
    plan: "Pro",
    bulletOne: "US data center location",
    bulletTwo: "50GB SSD cloud storage",
    price: "$4.88",
    icon: Globe,
    gradient: "bg-gradient-to-br from-[rgba(var(--hosting-frequently-gradient-webhosting-from))] via-[rgba(var(--hosting-frequently-gradient-webhosting-via))] to-[rgba(var(--hosting-frequently-gradient-webhosting-to))]"
  }
];

const VISIBLE_CARDS = 3;
const PARTIAL_RATIO = 0.5;

const FrequentlyBT = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [stepSize, setStepSize] = useState(0);
  const [partialWidth, setPartialWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const activeIndexRef = useRef(0);
  const maxSlide = Math.max(0, frequentlyBoughtItems.length - VISIBLE_CARDS);

  useEffect(() => {
    activeIndexRef.current = activeSlide;
  }, [activeSlide]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const measure = () => {
      const firstCard = container.querySelector<HTMLElement>("[data-card]");
      if (!firstCard) return;
      const width = firstCard.getBoundingClientRect().width;
      const containerStyles = window.getComputedStyle(container);
      const gap =
        parseFloat(containerStyles.columnGap || containerStyles.gap || "0") || 0;
      const partial = width * PARTIAL_RATIO;
      const step = width + gap;
      const effectiveStep = step - partial;
      setStepSize(effectiveStep);
      setPartialWidth(partial);
      const totalWidth =
        width * VISIBLE_CARDS + gap * (VISIBLE_CARDS - 1) + partial;
      setViewportWidth(totalWidth);
      container.scrollTo({ left: activeIndexRef.current * effectiveStep });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container || !stepSize) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const index = Math.round(container.scrollLeft / (stepSize || 1));
        setActiveSlide(Math.min(Math.max(index, 0), maxSlide));
        ticking = false;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [stepSize, maxSlide]);

  const scrollToSlide = (index: number) => {
    const container = carouselRef.current;
    if (!container || !stepSize) return;
    const clamped = Math.max(0, Math.min(maxSlide, index));
    container.scrollTo({
      left: clamped * stepSize,
      behavior: "smooth"
    });
    setActiveSlide(clamped);
  };

  const showLeftGradient = activeSlide > 0;
  const showRightGradient = activeSlide < maxSlide;

  const handleArrow = (direction: "prev" | "next") => {
    scrollToSlide(activeSlide + (direction === "next" ? 1 : -1));
  };

  return (
    <section
      className="relative w-full overflow-hidden py-24 text-[rgb(var(--hosting-text-white))]"
      style={{ backgroundColor: "rgb(var(--hosting-section-bg))" }}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="space-y-5 text-center">
          <ContentHeading
            title="Frequently bought together"
            className="!text-[2.75rem] font-bold tracking-tight sm:!text-[3.5rem] md:!text-[2.75rem]"
          />

          <ContentDescription
            text="For Web Hosting customers, we also recommend the following:"
            className="mx-auto max-w-2xl text-base text-[rgb(var(--hosting-choose-text-gray-300))] sm:text-lg"
            size="sm"
          />
        </div>

        <div className="relative mt-16">
          {showLeftGradient ? (
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-20"
              style={{
                width: partialWidth ? `${partialWidth + 6}px` : "56px",
                background: `
                  linear-gradient(
                    to right,
                    rgb(var(--hosting-section-bg)) 0%,
                    rgb(var(--hosting-section-bg) / 0.35) 65%,
                    rgb(var(--hosting-section-bg) / 0) 100%
                  )
                `
              }}
            />
          ) : null}
          {showRightGradient ? (
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-20"
              style={{
                width: partialWidth ? `${partialWidth + 6}px` : "56px",
                background: `
                  linear-gradient(
                    to left,
                    rgb(var(--hosting-section-bg)) 0%,
                    rgb(var(--hosting-section-bg) / 0.35) 65%,
                    rgb(var(--hosting-section-bg) / 0) 100%
                  )
                `
              }}
            />
          ) : null}

          <div className="relative flex justify-center">
            <div
              className="relative overflow-hidden"
              style={{
                width: viewportWidth ? `${viewportWidth}px` : "100%",
                maxWidth: viewportWidth ? `${viewportWidth}px` : "100%"
              }}
            >
              <div
                ref={carouselRef}
                className="frequently-carousel flex gap-4 overflow-x-auto px-6 pb-12 pt-8 scroll-smooth sm:px-10 md:px-14"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                scrollSnapType: "x mandatory"
                }}
              >
                {frequentlyBoughtItems.map((item) => (
                  <FrequentlyBTCard
                    key={item.title}
                    className="flex-shrink-0 transition-transform duration-500"
                    {...item}
                  />
                ))}
              </div>
            </div>
          </div>

          <style jsx>{`
            .frequently-carousel::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 sm:px-6 md:px-10">
            <button
              type="button"
              onClick={() => handleArrow("prev")}
              className="pointer-events-auto hidden h-12 w-12 items-center justify-center rounded-full text-[rgb(var(--hosting-text-white))] transition disabled:opacity-40 md:flex"
              style={{
                backgroundColor: 'rgba(var(--hosting-frequently-arrow-bg))',
                boxShadow: '0 16px 32px rgba(var(--hosting-frequently-arrow-shadow))'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(var(--hosting-frequently-arrow-hover))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(var(--hosting-frequently-arrow-bg))';
              }}
              disabled={activeSlide === 0}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => handleArrow("next")}
              className="pointer-events-auto hidden h-12 w-12 items-center justify-center rounded-full text-[rgb(var(--hosting-text-white))] transition disabled:opacity-40 md:flex"
              style={{
                backgroundColor: 'rgba(var(--hosting-frequently-arrow-bg))',
                boxShadow: '0 16px 32px rgba(var(--hosting-frequently-arrow-shadow))'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(var(--hosting-frequently-arrow-hover))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(var(--hosting-frequently-arrow-bg))';
              }}
              disabled={activeSlide === maxSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => {
            const isActive = index === activeSlide;
            return (
              <button
                key={index}
                type="button"
                onClick={() => scrollToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive ? "w-8 bg-[rgb(var(--hosting-frequently-dot-active))]" : "w-2 bg-[rgba(var(--hosting-frequently-dot-inactive))]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FrequentlyBT;


