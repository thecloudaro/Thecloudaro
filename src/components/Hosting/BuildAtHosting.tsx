"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const BuildAtHosting = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselSteps = [
    {
      title: "Build a complete site in minutes",
      description: `Build your dream website with no coding required.
Enter your website's title, describe your business, and 
choose a tone that fits your brand, whether that's 
friendly, professional or inspirational. In minutes, a 
stunning, high-performance website is yours to
customize.`,
      imageSrc: "/Hosting/buildAtHosting.webp",
    },
    {
      title: "Customize text and images",
      description: `Easily modify your site's content, upload your own
images, and adjust the color palette to match your brand's
identity perfectly. Our intuitive editor makes customization
a breeze.`,
      imageSrc: "/Hosting/savetime.png",
    },
    {
      title: "Add ready-made pages in a few clicks",
      description: `Expand your website effortlessly by adding pre-designed,
fully functional pages like 'About Us', 'Contact', or a
'Blog'. Get your site ready for launch faster than ever.`,
      imageSrc: "/Hosting/Migrate.avif",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselSteps.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [carouselSteps.length]);

  const handleStepClick = (index: number) => {
    setActiveIndex(index);
  };

  const currentStep = carouselSteps[activeIndex];

  return (
    <section
      className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: "rgb(var(--hosting-section-bg))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 xl:space-y-28">
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

        <div className="grid gap-6 sm:gap-10 lg:gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-start">
          <div className="flex items-start gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6 md:mt-8">
            <div className="flex flex-col gap-3 pt-2 mt-4 sm:mt-8 md:mt-12 lg:mt-32 xl:mt-40">
              {carouselSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === activeIndex ? "bg-[rgb(var(--hosting-build-carousel-active))]" : "bg-[rgb(var(--hosting-build-carousel-inactive))]"
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            <div className="space-y-4 max-w-xl mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-2xl sm:text-3xl font-semibold text-[rgb(var(--hosting-text-white))] leading-tight">
                    {currentStep.title}
                  </h1>
                  <ContentDescription
                    text={currentStep.description}
                    size="md"
                    className="text-[rgb(var(--hosting-choose-text-gray-300))] leading-7 whitespace-pre-line"
                  />
                </motion.div>
              </AnimatePresence>

              {carouselSteps.map((step, index) => (
                 <div key={step.title} className={activeIndex === index ? 'hidden' : ''}>
                    <button onClick={() => handleStepClick(index)} className="text-left">
                        <ContentDescription
                            text={step.title}
                            size="md"
                            className="font-semibold text-[rgb(var(--hosting-text-white))] hover:text-[rgb(var(--hosting-build-carousel-active))] transition-colors"
                        />
                    </button>
                 </div>
              ))}
            </div>
          </div>

          <div className="relative w-full h-full mt-8 lg:mt-0">
            <div className="w-full overflow-hidden border border-[rgb(var(--hosting-build-border-gray-800))] bg-[rgba(var(--hosting-build-bg-overlay))]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={currentStep.imageSrc}
                    alt="AI website builder preview"
                    width={960}
                    height={720}
                    className="w-full h-auto"
                    priority={activeIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildAtHosting;