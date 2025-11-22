"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";
import { Lock, Infinity, Server, BarChart3 } from "lucide-react";

const features = [
  {
    title: "SSL certificates",
    description:
      "FreeSSL, with no renewal fee and issued \n by Let’s Encrypt, or PositiveSSL, free for \n the first year then $4.99/year, issued by \n Sectigo.",
    Icon: Lock
  },
  {
    title: "Unmetered bandwidth",
    description: "Get all the traffic and none of the limits.",
    Icon: Infinity
  },
  {
    title: "LiteSpeed web server",
    description: "Enjoy extra speed with a high-performance \n server.",
    Icon: Server
  },
  {
    title: "Scalable plans",
    description: "Add all the power and tools you need in an \n instant.",
    Icon: BarChart3
  }
];

const BeSecureHosting = () => {
  return (
    <section
      className="relative w-full py-24"
      style={{ backgroundColor: "rgb(var(--hosting-section-bg))" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="text-center space-y-5">
          <ContentHeading
            title={"Be secure with web\nhosting"}
            className="!text-5xl sm:!text-[3.75rem] md:!text-[4.75rem] lg:!text-[4.50rem] whitespace-pre-line"
          />
        </div>

        <div className="grid gap-y-14 gap-x-2 md:grid-cols-2 pt-20">
          {features.map(({ title, description, Icon }) => (
            <div key={title} className="flex flex-col items-center text-center gap-5">
              <Icon className="w-10 h-10 text-[rgb(var(--hosting-text-white))]" strokeWidth={1.8} />
              <h3 className="text-2xl font-semibold text-[rgb(var(--hosting-text-white))]">{title}</h3>
              <ContentDescription
                text={description.replace(/\. /g, ".\n")}
                size="md"
                className="text-[rgb(var(--hosting-choose-text-gray-400))] max-w-md whitespace-pre-line"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeSecureHosting;


