/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./public/index.html"
    ],
    theme: {
      extend: {
        colors: {
          'gray-50': '#F9FAFB',
          'gray-100': '#F3F4F6',
          'gray-200': '#E5E7EB',
          'gray-300': '#D1D5DB',
          'gray-400': '#9CA3AF',
          'gray-500': '#6B7280',
          'blue-500': '#3B82F6',
          'red-500': '#EF4444',
          'green-500': '#10B981',
        },
        spacing: {
          '1': '0.25rem',
          '2': '0.5rem',
          '4': '1rem',
          '6': '1.5rem',
          '8': '2rem',
        },
        borderRadius: {
          'md': '0.375rem',
        },
        fontSize: {
          'sm': '0.875rem',
          'base': '1rem',
          'lg': '1.125rem',
          'xl': '1.25rem',
          '2xl': '1.5rem',
        },
      },
    },
    plugins: [],
  }