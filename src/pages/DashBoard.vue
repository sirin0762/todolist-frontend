<template>
  <div class="row">
    <div v-for="(task, i) in tasks" :key="i" class="col-4">
      <div class="text-h5 text-weight-bold q-ma-xl text-lowercase text-capitalize">
        <font-awesome-icon v-if="i === 0" icon="fa-d fa-cloud" style="color: #61b3e5" ></font-awesome-icon>
        <font-awesome-icon v-else-if="i === 1" icon="fa-solid fa-sun" style="color: #ff0000;" ></font-awesome-icon>
        <font-awesome-icon v-else-if="i === 2" icon="fa-solid fa-moon" style="color: #ffd43b;" ></font-awesome-icon>
        {{capitalize(task.todoTimeOfDay.toLowerCase())}}
      </div>
      <draggable
          :list="task.todoResponses"
          group="people"
          :animation="200"
          item-key="id"
      >
        <template #item="{element}" class="">
          <Todo :todo="element"></Todo>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import {useTodoListStore} from "../stores/todoList.js";
import Todo from "../components/Todo.vue";
import draggable from "vuedraggable";
import {capitalize, computed, onMounted} from "vue";
import axios from "axios";
import {format} from "quasar";

const todoListStore = useTodoListStore();
const {state} = todoListStore;
let tasks = computed(() => state.todoList);

onMounted(() => {
  axios
      .get("http://localhost:8080/api/todos", {
        params: {
          date: "2023-10-29"
        }
      })
      .then((res) => {
        todoListStore.state.todoList = res.data;
        console.log(res.data);
      })

})
</script>