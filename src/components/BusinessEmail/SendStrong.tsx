"use client";

import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const SendStrong = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 text-[rgb(var(--hosting-text-white))]" style={{ backgroundColor: 'rgb(var(--business-productivity-bg))' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-8 sm:gap-10 md:gap-12 items-center lg:grid-cols-2">
          {/* Left Side - Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[650px]">
              <Image
                src="/businessEmail/SendStrong.webp"
                alt="Professional person with laptop"
                width={750}
                height={750}
                className="h-auto w-full object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 text-left">
            <ContentHeading
              title="Send a strong<br/>impression"
              className="text-[rgb(var(--hosting-text-white))] !text-3xl sm:!text-4xl md:!text-5xl font-bold"
            />

            <ContentDescription
              size="lg"
              className="text-[rgba(var(--business-productivity-text-white-70))] text-base sm:text-lg md:text-xl"
            >
              Create email addresses that match your<br/>domain name, so everything you send looks<br/>professional.
            </ContentDescription>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SendStrong;

