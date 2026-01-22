// Type declarations for Upmind Domain Availability Checker Widget
declare namespace JSX {
  interface IntrinsicElements {
    'upm-dac': {
      'order-config-url': string;
      'currency-code': string;
    };
  }
}

declare global {
  interface Window {
    UpmDac?: any;
  }
}

export {};
