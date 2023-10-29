<template>
  <div class="row">
    <div v-for="(task, i) in tasks" :key="i" class="col-4">
      <div class="text-h5 text-weight-bold q-ma-xl">
        <font-awesome-icon v-if="i === 0" icon="fa-d fa-cloud" style="color: #61b3e5" ></font-awesome-icon>
        <font-awesome-icon v-else-if="i === 1" icon="fa-solid fa-sun" style="color: #ff0000;" ></font-awesome-icon>
        <font-awesome-icon v-else-if="i === 2" icon="fa-solid fa-moon" style="color: #ffd43b;" ></font-awesome-icon>
        {{task.name}}
      </div>
      <draggable
          :list="task.todos"
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

const todoListStore = useTodoListStore();
const tasks = todoListStore.state.todoList;
</script>