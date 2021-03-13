<template>
  <div class="deleted_todos_table">
    <h1>Deleted todos</h1>
    <div class="deleted_todos_table_wrapper">
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Action &#8595;</th>
        </tr>
        </thead>

        <tbody v-for="(todo, index) in getDeletedTodoUser">
        <tr>
          <td>{{ index + 1 }}</td>
          <td>{{ todo.title }}</td>
          <td class="td_wrapper"><div class="text_todo_basket">{{ todo.description }}</div></td>
          <td>
            <button class="return_btn_basket" @click="returnTodoInActive(todo)">Return task</button>
          </td>
          <td class="remove_todo_basket" @click="removeTodoFromBasket(index)">X</td>
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
  name: "DeletedTodoTable",
  props: {
    getDeletedTodoUser: {
      type: Array
    }
  },
  methods: {
    ...mapActions(['removeTodoFromBasket', 'returnTodoInActive'])
  },
  computed: {
    ...mapGetters(['getDeletedTodoUser'])
  }
}
</script>

<style lang="scss">
.deleted_todos_table {
  width: 100%;
}

.remove_todo_basket {
  &:hover {
    cursor: pointer;
  }
}

.return_btn_basket {
  background: #ffff00;
  padding: 6px 10px;
  border: 0;

  &:hover {
    background: #0fe70f;
    cursor: pointer;
  }
}

.text_todo_basket {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.td_wrapper {
  max-width: 200px;
}

</style>