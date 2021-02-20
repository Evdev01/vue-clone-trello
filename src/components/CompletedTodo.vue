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
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
name: "CompletedTodo",
  methods: {
    ...mapActions(['removeTodoCompleted'])
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
</style>