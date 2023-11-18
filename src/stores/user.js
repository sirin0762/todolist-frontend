import {defineStore} from "pinia";
import {computed, reactive} from "vue";

export const useUserStore = defineStore("userStore", () => {
    const state = reactive({
        username: "",
        imageUrl: ""
    });

    const login = (username, imageUrl) => {
        state.username = username;
        state.imageUrl = imageUrl;
        sessionStorage.setItem("user", JSON.stringify(state))
    };

    const logout = () => {
        state.username = "";
        state.imageurl = "";
        sessionStorage.removeItem("user");
    };

    const isLogin = computed(() => {
        return state.username !== "";
    });

    return {state, login, logout, isLogin};
})