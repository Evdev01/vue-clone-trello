<template>
  <div class="todos">
    <div class="todo" :class="{ todoCheck: !todo.completed }" v-for="(todo, index) in todoCompletedList" :key="index">
      <div class="todo-header" :class="{ todoCheck: !todo.completed }">
        <p>{{ todo.title }}</p>
        <p style="cursor: pointer" @click="removeTodoCompleted(index)">x</p>
      </div>
      <div class="todo-body">
        <p>{{ todo.description }}</p>
      </div>
      <p class="todoCompleted" @click="todoCompleteInActive(todo)">В Активные</p>
      <p class="todoExpired" @click="todoCompleteInExpired(todo)">В просроченные</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
name: "CompletedTodo",
  methods: {
    ...mapActions(['removeTodoCompleted', 'todoCompleteInActive', 'todoCompleteInExpired'])
  },
  computed: {
    ...mapGetters(['todoCompletedList'])
  }
}
</script>

<style scoped>
  .todo {
    background-color: #26de81;
  }
  .todoCompleted:hover {
    color: #ffffff;
  }
</style>