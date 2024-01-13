<template>
  <q-header class="bg-cyan-8">
    <q-toolbar class="bg-grey-3 text-grey-7">
      <q-btn flat @click="toggleDrawer" round dense icon="menu"/>
      <q-toolbar-title class="text-weight-bold text-gray text-subtitle2">Sirin's Todolist</q-toolbar-title>
      <q-btn v-if="!userStore.isLogin"
             label="Login"
             outline
             class="text-subtitle2 text-weight-bold"
             style="text-transform: none;"
             @click="showLoginPopup = true">
      </q-btn>
      <q-btn v-else
             label="Logout"
             outline
             class="text-subtitle2 text-weight-bold"
             style="text-transform: none;"
             @click="userStore.logout">
      </q-btn>

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