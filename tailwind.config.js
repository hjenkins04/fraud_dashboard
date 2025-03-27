/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./pages/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Extend CSS variables used by shadcn/ui
          primary: 'hsl(var(--primary))',
          destructive: 'hsl(var(--destructive))',
          red: {
            500: '#ef4444',
          },
        },
        borderRadius: {
          lg: "0.5rem",
          md: "0.375rem",
          sm: "0.25rem",
        },
      },
    },
    plugins: [],
  }
  