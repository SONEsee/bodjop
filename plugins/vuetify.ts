import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
//@ts-ignore
import colors from "vuetify/lib/util/colors";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },

    ssr: true,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: colors.blue.darken2,
            accent: colors.teal.darken3,
            secondary: "#008CBA",
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3,
            background: "#FAFAFA",
          },
        },
      },
    },
  });
  app.vueApp.use(vuetify);
});
