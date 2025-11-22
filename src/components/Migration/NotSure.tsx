"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import Link from "next/link";

const NotSure = () => {
  return (
    <section className="py-20 text-center" style={{ backgroundColor: 'rgb(var(--migration-notsure-bg))', color: 'rgb(var(--migration-notsure-text))' }}>
      <div 
        className="relative w-full overflow-hidden px-4 py-24 sm:px-10 sm:py-28 md:px-12 md:py-36"
        style={{
          background: `linear-gradient(to right, rgb(var(--migration-notsure-gradient-from)), rgb(var(--migration-notsure-gradient-via)), rgb(var(--migration-notsure-gradient-to)))`
        }}
      >
        <div className="mx-auto max-w-5xl space-y-4">
            <ContentHeading
              title="Not sure which plan to go for?"
              className="!text-3xl font-bold sm:!text-4xl md:!text-7xl !text-[rgb(var(--migration-notsure-heading))]"
            />

            <ContentDescription
              size="xl"
              className="text-base sm:text-lg md:text-xl !text-[rgb(var(--migration-notsure-description))]"
            >
              Try the Web Hosting quiz to find the plan that works best for you.
            </ContentDescription>

            <div className="pt-4">
              <Link
                href="#"
                className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition-transform transition-colors duration-200 hover:-translate-y-0.5 hover:scale-105"
                style={{ 
                  backgroundColor: 'rgb(var(--migration-notsure-button-bg))',
                  color: 'rgb(var(--migration-notsure-button-text))',
                  boxShadow: '0 12px 24px rgba(var(--migration-notsure-button-shadow))'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(var(--migration-notsure-button-hover))';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(var(--migration-notsure-button-bg))';
                }}
              >
                Take the quiz
              </Link>
            </div>
          </div>

        <span className="pointer-events-none absolute inset-0 border" style={{ borderColor: 'rgba(var(--migration-notsure-border))' }} aria-hidden />
      </div>
    </section>
  );
};

export default NotSure;


