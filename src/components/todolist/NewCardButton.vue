<template>
  <div>
    <q-btn round outline color="primary" size="xs" @click="newCardEditPopup = true">
      <font-awesome-icon icon="fa-solid fa-plus" size="xl" style="color: #1976d2;"></font-awesome-icon>
    </q-btn>
    <!--        dialog-->
    <q-dialog v-model="newCardEditPopup">
      <q-card style="min-width: 300px; height: auto" class="q-pa-sm">
        <div class="row justify-between items-center">
          <q-card-section class="q-pb-sm q-pt-sm">
            <q-input v-model="newTodo.title" label="Title" :input-style="{ fontWeight: 'bold' }" stack-label
                     :rules="[val => !!val || 'Title is required']"
            />
          </q-card-section>
          <q-btn icon="event" round color="primary" size="sm" style="{width: 24px; height: 24px;}" class="q-mr-sm">
            <q-popup-proxy anchor="top right" transition-show="scale" transition-hide="scale">
              <q-date v-model="dateRange" range mask="YYYY-MM-DD">
              </q-date>
            </q-popup-proxy>
          </q-btn>
        </div>
        <q-card-section class="q-pt-sm">
          <q-input type="textarea" v-model="newTodo.desc" label="Description" stack-label autogrow/>
        </q-card-section>
        <div class="row justify-between items-center">
          <q-checkbox class="q-pl-xs" size="xs" label="Done" v-model="newTodo.done"></q-checkbox>
          <q-btn label="저장" size="12px" color="primary" @click="createTodo"></q-btn>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import {useTodoListStore} from "../../stores/todoList.js";
import axios from "axios";
import {useRoute} from "vue-router";

const currentRoute = useRoute();
const props = defineProps(['newTodoTimeOfDay']);
const todoListStore = useTodoListStore();
const newCardEditPopup = ref(false);
const {state} = todoListStore;

const newTodo = ref({
  id : "",
  title: "",
  desc: "",
  todoTimeOfDay: "",
  done: false,
  startDate: "",
  endDate: ""
});
const dateRange = ref({from: newTodo.value.startDate, to: newTodo.value.endDate});

const createTodo = async (e) => {
  if (newTodo.value.title === "") return;
  await setDateRangeInTodo();
  if (newTodo.value.startDate === "") newTodo.value.startDate = currentRoute.query.date;
  newTodo.value.todoTimeOfDay = props.newTodoTimeOfDay;

  console.log(newTodo.value);

  const url = "http://localhost:8080/api/todos"
  const response = axios.post(url, newTodo.value);

  newTodo.value.id = response.data;

  for (let i = 0; i < state.todoList.length; i++) {
    console.log(state.todoList[i]);
    if (state.todoList[i].todoTimeOfDay === newTodo.value.todoTimeOfDay) {
      state.todoList.todoResponses.push(newTodo);
    }
  }

}

const setDateRangeInTodo = () => {
  newTodo.value.startDate = dateRange.value.from;
  newTodo.value.endDate = dateRange.value.to;
}
</script>
