import {defineStore} from "pinia";

export const useTodoListStore = defineStore("todoListStore", () => {
    const state = {
        todoList: []
    }

    const clear = () => {
        state.todoList = [];
    }

    return {state, clear};
})