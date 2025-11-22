"use client";

import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const TheEssential = () => {
  const features = [
    {
      title: "Anytime support",
      description: "Get any support you need with a team ready 24/7."
    },
    {
      title: "Guaranteed uptime",
      description: "99.9% uptime guaranteed, with zero data loss."
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 text-[rgb(var(--hosting-text-white))]" style={{ backgroundColor: 'rgb(var(--business-productivity-bg))' }}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="space-y-16 sm:space-y-24 md:space-y-32">
          {/* Top Heading - Centered */}
          <div className="text-center">
            <ContentHeading
              title="Ready to deliver"
              className="text-[rgb(var(--hosting-text-white))] !text-3xl sm:!text-4xl md:!text-5xl lg:!text-7xl font-bold"
            />
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="grid gap-12 items-center lg:grid-cols-2">
            {/* Left Side - Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[700px]">
                <Image
                  src="/businessEmail/TheEssentials.webp"
                  alt="Person with support services"
                  width={800}
                  height={800}
                  className="h-auto w-full object-contain rounded-full"
                  priority
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-10 text-left">
              <ContentHeading
                title="The essentials of service excellence"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheEssential;

