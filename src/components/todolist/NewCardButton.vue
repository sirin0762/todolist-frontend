<template>
  <div>
    <q-btn round outline color="primary" size="xs" @click="newCardEditPopup = true">
      <font-awesome-icon icon="fa-solid fa-plus" size="xl" style="color: #1976d2;"></font-awesome-icon>
    </q-btn>
    <!--        dialog-->
    <q-dialog v-model="newCardEditPopup" @before-hide="createTodo">
      <q-card style="min-width: 300px; height: auto" class="q-pa-sm">
        <div class="row justify-between items-center">
          <q-card-section class="q-pb-sm q-pt-sm">
            <q-input v-model="newTodo.title" label="Title" :input-style="{ fontWeight: 'bold' }" stack-label/>
          </q-card-section>
          <q-btn icon="event" round color="primary" size="sm" style="{width: 24px; height: 24px;}" class="q-mr-sm">
            <q-popup-proxy anchor="top right" transition-show="scale" transition-hide="scale">
              <q-date v-model="dateRange" range mask="YYYY-MM-DD">
              </q-date>
            </q-popup-proxy>
          </q-btn>
        </div>
        <q-card-section class="q-pt-sm">
          <q-input type="textarea" v-model="newTodo.desc" label="Description" autogrow/>
        </q-card-section>
        <q-checkbox class="q-pl-xs" size="xs" label="Done" v-model="newTodo.done"></q-checkbox>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import {ref} from "vue";

const newCardEditPopup = ref(false);
const newTodo = ref({
  title: "",
  desc: "",
  todoTimeOfDay: "",
  done: false,
  startDate: "",
  endDate: ""
});
const dateRange = ref({from: newTodo.value.startDate, to: newTodo.value.endDate});

const createTodo = (e) => {
  // console.log(e.target.parentNode.querySelector("#todoTimeOfDay").innerText.toUpperCase());
  console.log(e.target);

}

</script>
