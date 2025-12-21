"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const Optimized = () => {
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
            title="Optimized for WordPress"
            className="!text-[2.75rem] sm:!text-[3rem] font-bold !text-[rgb(var(--wp-nostress-heading))]"
          />

          <ContentDescription
            size="lg"
            className="sm:text-xl leading-relaxed !text-[rgb(var(--wp-nostress-description))]"
          >
            Have a smoother WordPress experience<br />
            with 3 caching layers and a cloud platform<br />
            that&apos;s regularly monitored by our technical team.
          </ContentDescription>

          
        </div>
      </div>
    </section>
  );
};

export default Optimized;


