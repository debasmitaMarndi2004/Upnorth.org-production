import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.tsx', './components/**/*.tsx'],
  theme: { extend: {
    colors: { pine: { 900: '#1F3D2B' }, lake: { 700: '#2B5F6E' }, birch: { 100: '#F3EEE0' }, amber: { 500: '#C8862E' }, ink: { 900: '#232620' }, mist: { 200: '#E4E0D3' } },
    fontFamily: { display: ['var(--font-fraunces)', 'Georgia', 'serif'], sans: ['var(--font-work)', 'system-ui', 'sans-serif'] },
  } },
} satisfies Config;
