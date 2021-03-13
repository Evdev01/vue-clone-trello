<template>
  <div class="main__wrapper" v-if="isAuthCheck">
    <div class="container">

      <SearchTodo
          v-if="isSearchTodoInputOpen"
          :value="search"
          @search="search = $event"
      />

      <div class="main__wrapper-inner">

        <div class="main__wrapper-item">
            <p class="main__wrapper-title">{{ 'CategoryTodoActive' | localize }}: </p>

            <Todo
                :todos="notesFilter"
                @setDate="setDate"
            />


        </div>
        <div class="main__wrapper-item">
          <Notification
              :messages="messages"
              :timeout="3000"
          />

            <p class="main__wrapper-title">{{ 'CategoryTodoExpired' | localize }}: </p>
            <ExpiredTodo/>

        </div>
        <div class="main__wrapper-item">

            <p class="main__wrapper-title">{{ 'CategoryTodoComplete' | localize}}:  </p>
            <CompletedTodo/>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import NewTodo from '@/components/NewTodo'
import SearchTodo from '@/components/SearchTodo'
import Todo from '@/components/Todo'
import {mapActions, mapGetters} from 'vuex'
import CompletedTodo from '@/components/CompletedTodo'
import ExpiredTodo from '@/components/ExpiredTodo'
import Notification from '@/components/notifications/Notification'
import draggable from 'vuedraggable'

export default {
  name: "MainWrapper",
  components: {Notification, ExpiredTodo, CompletedTodo, Todo, SearchTodo, NewTodo, draggable},
  data() {
    return {
      search: '',
      messages: [],
      timeStamp: Date.now().toLocaleString(),
      currentDate: new Date().toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'})
    }
  },
  props: {
    openSearchTodoInput:{}
  },
  mounted: function (index, date, id) {

    this.setDate(index, date, id)
    {

      this.isDateSet(id)

      let res = new Date(date)
          .toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'}) === this.currentDate


      if (res) {
        this.getCurrentTodoUser.map(todo => {
          if (todo.id === id) {
            todo.isTodoExpired = true
            todo.date = date
          }
        })
        this.todoExpiredChangeColor(id)
      } else {
        this.getCurrentTodoUser.map(todo => {
          if (todo.id === id) {
            todo.date = date
            this.messages.unshift(
                {name: 'Дата была установлена ', icon: 'check_circle', id: this.timeStamp}
            )
          }
        })
        this.todoNotExpiredChangeColor(id)
      }
    }
  },
  methods: {
    ...mapActions(['todoExpiredChangeColor', 'saveDateSetByUser', 'isDateSet', 'todoNotExpiredChangeColor']),
    setDate(index, date, id) {

      this.isDateSet(id)

      let res = new Date(date)
          .toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'}) === this.currentDate


      if (res) {
        this.getCurrentTodoUser.map(todo => {
          if (todo.id === id) {
            todo.isTodoExpired = true
            todo.date = date
          }
        })
        this.todoExpiredChangeColor(id)
      } else {
        this.getCurrentTodoUser.map(todo => {
          if (todo.id === id) {
            todo.date = date
            this.messages.unshift(
                {name: 'Дата была установлена ', icon: 'check_circle', id: this.timeStamp}
            )
          }
        })
        this.todoNotExpiredChangeColor(id)
      }
    }
  },
  computed: {
    ...mapGetters(['getCurrentTodoUser', 'isAuthCheck', 'getExpiredTodoUser', 'getCompletedTodoUser', 'isSearchTodoInputOpen']),
    notesFilter() {
      if (this.isAuthCheck) {
        let array = this.getCurrentTodoUser,
            search = this.search
        if (!search) return array
        search = search.trim().toLowerCase()
        array = array.filter((item) => {
          if (item.title.toLowerCase().indexOf(search) !== -1) {
            return item
          }
        })
        return array
      }
    }
  }
}
</script>

<style lang="scss">

.main__wrapper {
  margin-top: 100px;
}

.main__wrapper-inner {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 170px -15px 0 -15px;
}

.main__wrapper-item {
  text-align: center;
  margin-top: 20px;
  width: 33%;
  padding: 0 15px;
}

.main__wrapper-title {
  margin-bottom: 20px;
}

</style>





















