<template>
  <div class="new-note">

    <label>Title</label>

    <input v-model="todo.title" type="text">
    <label>Description</label>

    <textarea v-model="todo.description"></textarea>
    <button class="btn btnPrimary btnNewNote" @click="addTodo">New Todo</button>

  </div>
</template>

<script>
export default {
name: "NewTodo",
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    addTodo() {
      this.$emit('addTodo', this.todo)
      console.log(this.todo)
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