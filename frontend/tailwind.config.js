/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text: {
          primary: '#71717a',
          white: '#ffffff',
        },
        borders: {
          primary: '#d1d5db',
          bottomBorder: '#71717a',
        },
        background: {
          button: '#6b7280',
        },
      },
    },
  },
  plugins: [],
};
