import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App'
import Modal from '@/components/Modal'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: App
  },
  {
    path: '/registered',
    name: 'registered',
    component: Modal,
  },
]

const router = new VueRouter({
  routes
})

export default router
