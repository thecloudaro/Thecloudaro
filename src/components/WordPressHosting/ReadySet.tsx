"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  PenSquare,
  ShoppingBag,
  ContactRound,
  BriefcaseBusiness
} from "lucide-react";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

type TemplateKey = "blog" | "ecommerce" | "portfolio" | "business";

const templates: Record<
  TemplateKey,
  {
    title: string;
    description: string;
    image: string;
    Icon: typeof PenSquare;
  }
> = {
  blog: {
    title: "Blog",
    description:
      "Easily share your ideas, thoughts, and experiences with the<br/>world. Increase your visibility without the technical know-how.",
    image: "/WordPress/blog.png",
    Icon: PenSquare
  },
  ecommerce: {
    title: "E-commerce",
    description:
      "Enter the digital marketplace with ease and without<br/>breaking the bank. Add new products and features as your business grows.",
    image: "/WordPress/Ecommerce.png",
    Icon: ShoppingBag
  },
  portfolio: {
    title: "Portfolio & CV",
    description:
      "Highlight your skills with polished templates designed to<br/>impress clients and recruiters alike.",
    image: "/WordPress/Portfolio.png",
    Icon: ContactRound
  },
  business: {
    title: "Business & Services",
    description:
      "Build authority for your services with ready-to-launch<br/>layouts that keep your audience informed and engaged.",
    image: "/WordPress/Business.png",
    Icon: BriefcaseBusiness
  }
};

const categories: TemplateKey[] = ["blog", "ecommerce", "portfolio", "business"];

const ReadySet = () => {
  const [active, setActive] = useState<TemplateKey>("blog");

  const current = useMemo(() => templates[active], [active]);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24" style={{ backgroundColor: 'rgb(var(--wp-readyset-bg))', color: 'rgb(var(--wp-readyset-heading))' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center">
          <ContentHeading
            title="Ready, set, go with pre-<br/>made WordPress themes"
            className="!text-[2.75rem] sm:!text-[3.5rem] md:!text-[4.5rem] font-[600] !text-[rgb(var(--wp-readyset-heading))]"
          />

          <div className="mt-6 flex justify-center">
            <ContentDescription
              size="lg"
              className="max-w-3xl sm:text-xl leading-relaxed !text-[rgb(var(--wp-readyset-description))]"
            >
              Make everything even easier with our pre-designed themes, or use
              third-party plugins to customize your website.
            </ContentDescription>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 flex flex-col gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:items-stretch">
          <div className="flex w-full flex-col justify-between lg:max-w-lg lg:pt-16 mr-20">
            <div className="space-y-6">
              {categories.map((key) => {
                const { title, description, Icon } = templates[key];
                const isActive = key === active;

                return (
                  <button
                    key={key}
                    onClick={() => setActive(key)}
                    className="w-full text-left transition"
                    style={{ 
                      color: isActive ? 'rgb(var(--wp-readyset-button-active))' : 'rgb(var(--wp-readyset-button-inactive))'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgb(var(--wp-readyset-button-active))';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgb(var(--wp-readyset-button-inactive))';
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {isActive ? (
                        <Icon className="h-5 w-5" style={{ color: 'rgb(var(--wp-readyset-icon))' }} />
                      ) : null}
                      <span
                        className={`font-semibold transition ${
                          isActive ? "text-xl" : "text-base"
                        }`}
                      >
                        {title}
                      </span>
                    </div>
                    {isActive ? (
                      <p
                        className="mt-3 text-base"
                        style={{ color: 'rgb(var(--wp-readyset-active-desc))' }}
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex gap-2 lg:mt-16">
              {categories.map((key) => {
                const isActive = key === active;
                return (
                  <span
                    key={key}
                    className="h-2 w-2 rounded-full transition"
                    style={{ 
                      backgroundColor: isActive ? 'rgb(var(--wp-readyset-dot-active))' : 'rgba(var(--wp-readyset-dot-inactive))'
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="relative flex w-full items-center justify-center lg:flex-1">
            <div className="relative h-full w-full max-w-[920px] lg:max-w-[1180px]">
              <Image
                key={current.image}
                src={current.image}
                alt={current.title}
                width={2200}
                height={1650}
                className="h-full w-full rounded-md border object-cover transition duration-500"
                style={{
                  borderColor: 'rgba(var(--wp-readyset-image-border))',
                  backgroundColor: 'rgb(var(--wp-readyset-image-bg))',
                  boxShadow: `0 24px 80px rgba(var(--wp-readyset-image-shadow))`
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

export default ReadySet;


