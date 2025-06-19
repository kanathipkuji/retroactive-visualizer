export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
        keyframes: {
            flash: {
            '0%, 100%': { backgroundColor: '#fef3c7' },
            '50%': { backgroundColor: '#fde68a' },
            },
        },
        animation: {
            flash: 'flash 1s ease-in-out',
        },
        },
    },
    plugins: [],
}
  