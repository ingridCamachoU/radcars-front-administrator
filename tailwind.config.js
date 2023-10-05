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
                    style: 'var(--color-btn-style)',
                    blue: 'var(--color-btn-blue)',
                    yellow: 'var(--color-btn-yellow)',
                    gray: 'var(--color-btn-gray)',
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
                    red: 'var(--text-red)'
                },
            },
        },
    },
    plugins: [],
}

