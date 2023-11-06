import {defineStore} from "pinia";

export const useTodoListStore = defineStore("todoListStore", () => {
    const state = {
        todoList: [
            {
                todoTimeOfDay: "",
                todoResponses: [
                    {
                        id : "",
                        title: "",
                        desc: "",
                        todoTimeOfDay: "",
                        done: false,
                        startDate: "",
                        endDate: ""
                    }
                ]
            }
        ]
    }

    return {state};
})