'use client';

import { useRef, useCallback } from 'react';
import WordPressHero from '@/components/WordPressHosting/WordPressHero';
import NoStress from '@/components/WordPressHosting/NoStress';
import Easily from '@/components/WordPressHosting/Easily';
import SuperSecure from '@/components/WordPressHosting/SuperSecure';
import Optimized from '@/components/WordPressHosting/Optimized';
import CloudHosting from '@/components/WordPressHosting/CloudHosting';
// import AllInOne from '@/components/WordPressHosting/All-in_one';
// import EasyWp from '@/components/WordPressHosting/EasyWp';
import UniqueLayers from '@/components/WordPressHosting/UniqueLayers';
import { ChooseWP } from '@/components/WordPressHosting/ChooseWP';
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
      <CloudHosting ref={cloudHostingRef} onCompareClick={handleCompareClick} />
      <UniqueLayers />
      <ChooseWP ref={chooseWPRef} />
      <FAQWP/>
      
    
    </div>
  );
};

export default WordPressHostingPage;


