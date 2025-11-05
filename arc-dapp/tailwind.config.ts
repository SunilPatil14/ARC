/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        arc: {
          900: "#010409",
          800: "#020617",
          700: "#041827",
          500: "#00bcd4",
          600: "#00a7c0",
        },
        accent: {
          500: "#6C5CE7",
        },
        glass: "rgba(255,255,255,0.06)",
        muted: {
          300: "#94a3b8"
        },
      },
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 8px 24px rgba(2,6,23,0.6)",
        glow: "0 20px 60px rgba(0,188,212,0.12)",
      },
      borderRadius: {
        'lg-3xl': '28px',
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(.16,.84,.24,1)'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
