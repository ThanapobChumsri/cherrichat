// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "cherrichat",
      meta: [
        {
          name: "Chat with ai character",
          content:
            "Chat with many character",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@nuxt/ui", "@vueuse/nuxt", "@nuxtjs/google-fonts", "@nuxt/icon", "@nuxtjs/i18n"],
  devServer: {
    port: 3005,
  },
  runtimeConfig: {
    public: {
      N8N_URL_V3: process.env.N8N_URL_V3,
      N8N_IMAGE: process.env.N8N_IMAGE,

      WS_URL: process.env.WS_URL,
    },
  },
  i18n: {
    defaultLocale: 'th',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'th', iso: 'th-TH', file: 'th.json', name: 'ภาษาไทย' },
    ],
    langDir: 'locales/',
    strategy: 'no_prefix',
  },
  css: ['~/assets/css/main.css'],
  ui: {
    theme: {
      colors: [
        "primary",
        "secondary",
        "tertiary",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
  },
});