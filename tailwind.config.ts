import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1e40af',
        'brand-secondary': '#3b82f6',
        'brand-light': '#dbeafe',
        'dark-bg': '#111827',
        'dark-card': '#1f2937',
        'dark-border': '#374151',
        'dark-text': '#d1d5db',
        'dark-text-secondary': '#9ca3af',
      },
    },
  },
  plugins: [],
}
export default config