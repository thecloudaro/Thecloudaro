'use client';

import { useRef, useCallback } from 'react';
import HostingHeroSection from '@/components/Hosting/HeroSection';
import StayHosting from '@/components/Hosting/StayHosting';
import { PickYourHosting } from '@/components/Hosting/PickYourHosting';
import BuildAtHosting from '@/components/Hosting/BuildAtHosting';
import BeSecureHosting from '@/components/Hosting/BeSecureHosting';
import MigrateHosting from '@/components/Hosting/MigrateHosting';
import ToolHosting from '@/components/Hosting/ToolHosting';
import AutoBackupSection from '@/components/Hosting/AutoBackupSection';
import FrequentlyBT from '@/components/Hosting/FrequentlyBT';
import ChooseHosting from '@/components/Hosting/ChooseHosting';
import FAQWebHosting from '@/components/Hosting/FAQWebHosting';
import Disclaimers from '@/components/Hosting/Disclaimers';

export default function HostingPage() {
  const pickYourHostingRef = useRef<HTMLElement>(null);

  const handleChoosePlanClick = useCallback(() => {
    if (pickYourHostingRef.current) {
      pickYourHostingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div
     className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'rgb(var(--hosting-bg))', boxShadow: 'none', marginTop: 0, paddingTop: 0 }}
     >




      
      {/* Gradient Background - Soft teal in top-right corner, blending into deep gray - visible behind navbar, starts from top */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 100% 70% at top right, rgba(var(--hosting-gradient-teal-rgba), 0.5) 0%, rgba(var(--hosting-gradient-teal-rgba), 0.35) 8%, rgba(var(--hosting-gradient-teal-rgba), 0.25) 15%, rgba(var(--hosting-gradient-teal-rgba), 0.15) 25%, rgba(var(--hosting-gradient-teal-rgba), 0.08) 35%, rgba(var(--hosting-gradient-teal-rgba), 0.03) 50%, transparent 70%, rgb(var(--hosting-bg)) 100%)`,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none'
        }}
      />
      
      {/* Hero Section */}
      <HostingHeroSection onChoosePlanClick={handleChoosePlanClick} />

      {/* Diagonal Section Divider */}
      <div className="relative" style={{ zIndex: 20, backgroundColor: 'rgb(var(--hosting-bg))' }}>
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120L1200,5L1200,120L0,120Z" 
                fill="rgb(var(--hosting-section-bg))" 
                opacity="1" />
        </svg>
      </div>

      {/* Sections with same background for seamless transition */}
      <div style={{ backgroundColor: 'rgb(var(--hosting-section-bg))', position: 'relative', marginTop: '-1px', zIndex: 10, paddingTop: 0 }}>
      {/* Stay Hosting Section */}
      <StayHosting 
        imageSrc="/Hosting/stayup.svg"
        imageAlt="Stay up and open"
      />

      {/* Pick Your Hosting Section */}
      <PickYourHosting ref={pickYourHostingRef} />

      {/* Build At Hosting Section */}
      <BuildAtHosting />

      {/* Be Secure Hosting Section */}
      <BeSecureHosting />

      {/* Migrate Hosting Section */}
      <MigrateHosting />

      {/* Tool Hosting Section */}
      <ToolHosting />

      {/* Choose Hosting Section */}
      <ChooseHosting />

      {/* AutoBackup Section */}
      <AutoBackupSection />

      {/* Frequently Bought Together Section */}
      <FrequentlyBT />

      {/* FAQ Section */}
      <FAQWebHosting />

      {/* Disclaimers Section */}
      <Disclaimers />
      </div>
    </div>
  );
}



