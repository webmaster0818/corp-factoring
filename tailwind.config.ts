import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '17': '68px',
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['"Hiragino Sans"', '"Hiragino Kaku Gothic ProN"', '"Noto Sans JP"', '"Yu Gothic UI"', '"YuGothic"', 'Meiryo', 'system-ui', 'sans-serif'],
      },
      colors: {
        // 青系をやや落ち着いた明るい青（ブランド色）に置き換える（サイト全体の blue-* を一括で統一）
        blue: {
          50: '#F1F6FB', 100: '#E1EDF8', 200: '#C4DBF0', 300: '#97C0E3', 400: '#5E9BD1',
          500: '#2F80C6', 600: '#1F6AAE', 700: '#195790', 800: '#174873', 900: '#14284A', 950: '#0D1B33',
        },
        ink: '#14284A',
        line: '#DCE5EE',
        soft: '#F5F8FB',
        // 緑系も彩度を落とす（入金スピード等の強調色）
        green: {
          50: '#F3F7F4', 100: '#E2EDE5', 200: '#C3D9CA', 300: '#97BBA2', 400: '#6A9A79',
          500: '#4A7D5A', 600: '#356748', 700: '#2B553B', 800: '#234530', 900: '#1C3626',
        },
        // CTA 用のアクセント（公式サイトへ等）
        cta: { DEFAULT: '#D2600C', hover: '#B5520A' },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
} satisfies Config;
