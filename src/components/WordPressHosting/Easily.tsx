"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import LearnMoreButton from "@/components/ui/learn-more-button";

const Easily = () => {
  return (
    <section
      className="relative overflow-hidden py-32"
      style={{
        backgroundImage: "url('/WordPress/EasilyBg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "520px",
        color: 'rgb(var(--wp-nostress-heading))'
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl justify-start mr-20">
        <div className="w-full max-w-2xl space-y-3">
          <ContentHeading
            title="Easily the fastest around"
            className="!text-[2.75rem] sm:!text-[3rem] font-bold !text-[rgb(var(--wp-nostress-heading))]"
          />

          <ContentDescription
            size="lg"
            className="sm:text-xl leading-relaxed !text-[rgb(var(--wp-nostress-description))]"
          >
            Give your visitors a blazingly-fast ride with a<br />
            Top Tier WordPress Provider for<br />
            performance.
          </ContentDescription>

          <LearnMoreButton className="mt-1" />
        </div>
      </div>
    </section>
  );
};

export default Easily;


