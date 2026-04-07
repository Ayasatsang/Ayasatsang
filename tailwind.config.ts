import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* AYA Design System - Fonts from Figma */
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Inter", "sans-serif"],
        display: ["Marck Script", "cursive"],
        // Aliases for convenience
        inter: ["Inter", "sans-serif"],
        lora: ["Inter", "sans-serif"],
        marck: ["Marck Script", "cursive"],
      },
      /* AYA Design System - Font Sizes from Figma */
      fontSize: {
        // Display sizes (Marck Script)
        "display-hero": ["114px", { lineHeight: "110px", letterSpacing: "-4.6px" }],
        "display-section": ["115px", { lineHeight: "97px", letterSpacing: "1.2px" }],
        "display-accent": ["36px", { lineHeight: "36px", letterSpacing: "-0.7px" }],
        // Heading sizes (Lora)
        "heading-xl": ["38px", { lineHeight: "38px", letterSpacing: "-0.8px" }],
        "heading-lg": ["28px", { lineHeight: "32px", letterSpacing: "-0.6px" }],
        "heading-md": ["22px", { lineHeight: "26px", letterSpacing: "-0.4px" }],
        "heading-sm": ["18px", { lineHeight: "25px", letterSpacing: "-0.4px" }],
        // Body sizes
        "body-lg": ["24px", { lineHeight: "29px" }],
        "body-md": ["18px", { lineHeight: "26px", letterSpacing: "-0.2px" }],
        "body-sm": ["17px", { lineHeight: "21px", letterSpacing: "-0.2px" }],
        // Meta sizes
        "meta": ["17px", { lineHeight: "19px", letterSpacing: "-0.3px" }],
        "tag": ["14px", { lineHeight: "15px", letterSpacing: "-0.3px" }],
      },
      colors: {
        /* AYA Design System - Colors from Figma */
        aya: {
          primary: "#6C8EE5",
          sky: "#73BEEC",
          "light-blue": "#80A5FF",
          cyan: "#34D1FF",
          cloud: "#CFECFF",
          gold: "#FABC2A",
          "gold-light": "#FFDE90",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        /* AYA Design System - Border Radius from Figma */
        "aya-xl": "134px",
        "aya-lg": "70px",
        "aya-md": "48px",
        "aya-sm": "24px",
        "aya-xs": "12px",
      },
      /* AYA Design System - Blur Effects from Figma */
      blur: {
        "aya-glow": "400px",
        "aya-lg": "80px",
        "aya-md": "21px",
        "aya-sm": "8px",
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
        "cloud-drift": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100vw)" },
        },
        "cloud-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "cloud-slow": "cloud-drift 60s linear infinite, cloud-float 8s ease-in-out infinite",
        "cloud-medium": "cloud-drift 40s linear infinite, cloud-float 6s ease-in-out infinite",
        "cloud-fast": "cloud-drift 25s linear infinite, cloud-float 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 1s ease-out forwards",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
