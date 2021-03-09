<template>

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
        <input type="password" required v-model="userInfo.email">
        <button class="btn btnPrimary" @click="modalRegistration = !modalRegistration">Submit!</button>
      </form>
    </div>

  </Modal>

</template>

<script>
import Modal from '@/components/Modal'

import {mapActions, mapGetters} from 'vuex'

export default {
  name: "Registration",
  components: {Modal},
  data() {
    return {
      userInfo: {
        name: '',
        email: '',
        password: '',
        date: '',
        id: new Date().getTime(),
        userTodos: {
          currentTodo: [],
          expiredTodo: [],
          completedTodo: []
        }
      },
      modalRegistration: true
    }
  },
  computed: {
    ...mapGetters(['isAuthCheck'])
  },
  methods: {
    ...mapActions(['getNewUser']),
    submitRegistrationForm() {

      const newUser = {
        name: this.userInfo.name,
        email: this.userInfo.email,
        password: this.userInfo.password,
        id: new Date().getTime(),
        date: '',
        userTodos: {
          currentTodo: [],
          expiredTodo: [],
          completedTodo: []
        }

      }

      this.getNewUser(newUser)

      this.userInfo.email = this.userInfo.password = this.userInfo.name = ''

      this.modalRegistration = false

      this.$router.push('login')

    }
  }
}
</script>

<style scoped>

</style>