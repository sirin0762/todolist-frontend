import {createRouter, createWebHistory} from "vue-router";
import DashBoard from "../pages/DashBoard.vue";

const routes = [
    { path: '/', component: DashBoard},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;