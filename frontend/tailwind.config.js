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
          bottomBorder: '#71717a',
          bottom: '#71717a',
        },
        background: {
          button: '#6b7280',
        },
        //new color palette
        primary: {
          blue: '#5BAFEF', //Represents the water and sky, creating a sense of calm and openness.
          green: '#66CDAA', //Symbolizes the lush greenery of the islands and nature, giving a fresh, vibrant look.
        },
        secondary: {
          white: '#FFFFFF', //Provides clean, minimal spacing to balance the bold natural colors, making the content stand out
          light_grey: '#F4F4F4', //Used in background areas, borders, or text input fields for contrast without overwhelming the design.
        },
        accent: {
          'dark-blue': '#1A5276', //For buttons, links, or headlines to provide emphasis and focus areas
          gold: '#F1C40F', //Used sparingly for call-to-action buttons like "Book Now" or "Sign Up" to grab attention
        },
      },
      fontWeight: {
        headline: 700,
        sub_headings: 600,
      },
      fontSize: {
        headline: '35px',
        'sub-headings': '25px',
        body: '18px',
        input_or_label: '15px',
      },
    },
  },
  plugins: [],
};
