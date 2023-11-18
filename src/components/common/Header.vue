<template>
  <q-header class="bg-cyan-8">
    <q-toolbar class="bg-grey-3 text-grey-7">
      <q-btn flat @click="toggleDrawer" round dense icon="menu"/>
      <q-toolbar-title class="text-weight-regular text-black">Sirin's Todo</q-toolbar-title>
      <q-btn v-if="!userStore.isLogin" outline label="Login" class="text-subtitle2" @click="card = true"></q-btn>
      <q-btn v-else outline label="Logout" class="text-subtitle2" @click="userStore.logout"></q-btn>

      <q-dialog v-model="card">
        <q-card class="q-pa-lg">
          <q-card-section>
            <div class="text-black text-h6 text-center text-weight-bold">Sign Up or Log In</div>
          </q-card-section>
          <q-separator/>
          <q-card-section class="q-pt-none q-mt-md column">
            <q-btn color="deep-orange" class="q-mb-md">
              <a href="http://localhost:8080/oauth2/authorization/google">
              <div class="row items-center no-wrap justify-between">
                <font-awesome-icon icon="fa-brands fa-google" style="color: #ffffff;" class="q-mr-lg"/>
                <div class="text-center text-capitalize">
                  Continue with Google
                </div>
              </div>
              </a>
            </q-btn>
            <q-btn color="green-7">
              <div class="row items-center no-wrap">
                <font-awesome-icon icon="fa-solid fa-n" style="color: #ffffff;" class="q-mr-lg"/>
                <div class="text-center text-capitalize">
                  Continue with Naver
                </div>
              </div>
            </q-btn>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import {useDrawerStore} from "../../stores/drawer.js";
import {computed, ref} from "vue";
import {useUserStore} from "../../stores/user.js";

const drawerStore = useDrawerStore();
const userStore = useUserStore();
const card = ref(false);

const toggleDrawer = () => {
  drawerStore.drawer = !drawerStore.drawer;
}
</script>