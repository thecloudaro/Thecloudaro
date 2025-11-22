"use client";

import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const ValueBeyond = () => {
  const features = [
    {
      title: "Plans you can't outgrow",
      description: "Add more email addresses and storage to every plan, easily."
    },
    {
      title: "Low price promise",
      description: "Get a service you can rely on, without counting the cost."
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 text-[rgb(var(--hosting-text-white))]" style={{ backgroundColor: 'rgb(var(--business-productivity-bg))' }}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid gap-12 items-center lg:grid-cols-2">
          {/* Left Side - Content */}
          <div className="space-y-10 text-left">
            <ContentHeading
              title="Value beyond price"
              className="text-[rgb(var(--hosting-text-white))] !text-2xl sm:!text-3xl md:!text-5xl font-bold"
            />

            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[rgb(var(--hosting-text-white))]">
                    {feature.title}
                  </h3>
                  <ContentDescription
                    text={feature.description}
                    size="md"
                    className="text-[rgba(var(--business-productivity-text-white-70))] text-lg sm:text-xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[900px]">
              <Image
                src="/businessEmail/ValueBeyond.webp"
                alt="Value beyond price illustration"
                width={1000}
                height={1000}
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

export default ValueBeyond;

