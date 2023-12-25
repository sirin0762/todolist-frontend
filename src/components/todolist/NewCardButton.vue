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
              <q-date v-model="dateRange" range mask="YYYY-MM-DD" @range-start="dateRangeStart"
                      @range-end="dateRangeEnd">
              </q-date>
            </q-popup-proxy>
          </q-btn>
        </div>
        <q-card-section class="q-pt-sm">
          <q-input type="textarea" v-model="newTodo.desc" label="Description" stack-label autogrow/>
        </q-card-section>
        <div class="row justify-between items-center">
          <q-checkbox class="q-pl-xs" size="xs" label="Done" v-model="newTodo.done"></q-checkbox>
          <q-btn class="q-mr-sm" label="저장" size="12px" color="primary" @click="createTodo" v-close-popup></q-btn>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import {useTodoListStore} from "../../stores/todoList.js";
import {useRoute} from "vue-router";
import {date} from "quasar";
import globalAxios from "../../axios/axios.js";

const currentRoute = useRoute();
const props = defineProps(['newTodoTimeOfDay']);
const todoListStore = useTodoListStore();
const newCardEditPopup = ref(false);
const {state} = todoListStore;

const newTodo = ref({
  id: "",
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
  if (newTodo.value.startDate === "") newTodo.value.startDate = date.formatDate(Date.now(), 'YYYY-MM-DD');
  if (newTodo.value.endDate === "") newTodo.value.endDate = newTodo.value.startDate;
  newTodo.value.todoTimeOfDay = props.newTodoTimeOfDay;

  const url = "/api/todos"
  const response = await globalAxios.post(url, newTodo.value);
  newTodo.value.id = response.data;

  globalAxios.get("/api/todos", {
    params: {
      date: newTodo.value.startDate
    }
  })
  .then((res) => {
    todoListStore.state.todoList = res.data;
  })
  newTodo.value = {
    id: "",
    title: "",
    desc: "",
    todoTimeOfDay: "",
    done: false,
    startDate: "",
    endDate: ""
  }
}

const dateRangeStart = (from) => {
  const fromDate = new Date(from.year, from.month - 1, from.day);
  newTodo.value.startDate = date.formatDate(fromDate, 'YYYY-MM-DD');
}

const dateRangeEnd = (dateObj) => {
  const toDate = new Date(dateObj.to.year, dateObj.to.month - 1, dateObj.to.day);
  newTodo.value.endDate = date.formatDate(toDate, 'YYYY-MM-DD');
}
</script>
