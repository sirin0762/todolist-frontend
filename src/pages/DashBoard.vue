<template>
  <div class="row">
    <div v-for="(task, i) in tasks" :key="i" class="col-4 q-pr-xl q-pl-xl">
      <div class="row justify-between items-center q-mt-xl">
        <div class="text-h5 text-weight-bold text-lowercase text-capitalize row items-center">
          <font-awesome-icon v-if="i === 0" icon="fa-d fa-cloud" style="color: #61b3e5"></font-awesome-icon>
          <font-awesome-icon v-else-if="i === 1" icon="fa-solid fa-sun" style="color: #ff0000;"></font-awesome-icon>
          <font-awesome-icon v-else-if="i === 2" icon="fa-solid fa-moon" style="color: #ffd43b;"></font-awesome-icon>
          <div v-cloak id="todoTimeOfDay" class="q-ml-sm" v-text="task.todoTimeOfDay.toLowerCase()"></div>
        </div>
      <NewCardButton :newTodoTimeOfDay="task.todoTimeOfDay"/>
      </div>
      <draggable
          :list="task.todoResponses"
          group="people"
          :animation="200"
          item-key="id"
          @change="moveTimeOfDay"
      >
        <template #item="{element}">
          <Todo :todo="element"></Todo>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import {useTodoListStore} from "../stores/todoList.js";
import Todo from "../components/todolist/Todo.vue";
import draggable from "vuedraggable";
import {capitalize, computed, onMounted, ref, watch} from "vue";
import axios from "axios";
import NewCardButton from "../components/todolist/NewCardButton.vue";
import {useRoute} from "vue-router";

const currentRoute = useRoute();
const todoListStore = useTodoListStore();
const {state} = todoListStore;
let tasks = computed(() => state.todoList);

onMounted(() => {
  axios
      .get("http://localhost:8080/api/todos", {
        params: {
          date: currentRoute.query.date
        }
      })
      .then((res) => {
        todoListStore.state.todoList = res.data;
      })
});

const moveTimeOfDay = (e) => {
  if (!e.added) return;

  const targetElement = e.added.element;
  for (let i = 0; i < state.todoList.length; i++) {
    let timeOfDay = state.todoList[i].todoTimeOfDay;
    for (let j = 0; j < state.todoList[i].todoResponses.length; j++) {
      if (state.todoList[i].todoResponses[j].id === targetElement.id) {
        targetElement.todoTimeOfDay = timeOfDay;
      }
    }
  }
  const url = "http://localhost:8080/api/todos/" + targetElement.id;
  const response = axios.put(url, targetElement);
  console.log("# 응답객체: ", response.data);
}
</script>
