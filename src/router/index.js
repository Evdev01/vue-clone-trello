import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App'
import Registration from '@/components/Registration'
import Login from '@/components/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: App
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = new VueRouter({
  routes
})

export default router
