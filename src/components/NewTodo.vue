<template>
  <form @submit.prevent="submit" class="new-todo">
    <input type="text" placeholder="Title todo" v-model="title">
    <input type="text" placeholder="Description" v-model="description">
    <button>Create Todo</button>
    <hr>
  </form>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: "NewTodo",
  data() {
    return {
      id: null,
      title: '',
      description: '',
      completed: true,
      todoOverdue: false,
      todosLocal: []
    }
  },

  computed: {
    ...mapGetters(['todoList'])
  },
  methods: {
    ...mapMutations(['addTodo']),
    submit() {
      if (this.title.trim() && this.description.trim()) {
        let todo = {
          id: new Date().getTime(),
          title: this.title,
          description: this.description,
          completed: this.completed,
          todoOverdue: this.todoOverdue
        }
        this.addTodo(todo)

        localStorage.setItem('todosLocal', JSON.stringify(this.todoList))

        this.title = this.description = ''
      }
    }
}}
</script>

<style lang="scss" scoped>
.new-todo {
  margin-top: 30px;
  text-align: center;
  flex-direction: column;
}

.btnNewNote {
  margin: 30px 0;
}

</style>