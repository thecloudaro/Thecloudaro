"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const NoStress = () => {
  return (
    <section
      className="relative overflow-hidden py-16 sm:py-24 md:py-32"
      style={{
        backgroundImage: "url('/WordPress/NoStressBg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "520px",
        color: "rgb(var(--wp-nostress-heading))",
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl justify-center lg:justify-end px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
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
    </section>
  );
};

export default NoStress;
