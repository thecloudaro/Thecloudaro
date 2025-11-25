"use client";

import { useState } from "react";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const MakeEmail = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      title: "Easy setup",
      description: "One-click Unbox™ links Spacemail to your domain <br/> — no technical know-how required.",
      image: "/businessEmail/EasySetup.webp"
    },
    {
      title: "Pure simplicity",
      description: "Easily manage subscriptions, create aliases,<br/>enable catch-all, and much more.",
      image: "/businessEmail/Pure.webp"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 text-[rgb(var(--hosting-text-white))]" style={{ backgroundColor: 'rgb(var(--business-productivity-bg))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 xl:space-y-28">
        <div className="text-center space-y-8">
          <ContentHeading
            title="Make email effortless"
            className="text-[rgb(var(--hosting-text-white))] !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl font-bold"
          />
          <ContentDescription
            text="How Spacemail takes simplicity to new levels"
            size="xl"
            className="max-w-5xl mx-auto text-[rgba(var(--business-productivity-text-white-70))]"
          />
        </div>

        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start">
            <div className="flex items-start gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6 md:mt-8">
            <div className="flex flex-col gap-3 pt-2 mt-8 sm:mt-12 md:mt-20 lg:mt-32 xl:mt-40">
              {features.map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 cursor-pointer ${
                    index === activeIndex ? "bg-[rgb(var(--business-make-dot-active))]" : "bg-[rgb(var(--business-make-dot-inactive))]"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>

            <div className="space-y-8 max-w-xl mt-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`space-y-3 cursor-pointer transition-opacity duration-200 ${
                    index === activeIndex ? "opacity-100" : "opacity-60"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <h2 className={`font-semibold text-[rgb(var(--hosting-text-white))] leading-tight mt-10 transition-all duration-200 ${
                    index === activeIndex 
                      ? "text-2xl sm:text-3xl md:text-4xl" 
                      : "text-xl sm:text-2xl"
                  }`}>
                    {feature.title}
                  </h2>
                  <p className={`leading-7 transition-all duration-200 ${
                    index === activeIndex 
                      ? "text-xl sm:text-2xl" 
                      : "text-base sm:text-lg"
                  }`}
                  style={{ color: 'rgba(var(--business-productivity-text-white-70))' }}>
                    {typeof feature.description === 'string' 
                      ? feature.description.split(/<br[\/\\]?>/i).map((part, i, arr) => (
                          <span key={i}>
                            {part}
                            {i < arr.length - 1 && <br />}
                          </span>
                        ))
                      : feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full h-full">
            <div className="relative w-full overflow-hidden">
              <div 
                className="absolute inset-0 blur-3xl -z-10" 
                style={{
                  background: `linear-gradient(to bottom right, rgba(var(--business-make-gradient-from)), transparent, rgba(var(--business-make-gradient-to)))`
                }}
              />
              <Image
                src={features[activeIndex].image}
                alt={features[activeIndex].title}
                width={1400}
                height={1050}
                className="w-full h-auto rounded-md transition-opacity duration-300 relative z-10"
                style={{
                  filter: `drop-shadow(0 20px 40px rgba(var(--business-make-image-shadow)))`
                }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeEmail;

