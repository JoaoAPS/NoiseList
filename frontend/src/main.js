import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { BootstrapVue } from "bootstrap-vue"
import vSelect from "vue-select"
import Axios from "axios"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "vue-select/dist/vue-select.css"

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component("v-select", vSelect)

// Axios default values
Axios.defaults.baseURL = process.env.VUE_APP_BACKEND_HOST
Axios.defaults.headers.get["Accept"] = "application/json"
Axios.defaults.headers.post["Accept"] = "application/json"
const token = localStorage.getItem("token")
if (token) Axios.defaults.headers.common["Authorization"] = `Token ${token}`

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")
