module.exports = {
  content: ["./src/**/**/*.{vue,js,ts,jsx,json,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
        "16/9": "16 / 9",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
