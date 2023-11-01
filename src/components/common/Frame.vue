<template>
  <q-layout view="lHh lpr lff" container style="height: 100vh;" class="shadow-2 rounded-borders">
    <Header/>
    <Drawer/>
    <Content/>
  </q-layout>
</template>

<script setup>
import Header from "./Header.vue";
import Drawer from "./Drawer.vue";
import Content from "./Content.vue";
</script>