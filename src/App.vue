<template>
  <div id="app">
    <div class="container">

      <div class="personInfo" v-for="person in getCurrentUserInfo">
        <p>Hello: <b>{{ person.name }}</b></p>
      </div>


      <!--Registration modal-->

      <button v-show="!isAuthCheck" class="btn btnPrimary" @click="modalRegistration = !modalRegistration">Registration</button>

      <Modal
          title="Registration"
          v-show="modalRegistration"
          @close="modalRegistration = false"
      >

        <div slot="body">
          <form @submit.prevent="submitRegistrationForm">
            <label>Your name:</label>
            <input type="text" required v-model="userInfo.name">

            <label>Email:</label>
            <input type="text" required v-model="userInfo.password">

            <label>Password:</label>
            <input type="text" required v-model="userInfo.email">
            <button class="btn btnPrimary">Submit!</button>
          </form>
        </div>

      </Modal>




      <!--Login modal-->

      <button v-show="!isAuthCheck" class="btn btnPrimary" @click="modalLogin = !modalLogin">Login</button>

      <Modal
          title="Login"
          v-show="modalLogin"
          @close="modalLogin = false"
      >

        <div slot="body">
          <form @submit.prevent="submitLoginForm">
            <label>Email:</label>
            <input type="text" required v-model="checkUser.password">

            <label>Password:</label>
            <input type="text" required v-model="checkUser.email">
            <button @click="modalLogin = !modalLogin" class="btn btnPrimary">Submit!</button>
          </form>
        </div>

      </Modal>

      <button v-show="isAuthCheck" class="btn btnPrimary" @click="userExit">Exit</button>

      <MainWrapper/>

    </div>

  </div>
</template>

<script>

import MainWrapper from '@/components/MainWrapper'
import NewTodo from '@/components/NewTodo'
import Header from '@/components/Header'
import Modal from '@/components/Modal'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      userInfo: {
        name: '',
        email: '',
        password: '',
        id: new Date().getTime(),
        userTodos: {
          currentTodo: [],
          expiredTodo: [],
          completedTodo: [],
        }
      },
      checkUser: {
        email: '',
        password: ''
      },
      modalRegistration: false,
      modalLogin: false,
    }
  },
  mounted() {
    if (this.getCurrentUserInfo) {
      this.$store.state.isAuth = true
    }
  },
  computed: {
    ...mapGetters(['getUserList', 'isAuthCheck', 'getCurrentUserInfo', 'getState']),
  },
  methods: {
    ...mapActions(['getNewUser', 'checkUserData', 'userExit']),
    submitRegistrationForm() {


      const newUser = {
        name: this.userInfo.name,
        email: this.userInfo.email,
        password: this.userInfo.password,
        id: new Date().getTime(),
        userTodos: {
          currentTodo: [],
          expiredTodo: [],
          completedTodo: [],
    }

      }

      this.getNewUser(newUser)

      this.userInfo.email = this.userInfo.password = this.userInfo.name = ''


      this.modalRegistration = false
    },
    submitLoginForm() {

      this.$store.state.isAuth = true

      const checkPersonDate = {
        email: this.checkUser.email,
        password: this.checkUser.password
      }

      this.checkUserData(checkPersonDate)

      this.checkUser.email = this.checkUser.password = ''


    }
  },
  components: {
    Modal,
    Header,
    NewTodo,
    MainWrapper
  }
}
</script>

<style lang="scss">
  .personInfo {
    text-align: right;
    font-size: 20px;
    & p {
      font-size: 21px;
    }
  }
</style>
