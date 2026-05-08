"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import { Mail, SlidersHorizontal, Shield } from "lucide-react";

const tools = [
  {
    title: "Credible Email",
    description:
      "Use your domain for email so messages \ndon’t feel temporary or improvised. It’s \na small detail that changes how customers \nrespond and how your business is perceived.",
    Icon: Mail
  },
  {
    title: "Control without getting lost",
    description:
      "Manage your site, updates, \nand resources in one place. Common tasks \nare easy to find, and deeper controls \nare there when you need them, \nnot in the way when you don’t.",
    Icon: SlidersHorizontal
  },
  {
    title: "Everyday protection",
    description:
      "Core security measures run in the \nbackground to help keep your site stable \nand your data intact, without \nconstant intervention.",
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
            title="What your site relies on"
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


