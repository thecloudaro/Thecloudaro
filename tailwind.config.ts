import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ✅ Enables .dark class for dark mode
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🔹 Base Colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        cardForeground: "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        popoverForeground: "hsl(var(--popover-foreground))",

        // 🔹 Main Colors
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        // 🔹 Borders & Inputs
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // 🔹 Footer Colors
        footerBg: "hsl(var(--footer-bg))",
        footerText: "hsl(var(--footer-text))",
        footerHeading: "hsl(var(--footer-heading))",
        footerAccent: "hsl(var(--footer-accent))",
        footerBorder: "hsl(var(--footer-border))",

        // 🔹 Sidebar Colors
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        // 🔹 Navbar Links
        "nav-link": {
          DEFAULT: "hsl(var(--nav-link))",
          hover: "hsl(var(--nav-link-hover))",
        },

        // 🔹 Component Colors
        // Header Banner
        "header-banner": {
          bg: "hsl(var(--header-banner-bg))",
          text: "hsl(var(--header-banner-text))",
        },

        // Feature Request Modal
        modal: {
          bg: "hsl(var(--modal-bg))",
          border: "hsl(var(--modal-border))",
          text: "hsl(var(--modal-text))",
          "text-muted": "hsl(var(--modal-text-muted))",
          "text-secondary": "hsl(var(--modal-text-secondary))",
        },

        // Domain Page
        domain: {
          "hero-bg": "hsl(var(--domain-hero-bg))",
          "pages-bg": "hsl(var(--domain-pages-bg))",
          "new-navbar-bg": "hsl(var(--domain-new-navbar-bg))",
          "text-primary": "hsl(var(--domain-text-primary))",
          "text-secondary": "hsl(var(--domain-text-secondary))",
          "button-bg": "hsl(var(--domain-button-bg))",
          "button-text": "hsl(var(--domain-button-text))",
          "border": "hsl(var(--domain-border))",
        },

        // Review Card
        "review-card": {
          bg: "hsl(var(--review-card-bg))",
          border: "hsl(var(--review-card-border))",
          "border-hover": "hsl(var(--review-card-border-hover))",
          text: "hsl(var(--review-card-text))",
          "text-muted": "hsl(var(--review-card-text-muted))",
          success: "hsl(var(--review-card-success))",
        },

        // Web Hosting Card
        "webhosting-card": {
          bg: "hsl(var(--webhosting-card-bg))",
        },

        // Navbar
        navbar: {
          "bg-transparent": "hsl(var(--navbar-bg-transparent))",
          "bg-scrolled": "hsl(var(--navbar-bg-scrolled))",
          "bg-dropdown": "hsl(var(--navbar-bg-dropdown))",
          text: "hsl(var(--navbar-text))",
          "text-hover": "hsl(var(--navbar-text-hover))",
          "icon-bg": "hsl(var(--navbar-icon-bg))",
        },

        // Dropdown
        dropdown: {
          "bg-primary": "hsl(var(--dropdown-bg-primary))",
          "bg-secondary": "hsl(var(--dropdown-bg-secondary))",
          border: "hsl(var(--dropdown-border))",
          "text-primary": "hsl(var(--dropdown-text-primary))",
          "text-secondary": "hsl(var(--dropdown-text-secondary))",
          "text-muted": "hsl(var(--dropdown-text-muted))",
          "hover-bg": "hsl(var(--dropdown-hover-bg))",
          "active-bg": "hsl(var(--dropdown-active-bg))",
          "active-text": "hsl(var(--dropdown-active-text))",
          "active-border": "hsl(var(--dropdown-active-border))",
        },

        // Button
        button: {
          "primary-bg": "hsl(var(--button-primary-bg))",
          "primary-text": "hsl(var(--button-primary-text))",
          "primary-hover": "hsl(var(--button-primary-hover))",
          "secondary-bg": "hsl(var(--button-secondary-bg))",
          "secondary-text": "hsl(var(--button-secondary-text))",
          "secondary-hover": "hsl(var(--button-secondary-hover))",
        },

        // Hero Section
        hero: {
          bg: "hsl(var(--hero-bg))",
          text: "hsl(var(--hero-text))",
          "text-muted": "hsl(var(--hero-text-muted))",
          "search-bg": "hsl(var(--hero-search-bg))",
          "search-border": "hsl(var(--hero-search-border))",
          "tab-bg": "hsl(var(--hero-tab-bg))",
          "price-bg": "hsl(var(--hero-price-bg))",
          "price-border": "hsl(var(--hero-price-border))",
        },

        // Build Around Section
        "buildaround": {
          bg: "hsl(var(--buildaround-bg))",
          text: "hsl(var(--buildaround-text))",
        },

        // Customer Section
        customer: {
          bg: "hsl(var(--customer-bg))",
          text: "hsl(var(--customer-text))",
          "text-muted": "hsl(var(--customer-text-muted))",
          "trustpilot-bg": "hsl(var(--customer-trustpilot-bg))",
          "trustpilot-text": "hsl(var(--customer-trustpilot-text))",
          "trustpilot-star": "hsl(var(--customer-trustpilot-star))",
        },

        // Footer
        footer: {
          "bg-primary": "hsl(var(--footer-bg-primary))",
          "bg-secondary": "hsl(var(--footer-bg-secondary))",
          "text-primary": "hsl(var(--footer-text-primary))",
          "text-secondary": "hsl(var(--footer-text-secondary))",
          "text-muted": "hsl(var(--footer-text-muted))",
          border: "hsl(var(--footer-border))",
          accent: "hsl(var(--footer-accent))",
          "social-bg": "hsl(var(--footer-social-bg))",
          "social-hover": "hsl(var(--footer-social-hover))",
          "payment-bg": "hsl(var(--footer-payment-bg))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      fontFamily: {
        sans: ["var(--font-sans, Inter)", "Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
