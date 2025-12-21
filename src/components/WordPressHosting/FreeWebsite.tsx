"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import Link from "next/link";

const FreeWebsite = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24" style={{ backgroundColor: 'rgb(var(--wp-freewebsite-bg))', color: 'rgb(var(--wp-freewebsite-heading))' }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center">
        <ContentHeading
          title="Free website migration"
          className="!text-[2.75rem] sm:!text-[3.25rem] md:!text-[3.75rem] font-bold !text-[rgb(var(--wp-freewebsite-heading))]"
        />
        <ContentDescription
          size="lg"
          className="mt-6 text-base sm:text-lg !text-[rgba(var(--wp-freewebsite-description))]"
        >
          Move your WordPress website and files in simple steps.
        </ContentDescription>
      </div>

      <div className="mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32 flex max-w-6xl flex-col gap-8 sm:gap-10 md:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 lg:flex-row lg:justify-end lg:gap-20 xl:gap-24">
        <div className="w-full lg:w-1/2 lg:pl-8">
          <div className="space-y-8 text-left">
            <div className="space-y-2">
              <ContentHeading
                title="No extra plugins needed"
                className="!text-3xl font-bold text-left !text-[rgba(var(--wp-freewebsite-feature-heading-1))]"
              />
              <ContentDescription
                size="md"
                className="text-base leading-relaxed !text-[rgba(var(--wp-freewebsite-feature-text))]"
              >
                Save money and hassle by not relying on external<br/>services or
                paid plugins.
              </ContentDescription>
            </div>

            <div className="space-y-3">
              <ContentHeading
                title="Automatic transfer"
                className="!text-3xl font-bold text-left !text-[rgb(var(--wp-freewebsite-feature-heading-2))]"
              />
              <ContentDescription
                size="md"
                className="text-base leading-relaxed !text-[rgba(var(--wp-freewebsite-feature-text))]"
              >
                Get on with other tasks while your WordPress website<br/>migrates
                automatically.
              </ContentDescription>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/migration-to-thecloudaro"
              className="text-xs font-semibold transition-colors hover:underline hover:underline-offset-4"
              style={{ color: 'rgb(var(--wp-freewebsite-link))', textDecorationColor: 'rgb(var(--wp-freewebsite-link))' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'rgb(var(--wp-freewebsite-link))';
                e.currentTarget.style.textDecorationColor = 'rgb(var(--wp-freewebsite-link))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgb(var(--wp-freewebsite-link))';
                e.currentTarget.style.textDecorationColor = 'rgb(var(--wp-freewebsite-link))';
              }}
            >
              Migrate to EasyWP
              
            </Link>
            <span className="text-xs font-semibold" style={{ color: 'rgb(var(--wp-freewebsite-link))' }}>
                →
              </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeWebsite;


