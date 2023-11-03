<template>
  <div>
    <q-card class="q-mt-md q-ml-xl q-mr-xl q-pt-md q-pb-md" @click="editPopup = true">
      <q-card-section class="q-pb-sm q-pt-sm">
        <div class="text-black text-weight-bold">{{ todo.title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-sm">
        <div>{{ shortenText(todo.desc, 50) }}</div>
      </q-card-section>
      <q-checkbox class="q-pl-xs" size="xs" label="Done" v-model="todo.done"></q-checkbox>
    </q-card>

    <q-dialog v-model="editPopup" @before-hide="updateTodo">
      <q-card style="min-width: 300px; height: auto" class="q-pa-sm">
        <div class="row justify-between items-center">
          <q-card-section class="q-pb-sm q-pt-sm">
            <q-input v-model="todo.title" label="Title" :input-style="{ fontWeight: 'bold' }" stack-label/>
          </q-card-section>
          <q-btn icon="event" round color="primary" size="sm" style="{width: 24px; height: 24px;}" class="q-mr-sm">
            <q-popup-proxy anchor="top right" transition-show="scale" transition-hide="scale">
              <q-date v-model="dateRange" range mask="YYYY-MM-DD">
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
import {computed, ref, watch} from "vue";
import axios from "axios";

const props = defineProps(['todo']);

const todo = ref(props.todo);
const editPopup = ref(false);
const dateRange = ref({from: todo.value.startDate, to: todo.value.endDate});

const shortenText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

watch(dateRange, (newOne, oldOne) => {
  todo.startDate = newOne.from;
  todo.endDate = newOne.to;
});

watch(todo, (newOne, oldOne) => {
  console.log(newOne);
})

const updateTodo = (e) => {
  const url = "http://localhost:8080/api/todos/" + todo.value.id;
  const response = axios.put(url, todo.value);
  console.log("# 응답객체: ", response.data);
}
</script>
