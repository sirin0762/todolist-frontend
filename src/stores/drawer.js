import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useDrawerStore = defineStore('drawerStore', () => {
    let drawer = ref(false);

    const toggle = () => {
        drawer = !drawer;
    }

    return {drawer, toggle};
})