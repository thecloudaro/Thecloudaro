// Utility functions for MigrateEmail components
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

// Common style constants
export const migrateEmailStyles = {
  bg: getCSSVariable('migrate-email-simple-bg'),
  textWhite: getCSSVariable('migrate-email-simple-text-white'),
  text85: getCSSVariableRGBA('migrate-email-hero-text-85'),
  heroBg: getCSSVariable('migrate-email-hero-bg'),
  heroText: getCSSVariable('migrate-email-hero-text'),
  heroBrandText: getCSSVariableRGBA('migrate-email-hero-brand-text'),
  purpleGradientFrom: getCSSVariableRGBA('migrate-email-hero-purple-gradient-from'),
  purpleGradientTo: getCSSVariableRGBA('migrate-email-hero-purple-gradient-to'),
};

