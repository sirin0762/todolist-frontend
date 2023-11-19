<template>
  <div>
    <q-dialog v-model="open">
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
  </div>
</template>

<script setup>
import {computed, ref} from "vue";

const props = defineProps(['open']);
const emit = defineEmits(['hide-popup']);
const open = computed({
  get() {
    return props.open;
  },
  set(value) {
    emit('hide-popup');
  }
})
</script>

