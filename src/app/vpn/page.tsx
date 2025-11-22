"use client";

import VpnHero from "@/components/Vpn/VpnHero";
import Stream from "@/components/Vpn/Stream";
import OneClick from "@/components/Vpn/OneClick";
import YourPrivacy from "@/components/Vpn/YourPrivacy";
import SetYourself from "@/components/Vpn/SetYourself";
import Dedicated from "@/components/Vpn/Dedicated";
import Choose from "@/components/Vpn/Choose";
import Freedom from "@/components/Vpn/Freedom";
import More from "@/components/Vpn/More";
import Uncompromising from "@/components/Vpn/Uncompromising";
import Accelerate from "@/components/Vpn/Accelerate";
import YourTrusted from "@/components/Vpn/YourTrusted";
import FAQvpn from "@/components/Vpn/FAQvpn";

export default function VPNPage() {
  return (
    <div className="min-h-screen">
      <VpnHero />
      <Stream />
      <OneClick />
      <YourPrivacy />
      <SetYourself />
      <Dedicated />
      <Choose />
      <Freedom />
      <More />
      <Uncompromising />
      <Accelerate />
      <YourTrusted />
      <FAQvpn />
    </div>
  );
}

