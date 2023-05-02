/** @type {import('tailwindcss').Config} */
const {fontFamily} = require('tailwindcss/defaultTheme');

module.exports = {
    important: "#__next",
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {

        screens: {
            xs: "495px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
        },
        extend: {
            fontFamily: {
                irsans: ['var(--font-iran-sans)', ...fontFamily.sans],
            },
            colors: {
                primary: {
                    light: 'rgb(161, 197, 163)',
                    DEFAULT: 'rgb(0, 78, 52 )',
                    dark: 'rgb(39, 75, 75)'
                },
                secondary: {
                    light: 'rgb(255, 235, 204)',
                    DEFAULT: 'rgb(207, 159, 105)',
                    dark: 'rgb(56, 46, 30)',
                }
            },
            textColor: {
                sub: '#1f2937',
            }
        },

    },
    plugins: [],

}
