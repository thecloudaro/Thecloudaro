"use client";

import RoadmapHero from "@/components/RoadMap/RoadmapHero";

export default function RoadmapPage() {
  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: 'rgb(var(--roadmap-hero-bg))' }}
    >
      <RoadmapHero />
    </div>
  );
}

