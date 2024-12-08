/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';
export default {
  darkMode: ['class'],
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
        background: 'hsl(var(--background))',
        'background-button': '#6b7280',

        primary: {
          blue: '#5BAFEF', //Represents the water and sky, creating a sense of calm and openness.
          green: '#66CDAA', //Symbolizes the lush greenery of the islands and nature, giving a fresh, vibrant look.

          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          white: '#FFFFFF', //Provides clean, minimal spacing to balance the bold natural colors, making the content stand out

          light_grey: '#F4F4F4', //Used in background areas, borders, or text input fields for contrast without overwhelming the design.

          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          'dark-blue': '#1A5276', //For buttons, links, or headlines to provide emphasis and focus areas
          gold: '#F1C40F', //Used sparingly for call-to-action buttons like "Book Now" or "Sign Up" to grab attention

          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      fontWeight: {
        headline: '700',
        sub_headings: '600',
      },
      fontSize: {
        headline: '35px',
        'sub-headings': '25px',
        body: '18px',
        input_or_label: '15px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
