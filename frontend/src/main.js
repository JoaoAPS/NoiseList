import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import VTooltip from "v-tooltip"
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"

Vue.config.productionTip = false
Vue.use(VTooltip)
Vue.component("v-select", vSelect)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")
