<template>
  <div>
    <q-card class="q-mt-md q-pt-md q-pb-md" @click="editPopup = true">
      <q-card-section class="q-pb-sm q-pt-sm">
        <div class="text-black text-weight-bold">{{ todo.title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-sm">
        <div>{{ shortenText(todo.desc, 50) }}</div>
      </q-card-section>
      <q-checkbox class="q-pl-xs" size="xs" label="Done" v-model="todo.done" @click="updateTodo"></q-checkbox>
    </q-card>

    <q-dialog v-model="editPopup" @before-hide="updateTodo">
      <q-card style="min-width: 300px; height: auto" class="q-pa-sm">
        <div class="row justify-between items-center">
          <q-card-section class="q-pb-sm q-pt-sm">
            <q-input v-model="todo.title" label="Title" :input-style="{ fontWeight: 'bold' }" stack-label/>
          </q-card-section>
          <q-btn icon="event" round color="primary" size="sm" style="{width: 24px; height: 24px;}" class="q-mr-sm">
            <q-popup-proxy anchor="top right" transition-show="scale" transition-hide="scale">
              <q-date v-model="dateRange" range mask="YYYY-MM-DD" @range-start="dateRangeStart" @range-end="dateRangeEnd">
              </q-date>
            </q-popup-proxy>
          </q-btn>
        </div>
        <q-card-section class="q-pt-sm">
          <q-input type="textarea" v-model="todo.desc" label="Description" autogrow/>
        </q-card-section>
        <q-checkbox class="q-pl-xs" size="xs" label="Done" v-model="todo.done"></q-checkbox>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import {date} from "quasar";

const props = defineProps(['todo']);

const todo = ref({
  id: props.todo.id,
  title: props.todo.title,
  desc: props.todo.desc,
  todoTimeOfDay: props.todo.todoTimeOfDay,
  done: props.todo.done,
  startDate: props.todo.startDate,
  endDate: props.todo.endDate
});

const editPopup = ref(false);
const dateRange = ref({from: todo.value.startDate, to: todo.value.endDate});

const shortenText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

const updateTodo = async (e) => {
  console.log(dateRange.value);
  await setDateRangeInTodo();
  console.log(todo.value);
  const url = "http://localhost:8080/api/todos/" + todo.value.id;
  const response = axios.put(url, todo.value);
  console.log("# 응답객체: ", response.data);
}

const setDateRangeInTodo = () => {
  todo.value.startDate = dateRange.value.from;
  todo.value.endDate = dateRange.value.to;
}

const dateRangeStart = (from) => {
  todo.value.startDate = date.formatDate(from, 'YYYY-MM-DD');
}

const dateRangeEnd = (dateObj) => {
  todo.value.endDate = date.formatDate(dateObj.to, 'YYYY-MM-DD');
}
</script>
