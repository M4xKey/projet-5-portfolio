// @ts-check
import { defineConfig } from "astro/config";

// `site` sert de base aux URLs absolues (balises Open Graph du layout).
// À mettre à jour quand le domaine définitif est branché sur Vercel.
export default defineConfig({
  site: "https://projet-5-portfolio.vercel.app",
});
