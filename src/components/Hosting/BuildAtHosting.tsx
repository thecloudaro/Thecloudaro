"use client";

import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const BuildAtHosting = () => {
  const carouselSteps = [
    "Build a complete site in minutes",
    "Customize text and images",
    "Add ready-made pages in a few clicks"
  ];

  return (
    <section
      className="relative w-full py-24"
      style={{ backgroundColor: "rgb(var(--hosting-section-bg))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-36">
        <div className="text-center space-y-8">
          <ContentHeading
            title="Build at speed with AI"
            className="text-5xl sm:text-[4.5rem] md:text-[6rem] xl:text-[4.5rem] leading-tight tracking-tight mx-auto"
          />
          <ContentDescription
            text="Create your website fast with our AI website builder for WordPress."
            size="xl"
            className="max-w-5xl mx-auto text-[rgb(var(--hosting-choose-text-gray-400))]"
          />
        </div>

        <div className="grid gap-10 lg:gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start">
          <div className="flex items-start gap-8 mt-8">
            <div className="flex flex-col gap-3 pt-2 mt-40">
              {carouselSteps.map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === 0 ? "bg-[rgb(var(--hosting-build-carousel-active))]" : "bg-[rgb(var(--hosting-build-carousel-inactive))]"
                  }`}
                />
              ))}
            </div>

            <div className="space-y-4 max-w-xl mt-4">
              <h1 className="text-3xl font-semibold text-[rgb(var(--hosting-text-white))] leading-tight">
                Build a complete site in minutes
              </h1>
              <ContentDescription
  text={`Build your dream website with no coding required.
Enter your website's title, describe your business, and 
choose a tone that fits your brand, whether that's 
friendly, professional or inspirational. In minutes, a 
stunning, high-performance website is yours to
customize.`}
  size="md"
  className="text-[rgb(var(--hosting-choose-text-gray-300))] leading-7 whitespace-pre-line"
/>

              <ContentDescription
                text="Customize text and images"
                size="md"
                className="font-semibold text-[rgb(var(--hosting-text-white))]"
              />
              <ContentDescription
                text="Add ready-made pages in a few clicks"
                size="md"
                className="font-semibold text-[rgb(var(--hosting-text-white))]"
              />
            </div>
          </div>

          <div className="relative w-full h-full">
            <div className="w-full overflow-hidden border border-[rgb(var(--hosting-build-border-gray-800))] bg-[rgba(var(--hosting-build-bg-overlay))]">
              <Image
                src="/Hosting/BuildAtHosting.webp"
                alt="AI website builder preview"
                width={960}
                height={720}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildAtHosting;


