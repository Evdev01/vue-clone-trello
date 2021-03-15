<template>
  <div class="todos">
    <draggable v-model="todoInProgressList" group="todo" @end="onEnd">
      <div class="todo" :class="{ todoCheck: !todo.completed }" v-for="(todo, index) in getInProgressTodoUser"
           :key="todo.id">
        <div class="todo-header">

          <p v-if="!todo.editModeTitle" @click="editTitleMode(todo)">{{ todo.title }}</p>
          <input v-model="newValueTitleTodo" v-if="todo.editModeTitle" :ref="'input_item_' + todo.id"
                 @blur="changeTitleButton(todo)" type="text">

          <p class="material-icons" @click="showPopupMoreInfoTodo(todo)">open_in_full</p>

        </div>
        <div class="todo-body">

          <p v-if="!todo.editModeDescription" @click="editDescriptionMode(todo)">{{ todo.description }}</p>
          <input v-model="newValueDescriptionTodo" v-if="todo.editModeDescription" :ref="'input_item_' + todo.id"
                 @blur="changeDescriptionButton(todo)" type="text">

          <div class="todoInput">

            <div class="todo__date">
              <input type="date" v-if="todo.editModeInputDate" v-model="todo.date">
              <p v-show="todo.date.length">Завершить к: {{ todo.date }}</p>
              <div @click="editModeSateDateInProgressTodo(todo)" style="font-size: 30px" v-show="!todo.editModeInputDate" class="material-icons">restore
              </div>
              <div v-show="todo.date.length" class="material-icons" @click="resetDateSettingInProgressTodo(todo)">close</div>

            </div>
            <button v-show="todo.editModeInputDate" @click="setDate(index, todo.date, todo.id)">Установить дату
              выполнения
            </button>

          </div>

        </div>

      </div>
    </draggable>

    <PopupMoreInfoAboutTodo
        v-if="isMoreInfoTodoPopupVisible"
        @closePopupMoreInfoTodo="closePopupMoreInfoTodo"
        :currentTodo="currentTodo"
    >
      <MoreInfoAboutTodo
          :todoInfo="currentTodo"
          @closePopupMoreInfoTodo="closePopupMoreInfoTodo"
      />

    </PopupMoreInfoAboutTodo>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import draggable from 'vuedraggable'
import PopupMoreInfoAboutTodo from '@/components/popup/PopupMoreInfoAboutTodo'
import MoreInfoAboutTodo from '@/components/MoreInfoAboutTodo'

export default {
  name: "TodoInProgress",
  components: {MoreInfoAboutTodo, PopupMoreInfoAboutTodo, draggable},
  data() {
    return {
      newValueTitleTodo: '',
      newValueDescriptionTodo: '',
      isMoreInfoTodoPopupVisible: false,
      currentTodo: {},
    }
  },
  methods: {
    ...mapActions(['removeInProgressTodo', 'changeTitleActiveTodo',
                    'changeDescriptionActiveTodo', 'updateLocalList',
                    'editModeSateDateInProgressTodo', 'resetDateSettingInProgressTodo', 'offEditModeSateDateActionInProgressTodo']),
    onEnd() {
      this.updateLocalList()
    },
    closePopupMoreInfoTodo() {
      this.isMoreInfoTodoPopupVisible = false
    },
    showPopupMoreInfoTodo(todo) {
      this.currentTodo = todo
      this.isMoreInfoTodoPopupVisible = true
    },
    editTitleMode: function (todo) {
      const findTodo = this.getCompletedTodoUser.find(t => t.id === todo.id)

      findTodo.editModeTitle = true

      this.$nextTick(() => {
        this.$refs['input_item_' + todo.id][0].focus();
      });

    },
    setDate(index, date, id) {
      this.$emit('setDate', index, date, id)
      this.visibleBtn = false

      this.offEditModeSateDateActionInProgressTodo(id)

    },
    changeTitleButton(todo) {

      const findTodo = this.getCompletedTodoUser.find(t => t.id === todo.id)

      findTodo.editModeTitle = false

      if (this.newValueTitleTodo.trim()) {
        let updatedTitle = {
          id: todo.id,
          title: this.newValueTitleTodo
        }

        this.changeTitleActiveTodo(updatedTitle)
      }
    },
    editDescriptionMode: function (todo) {
      const findTodo = this.getCompletedTodoUser.find(t => t.id === todo.id)

      findTodo.editModeDescription = true

      this.$nextTick(() => {
        this.$refs['input_item_' + todo.id][0].focus();
      });
    },
    changeDescriptionButton(todo) {

      const findTodo = this.getCompletedTodoUser.find(t => t.id === todo.id)

      findTodo.editModeDescription = false

      if (this.newValueDescriptionTodo.trim()) {
        let updatedDescription = {
          id: todo.id,
          description: this.newValueDescriptionTodo
        }

        this.changeDescriptionActiveTodo(updatedDescription)
      }
    },
  },
  computed: {
    ...mapGetters(['getInProgressTodoUser']),
    todoInProgressList: {
      get() {
        return this.getInProgressTodoUser
      },
      set(value) {
        this.$store.dispatch("updateInProgressTodo", value);
      }
    }
  }
}
</script>

<style scoped>

</style>