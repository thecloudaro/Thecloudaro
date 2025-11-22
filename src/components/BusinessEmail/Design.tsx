"use client";

import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const Design = () => {
  return (
    <section className="py-24 text-[rgb(var(--hosting-text-white))]" style={{ backgroundColor: 'rgb(var(--business-productivity-bg))' }}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="space-y-6 text-center">
          <ContentHeading
            title="Design you'll love"
            className="text-[rgb(var(--hosting-text-white))] !text-3xl sm:!text-4xl md:!text-5xl lg:!text-7xl font-bold"
          />

          <ContentDescription
            size="xl"
            className="text-[rgba(var(--business-productivity-text-white-70))] text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto"
          >
            Spacemail&apos;s clean-and-clear interface makes email management a breeze.
          </ContentDescription>

          <div className="flex justify-center mt-12">
            <div className="relative w-full max-w-[160rem]">
              <Image
                src="/businessEmail/Design.webp"
                alt="Spacemail design interface"
                width={2500}
                height={1500}
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

export default Design;

