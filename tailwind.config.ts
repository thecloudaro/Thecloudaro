import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Map Tailwind tokens to CSS variables (HSL)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: "hsl(var(--card))",
        'card-foreground': "hsl(var(--card-foreground))",

        popover: "hsl(var(--popover))",
        'popover-foreground': "hsl(var(--popover-foreground))",

        primary: "hsl(var(--primary))",
        'primary-foreground': "hsl(var(--primary-foreground))",

        secondary: "hsl(var(--secondary))",
        'secondary-foreground': "hsl(var(--secondary-foreground))",

        muted: "hsl(var(--muted))",
        'muted-foreground': "hsl(var(--muted-foreground))",

        accent: "hsl(var(--accent))",
        'accent-foreground': "hsl(var(--accent-foreground))",

        destructive: "hsl(var(--destructive))",
        'destructive-foreground': "hsl(var(--destructive-foreground))",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Brand helpers
        brand: '#1e40af',
        'brand-dark': '#0f172a',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};

export default config;
