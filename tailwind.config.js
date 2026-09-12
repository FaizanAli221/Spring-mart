/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#6E1423',
          dark: '#4A0D18',
          light: '#8C2233',
        },
        cream: '#FBF8F3',
        ink: '#241A1A',
        gold: '#C89B5C',
        clover: '#2F5233',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
}
