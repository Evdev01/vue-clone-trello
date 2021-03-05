<template>
  <form @submit.prevent="submit" class="new-todo">
    <input type="text" placeholder="Title todo" v-model="title">
    <input type="text" placeholder="Description" v-model="description">
    <button>Create Todo</button>
    <hr>
  </form>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "NewTodo",
  data() {
    return {
      id: null,
      title: '',
      description: '',
      completed: false,
      todoOverdue: false,

    }
  },

  computed: {},
  methods: {
    ...mapActions(['addTodoUserAction']),
    submit() {
      if (this.title.trim() && this.description.trim()) {
        let todo = {
          id: new Date().getTime(),
          title: this.title,
          description: this.description,
          completed: this.completed,
          todoOverdue: this.todoOverdue,
          isTodoExpired: false,
          isSetDate: false,
          date: ''
        }
        this.addTodoUserAction(todo)


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