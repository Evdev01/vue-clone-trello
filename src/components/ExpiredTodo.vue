<template>
  <div class="todos">

    <draggable v-model="todoExpiredList" group="todo" @end="onEnd">
      <div class="todo" :class="{ todoCheck: !todo.completed }" v-for="(todo, index) in getExpiredTodoUser"
           :key="todo.id">
        <div class="todo-header" :class="{ todoCheck: !todo.completed }">

          <p v-if="!todo.editModeTitle" @click="editTitleMode(todo)">{{ todo.title }}</p>
          <input v-model="newValueTitleTodo" v-if="todo.editModeTitle" :ref="'input_item_' + todo.id"
                 @blur="changeTitleButton(todo)" type="text">

          <p style="cursor: pointer" @click="removeTodoExpired(index)">x</p>
        </div>
        <div class="todo-body">
          <p v-if="!todo.editModeDescription" @click="editDescriptionMode(todo)">{{ todo.description }}</p>
          <input v-model="newValueDescriptionTodo" v-if="todo.editModeDescription" :ref="'input_item_' + todo.id"
                 @blur="changeDescriptionButton(todo)" type="text">
        </div>
      </div>
    </draggable>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import draggable from 'vuedraggable'

export default {
  name: "ExpiredTodo",
  components: {draggable},
  data() {
    return {
      newValueTitleTodo: '',
      newValueDescriptionTodo: ''
    }
  },
  methods: {
    ...mapActions(['todoExpired', 'removeTodoExpired',
      'changeTitleExpiredTodo', 'changeDescriptionExpiredTodo', 'updateLocalList']),
    onEnd() {
      this.updateLocalList()
    },
    editTitleMode: function (todo) {
      const findTodo = this.getExpiredTodoUser.find(t => t.id === todo.id)

      findTodo.editModeTitle = true

      this.$nextTick(() => {
        this.$refs['input_item_' + todo.id][0].focus();
      });

    },
    changeTitleButton(todo) {

      const findTodo = this.getExpiredTodoUser.find(t => t.id === todo.id)

      findTodo.editModeTitle = false

      if (this.newValueTitleTodo.trim()) {
        let updatedTitle = {
          id: todo.id,
          title: this.newValueTitleTodo
        }

        this.changeTitleExpiredTodo(updatedTitle)
      }
    },
    editDescriptionMode: function (todo) {
      const findTodo = this.getExpiredTodoUser.find(t => t.id === todo.id)

      findTodo.editModeDescription = true

      this.$nextTick(() => {
        this.$refs['input_item_' + todo.id][0].focus();
      });
    },
    changeDescriptionButton(todo) {

      const findTodo = this.getExpiredTodoUser.find(t => t.id === todo.id)

      findTodo.editModeDescription = false

      if (this.newValueDescriptionTodo.trim()) {
        let updatedDescription = {
          id: todo.id,
          description: this.newValueDescriptionTodo
        }

        this.changeDescriptionExpiredTodo(updatedDescription)
      }
    }
  },
  computed: {
    ...mapGetters(['getExpiredTodoUser']),
    todoExpiredList: {
      get() {
        return this.getExpiredTodoUser
      },
      set(value) {
        this.$store.dispatch("updateExpiredTodo", value);
      }
    }
  }
}
</script>

<style scoped>
.todo {
  background-color: #ff0000;
}

.todoCompleted:hover {
  color: #ffffff;
}

.todoExpired:hover {
  color: #7bd782;
}
</style>