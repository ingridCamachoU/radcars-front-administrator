/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundColor:{
                background: {
                    ligth: 'var(--background-ligth)',
                    dark: 'var(--background-dark)',
                    dark_medium: 'var(--background-dark_medium)'
                },
                modal: {
                    ligth: 'var(--modal-ligth)',
                    dark: 'var(--modal-dark)',
                }, 
                btn: {
                    red: 'var(--color-btn-red)',
                    redHover: 'var(--color-btn-red-hover)',
                    style: 'var(--color-btn-style)',
                    styleHover: 'var(--color-btn-style-hover)',
                    blue: 'var(--color-btn-blue)',
                    blueHover: 'var(--color-btn-blue-hover)',
                    yellow: 'var(--color-btn-yellow)',
                    yellowHover: 'var(--color-btn-yellow-hover)',
                    gray: 'var(--color-btn-gray)',
                    grayHover: 'var(--color-btn-gray-hover)',
                },
                
            },
            borderColor: {
                border: {
                    gray: 'var(--color-border-gray)'
                }
                
            },
            textColor:{
                text: {
                    ligth: 'var(--text-ligth)',
                    dark: 'var(--text-dark)',
                    gray: 'var(--text-gray)',
                    red: 'var(--text-red)',
                    blue: 'var(--color-btn-style)'
                },
            },
        },
    },
    plugins: [],
}

