<template>
  <div class="todos">
    <div class="todo" :class="{ todoCheck: !todo.completed }" v-for="(todo, index) in todoExpiredList" :key="index">
      <div class="todo-header" :class="{ todoCheck: !todo.completed }">
        <p>{{ todo.title }}</p>
        <p style="cursor: pointer" @click="removeTodoExpired(index)">x</p>
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
name: "ExpiredTodo",
  methods: {
    ...mapActions(['todoExpired', 'removeTodoExpired'])
  },
  computed: {
    ...mapGetters(['todoExpiredList'])
  }
}
</script>

<style scoped>
  .todo {
    background-color: #ff0000;
  }
</style>