"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import Image from "next/image";

const NoStress = () => {
  return (
    <section
      className="py-16 sm:py-24 md:py-32"
      style={{
        backgroundColor: "rgb(var(--global-black))",
      }}
    >
      <div
        className="mx-auto flex flex-col-reverse lg:flex-row items-center w-full max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
        style={{
          color: "rgb(var(--wp-nostress-heading))",
        }}
      >
        {/* Image Section - Appears first on mobile due to flex-col-reverse */}
        <div className="w-full lg:w-1/2 flex items-center justify-center py-10 lg:py-0">
          <Image
            src="/WordPress/NoStressBg.webp"
            alt="No Stress Background"
            width={800}
            height={600}
          />
        </div>

        {/* Content Section - Appears second on mobile due to flex-col-reverse */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end py-10 lg:py-0">
          <div className="w-full max-w-2xl space-y-3 text-center lg:text-left">
            <ContentHeading
              title="No stress WordPress"
              className="!text-[2.75rem] sm:!text-[3rem] font-bold !text-[rgb(var(--wp-nostress-heading))]"
            />

            <ContentDescription
              size="lg"
              className="sm:text-xl leading-relaxed !text-[rgb(var(--wp-nostress-description))]"
            >
              Breeze through installations without cPanel using our custom
              interface and go live in under 15 seconds.
            </ContentDescription>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoStress;
