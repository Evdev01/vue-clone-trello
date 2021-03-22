<template>
  <Modal
      title="Registration"
      v-show="modalRegistration"
      @close="modalRegistration = false">

    <div slot="body">
      <form @submit.prevent="submitRegistrationForm">


        <div class="form-item" :class="{ errorInput: $v.userInfo.name.$error }">
          <label>Your name:</label>
          <p class="errorText" v-if="!$v.userInfo.name.required ">Field is required</p>
          <p class="errorText" v-if="!$v.userInfo.name.minLength ">Name must have at least
            {{ $v.userInfo.name.$params.minLength.min }}!</p>
          <input
              v-model="userInfo.name"
              :class="{error: $v.userInfo.name.$error}"
              @change="$v.userInfo.name.$touch()"
          >
        </div>

        <div class="form-item" :class="{ errorInput: $v.userInfo.email.$error }">
          <label>Email:</label>
          <p class="errorText" v-if="!$v.userInfo.email.required ">Name must have at least </p>
          <p class="errorText" v-if="!$v.userInfo.email.email ">Email is not correct!</p>
          <p class="errorText" v-if="!$v.userInfo.email.minLength ">Email must have at least
            {{ $v.userInfo.email.$params.minLength.min }} !</p>
          <input
              v-model="userInfo.email"
              :class="{error: $v.userInfo.email.$error}"
              @change="$v.userInfo.email.$touch()"
          >
        </div>

        <div class="form-item" :class="{ errorInput: $v.userInfo.password.$error }">
          <label>Password:</label>
          <p class="errorText" v-if="!$v.userInfo.password.required ">Field is required</p>
          <input
              v-model="userInfo.password"
              :class="{error: $v.userInfo.password.$error}"
              @change="$v.userInfo.password.$touch()"
          >
        </div>

        <button class="btn btnPrimary" @click="modalRegistration = !modalRegistration">Submit!</button>
      </form>
    </div>


  </Modal>
</template>

<script>

import {required, minLength, email} from 'vuelidate/lib/validators'

import Modal from '@/components/Modal'
import {mapActions} from 'vuex'

export default {
  components: {
    Modal
  },
  data() {
    return {
      name: '',
      email: '',
      userInfo: {
        name: '',
        email: '',
        password: '',
        date: '',
        id: new Date().getTime(),
        background: '',
        userTodos: {
          currentTodo: [],
          expiredTodo: [],
          completedTodo: [],
          inProgressTodo: [],
          deletedTodo: []
        }
      },
      modalRegistration: true
    }
  },
  validations: {
    userInfo: {
      name: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email,
        minLength: minLength(6)
      },
      password: {
        required
      }
    }
  },
  methods: {
    ...mapActions(['getNewUser']),
    submitRegistrationForm() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const newUser = {
          name: this.userInfo.name,
          email: this.userInfo.email,
          password: this.userInfo.password,
          id: new Date().getTime(),
          openSearchTodoInput: false,
          locale: 'ru-RU',
          date: '',
          background: '',
          checkBoxList: [],
          userTodos: {
            currentTodo: [],
            expiredTodo: [],
            completedTodo: [],
            inProgressTodo: [],
            deletedTodo: []
          }

        }

        this.getNewUser(newUser)

        this.modalRegistration = false

        this.$router.push('login')

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




















