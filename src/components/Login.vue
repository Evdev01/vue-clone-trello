<template>

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
        <input type="password" required v-model="checkUser.email">
        <button class="btn btnPrimary">Submit!</button>
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
      checkUser: {
        email: '',
        password: ''
      },
      modalLogin: true
    }
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

      this.modalLogin = false

      this.checkUser.email = this.checkUser.password = ''

      this.$router.push('home')
    }
  },
}
</script>

<style scoped>

</style>