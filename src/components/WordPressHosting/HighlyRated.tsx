"use client";

import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const HighlyRated = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24" style={{ backgroundColor: 'rgb(var(--wp-highlyrated-bg))', color: 'rgb(var(--wp-highlyrated-heading))' }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center">
        <ContentHeading
          title="Highly rated hosting for<br/>WordPress"
          className="!text-[2.5rem] sm:!text-[3rem] md:!text-[3.5rem] font-bold !text-[rgb(var(--wp-highlyrated-heading))]"
        />
        <ContentDescription
          size="lg"
          className="mt-6 text-base sm:text-lg !text-[rgba(var(--wp-highlyrated-description))]"
        >
          Join thousands of users who are already loving EasyWP*
        </ContentDescription>
      </div>

      <div className="mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24 flex max-w-4xl flex-col items-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 sm:flex-row sm:items-center sm:justify-center" style={{ color: 'rgb(var(--wp-highlyrated-heading))' }}>
        <Image
          src="/WordPress/star.png"
          alt="Star badge"
          width={220}
          height={220}
          className="h-24 w-24 sm:h-36 sm:w-36"
          priority
        />

        <div className="text-center sm:text-center">
          <ContentHeading
            title="ReviewSignal"
            className="!text-[2rem] font-semibold !text-[rgb(var(--wp-highlyrated-subheading))]"
          />
          <ContentDescription
            size="sm"
            className="mt-4 text-sm sm:text-xs !text-[rgba(var(--wp-highlyrated-subdescription))]"
          >
            EasyWP ranked a Top Tier WordPress<br/>Provider for 3 years in a row
          </ContentDescription>
        </div>
      </div>
    </section>
  );
};

export default HighlyRated;


