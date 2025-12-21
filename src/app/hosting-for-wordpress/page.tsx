'use client';

import { useRef, useCallback } from 'react';
import WordPressHero from '@/components/WordPressHosting/WordPressHero';
import NoStress from '@/components/WordPressHosting/NoStress';
import Easily from '@/components/WordPressHosting/Easily';
import SuperSecure from '@/components/WordPressHosting/SuperSecure';
import Optimized from '@/components/WordPressHosting/Optimized';
import ReadySet from '@/components/WordPressHosting/ReadySet';
import CloudHosting from '@/components/WordPressHosting/CloudHosting';
import AllInOne from '@/components/WordPressHosting/All-in_one';
import EasyWp from '@/components/WordPressHosting/EasyWp';
import UniqueLayers from '@/components/WordPressHosting/UniqueLayers';
import FreeWebsite from '@/components/WordPressHosting/FreeWebsite';
import { ChooseWP } from '@/components/WordPressHosting/ChooseWP';
import FrequentlyBTWP from '@/components/WordPressHosting/FrequentlyBTWP';
import FAQWP from '@/components/WordPressHosting/FAQWP';



const WordPressHostingPage = () => {
  const cloudHostingRef = useRef<HTMLElement>(null);
  const chooseWPRef = useRef<HTMLElement>(null);

  const handlePickPlanClick = useCallback(() => {
    if (cloudHostingRef.current) {
      cloudHostingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleCompareClick = useCallback(() => {
    if (chooseWPRef.current) {
      chooseWPRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(var(--hosting-bg))' }}>
      <WordPressHero onPickPlanClick={handlePickPlanClick} />
      <NoStress />
      <Easily />
      <SuperSecure />
      <Optimized />
      <ReadySet />
      <CloudHosting ref={cloudHostingRef} onCompareClick={handleCompareClick} />
      <AllInOne />
      <EasyWp />
      <UniqueLayers />
      <FreeWebsite />
      <ChooseWP ref={chooseWPRef} />
      <FrequentlyBTWP />
      <FAQWP/>
      
    
    </div>
  );
};

export default WordPressHostingPage;


