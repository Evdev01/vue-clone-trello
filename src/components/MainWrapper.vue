<template>
  <div class="main__wrapper">
    <div class="container">
      <div class="main__wrapper-inner">
        <div class="main__wrapper-item">
          <p class="main__wrapper-title">Список задач: </p>
          <Todo
              @remove="removeTodo"
              :todos="todosFilter"
          />
        </div>
        <div class="main__wrapper-item">
          <p>Список в процессе:</p>

        </div>
        <div class="main__wrapper-item">
          <p>Выполненные: </p>

        </div>
      </div>


      <!--      <NewTodo-->
      <!--          :todo="todo"-->
      <!--          @addTodo="addTodo"-->
      <!--      />-->
      <!--    <SearchTodo-->
      <!--        :value="search"-->
      <!--        placeholder="Find your todo"-->
      <!--        @search="search = $event"/>-->


    </div>
  </div>
</template>

<script>
import NewTodo from '@/components/NewTodo'
import SearchTodo from '@/components/SearchTodo'
import Todo from '@/components/Todo'

export default {
  name: "MainWrapper",
  components: {Todo, SearchTodo, NewTodo},
  data() {
    return {
      todo: {
        title: '',
        search: '',
        description: ''
      },
      todos: [
        {
          title: 'First Note',
          description: 'Description for first note',
          date: new Date(Date.now()).toLocaleString(),
          completed: false
        },
        {
          title: 'Second Note',
          description: 'Description for second note',
          date: new Date(Date.now()).toLocaleString(),
          completed: false
        },
        {
          title: 'Third Note',
          description: 'Description for third note',
          date: new Date(Date.now()).toLocaleString(),
          completed: false
        }
      ]
    }
  },
  methods: {
    addTodo() {
      let {title, description, completed} = this.todo

      if (title === '') {
        this.message = 'title can`t be blank!'
        return false
      }

      this.todos.push({
        title,
        description,
        completed,
        date: new Date(Date.now()).toLocaleString()
      })
      this.todo.title = ''
      this.todo.description = ''
      this.message = null
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    }
  },
  computed: {
    todosFilter() {
      let array = this.todos,
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





















