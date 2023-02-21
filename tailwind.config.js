/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "node_modules/daisyui/**/*.{js,jsx,ts,tsx",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
}
