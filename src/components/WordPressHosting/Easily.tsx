"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import Image from "next/image"; // Added Image import

const Easily = () => {
  return (
    <section
      className="py-16 sm:py-24 md:py-32"
      style={{
        backgroundColor: "rgb(var(--global-black))", // Set background color using global variable
      }}
    >
      <div className="mx-auto flex flex-col-reverse lg:flex-row items-center w-full max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Image Section - Appears first on mobile due to flex-col-reverse */}
        <div className="w-full lg:w-1/2 flex items-center justify-center py-10 lg:py-0">
          <Image
            src="/WordPress/EasilyBg.webp" // Image source
            alt="Easily the fastest around Background"
            width={800}
            height={600}
            className="w-full h-auto object-cover rounded-lg shadow-lg" // Responsive image styling
          />
        </div>

        {/* Content Section - Appears second on mobile due to flex-col-reverse */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start py-10 lg:py-0"> {/* Changed justify-end to justify-start */}
          <div className="w-full max-w-2xl space-y-3 text-center lg:text-left">
            <ContentHeading
              title="Easily the fastest around"
              className="!text-[2.75rem] sm:!text-[3rem] font-bold !text-[rgb(var(--wp-nostress-heading))]"
            />

            <ContentDescription
              size="lg"
              className="sm:text-xl leading-relaxed !text-[rgb(var(--wp-nostress-description))]"
            >
              Give your visitors a blazingly-fast ride with a
              Top Tier WordPress Provider for
              performance.
            </ContentDescription>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Easily;

