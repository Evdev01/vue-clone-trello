import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import RegistrationModalValidate from '@/components/validateForm/RegistrationModalValidate'
import DeletedTodo from '@/components/DeletedTodo'
import MainWrapper from '@/components/MainWrapper'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: MainWrapper
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationModalValidate,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/basket',
    name: 'basket',
    component: DeletedTodo,
  },
]

const router = new VueRouter({
  routes
})

export default router
