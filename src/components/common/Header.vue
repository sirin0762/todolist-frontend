<template>
  <q-header class="bg-cyan-8">
    <q-toolbar class="bg-grey-3 text-grey-7">
      <q-btn flat @click="toggleDrawer" round dense icon="menu"/>
      <q-toolbar-title class="text-weight-regular text-black">Sirin's Todo</q-toolbar-title>
      <q-btn v-if="!userStore.isLogin" outline label="Login" class="text-subtitle2" @click="showLoginPopup = true"></q-btn>
      <q-btn v-else outline label="Logout" class="text-subtitle2" @click="userStore.logout"></q-btn>

      <LoginPopup :open="showLoginPopup" @hide-popup="hideLoginPopup"/>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import {useDrawerStore} from "../../stores/drawer.js";
import {computed, ref} from "vue";
import {useUserStore} from "../../stores/user.js";
import LoginPopup from "./LoginPopup.vue";

const drawerStore = useDrawerStore();
const userStore = useUserStore();
const showLoginPopup = ref(false);

const toggleDrawer = () => {
  drawerStore.drawer = !drawerStore.drawer;
}

const hideLoginPopup = () => {
  showLoginPopup.value = false;
}
</script>