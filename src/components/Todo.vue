<template>
  <div class="todos">
    <div class="todo" :class="{ todoCheck: !todo.completed || todo.todoOverdue }" v-for="todo in todos"
         :key="todo.id">
      <div class="todo-header" :class="{ todoCheck: !todo.completed }">
        <p>{{ todo.title }}</p>
        <p style="cursor: pointer" @click="removeTodo(todo.id)">x</p>
      </div>
      <div class="todo-body">
        <p>{{ todo.description }}</p>
      </div>
      <div class="todoInput">
        <p class="todoCompleted" @click="todoCompleted(todo.id)">В Выполненые</p>
        <p class="todoExpired" @click="todoExpired(todo.id)">В просроченные</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "Todo",
  data() {
    return {
      search: this.value,
    }
  },
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions(['removeTodo', 'todoCompleted', 'todoExpired', 'todoOverdue'])
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

  &.todoCheck {
    background-color: red;
  }

  &:hover {
    box-shadow: 0 30px 30px rgba(0, 0, 0, .04);
    transform: translate(0, -6px);
    transition-delay: 0s !important;
  }

}

.todoInput {
  display: flex;
  align-items: center;
  flex-direction: column;

  & input {
    padding: 0;
    margin: 0;
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