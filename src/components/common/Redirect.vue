<template>
  <div>

  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted} from "vue";
import axios from "axios";

const route = useRoute();
const token = route.query.token;

onMounted(() => {
  axios.get("/api/user")
      .then((res) => {
        console.log(res.data);
      })
});
</script>
