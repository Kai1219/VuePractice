import { createRouter, createWebHashHistory } from "vue-router";
//import HomeView from "../views/HomeView.vue";

const routes = [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    {
        path: "/",
        name: "home",
        component: () =>
            import ("../views/FrontView.vue")
    },
    {
        path: "/admin",
        name: "Admin",
        component: () =>
            import ("../views/DashboardView.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;