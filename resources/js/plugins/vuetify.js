import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: "#3f51b5"
            }
        }
    },
    icons: {
        iconfont: "mdi" // default - only for display purposes
    }
});
