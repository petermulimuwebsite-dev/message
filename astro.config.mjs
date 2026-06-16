import { defineConfig } from 'astro/config';

export default defineConfig({
  // No adapter needed for Vercel static output
  // If you want SSR, add: import vercel from '@astrojs/vercel/serverless';
  // and set: adapter: vercel()
});
