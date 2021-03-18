<template>
  <div class="more_info_about_todo">
    <div class="more_info_title">
      <p><b>{{'FullInfoAboutTodoTitle' | localize}}:</b></p>
      <p v-if="!todoInfo.editModeTitleFull" @click="editTitleMode(todoInfo)" class="todo_title">{{ todoInfo.title }}</p>
      <input v-model="newValueTitleTodo" v-if="todoInfo.editModeTitleFull" :ref="'input_item__' + todoInfo.id"
             @blur="changeTitleButton(todoInfo)" type="text">

    </div>
    <div class="more_info_description">
      <p><b>{{'FullInfoAboutTodoDescription' | localize}}:</b></p>

      <p v-if="!todoInfo.editModeDescriptionFull" @click="editDescriptionMode(todoInfo)" class="todo_description">
        {{ todoInfo.description }}</p>
      <input v-model="newValueDescriptionTodo" v-if="todoInfo.editModeDescriptionFull" :ref="'input_item__' + todoInfo.id"
             @blur="changeDescriptionButton(todoInfo)" type="text">

    </div>

    <div class="more_info_buttons">
      <div><button class="more_info_button_basket" @click="todoInTrash(todoInfo)">{{ 'DeleteTodoBasket' | localize }}</button></div>
      <div><button class="more_info_button_delete" @click="todoDeletePermanently(todoInfo)">{{ 'DeleteTodoPermanently' | localize }}</button></div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "MoreInfoAboutTodo",
  data() {
    return {
      newValueTitleTodo: '',
      newValueDescriptionTodo: ''
    }
  },
  props: {
    todoInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapGetters(['getCurrentTodoUser', 'getInProgressTodoUser', 'getCompletedTodoUser']),
  },
  methods: {
    ...mapActions(['todoInBasket', 'deletePermanently', 'changeTitleTodo', 'changeDescriptionTodo']),
    editTitleMode: function (todoInfo) {

      const allTodos = [...this.getCurrentTodoUser, ...this.getInProgressTodoUser, ...this.getCompletedTodoUser]

      const findTodo = allTodos.find(t => t.id === todoInfo.id)

      findTodo.editModeTitleFull = true

      this.$nextTick(() => {
        this.$refs['input_item__' + todoInfo.id].focus();
      });

    },
    todoInTrash(todo) {
      this.todoInBasket(todo)
      this.$emit('closePopupMoreInfoTodo')
    },
    todoDeletePermanently(todo) {
      this.deletePermanently(todo)
      this.$emit('closePopupMoreInfoTodo')
    },
    changeTitleButton(todo) {

      const allTodos = [...this.getCurrentTodoUser, ...this.getInProgressTodoUser, ...this.getCompletedTodoUser]

      const findTodo = allTodos.find(t => t.id === todo.id)

      findTodo.editModeTitleFull = false

      if (this.newValueTitleTodo.trim()) {
        let updatedTitle = {
          id: todo.id,
          title: this.newValueTitleTodo
        }

        this.changeTitleTodo(updatedTitle)
      }
    },
    editDescriptionMode: function (todoInfo) {
      const allTodos = [...this.getCurrentTodoUser, ...this.getInProgressTodoUser, ...this.getCompletedTodoUser]

      const findTodo = allTodos.find(t => t.id === todoInfo.id)

      findTodo.editModeDescriptionFull = true

      this.$nextTick(() => {
        this.$refs['input_item__' + todoInfo.id].focus();
      });
    },
    changeDescriptionButton(todo) {

      const allTodos = [...this.getCurrentTodoUser, ...this.getInProgressTodoUser, ...this.getCompletedTodoUser]

      const findTodo = allTodos.find(t => t.id === todo.id)

      findTodo.editModeDescriptionFull = false

      if (this.newValueDescriptionTodo.trim()) {
        let updatedDescription = {
          id: todo.id,
          description: this.newValueDescriptionTodo
        }

        this.changeDescriptionTodo(updatedDescription)
      }
    }
  }
}
</script>

<style lang="scss">

.more_info_about_todo {
  max-width: 100%;
}

.more_info_title {
  margin-bottom: 60px;

  & p {
    font-size: 22px;
    color: #402caf;
  }
}

.more_info_description {
  margin-bottom: 50px;
  word-wrap: break-word;

  &:hover {
    cursor: pointer;
  }
}

.more_info_buttons {
  flex-direction: column;

  & button {
    margin-bottom: 20px;
  }
}

.more_info_button_basket {
  background: #e2df00;
  padding: 10px 15px;
  border: 0;

  &:hover {
    cursor: pointer;
    background: #ffff00;

  }
}

.more_info_button_delete {
  background: #ba0101;
  padding: 10px 15px;
  border: 0;

  &:hover {
    cursor: pointer;
    background: #ff0000;
  }
}
</style>




















