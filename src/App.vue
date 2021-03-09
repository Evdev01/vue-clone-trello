<template>
  <div id="app">
    <div class="container">

      <header>
        <div class="navbar">
          <div class="container">
            <div class="navbar-content">
              <router-link to="/">
                <div class="logo">VUE-CLI</div>
              </router-link>
              <ul class="navbar-list" v-if="!isAuthCheck">
                <li class="navbar-item">
                  <router-link title="Registration" to="/registration" class="navbar-link">
                    Registration
                  </router-link>
                </li>
                <li class="navbar-item">
                  <router-link title="Login" to="/login" class="navbar-link">
                    Login
                  </router-link>
                </li>
              </ul>
              <div v-show="isAuthCheck" class="personInfo" v-for="person in getCurrentUserInfo">
                <p>Hello: <b>{{ person.name }}</b></p>
                <p @click="userExit" class="logoutAccount">Logout</p>
              </div>
            </div>
          </div>
        </div>
      </header>



      <router-view/>

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
      links: [
        {title: 'Registration', url: '/registration'},
        {title: 'Login', url: '/login'}
      ],
      checkUser: {
        email: '',
        password: ''
      },
      modalRegistration: false
    }
  },
  mounted() {
    if (this.getCurrentUserInfo) {
      this.$store.state.isAuth = true
    }
  },
  computed: {
    ...mapGetters(['getUserList', 'isAuthCheck', 'getCurrentUserInfo', 'getState'])
  },
  methods: {
    ...mapActions(['checkUserData', 'userExit']),
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

  & .logoutAccount {
    font-size: 18px;
    color: #444ce0;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
