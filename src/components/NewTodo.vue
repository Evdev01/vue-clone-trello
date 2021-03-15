<template>
  <div class="new-todo_wrapper">
    <form @submit.prevent="submit" class="new-todo">

      <div class="form-item" :class="{ errorInput: $v.title.$error }">
        <label>Title:</label>
        <p class="errorText" v-if="!$v.title.required ">Field is required</p>
        <input
            placeholder="Title"
            v-model="title"
            :class="{error: $v.title.$error}"
            @change="$v.title.$touch()"
        >
      </div>

      <div class="form-item" :class="{ errorInput: $v.description.$error }">
        <label>Description:</label>
        <p class="errorText" v-if="!$v.description.required ">Field is required</p>
        <input
            placeholder="Description"
            v-model="description"
            :class="{error: $v.description.$error}"
            @change="$v.description.$touch()"
        >
      </div>

      <button>{{ 'AddNewTodo' | localize }}</button>
      <hr>
    </form>


  </div>

</template>

<script>
import {mapActions} from 'vuex'
import Popup from '@/components/popup/Popup'
import {required} from 'vuelidate/lib/validators'


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
  validations: {
    title: {
      required
    },
    description: {
      required
    }
  },
  methods: {
    ...mapActions(['addTodoUser']),
    submit() {

      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.title.trim() && this.description.trim()) {
          let todo = {
            id: new Date().getTime(),
            title: this.title,
            timeCreated: new Date(Date.now()).toLocaleString(),
            description: this.description,
            completed: this.completed,
            todoOverdue: this.todoOverdue,
            isTodoExpired: false,
            isSetDate: false,
            editModeInputDate: false,
            editModeTitle: false,
            editModeTitleFull: false,
            editModeDescription: false,
            editModeDescriptionFull: false,
            date: ''
          }
          this.addTodoUser(todo)


          this.title = this.description = ''
        }

        this.$emit('closePopupNewTodo')

      }


    }
  }
}
</script>

<style lang="scss" scoped>

.new-todo_wrapper {
  width: 100%;
}

.new-todo {
  margin-top: 30px;
}

.btnNewNote {
  margin: 30px 0;
}

.form-item .errorText {
  display: none;
  margin-bottom: 8px;
  font-size: 13.4px;
  color: #de4040;
}

.form-item {
  &.errorInput .errorText {
    display: block;
  }
}

input.error {
  border-color: #de4040;
}

</style>