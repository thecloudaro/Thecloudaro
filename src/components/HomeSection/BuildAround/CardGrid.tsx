"use client";

import WebHostingCard from "./WebHostingCard";
import EasyWPCard from "./EasyWPCard";
import StarlightCard from "./StarlightCard";
import SpacemailCard from "./SpacemailCard";

const CardGrid = () => {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* First Row - Web Hosting Card */}
      <WebHostingCard />

      {/* Second Row - EasyWP and Starlight Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <EasyWPCard />
        <StarlightCard />
      </div>

      {/* Third Row - Spacemail Card */}
      <SpacemailCard />
    </div>
  );
};

export default CardGrid;
