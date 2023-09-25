import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {},
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        'blue-dark': {
          extend: 'dark',
          colors: {
            default: '#1B31A9',
            primary: '#2A2A84',
            secondary: '#0B0D7B',
            success: '#36CA40',
            danger: '#D42D2D',
            warning: '#C48D1F'
          }
        }
      }
    })
  ]
};
export default config;
