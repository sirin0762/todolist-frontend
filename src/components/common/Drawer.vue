<template>
  <div class="fixed" style="{width: 256px; height: 100vh;}">
    <q-drawer
        v-model="drawer"
        show-if-above
        :width="256"
        :breakpoint="1"
        :mini="miniDrawer"
        class="bg-indigo text-white z-top"
    >
      <q-scroll-area class="fit">
        <div style="height: 45vh" class="q-pa-lg">
          <div class="flex justify-center items-center column q-mini-drawer-hide">
            <q-avatar size="150px" class="q-mb-lg">
              <img v-if="userStore.isLogin" :src="userStore.state.imageUrl">
              <img v-if="!userStore.isLogin"
                   src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png">
            </q-avatar>
            <div v-if="userStore.isLogin" class="text-weight-bold text-h5 q-mb-sm">{{ userStore.state.username }}</div>
            <q-btn v-if="userStore.isLogin" class="bg-white text-black">Update Profile</q-btn>
            <q-btn v-if="!userStore.isLogin" class="bg-white text-black" @click="showLoginPopup = true">Login</q-btn>
          </div>
        </div>
        <LoginPopup :open="showLoginPopup" @hide-popup="hideLoginPopup"/>

        <q-list padding>
          <router-link to="/todos">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="add_task"/>
              </q-item-section>

              <q-item-section class="q-mini-drawer-hide">
                Todos
              </q-item-section>
            </q-item>
          </router-link>

          <router-link to="/calendar">
            <q-item clickable v-ripple>

              <q-item-section avatar>
                <q-icon name="calendar_month"/>
              </q-item-section>

              <q-item-section class="q-mini-drawer-hide">
                Calendar
              </q-item-section>
            </q-item>
          </router-link>

        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>

</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useDrawerStore} from "../../stores/drawer.js";
import {useUserStore} from "../../stores/user.js";
import LoginPopup from "./LoginPopup.vue";
import {Platform} from "quasar";

const userStore = useUserStore();
const drawerStore = useDrawerStore();
const drawer = computed(() => drawerStore.drawer);
const showLoginPopup = ref(false);
const miniDrawer = ref(false);

onMounted(() => {
  miniDrawer.value = Platform.is.mobile;
})

const hideLoginPopup = () => {
  showLoginPopup.value = false;
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>