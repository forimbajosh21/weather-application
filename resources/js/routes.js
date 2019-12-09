import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Index from "./views/index";

const Routes = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Index",
            component: Index
        }
    ]
});

export default Routes;
