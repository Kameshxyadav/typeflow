/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-dark': '#1e1e2e',
                'text-main': '#cdd6f4',
                'text-sub': '#a6adc8',
                'primary': '#f5c2e7',
                'error': '#f38ba8',
            },
            fontFamily: {
                mono: ['"JetBrains Mono"', 'monospace'],
            }
        },
    },
    plugins: [],
}
