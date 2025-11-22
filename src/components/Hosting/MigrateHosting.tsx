"use client";

import Link from "next/link";
import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const MigrateHosting = () => {
  return (
    <section
      className="relative w-full py-24"
      style={{ backgroundColor: "rgb(var(--hosting-section-bg))" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <ContentHeading
            title={"Migrate to The Cloud Aro hosting"}
            className="!text-4xl sm:!text-[3rem] md:!text-[3.75rem] whitespace-pre-line"
          />
          <ContentDescription
            text="It's free and easy to do."
            size="xl"
            className="text-[rgb(var(--hosting-choose-text-gray-300))]"
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-center pt-18">
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-xl rounded-lg bg-[rgb(var(--hosting-migrate-card-bg))] p-10 border border-[rgb(var(--hosting-migrate-card-border))]">
              <Image
                src="/Hosting/Migrate.avif"
                alt="Upload your cPanel backup"
                width={640}
                height={420}
                className="w-full h-auto rounded-2xl"
                priority
              />
            </div>
          </div>

          <div className="space-y-6 text-left">
            <ContentHeading
              title="Run your own migration"
              className="!text-[2rem] sm:!text-[2.3rem] md:!text-[3.10rem]"
            />
            <ContentDescription
              text={`It just takes a few steps to complete migration.\nWhen you Unbox™ your Spaceship Hosting, select\n 'Migrate your web hosting'. Then upload your \
                \ncPanel backup file from your existing account.`}
              size="lg"
              className="text-[rgb(var(--hosting-choose-text-gray-300))] whitespace-pre-line max-w-xl"
            />
            <Link
              href="#"
              className="!text-[rgb(var(--hosting-migrate-link))] text-lg font-semibold hover:!underline hover:!decoration-[rgb(var(--hosting-migrate-link))]"
            >
              Choose your plan
            </Link>
          </div>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 items-center pt-10">
          <div className="space-y-6 text-left">
            <ContentHeading
              title="Save time and money"
              className="!text-[2rem] sm:!text-[2.3rem] md:!text-[3.10rem]"
            />
            <ContentDescription
              text="Migration is quick, easy, and it won't cost you a thing. Keep control of your data and get your migration done in a few simple stages."
              size="lg"
              className="text-[rgb(var(--hosting-choose-text-gray-300))] max-w-xl"
            />
            <Link
              href="#"
              className="!text-[rgb(var(--hosting-migrate-link))] text-lg font-semibold hover:!underline hover:!decoration-[rgb(var(--hosting-migrate-link))] inline-flex items-center gap-2"
            >
              Learn about migration
             
            </Link>
            <span aria-hidden="true" className="text-[rgb(var(--hosting-migrate-link))] ml-2">→</span>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-xl rounded-lg overflow-hidden border border-[rgb(var(--hosting-migrate-image-border))] bg-[rgb(var(--hosting-migrate-image-bg))]">
              <Image
                src="/Hosting/savetime.png"
                alt="Save time and money dashboard"
                width={640}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MigrateHosting;


