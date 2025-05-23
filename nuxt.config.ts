import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  compatibilityDate: "2024-04-03",

  runtimeConfig: {
    public: {
      app_version: "1.0.0",
      build_at: process.env.VITE_BUILD_DATE ?? "",
    },
  },
  app: {
    head: {
      title: "32Lottery-Backoffice",
    },
  },

  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
    {
      path: "@/components/Dashboard",
      pathPrefix: false,
      prefix: "Dashboard",
    },
    {
      path: "@/components/Global/",
      pathPrefix: true,
      prefix: "Global",
    },
    {
      path: "@/components/Login/",
      pathPrefix: true,
      prefix: "Login",
    },
    {
      path: "@/components/Agency",
      pathPrefix: true,
      prefix: "Agency",
    },
    {
      path: "@/components/ExpenseTypeManagements/",
      pathPrefix: true,
      prefix: "ExpenTypeManagements",
    },
    {
      path: "@/components/DeviceManagement/",
      pathPrefix: true,
      prefix: "Devices",
    },
    {
      path: "@/components/Sales/",
      pathPrefix: true,
      prefix: "Sales",
    },
    {
      path: "@/components/Prints/",
      pathPrefix: true,
      prefix: "Prints",
    },
    {
      path: "@/components/Invoices/",
      pathPrefix: true,
      prefix: "Invoices",
    },
    {
      path: "@/components/DeviceMovements/",
      pathPrefix: true,
      prefix: "DeviceMovements",
    },
    {
      path: "@/components/Debts/",
      pathPrefix: true,
      prefix: "Debts",
    },
    {
      path: "@/components/Profile/",
      pathPrefix: true,
      prefix: "Profile",
    },
  ],

  css: ["~/assets/css/style.scss", "~/assets/css/global.css"],

  build: {
    transpile: ["vuetify"],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "dayjs-nuxt",
    "nuxt-lodash",
  ],

  dayjs: {
    locales: ["en", "lo"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "en",
    defaultTimezone: "Asia/Bangkok",
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  imports: {
    dirs: ["./stores"],
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },
});
