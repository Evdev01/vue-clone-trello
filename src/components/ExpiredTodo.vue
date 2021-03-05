<template>
  <div class="todos">
    <div class="todo" :class="{ todoCheck: !todo.completed }" v-for="todo in todoExpiredList" :key="todo.id">
      <div class="todo-header" :class="{ todoCheck: !todo.completed }">
        <p>{{ todo.title }}</p>
        <p style="cursor: pointer" @click="removeTodoExpired(todo.id)">x</p>
      </div>
      <div class="todo-body">
        <p>{{ todo.description }}</p>
      </div>
      <p class="todoCompleted" @click="todoExpiredToActive(todo)">В Активные</p>
      <p class="todoExpired" @click="todoExpiredToCompleted(todo)">В выполненые</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
name: "ExpiredTodo",
  // methods: {
  //   ...mapActions(['todoExpired', 'removeTodoExpired', 'todoExpiredToActive', 'todoExpiredToCompleted'])
  // },
  // computed: {
  //   ...mapGetters(['todoExpiredList'])
  // }
}
</script>

<style scoped>
  .todo {
    background-color: #ff0000;
  }
  .todoCompleted:hover {
    color: #ffffff;
  }

  .todoExpired:hover {
    color: #7bd782;
  }
</style>