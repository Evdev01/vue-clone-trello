<template>
  <form @submit.prevent="submit">
    <input type="text" placeholder="title" v-model="title">
    <input type="text" placeholder="body" v-model="description">
    <button>Create Post</button>
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
  }
}
</script>

<style lang="scss">
.new-note {
  text-align: center;
}

.btnNewNote {
  margin: 30px 0;
}
</style>