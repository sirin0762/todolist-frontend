import {defineStore} from "pinia";
import {computed, reactive} from "vue";
import {useTodoListStore} from "./todoList.js";


export const useUserStore = defineStore("userStore", () => {
    const state = reactive({
        username: "",
        imageUrl: ""
    });

    if (sessionStorage.getItem("user")) {
        const sessionUser = JSON.parse(sessionStorage.getItem('user'));
        state.username = sessionUser.username;
        state.imageUrl = sessionUser.imageUrl;
    }

    const login = (username, imageUrl) => {
        state.username = username;
        state.imageUrl = imageUrl;
        sessionStorage.setItem("user", JSON.stringify(state))
    };

    const logout = () => {
        state.username = "";
        state.imageurl = "";
        location.reload();
        sessionStorage.removeItem("user");
        localStorage.removeItem("userInfo");
    };

    const isLogin = computed(() => {
        return state.username !== "";
    });

    return {state, login, logout, isLogin};
}, {
    persist: {
        enabled: true,
        storage: sessionStorage
    }
})