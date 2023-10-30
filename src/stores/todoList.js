import {defineStore} from "pinia";

export const useTodoListStore = defineStore("todoListStore", () => {
    const state = {
        todoList: []
    }

    return {state};
})