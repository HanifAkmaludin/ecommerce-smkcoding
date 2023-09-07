// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        { src: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js" }
      ],
      link: [
        { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css" }
      ],
    }
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "~/tailwind.config.ts",
  },
  imports: {
    dirs: ["stores", "composables"],
  }
})
