<template>
  <div id="app" class="app">

    <div v-if="!isAuthCheck" class="starting_greeting">
      <div class="starting_greeting_text">
        <div>
          <p>Welcome to my application</p>
          <p>Click on registration to continue</p>
        </div>
        <div>
          <span class="material-icons">north</span>
        </div>
      </div>
    </div>

    <div class="container">

      <header>
        <div class="navbar">
          <div class="container">
            <div class="navbar-content">
              <router-link to="/home">
                <div class="logo">VUE-TODO</div>
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
                <div class="person_name">
                  <p>{{ 'UserGreeting' | localize }}: <b>{{ person.name }}</b></p>
                  <p @click="userExit" class="logoutAccount">{{ 'UserLogout' | localize }}</p>
                </div>
                <div class="todo_search_wrapper">
                  <div @click="openSearchTodoInput" class="material-icons">search</div>
                </div>

                <draggable v-model="todoDeletedList" group="todo" @end="onEnd" ghost-class="hidden-ghost">
                  <div class="basket_wrapper">
                    <router-link class="material-icons" to="/basket" title="Deleted tasks">delete_forever
                    </router-link>
                    <div class="basket_count_background" v-if="todoDeletedList.length">
                      <div class="basket_count">{{ getDeletedTodoUser.length }}</div>
                    </div>
                  </div>
                </draggable>

                  <div class="todo_expired_wrapper">
                    <router-link class="material-icons" to="/expired" title="Expired tasks">hourglass_disabled
                    </router-link>
                    <div class="todo_expired_background" v-if="getExpiredTodoUser.length">
                      <div class="todo_expired_count">{{ getExpiredTodoUser.length }}</div>
                    </div>
                  </div>


                <div>
                  <label class="switch">
                    <input type="checkbox" v-model=" isRuLocale" @change="sendInfoUser">
                    <div class="slider round">
                      <span/>
                    </div>
                  </label>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      <router-view/>

    </div>

  </div>
</template>p

<script>

import MainWrapper from '@/components/MainWrapper'
import NewTodo from '@/components/NewTodo'
import Header from '@/components/Header'
import {mapActions, mapGetters} from 'vuex'
import draggable from 'vuedraggable'


export default {
  name: 'App',
  data() {
    return {
      isRuLocale: true,
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
    this.$store.state.isAuth = this.getCurrentUserInfo.length > 0;
    this.isRuLocale = this.getCurrentUserInfo[0].locale === 'ru-RU'
  },
  computed: {
    ...mapGetters(['getUserList', 'isAuthCheck', 'getCurrentUserInfo', 'getDeletedTodoUser', 'getExpiredTodoUser']),
    todoDeletedList: {
      get() {
        return this.getDeletedTodoUser
      },
      set(value) {
        this.$store.dispatch("getDeletedTodos", value);
      }
    },
    todoExpiredList: {
      get() {
        return this.getExpiredTodoUser
      },
      set(value) {
        this.$store.dispatch("updateExpiredTodos", value);
      }
    }
  },
  methods: {
    ...mapActions(['checkUserData', 'userExit', 'openSearchTodoInput', 'updateInfoUser', 'updateExpiredTodos']),
    openBasket() {
      this.$router.push('basket')
    },
    onEnd() {
      this.updateLocalList()
    },
    sendInfoUser() {
      const idCurrentUser = this.getCurrentUserInfo[0].id

      const newInfo = {
        id: idCurrentUser,
        locale: this.isRuLocale ? 'ru-RU' : 'en-US'
      }

      this.updateInfoUser(newInfo)
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
    Header,
    NewTodo,
    MainWrapper,
    draggable
  }
}
</script>

<style lang="scss">

.basket_wrapper {
  position: relative;

  & .material-icons {
    font-size: 44px;
    margin: 0;
  }
}

.todo_expired_wrapper {
  position: relative;
  margin: 0 15px;

  & .material-icons {
    font-size: 44px;
    margin: 0;
  }
}

.todo_search_wrapper {
  margin: 0 15px;

  & .material-icons {
    font-size: 44px;
    margin: 0;
  }
}

.basket_count_background {
  background: #ff0000;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 57%;
  z-index: 1;
}

.todo_expired_background {
  background: #ff0000;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 57%;
  z-index: 1;
}

.basket_count {
  font-size: 14px;
  padding: 1px 4px 1px 4px;
}

.todo_expired_count {
  font-size: 16px;
  padding: 1px 4px 1px 4px;
}


.not_visible {
  display: none;
}

.starting_greeting {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: .6;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  & p {
    font-size: 40px;
    color: #ffffff;
  }
}

.starting_greeting_text {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.hidden-ghost {
  display: none !important;
}

.person_name {
  margin-left: 50px;
}

.personInfo {
  display: flex;
  align-items: center;
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

.material-icons {
  font-size: 40px;
  margin: 0 20px;
}

/*----------------------*/

label {
  margin-bottom: 0;
}

.switch {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*background-color: #ca2222;*/
  border: 1px solid #000000;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: black;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  /*background-color: #2ab934;*/
  border: 1px solid #000000;

}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(55px);
}

/*------ ADDED CSS ---------*/
.slider:after {
  content: 'ENG';
  color: #000000;
  display: block;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

input:checked + .slider:after {
  content: 'RU';
}
</style>
