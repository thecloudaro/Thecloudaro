"use client";

import Image from "next/image";
import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const BringYourEmails = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 text-[rgb(var(--hosting-text-white))]" style={{ background: 'linear-gradient(to right, rgb(var(--business-bring-gradient-from)), rgb(var(--business-bring-gradient-to)))' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-8 sm:gap-10 md:gap-12 items-center lg:grid-cols-2">
          {/* Left Side - Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[600px]">
              <Image
                src="/businessEmail/BringYour.webp"
                alt="Person walking with emails"
                width={700}
                height={700}
                className="h-auto w-full object-contain rounded-full"
                priority
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 text-left">
            <ContentHeading
              title="Bring your emails<br/>with you"
              className="text-[rgb(var(--hosting-text-white))] !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl font-bold"
            />

            <ContentDescription
              size="xl"
              className="text-[rgb(var(--hosting-text-white))] text-base sm:text-lg md:text-xl lg:text-2xl"
            >
              Migrating your emails into Spacemail is quick, easy, and free. Use our built-in migration tool to transfer your emails in just a few steps.
            </ContentDescription>

            <button 
              className="mt-6 rounded-lg px-8 py-3 text-base font-semibold transition hover:shadow-lg"
              style={{
                backgroundColor: 'rgb(var(--business-bring-button-bg))',
                color: 'rgb(var(--business-bring-button-text))'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(var(--business-bring-button-hover))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(var(--business-bring-button-bg))';
              }}
            >
              Migrate now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BringYourEmails;

