<template>
  <div>
    <form @submit.prevent="submit" class="new-todo">
      <input type="text" placeholder="Title" v-model="title">
      <input type="text" placeholder="Description" v-model="description">
      <button>Create Todo</button>
      <hr>
    </form>


  </div>

</template>

<script>
import {mapActions} from 'vuex'
import Popup from '@/components/popup/Popup'

export default {
  name: "NewTodo",
  components: {Popup},
  data() {
    return {
      id: null,
      title: '',
      description: '',
      completed: false,
      todoOverdue: false,
      isInfoPopupVisible: false
    }
  },

  computed: {},
  methods: {
    ...mapActions(['addTodoUser']),
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
          editModeInputDate: false,
          editModeTitle: false,
          editModeDescription: false,
          date: ''
        }
        this.addTodoUser(todo)


        this.title = this.description = ''
      }

      this.$emit('closePopupNewTodo')

    }
  }
}
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