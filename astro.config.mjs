import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
import vue from "@astrojs/vue";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    vue({ appEntrypoint: '/src/pages/_app'}), 
    svelte(), 
    tailwind({
      // Disable injecting a basic `base.css` import on every page.
      config: { applyBaseStyles: false },
    })
  ],
  vite: {
    ssr: {
      noExternal: ['@smui/**/*', 'vuetify']
    }
  }
});