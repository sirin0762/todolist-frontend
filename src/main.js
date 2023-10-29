import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

// router
import router from "./router/router.js";

// pinia
import {createPinia} from "pinia";

// quasar
import {Quasar} from "quasar";
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'

// font-awesome

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faSun, faCloud, faMoon } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App);

// font-awesome icons
library.add(faSun);
library.add(faCloud);
library.add(faMoon);
app.component('font-awesome-icon', FontAwesomeIcon);

// router

app.use(router);
// pinia

app.use(createPinia());
// quasar
app.use(Quasar,{

    plugins: {}
});
app.mount('#q-app');
