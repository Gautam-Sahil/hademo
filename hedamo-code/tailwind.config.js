// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'institutional-blue': '#1a365d',
        'institutional-blue-light': '#2d528f',
        'institutional-slate': '#475569',
        'institutional-slate-light': '#f8fafc',
        'institutional-slate-border': '#e2e8f0',
        'institutional-accent': '#2563eb',
        'institutional-accent-hover': '#1d4ed8',

        'status-draft': '#64748b',
        'status-submitted': '#f59e0b',
        'status-published': '#059669'
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif']
      },
      transitionDuration: {
        'institutional': '200ms'
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        luxury: {
          "primary": "#1a365d",
          "secondary": "#2d528f",
          "accent": "#2563eb",
          "neutral": "#475569",
          "base-100": "#f8fafc",
          "info": "#2563eb",
          "success": "#059669",
          "warning": "#f59e0b",
          "error": "#dc2626",
        },
      }
    ],
    darkTheme: false,
  },
};
