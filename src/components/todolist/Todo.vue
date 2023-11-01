<template>
  <div>
    <q-card class="q-mt-md q-ml-xl q-mr-xl q-pt-md q-pb-md" @click="editPopup = true">
      <q-card-section class="q-pb-sm q-pt-sm">
        <div class="text-black text-weight-bold">{{todo.title}}</div>
      </q-card-section>
      <q-card-section class="q-pt-sm">
        <div>{{shortenText(todo.desc, 80)}}</div>
      </q-card-section>
      <q-checkbox class="q-pl-xs" size="xs" label="Done" v-model="todo.done"></q-checkbox>
    </q-card>

    <q-dialog v-model="editPopup">
      <q-card style="min-width: 300px; height: auto" class="q-pa-sm">
        <div class="row justify-between items-center">
          <q-card-section class="q-pb-sm q-pt-sm">
            <q-input v-model="todo.title" label="Title" :input-style="{ fontWeight: 'bold' }" stack-label/>
          </q-card-section>
          <q-btn icon="event" round color="primary" size="sm" style="{width: 24px; height: 24px;}" class="q-mr-sm">
            <q-popup-proxy anchor="top right" transition-show="scale" transition-hide="scale">
              <q-date v-model="dateRange" range>
                <q-btn label="Cancel" color="primary" flat v-close-popup />
                <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
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
import {computed, ref} from "vue";

const props = defineProps(['todo']);

const todo = ref(props.todo);
const editPopup = ref(false);
const dateRange = ref({from: "", to: ""});

const shortenText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

const save = () => {
  todo.startDate = dateRange.value.from;
  todo.endDate = dateRange.value.to;
};
</script>
