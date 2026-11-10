/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0b6bff', dark: '#0857d1', light: '#e8f1ff' },
        ink: '#111827',
        muted: '#6b7280',
        line: '#e5e7eb',
        field: '#f3f6fa',
        canvas: '#e9edf3',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
