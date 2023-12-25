<template>
  <div style="height: 80vh">
    <div v-if="!userStore.isLogin" class="absolute-center full-width text-center">
      <h5 class="text-grey">Welcome to our todo website, Let's login and make todos</h5>
    </div>
    <Qalendar
        v-if="userStore.isLogin"
        :events="events.todos"
        :config="config"
        @updated-period="updatePeriod"
    >
    </Qalendar>
  </div>

</template>

<script setup>
import {Qalendar} from "qalendar";
import {onBeforeMount, reactive, ref} from "vue";
import {useUserStore} from "../stores/user.js";
import axios from "axios";
import {date} from "quasar";
import globalAxios from "../axios/axios.js";

const userStore = useUserStore();

const events = reactive({
  todos: []
});

onBeforeMount(() => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  globalAxios.get("/api/calendar", {
    params: {
      startDate: date.formatDate(firstDayOfMonth, 'YYYY-MM-DD'),
      endDate: date.formatDate(lastDayOfMonth, 'YYYY-MM-DD')
    }
  }).then((res) => {
    events.todos = convertCalendarFormat(res.data);
  })
});


const config = reactive({
  style: {
    fontFamily: "Nunito",
    colorSchemes: {
      morning: {
        color: "#61B3E5",
        backgroundColor: "#61B3E5"
      },
      afternoon: {
        color: "#FF0000",
        backgroundColor: "#FF0000"
      },
      evening: {
        color: "#FFD43B",
        backgroundColor: "#FFD43B"
      }
    }
  },
  defaultMode: 'month',
  disableModes: ["week", "day"],
});

const updatePeriod = (e) => {
  globalAxios.get("/api/calendar", {
    params: {
      startDate: date.formatDate(e.start, 'YYYY-MM-DD'),
      endDate: date.formatDate(e.end, 'YYYY-MM-DD')
    }
  }).then((res) => {
    events.todos = convertCalendarFormat(res.data);
  })
}

const convertCalendarFormat = (todos) => {
  const result = [];
  for (let i = 0; i < todos.length; i++) {
    const obj = {
      id: todos[i].id,
      title: todos[i].title,
      description: todos[i].desc,
      time: {
        start: todos[i].startDate,
        end: todos[i].endDate
      },
      colorScheme: todos[i].todoTimeOfDay.toLowerCase(),
      isEditable: false,
    }
    result.push(obj);
  }
  return result;
}

</script>

<style>
@import "qalendar/dist/style.css";
</style>