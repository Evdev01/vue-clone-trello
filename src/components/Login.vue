<template>

  <Modal
      title="Login"
      v-show="modalLogin"
      @close="modalLogin = false"
  >
    <div slot="body">

      <form @submit.prevent="submitLoginForm">
        <div class="form-item" :class="{ errorInput: $v.checkUser.email.$error }">
          <label>Email:</label>
          <p class="errorText" v-if="!$v.checkUser.email.required ">Field is required</p>
          <p class="errorText" v-if="!$v.checkUser.email.email ">Email is not correct!</p>

          <input
              v-model="checkUser.email"
              :class="{error: $v.checkUser.email.$error}"
              @change="$v.checkUser.email.$touch()"
          >
        </div>

        <div class="form-item" :class="{ errorInput: $v.checkUser.password.$error }">
          <label>Password:</label>
          <p class="errorText" v-if="!$v.checkUser.password.required ">Field is required</p>
          <input
              v-model="checkUser.password"
              :class="{error: $v.checkUser.password.$error}"
              @change="$v.checkUser.password.$touch()"
          >
        </div>
        <button class="btn btnPrimary">Submit!</button>
      </form>
    </div>

  </Modal>

</template>

<script>
import Modal from '@/components/Modal'

import {mapActions} from 'vuex'
import {email, required} from 'vuelidate/lib/validators'


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
  validations: {
    checkUser: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
    methods: {
    ...mapActions(['checkUserData', 'userExit']),
    submitLoginForm() {

      this.$v.$touch()
      if (!this.$v.$invalid) {
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
    }
  }
}
</script>

<style lang="scss">
.form-item .errorText {
  display: none;
  margin-bottom: 8px;
  font-size: 13.4px;
  color: #de4040;
}

.form-item {
  &.errorInput .errorText {
    display: block;
  }
}

input.error {
  border-color: #de4040;
}
</style>

