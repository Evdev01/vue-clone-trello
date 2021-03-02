<template>
  <div class="todos">
    <p class="notTodo" v-if="!todos.length">Enter a new task</p>
    <div class="todo" :class="{ todoExpired: todo.isTodoExpired }" v-for="todo in todos"
         :key="todo.id">
      <div class="todo-header">
        <p>{{ todo.title }}</p>

        <p style="cursor: pointer" @click="removeTodo(todo.id)">x</p>
      </div>
      <div class="todo-body">
        <p>{{ todo.description }}</p>
      </div>
      <div class="todoInput">
        <p class="todoCompleted" @click="todoCompleted(todo)">В Выполненые</p>
        <p class="todoExpired" @click="todoExpired(todo)">В просроченные</p>

        <p class="todo__date_p" @click="setDateChange(todo.id)">Установить дату выполнения? </p>
        <div class="todo__date">
          <input type="date" v-show="todo.isSetDate" v-model="todos.date" @click="visibleBtn = !visibleBtn">
          <p v-show="todo.date.length">Завершить к: {{ todo.date }}</p>

          <button v-show="visibleBtn" @click="setDate(todo.id, todos.date)">Установить дату выполнения</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "Todo",
  data() {
    return {
      search: this.value,
      visibleBtn: false,
      test: false,
      setDateButton: false,
      currentDate: new Date().toLocaleString('ru', {day: 'numeric', month: 'long', year: 'numeric'})
    }
  },
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(['todoList'])
  },
  methods: {
    ...mapActions(['removeTodo', 'todoCompleted', 'todoExpired', 'setDateChange']),
    setDate(id, date) {
      this.$emit('setDate', id, date)
      this.visibleBtn = false
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
  }

}

.todo__date {

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
</style>