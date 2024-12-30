import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import VNG from "./components/VNG.vue";
import Statistics from "./components/statistics/Statistics.vue";

const routes = [
    {path: "/", name: "Home", component: Home},
    {path: "/vng", name: "VNG", component: VNG},
    {path: "/statistics", name: "Statistics", component: Statistics},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
