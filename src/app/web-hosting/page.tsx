'use client';

import Navbar from '@/components/Navbar/Navbar';
import HeaderBanner from '@/components/HeaderBanner';
import HostingHeroSection from '@/components/Hosting/HeroSection';
import SetUpHosting from '@/components/Hosting/SetUpHosting';
import BringItTogether from '@/components/Hosting/BringItTogether';
import StayHosting from '@/components/Hosting/StayHosting';

export default function HostingPage() {
  return (
    <div
     className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'rgb(var(--hosting-bg))', boxShadow: 'none' }}
     >
      {/* Gradient Background - Soft teal in top-right corner, blending into deep gray - visible behind navbar */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 100% 70% at top right, rgba(20, 100, 120, 0.5) 0%, rgba(20, 100, 120, 0.3) 15%, rgba(20, 100, 120, 0.1) 30%, rgba(20, 100, 120, 0.03) 50%, transparent 70%, rgb(var(--hosting-bg)) 100%)'
        }}
      />
      
      {/* Static Header Banner and Navbar at top */}
      <div className="relative z-50" style={{ boxShadow: 'none' }}>
        {/* Header Banner with dynamic content */}
        <HeaderBanner 
          text="Get stronger site security with Imunify360, now included with Web Hosting"
          backgroundColor="#001b55"
        />
        
        {/* Navbar with transparent background */}
        <Navbar hideBanner={true} />
      </div>
      
      {/* Hero Section */}
      <HostingHeroSection />

      {/* Diagonal Section Divider */}
      <div className="relative">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120 L1200,0 L1200,120 Z" 
                fill="#1a1a1a" 
                opacity="1" />
        </svg>
      </div>

      {/* Set Up Hosting Section */}
      <SetUpHosting 
        imageSrc="/HostingSvg/setup.svg"
        imageAlt="WordPress Setup"
      />

      {/* Bring It Together Section */}
      <BringItTogether 
        imageSrc="/HostingSvg/bringit.svg"
        imageAlt="Bring it all together"
      />

      {/* Stay Hosting Section */}
      <StayHosting 
        imageSrc="/HostingSvg/stayup.svg"
        imageAlt="Stay up and open"
      />
    </div>
  );
}

