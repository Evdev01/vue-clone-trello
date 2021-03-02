<template>
  <div class="main__wrapper">
    <div class="container">
      <NewTodo

      />

      <SearchTodo
          :value="search"
          @search="search = $event"
      />

      <div class="main__wrapper-inner">
        <div class="main__wrapper-item">

          <p class="main__wrapper-title">Активные: </p>

          <Todo
              :todos="notesFilter"
              @setDate="setDate"
          />

        </div>
        <div class="main__wrapper-item">
          <p class="main__wrapper-title">Просроченные: </p>


          <ExpiredTodo/>


        </div>
        <div class="main__wrapper-item">
          <p class="main__wrapper-title">Выполненные: </p>
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

export default {
  name: "MainWrapper",
  components: {ExpiredTodo, CompletedTodo, Todo, SearchTodo, NewTodo},
  data() {
    return {
      search: '',
      currentDate: new Date().toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'})
    }
  },
  methods: {
    ...mapActions(['todoExpiredBackgroundAction', 'todoNotExpiredBackgroundAction']),
    setDate(id, date) {

      let res = new Date(this.todoList.date)
          .toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'}) === this.currentDate


      if (res) {
        this.todoExpiredBackgroundAction(id)


      } else {
        this.todoNotExpiredBackgroundAction(id)
        this.todoList.map(item => {
          if (item.id === id) {
            item.date = date
            item.isSetDate = false
          }
        })
        window.localStorage.setItem('todo', JSON.stringify(this.todoList))

      }
    }
  },
  computed: {
    ...mapGetters(['todoList']),
    notesFilter() {
      let array = this.todoList,
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
</script>

<style lang="scss">
.main__wrapper-inner {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 0 -15px;
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





















