// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "arc-gradient": "linear-gradient(135deg, #041C32 0%, #092C47 50%, #133B5C 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
