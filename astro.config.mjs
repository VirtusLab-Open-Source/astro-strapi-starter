// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://astro-strapi-starter.vercel.app",
	integrations: [react(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},

	output: "static",
});
