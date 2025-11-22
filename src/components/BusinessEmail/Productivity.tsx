"use client";

import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const Productivity = () => {
  return (
    <section className="pt-12 pb-24 text-[rgb(var(--hosting-text-white))]" style={{ backgroundColor: 'rgb(var(--business-productivity-bg))' }}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-12 items-center lg:grid-cols-2">
          {/* Left Side - Content */}
          <div className="space-y-6 text-left">
            <ContentHeading
              title="Productivity without<br/>limits"
              className="text-[rgb(var(--hosting-text-white))] !text-3xl sm:!text-4xl md:!text-5xl font-bold"
            />

            <ContentDescription
              size="lg"
              className="text-[rgba(var(--business-productivity-text-white-70))] text-base sm:text-lg md:text-xl"
            >
              Push what&apos;s possible with integrated<br/>calendar, lightning-quick AI drafts, and<br/>seamless setup.
            </ContentDescription>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[750px]">
              <Image
                src="/businessEmail/Productivity.webp"
                alt="Productivity features interface"
                width={850}
                height={750}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Productivity;

