/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/JSX/TS/TSX files in the src directory
      "./public/index.html", // Include the HTML file
    ],
    theme: {
        extend: {},
    },
    plugins: [module.exports = {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      }],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JS/JSX/TS/TSX files in the src directory
    "./public/index.html", // Include the HTML file
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px', // Small screens (default)
        'md': '768px', // Medium screens (default)
        'lg': '1024px', // Large screens (default)
        'xl': '1280px', // Extra large screens (default)
        '2xl': '1536px', // 2X large screens (default)
        'xxl': '1300px', // Custom breakpoint for 1400px
      },
    },
  },
  plugins: [],
};
// login-ui-30