"use client";

import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const YourSmarter = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 text-[rgb(var(--hosting-text-white))]" style={{ backgroundColor: 'rgb(var(--business-productivity-bg))' }}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="flex flex-col items-center text-center space-y-12 max-w-4xl mx-auto">
          {/* Heading and Description */}
          <div className="flex flex-col items-center text-center space-y-2">
            <ContentHeading
              title="Your smarter spam filter"
              className="text-[rgb(var(--hosting-text-white))] !text-3xl sm:!text-4xl md:!text-6xl lg:!text-7xl font-[650] leading-tight"
            />

            <ContentDescription
              text="Tailor your inbox preferences, and let Jellyfish do the rest"
              size="xl"
              className="text-[rgba(var(--business-productivity-text-white-70))] text-lg sm:text-xl"
            />
          </div>

          {/* Image */}
          <div className="flex justify-center w-full mt-12 sm:mt-16 md:mt-20">
            <div className="relative w-full max-w-[500px] sm:max-w-[600px]">
              <Image
                src="/businessEmail/JellyFish.webp"
                alt="Jellyfish spam filter application"
                width={800}
                height={600}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>

          {/* Powered by Jellyfish */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="text-[rgba(var(--business-productivity-text-white-70))] text-sm sm:text-base uppercase tracking-wider">
              POWERED BY
            </span>
            <div className="relative w-6 h-6">
              <Image
                src="/businessEmail/JellyFish.webp"
                alt="Jellyfish logo"
                width={24}
                height={24}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-[rgb(var(--hosting-text-white))] text-sm sm:text-base font-medium">
              jellyfish
            </span>
          </div>
        </div>

        {/* Three Feature Blocks */}
        <div className="mt-12 sm:mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          <div className="text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-[rgb(var(--hosting-text-white))]">
              Create custom spam filters
            </h3>
            <ContentDescription
              text="Easily manage what gets through with simple blocklist, acceptlist, and custom rule settings."
              size="md"
              className="text-[rgba(var(--business-productivity-text-white-70))] text-base sm:text-lg"
            />
          </div>

          <div className="text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-[rgb(var(--hosting-text-white))]">
              Assess and adapt
            </h3>
            <ContentDescription
              text="Review detailed logs of rejected or delivered emails, and adjust your settings as needed."
              size="md"
              className="text-[rgba(var(--business-productivity-text-white-70))] text-base sm:text-lg"
            />
          </div>

          <div className="text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-[rgb(var(--hosting-text-white))]">
              Keep it simple
            </h3>
            <ContentDescription
              text="Move fast with easy tools — built for business, designed for real people."
              size="md"
              className="text-[rgba(var(--business-productivity-text-white-70))] text-base sm:text-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default YourSmarter;

