import {createRouter, createWebHistory} from "vue-router";
import Redirect from "../components/common/Redirect.vue";
import TodoList from "../pages/TodoList.vue";
import Calendar from "../pages/Calendar.vue";

const routes = [
    { path: '/todolist-frontend/todos', component: TodoList},
    { path: '/todolist-frontend/calendar', component: Calendar},
    { path: '/todolist-frontend/auth/redirect', component: Redirect}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;