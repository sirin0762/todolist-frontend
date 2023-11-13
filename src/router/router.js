import {createRouter, createWebHistory} from "vue-router";
import DashBoard from "../pages/DashBoard.vue";
import Redirect from "../components/common/Redirect.vue";

const routes = [
    { path: '/api/todos', component: DashBoard},
    { path: '/oauth2/redirect', component: Redirect}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;