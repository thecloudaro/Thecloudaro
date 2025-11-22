'use client';

import VirtualHero from '@/components/VirtualMachine/VirtualHero';
import TakeEffortless from '@/components/VirtualMachine/TakeEffortless';
import PushYour from '@/components/VirtualMachine/PushYour';
import Flexible from '@/components/VirtualMachine/Flexible';
import GetStarted from '@/components/VirtualMachine/GetStarted';
import Develop from '@/components/VirtualMachine/Develop';
import Configure from '@/components/VirtualMachine/Configure';
import PayAs from '@/components/VirtualMachine/PayAs';
import Expand from '@/components/VirtualMachine/Expand';
import FAQVirtual from '@/components/VirtualMachine/FAQVirtual';

export default function VirtualMachinePage() {
  return (
    <div className="min-h-screen">
      <VirtualHero />
      <TakeEffortless />
      <PushYour />
      <Flexible />
      <GetStarted />
      <Develop />
      <Configure />
      <PayAs />
      <Expand />
      <FAQVirtual />
    </div>
  );
}

