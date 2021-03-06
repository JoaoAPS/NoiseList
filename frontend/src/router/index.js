import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/login/",
    name: "Login",
    component: Login,
  },
  {
    path: "/app",
    name: "Home",
    component: Home,
    alias: "/",
  },
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
