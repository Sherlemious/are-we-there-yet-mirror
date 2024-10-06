/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text: {
          primary: '#111827',
          white: '#ffffff',
        },
        borders: {
          primary: '#d1d5db',
          bottom: '#71717a',
        },
        background: {
          button: '#6b7280',
        },
      },
    },
  },
  plugins: [],
};
