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
      N8N_VIDEO: process.env.N8N_VIDEO,

      WS_URL: process.env.WS_URL,
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    },
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        value: [
          "default-src 'self'",
          "img-src 'self' data: https://www.gstatic.com https://www.google.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "script-src 'self' https://www.google.com https://www.gstatic.com",
          "frame-src 'self' https://www.google.com https://www.gstatic.com",
          "child-src 'self' https://www.google.com https://www.gstatic.com",
          "connect-src 'self' https://www.google.com https://www.gstatic.com",
          "frame-ancestors 'self'"
        ].join('; ')
      },
      contentSecurityPolicyReportOnly: false,
    },
  },
  i18n: {
    defaultLocale: 'th',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'th', iso: 'th-TH', file: 'th.json', name: 'ภาษาไทย' },
    ],
    langDir: 'locales',
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
