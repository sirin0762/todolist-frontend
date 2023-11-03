<template>
  <div class="fixed">
    <q-drawer
        v-model="drawer"
        show-if-above
        :width="256"
        :breakpoint="400"
        class="bg-indigo text-white"
    >
      <q-scroll-area class="fit">
        <div style="height: 45vh" class="q-pa-lg">
          <div class="flex justify-center items-center column">
            <q-avatar size="150px" class="q-mb-lg">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold text-h5 q-mb-sm">Sirin</div>
            <q-btn class="bg-white text-black">Update Profile</q-btn>
          </div>
        </div>

        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox"/>
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star"/>
            </q-item-section>

            <q-item-section>
              Star
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send"/>
            </q-item-section>

            <q-item-section>
              Send
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts"/>
            </q-item-section>

            <q-item-section>
              Drafts
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>

</template>

<script setup>
import {computed} from "vue";
import {useDrawerStore} from "../../stores/drawer.js";

const drawerStore = useDrawerStore();
const drawer = computed(() => drawerStore.drawer);
</script>

<style lang="scss" scoped>

</style>