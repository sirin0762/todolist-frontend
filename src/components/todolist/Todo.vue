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
      <q-menu
          touch-position
          context-menu
      >
        <q-list dense style="min-width: 100px">
          <q-item clickable v-close-popup @click="duplicateTodo">
            <q-item-section>Duplicate</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="deleteTodo">
            <q-item-section>Delete</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
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
const emit = defineEmits(['update-todo', 'delete-todo', 'duplicate-todo']);

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

const updateTodo = async () => {
  emit('update-todo', todo.value.id, todo.value);
}

const deleteTodo = () => {
  emit('delete-todo', todo.value.id);
}

const duplicateTodo = () => {
  emit('duplicate-todo', todo.value);
}

const dateRangeStart = (from) => {
  const fromDate = new Date(from.year, from.month, from.day);
  todo.value.startDate = date.formatDate(fromDate, 'YYYY-MM-DD');
}

const dateRangeEnd = (dateObj) => {
  const toDate = new Date(dateObj.to.year, dateObj.to.month, dateObj.to.day);
  todo.value.endDate = date.formatDate(toDate, 'YYYY-MM-DD');
}
</script>
