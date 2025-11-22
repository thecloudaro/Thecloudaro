"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import Image from "next/image";

const UniqueLayers = () => {
  return (
    <section className="py-24" style={{ backgroundColor: 'rgb(var(--wp-uniquelayers-bg))', color: 'rgb(var(--wp-uniquelayers-heading))' }}>
      <div className="mx-auto max-w-6xl px-6 text-center sm:px-8">
        <ContentHeading
          title="3 unique layers of<br/>caching"
          className="!text-[2.75rem] sm:!text-[3rem] md:!text-[3.75rem] font-bold !text-[rgb(var(--wp-uniquelayers-heading))]"
        />
        <ContentDescription
          size="lg"
          className="mt-6 text-base sm:text-lg !text-[rgba(var(--wp-uniquelayers-description))]"
        >
          The EasyWP WordPress integration plugin manages three different<br/>layers
          of caching for your website.
        </ContentDescription>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-16 px-6 sm:px-8 lg:flex-row lg:items-center lg:gap-24">
        <div className="flex w-full justify-center lg:w-1/2">
          <Image
            src="/WordPress/3unique.png"
            alt="Caching layers illustration"
            width={820}
            height={620}
            className="h-auto w-full max-w-[540px] object-contain"
            priority
          />
        </div>

        <div className="w-full lg:w-1/2">
          <div className="space-y-8 text-left">
            {[
              {
                title: "Layer 1:",
                description:
                  "PHP OPcache improves site response times by translating PHP script files to machine code and storing them in memory until either the PHP host process restarts or the file content changes."
              },
              {
                title: "Layer 2:",
                description:
                  "Object cache boosts response times for your site visitors by caching WordPress database queries."
              },
              {
                title: "Layer 3:",
                description:
                  "Response cache supports very high site visitor numbers while keeping response times low."
              }
            ].map((item) => (
              <div key={item.title} className="space-y-3">
                <ContentHeading
                  title={item.title}
                  className="!text-2xl font-semibold text-left !text-[rgb(var(--wp-uniquelayers-feature-heading))]"
                />
                <ContentDescription
                  size="sm"
                  className="!text-xs sm:!text-sm leading-relaxed !text-[rgba(var(--wp-uniquelayers-feature-text))]"
                >
                  {item.description}
                </ContentDescription>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button 
          className="rounded-full px-6 py-3 text-sm font-semibold transition"
          style={{ 
            backgroundColor: 'rgb(var(--wp-uniquelayers-button-bg))',
            color: 'rgb(var(--wp-uniquelayers-button-text))'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(var(--wp-uniquelayers-button-hover))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(var(--wp-uniquelayers-button-bg))';
          }}
        >
          Choose your plan
        </button>
      </div>
    </section>
  );
};

export default UniqueLayers;


