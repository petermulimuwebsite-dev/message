import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';


export default defineConfig({
  // No adapter needed for Vercel static output
  // If you want SSR, add: import vercel from '@astrojs/vercel/serverless';
  // and set: adapter: vercel()

    output: 'hybrid',
      adapter: vercel(),


});
