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
          "star-filled": "hsl(var(--review-card-star-filled))",
          "star-empty-stroke": "hsl(var(--review-card-star-empty-stroke))",
          "title-text": "hsl(var(--review-card-title-text))",
          "review-text": "hsl(var(--review-card-review-text))",
          "name-text": "hsl(var(--review-card-name-text))",
          shadow: "hsl(var(--review-card-shadow))",
        },

        // Navbar
        navbar: {
          "bg-transparent": "hsl(var(--navbar-bg-transparent))",
          "bg-scrolled": "hsl(var(--navbar-bg-scrolled))",
          "bg-dropdown": "hsl(var(--navbar-bg-dropdown))",
          "bg-hover": "hsl(var(--navbar-bg-hover))",
          text: "hsl(var(--navbar-text))",
          "text-default": "hsl(var(--navbar-text-default))",
          "text-active": "hsl(var(--navbar-text-active))",
          "text-hover": "hsl(var(--navbar-text-hover))",
          "text-slate": "hsl(var(--navbar-text-slate))",
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

        // Hero Button Component
        "hero-button": {
          "active-bg": "hsl(var(--hero-button-active-bg))",
          "active-text": "hsl(var(--hero-button-active-text))",
          "active-hover-bg": "hsl(var(--hero-button-active-hover-bg))",
          "inactive-text": "hsl(var(--hero-button-inactive-text))",
          "inactive-hover-text": "hsl(var(--hero-button-inactive-hover-text))",
          "inactive-hover-bg": "hsl(var(--hero-button-inactive-hover-bg))",
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
          "section-search-icon": "hsl(var(--hero-section-search-icon))",
          "section-search-button-bg": "hsl(var(--hero-section-search-button-bg))",
          "section-search-button-hover-bg": "hsl(var(--hero-section-search-button-hover-bg))",
          "section-search-button-text": "hsl(var(--hero-section-search-button-text))",
        },

        // Build Around Section
        "buildaround": {
          bg: "hsl(var(--buildaround-bg))",
          text: "hsl(var(--buildaround-text))",
          "heading-text": "hsl(var(--buildaround-heading-text))",
          "paragraph-text": "hsl(var(--buildaround-paragraph-text))",
          "seeplan-bg": "hsl(var(--buildaround-seeplan-bg))",
          "seeplan-text": "hsl(var(--buildaround-seeplan-text))",
          "seeplan-hover-bg": "hsl(var(--buildaround-seeplan-hover-bg))",
          "seeplan-focus-ring": "hsl(var(--buildaround-seeplan-focus-ring))",
        },
        
        // EasyWP Card Component
        "easywp-card": {
          bg: "hsl(var(--easywp-card-bg))",
          "gradient-from": "hsl(var(--easywp-card-gradient-from))",
          "gradient-to": "hsl(var(--easywp-card-gradient-to))",
          "gradient-overlay-from": "hsl(var(--easywp-card-gradient-overlay-from))",
          "gradient-overlay-to": "hsl(var(--easywp-card-gradient-overlay-to))",
          badge: "hsl(var(--easywp-card-badge))",
          text: "hsl(var(--easywp-card-text))",
          "text-muted": "hsl(var(--easywp-card-text-muted))",
        },
        
        // Spacemail Card Component
        "spacemail-card": {
          bg: "hsl(var(--spacemail-card-bg))",
          "gradient-from": "hsl(var(--spacemail-card-gradient-from))",
          "gradient-to": "hsl(var(--spacemail-card-gradient-to))",
          "gradient-overlay-from": "hsl(var(--spacemail-card-gradient-overlay-from))",
          "gradient-overlay-to": "hsl(var(--spacemail-card-gradient-overlay-to))",
          badge: "hsl(var(--spacemail-card-badge))",
          text: "hsl(var(--spacemail-card-text))",
          "text-muted": "hsl(var(--spacemail-card-text-muted))",
        },
        
        // Starlight Card Component
        "starlight-card": {
          bg: "hsl(var(--starlight-card-bg))",
          "header-bg": "hsl(var(--starlight-card-header-bg))",
          badge: "hsl(var(--starlight-card-badge))",
          text: "hsl(var(--starlight-card-text))",
          "text-muted": "hsl(var(--starlight-card-text-muted))",
        },
        
        // WebHosting Card Component
        "webhosting-card": {
          "main-bg": "hsl(var(--webhosting-card-main-bg))",
          "gradient-from": "hsl(var(--webhosting-card-gradient-from))",
          "gradient-via": "hsl(var(--webhosting-card-gradient-via))",
          "gradient-to": "hsl(var(--webhosting-card-gradient-to))",
          text: "hsl(var(--webhosting-card-text))",
          "text-muted": "hsl(var(--webhosting-card-text-muted))",
        },
        
        // Chat Button Component
        "chat-button": {
          bg: "hsl(var(--chat-button-bg))",
          "hover-bg": "hsl(var(--chat-button-hover-bg))",
          text: "hsl(var(--chat-button-text))",
        },

        // Customer Section
        customer: {
          bg: "hsl(var(--customer-bg))",
          text: "hsl(var(--customer-text))",
          "text-muted": "hsl(var(--customer-text-muted))",
          "trustpilot-bg": "hsl(var(--customer-trustpilot-bg))",
          "trustpilot-text": "hsl(var(--customer-trustpilot-text))",
          "trustpilot-star": "hsl(var(--customer-trustpilot-star))",
          "gradient-from": "hsl(var(--customer-gradient-from))",
          "gradient-via": "hsl(var(--customer-gradient-via))",
        },

        // About Page
        about: {
          // Shoot Component
          shoot: {
            bg: "rgb(var(--about-shoot-bg))",
            "button-bg": "rgb(var(--about-shoot-button-bg))",
            "button-bg-hover": "rgb(var(--about-shoot-button-bg-hover))",
            "button-text": "rgb(var(--about-shoot-button-text))",
            text: "rgb(var(--about-shoot-text))",
          },
          // Rated Component
          rated: {
            "trustpilot-bg": "rgb(var(--about-rated-trustpilot-bg))",
            "trustpilot-text": "rgb(var(--about-rated-trustpilot-text))",
            "trustpilot-star": "rgb(var(--about-rated-trustpilot-star))",
          },
        },

        // CDN Page
        cdn: {
          // Hero Component
          hero: {
            bg: "rgb(var(--cdn-hero-bg))",
            "button-bg": "rgb(var(--cdn-hero-button-bg))",
            "button-text": "rgb(var(--cdn-hero-button-text))",
            "button-hover": "rgb(var(--cdn-hero-button-hover))",
          },
          // Section Colors
          section: {
            bg: "rgb(var(--cdn-section-bg))",
          },
          // SuperSonic Component
          supersonic: {
            "gradient-from": "rgba(var(--cdn-supersonic-gradient-from))",
            "gradient-to": "rgba(var(--cdn-supersonic-gradient-to))",
            "pattern-white-10": "rgba(var(--cdn-supersonic-pattern-white-10))",
          },
          // SuperSonicCard Component
          card: {
            bg: "rgba(var(--cdn-card-bg))",
            text: "rgb(var(--cdn-card-text))",
            "text-gray": "rgba(var(--cdn-card-text-gray))",
            "text-gray-70": "rgba(var(--cdn-card-text-gray-70))",
            "button-bg": "rgba(var(--cdn-card-button-bg))",
            "button-bg-hover": "rgba(var(--cdn-card-button-bg-hover))",
            checkmark: "rgba(var(--cdn-card-checkmark))",
            "checkmark-disabled": "rgba(var(--cdn-card-checkmark-disabled))",
          },
          // Reliability Component
          reliability: {
            "icon-text": "rgb(var(--cdn-reliability-icon-text))",
            "title-text": "rgb(var(--cdn-reliability-title-text))",
            "description-text": "rgba(var(--cdn-reliability-description-text))",
          },
          // FAQcdn Component
          faq: {
            border: "rgba(var(--cdn-faq-border))",
            "question-text": "rgb(var(--cdn-faq-question-text))",
            "answer-text": "rgba(var(--cdn-faq-answer-text))",
          },
        },

        // VPN Page
        vpn: {
          // Section Background
          section: {
            bg: "rgb(var(--vpn-section-bg))",
          },
          // Hero Component
          hero: {
            "subtitle-text": "rgb(var(--vpn-hero-subtitle-text))",
            "heading-text": "rgb(var(--vpn-hero-heading-text))",
            "description-text": "rgb(var(--vpn-hero-description-text))",
            "button-primary-bg": "rgb(var(--vpn-hero-button-primary-bg))",
            "button-primary-text": "rgb(var(--vpn-hero-button-primary-text))",
            "button-primary-hover": "rgb(var(--vpn-hero-button-primary-hover))",
            "button-secondary-bg": "rgb(var(--vpn-hero-button-secondary-bg))",
            "button-secondary-text": "rgb(var(--vpn-hero-button-secondary-text))",
            "button-secondary-hover": "rgb(var(--vpn-hero-button-secondary-hover))",
          },
          // SetYourself Component
          "set-yourself": {
            "button-bg": "rgb(var(--vpn-set-yourself-button-bg))",
            "button-text": "rgb(var(--vpn-set-yourself-button-text))",
            "button-border": "rgb(var(--vpn-set-yourself-button-border))",
            "button-hover": "rgb(var(--vpn-set-yourself-button-hover))",
          },
          // Choose Component
          choose: {
            "gradient-brown-from": "rgba(var(--vpn-choose-gradient-brown-from))",
            "gradient-brown-1": "rgba(var(--vpn-choose-gradient-brown-1))",
            "gradient-brown-2": "rgba(var(--vpn-choose-gradient-brown-2))",
            "gradient-brown-3": "rgba(var(--vpn-choose-gradient-brown-3))",
            "gradient-brown-4": "rgba(var(--vpn-choose-gradient-brown-4))",
            "card-bg": "rgb(var(--vpn-choose-card-bg))",
            "card-border": "rgb(var(--vpn-choose-card-border))",
          },
          // Freedom Component
          freedom: {
            border: "rgb(var(--vpn-freedom-border))",
            "image-bg": "rgb(var(--vpn-freedom-image-bg))",
          },
          // More Component
          more: {
            "table-highlight-bg": "rgb(var(--vpn-more-table-highlight-bg))",
            "button-bg": "rgb(var(--vpn-more-button-bg))",
            "button-text": "rgb(var(--vpn-more-button-text))",
            "button-hover": "rgb(var(--vpn-more-button-hover))",
          },
          // YourTrusted Component
          "your-trusted": {
            "gradient-teal-1": "rgba(var(--vpn-your-trusted-gradient-teal-1))",
            "gradient-teal-2": "rgba(var(--vpn-your-trusted-gradient-teal-2))",
            "gradient-teal-3": "rgba(var(--vpn-your-trusted-gradient-teal-3))",
            "gradient-teal-4": "rgba(var(--vpn-your-trusted-gradient-teal-4))",
            "card-bg": "rgb(var(--vpn-your-trusted-card-bg))",
            "card-border": "rgb(var(--vpn-your-trusted-card-border))",
            "button-bg": "rgb(var(--vpn-your-trusted-button-bg))",
            "button-text": "rgb(var(--vpn-your-trusted-button-text))",
            "button-hover": "rgb(var(--vpn-your-trusted-button-hover))",
          },
          // FAQvpn Component
          faq: {
            border: "rgba(var(--vpn-faq-border))",
            "question-text": "rgb(var(--vpn-faq-question-text))",
            "answer-text": "rgba(var(--vpn-faq-answer-text))",
          },
        },
        
        // Domain Name Privacy Page
        "domain-name-privacy": {
          "text-white": "rgb(var(--domain-name-privacy-text-white))",
          "text-gray": "rgb(var(--domain-name-privacy-text-gray))",
          "link-blue": "hsl(var(--domain-name-privacy-link-blue))",
          "card-unprotected-bg": "rgb(var(--domain-name-privacy-card-unprotected-bg))",
          "card-protected-bg": "rgb(var(--domain-name-privacy-card-protected-bg))",
          "gradient-gray-90": "rgba(var(--domain-name-privacy-gradient-gray-90))",
          "gradient-gray-75": "rgba(var(--domain-name-privacy-gradient-gray-75))",
          "gradient-gray-50": "rgba(var(--domain-name-privacy-gradient-gray-50))",
          "gradient-gray-30": "rgba(var(--domain-name-privacy-gradient-gray-30))",
          "gradient-gray-15": "rgba(var(--domain-name-privacy-gradient-gray-15))",
          register: {
            "gradient-teal-1": "rgba(var(--domain-name-privacy-register-gradient-teal-1))",
            "gradient-teal-2": "rgba(var(--domain-name-privacy-register-gradient-teal-2))",
            "gradient-teal-3": "rgba(var(--domain-name-privacy-register-gradient-teal-3))",
            "input-bg": "rgba(var(--domain-name-privacy-register-input-bg))",
            "button-bg": "rgb(var(--domain-name-privacy-register-button-bg))",
          },
        },
        
        // Migration Icon Component
        "ui-migration-icon": {
          upload: {
            from: "rgb(var(--ui-migration-icon-upload-from))",
            via: "rgb(var(--ui-migration-icon-upload-via))",
            to: "rgb(var(--ui-migration-icon-upload-to))",
          },
          check: {
            from: "rgb(var(--ui-migration-icon-check-from))",
            via: "rgb(var(--ui-migration-icon-check-via))",
            to: "rgb(var(--ui-migration-icon-check-to))",
          },
          connect: {
            from: "rgb(var(--ui-migration-icon-connect-from))",
            via: "rgb(var(--ui-migration-icon-connect-via))",
            to: "rgb(var(--ui-migration-icon-connect-to))",
          },
          "blur-from": "rgba(var(--ui-migration-icon-blur-from))",
          shadow: "rgba(var(--ui-migration-icon-shadow))",
          text: "rgb(var(--ui-migration-icon-text))",
        },
        
        // Transfer FAQ Component
        "transfer-faq": {
          bg: "rgb(var(--transfer-faq-bg))",
        },
        
        // WordPress EasyWP Component
        "wp-easywp": {
          "badge-new": "rgb(var(--wp-easywp-badge-new))",
        },
        
        // WordPress CloudHosting Component
        "cloud-hosting": {
          "card-shadow": "rgba(var(--cloud-hosting-card-shadow))",
          "card-shadow-hover": "rgba(var(--cloud-hosting-card-shadow-hover))",
          "subnote-default": "rgba(var(--cloud-hosting-subnote-default))",
        },
        
        // Security Page Hero
        "security-hero": {
          bg: "rgb(var(--security-hero-bg))",
          "heading-green": "rgb(var(--security-hero-heading-green))",
          "heading-teal": "rgb(var(--security-hero-heading-teal))",
          "description-text": "rgb(var(--security-hero-description-text))",
          "scroll-text": "rgb(var(--security-hero-scroll-text))",
        },
        
        // Security Safeguarded Component
        "security-safeguarded": {
          bg: "rgb(var(--security-safeguarded-bg))",
          "heading-text": "rgb(var(--security-safeguarded-heading-text))",
          "description-text": "rgb(var(--security-safeguarded-description-text))",
          "card-bg": "rgb(var(--security-safeguarded-card-bg))",
          "card-pattern": "rgba(var(--security-safeguarded-card-pattern))",
          "icon-green": "rgb(var(--security-safeguarded-icon-green))",
          "icon-glow": "rgba(var(--security-safeguarded-icon-glow))",
          "card-title-text": "rgb(var(--security-safeguarded-card-title-text))",
          "card-description-text": "rgb(var(--security-safeguarded-card-description-text))",
          "link-blue": "rgb(var(--security-safeguarded-link-blue))",
        },
        
        // Security Protected Component
        "security-protected": {
          bg: "rgb(var(--security-protected-bg))",
          "gradient-green": "rgba(var(--security-protected-gradient-green))",
          "heading-text": "rgb(var(--security-protected-heading-text))",
          "description-text": "rgb(var(--security-protected-description-text))",
          "card-bg": "rgb(var(--security-protected-card-bg))",
          "icon-color": "rgb(var(--security-protected-icon-color))",
          "card-title-text": "rgb(var(--security-protected-card-title-text))",
          "card-description-text": "rgb(var(--security-protected-card-description-text))",
          "button-bg": "rgb(var(--security-protected-button-bg))",
          "button-text": "rgb(var(--security-protected-button-text))",
        },
        
        // Security BuiltIn Component
        "security-builtin": {
          bg: "rgb(var(--security-builtin-bg))",
          "heading-text": "rgb(var(--security-builtin-heading-text))",
        },
        
        // Security WebHosting Component
        "security-webhosting": {
          bg: "rgb(var(--security-webhosting-bg))",
          "tagline-text": "rgb(var(--security-webhosting-tagline-text))",
          "heading-text": "rgb(var(--security-webhosting-heading-text))",
          "description-text": "rgb(var(--security-webhosting-description-text))",
          "feature-title-text": "rgb(var(--security-webhosting-feature-title-text))",
          "feature-description-text": "rgb(var(--security-webhosting-feature-description-text))",
          "link-text": "rgb(var(--security-webhosting-link-text))",
        },
        
        // Security Spacemail Component
        "security-spacemail": {
          bg: "rgb(var(--security-spacemail-bg))",
          "tagline-text": "rgb(var(--security-spacemail-tagline-text))",
          "heading-text": "rgb(var(--security-spacemail-heading-text))",
          "description-text": "rgb(var(--security-spacemail-description-text))",
          "feature-title-text": "rgb(var(--security-spacemail-feature-title-text))",
          "feature-description-text": "rgb(var(--security-spacemail-feature-description-text))",
          "link-text": "rgb(var(--security-spacemail-link-text))",
        },
        
        // Security FAQ Component
        "security-faq": {
          bg: "rgb(var(--security-faq-bg))",
          "heading-text": "rgb(var(--security-faq-heading-text))",
          border: "rgba(var(--security-faq-border))",
          "question-text": "rgb(var(--security-faq-question-text))",
          "answer-text": "rgba(var(--security-faq-answer-text))",
        },
        
        // Roadmap Hero Component
        "roadmap-hero": {
          bg: "rgb(var(--roadmap-hero-bg))",
          "heading-text": "rgb(var(--roadmap-hero-heading-text))",
          "description-text": "rgb(var(--roadmap-hero-description-text))",
        },
        
        // Rating Summary Component
        "rating-summary": {
          text: "hsl(var(--rating-summary-text))",
          "star-filled": "hsl(var(--rating-summary-star-filled))",
          "star-empty": "hsl(var(--rating-summary-star-empty))",
          "text-muted": "hsl(var(--rating-summary-text-muted))",
          "text-hover": "hsl(var(--rating-summary-text-hover))",
        },
        
        // Dynamic Section Component
        "dynamic-section": {
          bg: "hsl(var(--dynamic-section-bg))",
          text: "hsl(var(--dynamic-section-text))",
          heading: "hsl(var(--dynamic-section-heading))",
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

        // Hosting Page
        hosting: {
          bg: "rgb(var(--hosting-bg))",
          "bg-dark": "rgb(var(--hosting-bg-dark))",
          "bg-white": "rgb(var(--hosting-bg-white))",
          "bg-gray-50": "rgb(var(--hosting-bg-gray-50))",
          "bg-gray-100": "rgb(var(--hosting-bg-gray-100))",
          "bg-gray-200": "rgb(var(--hosting-bg-gray-200))",
          "text-white": "rgb(var(--hosting-text-white))",
          "text-black": "rgb(var(--hosting-text-black))",
          "text-gray-300": "rgb(var(--hosting-text-gray-300))",
          "text-gray-800": "rgb(var(--hosting-text-gray-800))",
          "accent-cyan": "rgb(var(--hosting-accent-cyan))",
          "accent-cyan-dark": "rgb(var(--hosting-accent-cyan-dark))",
          "section-bg": "rgb(var(--hosting-section-bg))",
          "header-banner": "rgb(var(--hosting-header-banner))",
          "card-bg": "rgb(var(--hosting-card-bg))",
          "card-border": "rgb(var(--hosting-card-border))",
          divider: "rgb(var(--hosting-divider))",
          "text-muted": "rgb(var(--hosting-text-muted))",
          "text-gray": "rgb(var(--hosting-text-gray))",
          "text-gray-dark": "rgb(var(--hosting-text-gray-dark))",
          "button-active": "rgb(var(--hosting-button-active))",
          "button-inactive": "rgb(var(--hosting-button-inactive))",
          "discount-badge": "rgb(var(--hosting-discount-badge))",
          "select-bg": "rgb(var(--hosting-select-bg))",
          "select-border": "rgb(var(--hosting-select-border))",
          "blur-bg": "rgb(var(--hosting-blur-bg))",
          "blur-border": "rgb(var(--hosting-blur-border))",
          "button-bg": "rgb(var(--hosting-button-bg))",
          "button-hover": "rgb(var(--hosting-button-hover))",
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
