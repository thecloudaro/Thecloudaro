// Utility functions for VirtualMachine components
import React from 'react';

export const getCSSVariable = (varName: string) => `rgb(var(--${varName}))`;
export const getCSSVariableRGBA = (varName: string) => `rgba(var(--${varName}))`;

export const createHoverHandler = (styles: { [key: string]: string }) => ({
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
    const style = e.currentTarget.style as CSSStyleDeclaration & { [key: string]: string };
    Object.entries(styles).forEach(([prop, value]) => {
      style[prop] = value;
    });
  },
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
    const style = e.currentTarget.style as CSSStyleDeclaration & { [key: string]: string };
    Object.entries(styles).forEach(([prop]) => {
      style[prop] = '';
    });
  }
});

// Common style constants for VirtualMachine
export const virtualMachineStyles = {
  heroBg: getCSSVariable('virtual-machine-hero-bg'),
  sectionBg: getCSSVariable('virtual-machine-section-bg'),
  heroText: getCSSVariable('virtual-machine-hero-text'),
  heroText70: getCSSVariableRGBA('virtual-machine-hero-text-70'),
  heroText85: getCSSVariableRGBA('virtual-machine-hero-text-85'),
  textDeepGray: getCSSVariable('virtual-machine-text-deep-gray'),
  textGray: getCSSVariable('virtual-machine-text-gray'),
  billingBg: getCSSVariable('virtual-machine-billing-bg'),
  billingText: getCSSVariable('virtual-machine-billing-text'),
  billingSelectedBg: getCSSVariable('virtual-machine-billing-selected-bg'),
  billingSelectedText: getCSSVariable('virtual-machine-billing-selected-text'),
  billingContainerBg: getCSSVariableRGBA('virtual-machine-billing-container-bg'),
  cardBg: getCSSVariable('virtual-machine-card-bg'),
  cardText: getCSSVariable('virtual-machine-card-text'),
  cardTextGray: getCSSVariable('virtual-machine-card-text-gray'),
  cardButtonBg: getCSSVariable('virtual-machine-card-button-bg'),
  cardButtonText: getCSSVariable('virtual-machine-card-button-text'),
  popularBadgeBg: getCSSVariable('virtual-machine-popular-badge-bg'),
  popularBadgeText: getCSSVariable('virtual-machine-popular-badge-text'),
  tableRowBg: getCSSVariable('virtual-machine-table-row-bg'),
  borderColor: getCSSVariableRGBA('virtual-machine-border-color'),
  linkBlue: getCSSVariable('virtual-machine-link-blue'),
  buttonBg: getCSSVariable('virtual-machine-button-bg'),
  buttonHoverBg: getCSSVariable('virtual-machine-button-hover-bg'),
  buttonText: getCSSVariable('virtual-machine-button-text'),
};

