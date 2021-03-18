<template>
  <div class="deleted_todos_table">
    <p class="deleted_todos_title">{{ 'DeletedTodos' | localize }}</p>
    <div class="deleted_todos_table_wrapper">
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>{{ 'TodoTableTitle' | localize }}</th>
          <th>{{ 'TodoTableDescription' | localize }}</th>
          <th>{{ 'TodoTableAction' | localize }} &#8595;</th>
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

  & th {
    background-color: hsla(0,0%,100%,.24);
    border-radius: 26px;
    padding: 6px 8px;
    color: #fff;
  }
}

tr {
  & th {
    text-align: center;
  }

  & td {
    text-align: center;
  }
}


.deleted_todos_title {
  background-color: hsla(0,0%,100%,.24);
  border-radius: 3px;
  padding: 6px 8px;
  color: #fff;
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