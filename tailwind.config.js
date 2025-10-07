/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                bg: "hsl(var(--color-bg) / <alpha-value>)",
                bgDark: "hsl(var(--color-bg-dark) / <alpha-value>)",
                bgLight: "hsl(var(--color-bg-light) / <alpha-value>)",
                bgHighlight: "hsl(var(--color-bg-highlight) / <alpha-value>)",
                input: "hsl(var(--color-input-bg) / <alpha-value>)",

                text: "hsl(var(--color-text) / <alpha-value>)",
                textMuted: "hsl(var(--color-text-muted) / <alpha-value>)",

                primary: "hsl(var(--color-primary) / <alpha-value>)",
                accent: "hsl(var(--color-accent) / <alpha-value>)",
                sale: "hsl(var(--color-sale) / <alpha-value>)",

                success: "hsl(var(--color-success) / <alpha-value>)",
                error: "hsl(var(--color-error) / <alpha-value>)",
                warning: "hsl(var(--color-warning) / <alpha-value>)",

                border: "hsl(var(--color-border) / <alpha-value>)",
            },
            boxShadow: {
                elevation1: "var(--shadow-elevation-1)",
                elevation2: "var(--shadow-elevation-2)",
            },
            fontFamily: {
                base: "var(--ff)",
            },
        },
    },
    plugins: [],
}
