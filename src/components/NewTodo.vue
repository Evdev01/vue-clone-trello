<template>
  <form @submit.prevent="submit">
    <input type="text" placeholder="title" v-model="title">
    <input type="text" placeholder="body" v-model="description">
    <button @click="addTodo">Create Post</button>
    <hr>
  </form>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: "NewTodo",
  data() {
    return {
      title: '',
      description: '',
      completed: false
    }
  },
  computed: {
    ...mapGetters(['todoList'])
  },
  methods: {
    ...mapMutations(['addTodo']),
    submit() {
      this.addTodo({
        title: this.title,
        description: this.description,
        completed: this.completed,
      })
      this.title = this.description = ''
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