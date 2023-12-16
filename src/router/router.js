import {createRouter, createWebHistory} from "vue-router";
import Redirect from "../components/common/Redirect.vue";
import TodoList from "../pages/TodoList.vue";
import Calendar from "../pages/Calendar.vue";

const routes = [
    { path: '/todos', component: TodoList},
    { path: '/calendar', component: Calendar},
    { path: '/auth/redirect', component: Redirect}
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes: routes
});

export default router;