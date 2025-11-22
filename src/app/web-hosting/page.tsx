'use client';

import HostingHeroSection from '@/components/Hosting/HeroSection';
import SetUpHosting from '@/components/Hosting/SetUpHosting';
import BringItTogether from '@/components/Hosting/BringItTogether';
import StayHosting from '@/components/Hosting/StayHosting';
import PickYourHosting from '@/components/Hosting/PickYourHosting';
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
      <HostingHeroSection />

      {/* Diagonal Section Divider */}
      <div className="relative z-20" style={{ backgroundColor: 'rgb(var(--hosting-section-bg))', marginTop: '-40px' }}>
        <svg className="w-full h-24 sm:h-28 md:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: 'block' }}>
          <path d="M0,120L1200,5L1200,120L0,120Z" 
                fill="rgb(var(--hosting-section-bg))" 
                opacity="1" />
        </svg>
      </div>

      {/* Sections with same background for seamless transition */}
      <div style={{ backgroundColor: 'rgb(var(--hosting-section-bg))', position: 'relative', marginTop: '-1px', zIndex: 10, paddingTop: 0 }}>
        {/* Set Up Hosting Section */}
        <SetUpHosting 
        imageSrc="/Hosting/setup.svg"
        imageAlt="WordPress Setup"
      />

      {/* Bring It Together Section */}
      <BringItTogether 
        imageSrc="/Hosting/bringit.svg"
        imageAlt="Bring it all together"
      />

      {/* Stay Hosting Section */}
      <StayHosting 
        imageSrc="/Hosting/stayup.svg"
        imageAlt="Stay up and open"
      />

      {/* Pick Your Hosting Section */}
      <PickYourHosting />

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

