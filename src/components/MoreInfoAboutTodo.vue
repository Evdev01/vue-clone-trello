<template>
  <div class="more_info_about_todo">
    <div class="more_info_title">
      <p><b>{{ 'FullInfoAboutTodoTitle' | localize }}:</b></p>
      <p v-if="!todoInfo.editModeTitleFull" @click="editTitleMode(todoInfo)" class="todo_title">{{ todoInfo.title }}</p>
      <input v-model="newValueTitleTodo" v-if="todoInfo.editModeTitleFull" :ref="'input_item__' + todoInfo.id"
             @blur="changeTitleButton(todoInfo)" type="text">

    </div>
    <div class="more_info_description">
      <p><b>{{ 'FullInfoAboutTodoDescription' | localize }}:</b></p>

      <p v-if="!todoInfo.editModeDescriptionFull" @click="editDescriptionMode(todoInfo)" class="todo_description">
        {{ todoInfo.description }}</p>
      <input v-model="newValueDescriptionTodo" v-if="todoInfo.editModeDescriptionFull"
             :ref="'input_item__' + todoInfo.id"
             @blur="changeDescriptionButton(todoInfo)" type="text">

    </div>

    <div class="more_info_buttons">
      <div>
        <button class="more_info_button_basket" @click="todoInTrash(todoInfo)">{{
            'DeleteTodoBasket' | localize
          }}
        </button>
      </div>
      <div>
        <button class="more_info_button_delete" @click="todoDeletePermanently(todoInfo)">
          {{ 'DeleteTodoPermanently' | localize }}
        </button>
      </div>
    </div>

    <div class="create_checkbox_block">
      <button style="padding: 10px" @click="addNewCheckBoxButton">Add checkbox</button>
      <input v-if="createCheckBoxMode" v-model="checkbox_elem_title"
             type="text">
    </div>

    <div class="progress_checkbox">
      <p>Чек лист :</p>
      <div class="progress_checkbox_percent">
        {{ percentCompletedCheckBox || 0 }} %
      </div>
    </div>


    <div class="checkbox_elem" v-for="elem in getCurrentUserCheckBoxList">
      <div class="checkbox_elem_wrapper">
        <div class="checkbox_elem_info">
          <input @change="calculatePercentCheckBoxCompleted" class="checkbox_elem_input" type="checkbox"
                 :checked="elem.getCurrentUserCheckBoxList"
                 @click="toggleStateInput(elem)">
          <div class="checkbox_elem_title" :class="{checkbox_input_completed: elem.checkBoxComplete}">
            <p>{{ elem.title }}</p>
          </div>
        </div>
        <div class="checkbox_elem_delete" @click="removeCheckBox(elem), calculatePercentCheckBoxCompleted()">
          X
        </div>
      </div>
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
      newValueDescriptionTodo: '',
      checkbox_elem_title: '',
      checkBoxComplete: false,
      createCheckBoxMode: false,
      percentCompletedCheckBox: 0
    }
  },
  props: {
    todoInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapGetters(['getCurrentTodoUser', 'getInProgressTodoUser', 'getCompletedTodoUser', 'getCurrentUserCheckBoxList', 'getCurrentUserCheckBoxLength'])
  },
  mounted() {
    this.calculatePercentCheckBoxCompleted()
  },
  methods: {
    ...mapActions(['todoInBasket', 'deletePermanently', 'changeTitleTodo',
      'changeDescriptionTodo', 'addNewCheckBox', 'changeStateInput', 'removeCheckBox']),
    calculatePercentCheckBoxCompleted() {

      if (this.getCurrentUserCheckBoxLength > 0) {
        const findCompletedCheckBox = this.getCurrentUserCheckBoxList
            .filter(el => el.checkBoxComplete)

        const calculateCheckBox = this.getCurrentUserCheckBoxLength

        const percent = findCompletedCheckBox.length * 100 / calculateCheckBox

        this.percentCompletedCheckBox = percent.toFixed()
      } else {
        this.percentCompletedCheckBox = 0
      }


    },
    toggleStateInput(elem) {
      this.changeStateInput(elem)
    },
    addNewCheckBoxButton() {

      this.createCheckBoxMode = !this.createCheckBoxMode

      if (this.checkbox_elem_title.trim()) {

        let newCheckBox = {
          id: new Date().getTime(),
          title: this.checkbox_elem_title,
          checkBoxComplete: this.checkBoxComplete
        }

        this.addNewCheckBox(newCheckBox)

        this.checkbox_elem_title = ''
      }

    },
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

<style lang="scss" scoped>

.more_info_about_todo {
  width: 100%;
}

.progress_checkbox {
  text-align: left;
}

.checkbox_elem_wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
}

.create_checkbox_block {

  & button {
    margin-bottom: 22px;

    &:hover {
      cursor: pointer;
    }
  }
}

.checkbox_elem_info {
  display: flex;
}

.checkbox_elem_delete {
  &:hover {
    cursor: pointer;
  }
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

.checkbox_elem {
  display: flex;
  align-items: center;
  margin: 25px 0;
}

.checkbox_elem_input {
  margin: 0 15px 0 0;
  height: 18px;
  width: 18px;

  &:hover {
    cursor: pointer;
  }
}

.checkbox_input_completed {
  text-decoration: line-through;
}

.checkbox_elem_title {
  white-space: nowrap;
}
</style>




















