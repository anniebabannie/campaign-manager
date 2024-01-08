/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brown': {
          '50': '#f7f5ef',
          '100': '#ece4d5',
          '200': '#dbc9ad',
          '300': '#c6a87e',
          '400': '#b88f61',
          '500': '#a6784c',
          '600': '#8e6040',
          '700': '#734935',
          '800': '#613e32',
          '900': '#54372f',
          '950': '#301c18',
        },      
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
