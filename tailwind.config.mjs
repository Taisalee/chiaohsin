/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: "#4A90A4",
                secondary: "#D4A574",
                accent: "#FF69B4",
            }
        },
    },
    corePlugins: {
        preflight: true,
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("daisyui"),
    ],
    daisyui: {
        themes: ["corporate"],
        logs: false,
        base: true,
        styled: true,
        utils: true,
    },
}
