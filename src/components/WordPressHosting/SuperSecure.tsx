"use client";

import ContentHeading from "@/components/ui/content-heading";
import ContentDescription from "@/components/ui/content-description";

const SuperSecure = () => {
  return (
    <section
      className="relative overflow-hidden py-32"
      style={{
        backgroundImage: "url('/WordPress/NoStressBg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "520px",
        color: 'rgb(var(--wp-nostress-heading))'
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl justify-end mr-20">
        <div className="w-full max-w-2xl space-y-3 text-left">
          <ContentHeading
            title="Super secure"
            className="!text-[2.75rem] sm:!text-[3rem] font-bold !text-[rgb(var(--wp-nostress-heading))]"
          />

          <ContentDescription
            size="lg"
            className="sm:text-xl leading-relaxed !text-[rgb(var(--wp-nostress-description))]"
          >
            Enjoy worry-free hosting for WordPress with<br />
            our Guardian suite of security tools like<br />
            HackGuardian and MalwareGuardian.
          </ContentDescription>

          
        </div>
      </div>
    </section>
  );
};

export default SuperSecure;


