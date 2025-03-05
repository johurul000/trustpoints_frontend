/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enables class-based dark mode toggling
  theme: {
    extend: {
      colors: {
        // Dark Theme Colors (Warm & Elegant)
        dark: "#14110F", // Background color
        card: "#1C1A19", // Card background
        white: "#ffffff", // White text
        grayText: "#E0E0E0", // Light gray text
        borderGray: "#292524", // Border colors
        highlight: "#FF6B35", // Burnt orange accent
        highlightHover: "#E05A2B", // Darker burnt orange
        secondaryHighlight: "#00A896", // Deep teal contrast
        modalBackground: "#201E1D", // Modal background

        // Light Theme Colors (Keeping previous light theme)
        lightBackground: "#FFFFFF", // Light background
        lightCard: "#F3F4F6", // Light card background
        darkText: "#1F2937", // Dark text color for light theme
        lightBorder: "#D1D5DB", // Light border color
        lightHighlight: "#3B82F6", // Blue accent for buttons in light theme
        lightHighlightHover: "#2563EB", // Darker blue hover
        lightSecondaryHighlight: "#10B981", // Secondary accent in light theme
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Custom font
      },
      screens: {
        custom: "1270px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};