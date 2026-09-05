import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://troppo.feriadesoftware.cl',
  server: {
    port: 4321,
    host: true,
  },
});
