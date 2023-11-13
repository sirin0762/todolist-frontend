<template>
  <div>

  </div>
</template>

<script setup>
import {useRoute} from "vue-router";

const route = useRoute();
const token = route.query.token;

if (token) {

}
</script>
