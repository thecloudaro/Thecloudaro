"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import HeaderBanner from "@/components/HeaderBanner";

const NavbarWrapper = () => {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const isVirtualMachine = pathname === '/virtual-machine';
  
  // HeaderBanner content for virtual-machine page
  const virtualMachineBannerText = (
    <>
      <span className="font-semibold">Starlight™ Volumes:</span> get flexible VM storage that scales with you. Learn more
    </>
  );
  
  return (
    <>
      {isHomepage && <HeaderBanner />}
      {isVirtualMachine && <HeaderBanner text={virtualMachineBannerText} />}
      <Navbar />
    </>
  );
};

export default NavbarWrapper;

