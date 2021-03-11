<template>
  <div class="todos">
    <p class="notTodo" v-if="!todos.length">{{ 'AddNewTask' | localize }}</p>
    <span class="material-icons" @click="showPopupInfo">add</span>

    <draggable v-model="todoCurrent" group="todo" @end="onEnd">

      <div class="todo" :class="{ todoExpired: todo.isTodoExpired }" v-for="(todo, index) in todos"
           :key="todo.id">

        <div class="todo-header">
          <p v-if="!todo.editModeTitle" @click="editTitleMode(todo)" class="todo_title">{{ todo.title }}</p>
          <input v-model="newValueTitleTodo" v-if="todo.editModeTitle" :ref="'input_item_' + todo.id"
                 @blur="changeTitleButton(todo)" type="text">

          <p style="cursor: pointer" @click="removeTodo(index)">x</p>
        </div>

        <div class="todo-body">
          <p v-if="!todo.editModeDescription" @click="editDescriptionMode(todo)" class="todo_description">{{ todo.description }}</p>
          <input v-model="newValueDescriptionTodo" v-if="todo.editModeDescription" :ref="'input_item_' + todo.id"
                 @blur="changeDescriptionButton(todo)" type="text">
        </div>

        <div class="todoInput">

          <div class="todo__date">
            <input type="date" v-if="todo.editModeInputDate" v-model="todos.date">
            <p v-show="todo.date.length">Завершить к: {{ todo.date }}</p>
            <div @click="editModeSateDateAction(todo)" v-show="!todo.editModeInputDate" class="material-icons">restore</div>

          </div>
          <button v-show="todo.editModeInputDate" @click="setDate(index, todos.date, todo.id)">Установить дату
            выполнения
          </button>

        </div>
      </div>

    </draggable>



    <Popup
        v-if="isInfoPopupVisible"
        @closePopup="closePopup"
    >

      <NewTodo
          @closePopupNewTodo="closePopupNewTodo"
      />

    </Popup>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Popup from '@/components/popup/Popup'
import NewTodo from '@/components/NewTodo'
import draggable from 'vuedraggable'

export default {
  name: "Todo",
  components: {NewTodo, Popup, draggable},
  data() {
    return {
      newValueTitleTodo: '',
      newValueDescriptionTodo: '',
      isInfoPopupVisible: false,
      search: this.value,
      visibleBtn: false,
      test: false,
      setDateButton: false,
      setTime: false,
      changeTitle: false,
      currentDate: new Date().toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'})
    }
  },
  props: {
    todos: {
      type: Array,
      default: () => []
    },
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters(['getCurrentTodoUser']),
    todoCurrent: {
      get() {
        return this.getCurrentTodoUser
      },
      set(value) {
        this.$store.dispatch("updateCurrentTodo", value);
      }
    },
  },
  methods: {
    ...mapActions(['removeTodo', 'changeTitleTodo', 'changeDescriptionTodo', 'updateLocalList', 'editModeSateDateAction', 'offEditModeSateDateAction']),
    onEnd() {
      this.updateLocalList()
    },
    setDate(index, date, id) {
      this.$emit('setDate', index, date, id)
      this.visibleBtn = false

      this.offEditModeSateDateAction(id)

    },
    showPopupInfo() {
      this.isInfoPopupVisible = true
    },
    closePopup() {
      this.isInfoPopupVisible = false
    },
    closePopupNewTodo() {
      this.isInfoPopupVisible = false
    },
    editTitleMode: function (todo) {
      const findTodo = this.getCurrentTodoUser.find(t => t.id === todo.id)

      findTodo.editModeTitle = true

      this.$nextTick(() => {
        this.$refs['input_item_' + todo.id][0].focus();
      });

    },
    editDescriptionMode: function (todo) {
      const findTodo = this.getCurrentTodoUser.find(t => t.id === todo.id)

      findTodo.editModeDescription = true

      this.$nextTick(() => {
        this.$refs['input_item_' + todo.id][0].focus();
      });

    },
    changeTitleButton(todo) {

      const findTodo = this.getCurrentTodoUser.find(t => t.id === todo.id)

      findTodo.editModeTitle = false

      if (this.newValueTitleTodo.trim()) {
        let updatedTitle = {
          id: todo.id,
          title: this.newValueTitleTodo
        }

        this.changeTitleTodo(updatedTitle)
      }
    },
    changeDescriptionButton(todo) {

      const findTodo = this.getCurrentTodoUser.find(t => t.id === todo.id)

      findTodo.editModeDescription = false

      if (this.newValueDescriptionTodo.trim()) {
        let updatedDescription = {
          id: todo.id,
          description: this.newValueDescriptionTodo
        }

        this.changeDescriptionTodo(updatedDescription)
      }
    },
  }
}
</script>

<style lang="scss">
.todo {
  width: 100%;
  padding: 18px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  text-align: left;
  transition: all .55s cubic-bezier(.02, .01, .47, 1);
  box-shadow: 0 30px 30px rgba(0, 0, 0, .02);

  &.todoExpired {
    background-color: red;
  }

  &:hover {
    box-shadow: 0 30px 30px rgba(0, 0, 0, .04);
    transform: translate(0, -6px);
    transition-delay: 0s !important;
    cursor: move;
  }

}

.todos {
  & span  {
    font-size: 30px;
  }
}

.todo__date {
  text-align: center;

  & button {
    padding: 12px;

    &:hover {
      background-color: #cdcccc;
      cursor: pointer;
    }
  }
}

.todo__date_p {
  margin: 20px 0;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.notTodo {
  font-size: 24px;
  color: #999999;
}

.material-icons {
  color: #999999;

  &:hover {
    cursor: pointer;
    color: #000000;
  }
}

.todoInput {
  display: flex;
  align-items: center;
  flex-direction: column;

  & input {
    margin: 20px 0;
  }
}

.todoCompleted {
  cursor: pointer;

  &:hover {
    color: #26de81;
  }
}

.todoExpired {
  cursor: pointer;

  &:hover {
    color: #de2626;
  }
}


.todo-body {
  p {
    margin: 20px 0;
  }

  span {
    font-size: 14px;
    color: #999999;
  }
}

.todo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 32px;
  }

  p {
    font-size: 22px;
    color: #402caf;
  }

  svg {
    margin-right: 12px;
    color: #999999;

    &.active {
      color: #402caf;
    }

    &:last-child {
      margin-right: 0;
    }

    &.full {
      justify-content: center;
    }
  }
}

.todo_title {
  &:hover {
    cursor: pointer;
  }
}

.todo_description {
  &:hover {
    cursor: pointer;
  }
}
</style>