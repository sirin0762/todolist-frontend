<template>
  <div>

  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import {useUserStore} from "../../stores/user.js";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  const username = decodeURIComponent(route.query.nickname);
  const imageUrl = decodeURIComponent(route.query.imageUrl)
  userStore.login(username, imageUrl);

  router.push("/todos");
});
</script>
