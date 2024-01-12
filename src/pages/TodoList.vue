<template>
  <div class="column">
    <q-scroll-area
        :visible="visible"
        style="height: 80vh; max-width: 100%;"
    >
      <div v-if="userStore.isLogin" class="row justify-end q-mr-xl" style="{width: 100%}">
        <q-input rounded outlined dense v-model="targetDay" mask="####-##-##" :input-style="{ width: '84px' }">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer" round color="primary" size="xs">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="targetDay" minimal mask="YYYY-MM-DD" @update:model-value="getTodoList"></q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div v-if="!userStore.isLogin && Platform.is.desktop" class="absolute-center full-width text-center">
        <h5 class="text-grey">Welcome to our todo website, Let's login and make todos</h5>
      </div>

      <div v-else class="row">
        <div v-if="isThereAnyTodo && Platform.is.desktop" class="fixed-center full-width text-center">
          <h5 class="text-grey">There are no todos created. How about making one?</h5>
        </div>
        <div v-for="(task, i) in tasks" :key="i" class="q-pr-xl q-pl-xl" :class="Platform.is.desktop ? 'col-4' : 'col-12 col-md-4'">
          <div class="row justify-between items-center q-mt-md">
            <div class="text-h5 text-weight-bold text-lowercase text-capitalize row items-center">
              <font-awesome-icon v-if="i === 0" icon="fa-d fa-cloud" style="color: #61b3e5"></font-awesome-icon>
              <font-awesome-icon v-else-if="i === 1" icon="fa-solid fa-sun" style="color: #ff0000;"></font-awesome-icon>
              <font-awesome-icon v-else-if="i === 2" icon="fa-solid fa-moon"
                                 style="color: #ffd43b;"></font-awesome-icon>
              <div v-cloak id="todoTimeOfDay" class="q-ml-sm" v-text="task.todoTimeOfDay.toLowerCase()"></div>
            </div>
            <NewCardButton :newTodoTimeOfDay="task.todoTimeOfDay" :defaultDay="targetDay"/>
          </div>
          <draggable
              :list="task.todoResponses"
              group="people"
              :animation="200"
              item-key="id"
              @change="moveTimeOfDay"
          >
            <template #item="{element}">
              <Todo :todo="element" @delete-todo="deleteTodo" @duplicate-todo="duplicateTodo" @update-todo="updateTodo"></Todo>
            </template>
          </draggable>
        </div>
      </div>
    </q-scroll-area>
  </div>

</template>

<script setup>
import {useTodoListStore} from "../stores/todoList.js";
import Todo from "../components/todolist/Todo.vue";
import draggable from "vuedraggable";
import {capitalize, computed, onMounted, ref, watch} from "vue";
import NewCardButton from "../components/todolist/NewCardButton.vue";
import {useRoute} from "vue-router";
import {date} from "quasar";
import {useUserStore} from "../stores/user.js";
import globalAxios from "../axios/axios.js";
import {Platform} from "quasar";

const currentRoute = useRoute();
const todoListStore = useTodoListStore();
const userStore = useUserStore();
const {state} = todoListStore;
let tasks = computed(() => state.todoList);
const targetDay = ref(date.formatDate(Date.now(), 'YYYY-MM-DD'));
const visible = ref(false);

onMounted(() => {
  if (!userStore.isLogin) return;
  getTodoList();
});

const getTodoList = () => {
  globalAxios
      .get("/api/todos", {
        params: {
          date: targetDay.value
        }
      })
      .then((res) => {
        todoListStore.state.todoList = res.data;
      })
      .catch((e) => {
        console.log(e);
      })
}

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
  const url = "/api/todos/" + targetElement.id;
  const response = globalAxios.put(url, targetElement);
  console.log("# 응답객체: ", response.data);
}

const updateTodo = (id, todo) => {
  for (let i = 0; i < state.todoList.length; i++) {
    for (let j = 0; j < state.todoList[i].todoResponses.length; j++) {
      if (state.todoList[i].todoResponses[j].id === id) {
        state.todoList[i].todoResponses[j] = todo;
      }
    }
  }

  const url = "/api/todos/" + todo.id;
  const response = globalAxios.put(url, todo);
  console.log("# 응답객체: ", response.data);
}

const deleteTodo = (targetId) => {
  for (let i = 0; i < state.todoList.length; i++) {
    for (let j = 0; j < state.todoList[i].todoResponses.length; j++) {
      if (state.todoList[i].todoResponses[j].id === targetId) {
        state.todoList[i].todoResponses.splice(j, 1);
      }
    }
  }

  const url = "/api/todos/" + targetId;
  const response = globalAxios.delete(url);
  console.log("# 응답객체: ", response.data);
}

const duplicateTodo = async (todo) => {
  const duplicatedTodo = {...todo};
  const url = "/api/todos"
  const response = await globalAxios.post(url, duplicatedTodo);
  duplicatedTodo.id = response.data;

  for (let i = 0; i < state.todoList.length; i++) {
    let timeOfDay = state.todoList[i].todoTimeOfDay;
    if (timeOfDay === duplicatedTodo.todoTimeOfDay) {
      state.todoList[i].todoResponses.push(duplicatedTodo);
    }
  }
}

const isThereAnyTodo = computed(() => {
  return tasks.value.filter(task => task.todoResponses.length === 0).length === 3;
});
</script>
