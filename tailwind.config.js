/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#1C1C1C", // Dark background
        "secondary-dark": "#636363", // Dark background
        "primary-yellow": "#f2c41a", // Main yellow
        "secondary-yellow": "#f2a500", // Hover yellow
        "light-gray": "#2E2E2E", // Light gray for cards
      },
      fontFamily: {
        sans: ["Arial", "sans-serif"], // Default font family
      },
      boxShadow: {
        "custom-light": "0px 4px 6px rgba(0, 0, 0, 0.1)",
        "custom-dark": "0px 4px 10px rgba(0, 0, 0, 0.5)",
      },
      
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // For better form styling
    require("@tailwindcss/aspect-ratio"), // For aspect ratio controls (e.g., images)
    require("@tailwindcss/typography"), // For better typography control
    function ({ addComponents }) {
      addComponents({
        ".custom-focus-reset": {
          "@apply focus:outline-none focus:ring-0 focus:shadow-none focus:border-transparent": {},
        },
      });
    },
  ],
};
