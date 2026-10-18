/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FAFAF7',
        surface: '#FFFFFF',
        border: '#E7E5E0',
        text: {
          main: '#1C2430',
          muted: '#5B6472'
        },
        primary: {
          DEFAULT: '#1E4FD8',
          hover: '#183EB0',
          light: '#EEF3FF'
        },
        accent: {
          red: '#B4232A',
          redLight: '#FDF2F2',
          tension: '#B4232A',
          compression: '#1E4FD8',
          stirrup: '#D97706'
        }
      },
      fontFamily: {
        serif: ['Lora', 'serif'],
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      borderRadius: {
        'custom': '12px'
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(28, 36, 48, 0.05)',
        'card': '0 4px 20px rgba(28, 36, 48, 0.06)'
      }
    },
  },
  plugins: [],
}
