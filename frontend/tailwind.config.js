/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563EB',   // Tailwind blue-600
          hover: '#1D4ED8',     // Tailwind blue-700
        },
        secondary: '#F97316',    // Tailwind orange-500
        accent: '#16A34A',       // Tailwind green-600
      },
    },
    animation: {
        slowZoom: 'slowZoom 20s ease-in-out infinite',
      },
  },
  plugins: [],
}
