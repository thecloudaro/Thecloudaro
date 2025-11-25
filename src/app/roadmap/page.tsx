"use client";

import RoadmapHero from "@/components/RoadMap/RoadmapHero";
import Vote from "@/components/RoadMap/Vote";
import ShootFor from "@/components/RoadMap/ShootFor";

export default function RoadmapPage() {
  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: 'rgb(17 24 39)' }}
    >
      <RoadmapHero />
      <Vote />
      <ShootFor />
    </div>
  );
}

