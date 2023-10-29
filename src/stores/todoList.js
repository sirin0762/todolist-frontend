import {defineStore} from "pinia";

export const useTodoListStore = defineStore("todoListStore", () => {
    const state = {
        todoList: [
            {
                name: "Morning",
                todos: [
                    {id: 1, title: "Hello", desc: "world", done: false},
                    {id: 2, title: "Hello", desc: "world", done: false},
                    {id: 3, title: "Hello", desc: "world", done: false},
                    {id: 4, title: "Hello", desc: "world", done: false},
                ]
            },
            {
                name: "Afternoon",
                todos: [
                    {id: 5, title: "Hello", desc: "world", done: false},
                    {id: 6, title: "Hello", desc: "world", done: false},
                    {id: 7, title: "Hello", desc: "world", done: false},
                    {id: 8, title: "Hello", desc: "world", done: false},
                ]
            },
            {
                name: "Evening",
                todos: [
                    {id: 9, title: "Hello", desc: "world", done: false},
                    {id: 10, title: "Hello", desc: "world", done: false},
                    {id: 11, title: "Hello", desc: "world", done: false},
                    {id: 12, title: "Hello", desc: "world", done: false},
                ]
            }
        ]
    }

    return {state};
})