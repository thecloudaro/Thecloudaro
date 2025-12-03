"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import HeaderBanner from "@/components/HeaderBanner";
import { DropdownProvider, useDropdown } from "./DropdownContext";

  const NavbarContent = () => {
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const isVirtualMachine = pathname === '/virtual-machine';
  const { activeDropdown } = useDropdown();
  
  const hasHeaderBanner = !activeDropdown && (isHomepage || isVirtualMachine);

  // HeaderBanner content for virtual-machine page
  const virtualMachineBannerText = (
    <>
      <span className="font-semibold">Starlight™ Volumes:</span> get flexible VM storage that scales with you. Learn more
    </>
  );
  
  // Get page background for wrapper to prevent html background showing through navbar area
  const getWrapperBackground = () => {
    const isSecurityPage = pathname?.includes('/security');
    const isVpnPage = pathname?.includes('/vpn');
    const isHostingPage = pathname?.includes('/hosting') && !pathname?.includes('/migration-to-thecloudaro');
    const isWordPressPage = pathname?.includes('/hosting-for-wordpress');
    const isVirtualMachinePage = pathname?.includes('/virtual-machine');
    const isCdnPage = pathname?.includes('/cdn');
    const isBusinessEmailPage = pathname?.includes('/business-email');
    const isDomainPage = pathname?.includes('/domain');
    const isTransferPage = pathname?.includes('/transfer');
    const isRoadmapPage = pathname?.includes('/roadmap');
    const isMigrationPage = pathname?.includes('/migration-to-thecloudaro');
    
    if (isHomepage) return 'transparent';
    if (isSecurityPage) return 'rgb(var(--security-bg))';
    if (isVpnPage) return 'rgb(var(--vpn-section-bg))';
    if (isHostingPage || isWordPressPage) return 'rgb(var(--hosting-bg))';
    if (isVirtualMachinePage) return 'rgb(var(--virtual-machine-hero-bg))';
    if (isCdnPage) return 'rgb(var(--cdn-hero-bg))';
    if (isBusinessEmailPage) return 'rgb(var(--business-email-page-bg))';
    if (isDomainPage || isTransferPage) return 'transparent';
    if (isRoadmapPage) return 'rgb(17 24 39)';
    if (isMigrationPage) return 'rgb(var(--migration-page-bg))';
    return 'transparent';
  };
  
  return (
    <div style={{ backgroundColor: getWrapperBackground() }}>
      {/* Hide HeaderBanner when dropdown is open */}
      {hasHeaderBanner && (
        <HeaderBanner text={isVirtualMachine ? virtualMachineBannerText : undefined} />
      )}
      <Navbar hasHeaderBanner={hasHeaderBanner} />
    </div>
  );
};
const NavbarWrapper = () => {
  return (
    <DropdownProvider>
      <NavbarContent />
    </DropdownProvider>
  );
};

export default NavbarWrapper;

