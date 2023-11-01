<template>
  <q-header class="bg-cyan-8">
    <q-toolbar class="bg-grey-3 text-grey-7">
      <q-btn flat @click="toggleDrawer" round dense icon="menu"/>
      <q-toolbar-title class="text-weight-regular text-black">Sirin's Todo</q-toolbar-title>
      <q-btn outline label="Login" class="text-subtitle2"></q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import {useDrawerStore} from "../../stores/drawer.js";

const drawerStore = useDrawerStore();
const toggleDrawer = () => {
    drawerStore.drawer = !drawerStore.drawer;
}
</script>

<style lang="scss" scoped>

</style>