/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: "#4A90A4", // Example from site-data (Rubber gloves color)
                secondary: "#D4A574", // Cotton gloves
                accent: "#FF69B4", // Flower dragon
            }
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("daisyui"),
    ],
    daisyui: {
        themes: ["light", "corporate"],
    },
}
