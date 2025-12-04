import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cleanz: {
          pink: '#FF69B4',
          'pink-light': '#FFB6C1',
          'pink-pale': '#FFE5F1',
          'pink-hover': '#E879A9',
          cyan: '#4FD1C5',
          'cyan-light': '#98D8C8',
          'cyan-pale': '#E5F7F3',
          violet: '#DDA0DD',
          'violet-deep': '#B794F4',
          'violet-pale': '#E8D5F2',
          lavender: '#B0E0E6',
          peach: '#FFF5E5',
        },
        text: {
          primary: '#2D1F3D',
          secondary: '#5A4A6A',
          muted: '#9B8AAB',
        },
        dark: {
          bg: '#1A0A2E',
          card: 'rgba(45,27,78,0.7)',
          'card-solid': 'rgba(45,27,78,0.92)',
          border: 'rgba(182,130,255,0.25)',
        }
      },
      backgroundImage: {
        'cleanz-gradient': 'linear-gradient(180deg, #FFE5F1 0%, #E8D5F2 25%, #D4E5F7 50%, #E5F7F3 75%, #FFF5E5 100%)',
        'cleanz-gradient-dark': 'linear-gradient(180deg, #1A0A2E 0%, #2D1B4E 30%, #1E3A5F 60%, #0D2137 100%)',
        'cleanz-accent': 'linear-gradient(135deg, #FF69B4 0%, #DDA0DD 50%, #4FD1C5 100%)',
        'cleanz-card': 'linear-gradient(135deg, #FFB6C1 0%, #DDA0DD 25%, #B0C4DE 50%, #98D8C8 100%)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'cleanz': '0 4px 20px rgba(255,105,180,0.08)',
        'cleanz-hover': '0 4px 15px rgba(255,105,180,0.35)',
        'cleanz-dark': '0 4px 25px rgba(182,130,255,0.15)',
      }
    },
  },
  plugins: [],
} satisfies Config;
