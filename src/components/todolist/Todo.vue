<template>
  <q-card class="q-mt-md q-ml-xl q-mr-xl">
    <q-card-section class="q-pb-sm q-pt-sm">
      <q-input v-model="todo.title" label="Title" :input-style="{ fontWeight: 'bold' }" stack-label/>
    </q-card-section>
    <q-card-section class="q-pt-sm">
      <q-input v-model="todo.desc" label="Description" stack-label/>
    </q-card-section>
    <q-checkbox class="q-pl-xs" size="xs" label="Done" v-model="todo.done"></q-checkbox>
  </q-card>


</template>

<script setup>
import {ref} from "vue";

const props = defineProps(['todo']);

const todo = ref(props.todo);
const card = ref(false);
</script>
