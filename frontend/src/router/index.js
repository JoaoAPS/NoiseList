import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authentication from '../views/Authentication.vue'
import Axios from 'axios'

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

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    const res = localStorage.token === null ? {data: {correct: false}} :
                await Axios.post('/api/check_token', {token: localStorage.token})
    
    if (res.data.correct) {
      next()
    } else {
      next({
        path: '/authentication',
        params: { nextUrl: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
