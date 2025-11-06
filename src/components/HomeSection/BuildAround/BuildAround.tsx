"use client";

import HeaderSection from "./HeaderSection";
import CardGrid from "./CardGrid";

const BuildAroundDomain = () => {
  return (
    <section className="bg-buildaround-bg text-buildaround-text py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        <HeaderSection />
        <CardGrid />
      </div>
    </section>
  );
};

export default BuildAroundDomain;
