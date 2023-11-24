<template>
  <div style="height: 80vh">
    <div v-if="!userStore.isLogin" class="absolute-center full-width text-center">
      <h5 class="text-grey">Welcome to our todo website, Let's login and make todos</h5>
    </div>
    <Qalendar
        v-if="userStore.isLogin"
        :events="events"
        :config="config"
    />
  </div>

</template>

<script setup>
import {Qalendar} from "qalendar";
import {reactive} from "vue";
import {useUserStore} from "../stores/user.js";

const userStore = useUserStore();

const events = reactive([
  {
    title: "Advanced algebra",
    time: {start: "2023-11-16", end: "2023-11-16"},
    colorScheme: "morning",
    isEditable: true,
    id: "753944708f02",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!"
  },
  {
    title: "Advanced algebra",
    time: {start: "2023-11-16", end: "2023-11-16"},
    color: "yellow",
    colorScheme: "afternoon",
    isEditable: true,
    id: "753944708f0f",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!"
  },
  {
    title: "Advanced algebra",
    with: "Chandler Bing",
    time: {start: "2023-11-16", end: "2023-11-17"},
    color: "yellow",
    colorScheme: "evening",
    isEditable: true,
    id: "753944708f0f",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!"
  },

]);

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
  disableModes: ["week", "day"]
})
</script>

<style>
@import "qalendar/dist/style.css";
</style>