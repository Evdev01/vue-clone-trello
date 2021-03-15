<template>
  <div class="in_progress_todos_table">
    <h1>{{ 'ExpiredTodos' | localize }}</h1>
    <div class="in_progress_todos_table_wrapper">
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>{{ 'TodoTableTitle' | localize }}</th>
          <th>{{ 'TodoTableDescription' | localize }}</th>
          <th>{{ 'TodoTableAction' | localize }} &#8595;</th>
        </tr>
        </thead>

        <tbody v-for="(todo, index) in getExpiredTodoUser">
        <tr>
          <td>{{ index + 1 }}</td>
          <td>{{ todo.title }}</td>
          <td class="td_wrapper"><div class="text_in_progress_todo">{{ todo.description }}</div></td>
          <td>
            <button class="return_btn_in_progress_todo" @click="todoExpiredInActive(todo)">{{ 'ReturnTask' | localize }}</button>
          </td>
          <td class="remove_todo_in_progress_todo" @click="removeTodoExpired(index)">X</td>
          <!--        <td><router-link :to="/users/ + person.id" class="link">Click to find out more</router-link></td>-->
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "ExpiredTodoTable",
  props: {
    getDeletedTodoUser: {
      type: Array
    }
  },
  methods: {
    ...mapActions(['removeTodoExpired', 'todoExpiredInActive'])
  },
  computed: {
    ...mapGetters(['getExpiredTodoUser'])
  }
}
</script>

<style lang="scss">
.in_progress_todos_table {
  width: 100%;
}

.remove_todo_in_progress_todo {
  &:hover {
    cursor: pointer;
  }
}

.return_btn_in_progress_todo {
  background: #ffff00;
  padding: 6px 10px;
  border: 0;

  &:hover {
    background: #0fe70f;
    cursor: pointer;
  }
}

.text_in_progress_todo {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.td_wrapper {
  max-width: 200px;
}

</style>