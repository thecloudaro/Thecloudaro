"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import LearnMoreButton from "@/components/ui/learn-more-button";

const NoStress = () => {
  return (
    <section
      className="relative overflow-hidden py-32"
      style={{
        backgroundImage: "url('/WordPress/NoStressBg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "640px",
        color: 'rgb(var(--wp-nostress-heading))'
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl justify-end mr-20">
        <div className="w-full max-w-2xl space-y-3 text-left">
          <ContentHeading
            title="No stress WordPress"
            className="!text-[2.75rem] sm:!text-[3rem] font-bold !text-[rgb(var(--wp-nostress-heading))]"
          />

          <ContentDescription
            size="lg"
            className="sm:text-xl leading-relaxed !text-[rgb(var(--wp-nostress-description))]"
          >
            Breeze through installations without cPanel<br/>using our custom
            interface and go live in<br/>under 15 seconds.
          </ContentDescription>

          <LearnMoreButton className="mt-1" />
        </div>
      </div>
    </section>
  );
};

export default NoStress;


