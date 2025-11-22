"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import { Mail, SlidersHorizontal, Shield } from "lucide-react";

const tools = [
  {
    title: "Professional email",
    description:
      "Make closer connections\n with the quick and efficient\nservice from SPACEMAIL®.",
    Icon: Mail
  },
  {
    title: "Effortless control",
    description:
      "Manage content, monitor\n performance and more with \n our cPanel-powered\n Hosting Manager.",
    Icon: SlidersHorizontal
  },
  {
    title: "24/7 protection",
    description:
      "Looking for free malware\n protection for websites?\nBoost shared hosting \nsecurity with Imunify360,\nincluded in every hosting\n package.",
    Icon: Shield
  }
];

const ToolHosting = () => {
  return (
    <section
      className="relative w-full py-24"
      style={{ backgroundColor: "rgb(var(--hosting-section-bg))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="text-center space-y-5">
          <ContentHeading
            title="Tools that mean business"
            className="!text-5xl sm:!text-[3.75rem] md:!text-[4.5rem]"
          />
        </div>

        <div className="grid gap-12 md:grid-cols-3 pt-12">
          {tools.map(({ title, description, Icon }) => (
            <div key={title} className="flex flex-col items-center text-center gap-5 max-w-sm mx-auto">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border border-[rgb(var(--hosting-build-carousel-inactive))] text-[rgb(var(--hosting-text-white))]">
                <Icon className="w-6 h-6" strokeWidth={1.6} />
              </div>
              <ContentHeading
                title={title}
                className="!text-[1.75rem]"
              />
              <ContentDescription
                text={description}
                size="md"
                className="text-[rgb(var(--hosting-choose-text-gray-300))] whitespace-pre-line leading-7"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolHosting;


