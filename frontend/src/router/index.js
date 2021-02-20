import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authentication from '../views/Authentication.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: Authentication,
    meta: {guest: true}
  },
]

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.token !== process.env.VUE_APP_SECRET_TOKEN) {
      next({
        path: '/authentication',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
