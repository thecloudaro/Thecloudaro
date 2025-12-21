"use client";

import { useRef, useEffect } from 'react';
import BusinessHero from "@/components/BusinessEmail/BusinessHero";
import Productivity from "@/components/BusinessEmail/Productivity";
import GetSecurity from "@/components/BusinessEmail/GetSecurity";
import ChooseYourBusiness from "@/components/BusinessEmail/ChooseYourBusiness";
import Design from "@/components/BusinessEmail/Design";
import SecureBy from "@/components/BusinessEmail/SecureBy";
import MakeEmail from "@/components/BusinessEmail/MakeEmail";
import BringYourEmails from "@/components/BusinessEmail/BringYourEmails";
import TheEssential from "@/components/BusinessEmail/TheEssential";
import ValueBeyond from "@/components/BusinessEmail/ValueBeyond";
import YourSmarter from "@/components/BusinessEmail/YourSmarter";
import ComparePlan from "@/components/BusinessEmail/ComparePlan";
import FAQEmail from "@/components/BusinessEmail/FAQEmail";

const BusinessEmailPage = () => {
  const chooseYourBusinessRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.location.hash === '#choose-your-business' && chooseYourBusinessRef.current) {
      chooseYourBusinessRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: 'rgb(var(--business-email-page-bg))' }}>
      <BusinessHero />
      <Productivity />
      <GetSecurity />
      <ChooseYourBusiness ref={chooseYourBusinessRef} />
      <Design />
      <SecureBy />
      <MakeEmail />
      <BringYourEmails />
      <TheEssential />
      <ValueBeyond />
      <YourSmarter />
      <ComparePlan />
      <FAQEmail />
    </div>
  );
};

export default BusinessEmailPage;

