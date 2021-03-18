<template>
  <div class="deleted_todo">
    <div class="main__wrapper">
      <div class="container">
        <div class="main__wrapper-inner">
          <ExpiredTodoTable v-if="getExpiredTodoUser.length"/>
          <p class="deleted_todo_empty" v-else>No tasks expired ...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeletedTodoTable from '@/components/DeletedTodoTable'
import {mapGetters} from 'vuex'
import ExpiredTodoTable from '@/components/ExpiredTodoTable'
export default {
  name: "ExpiredTodo",
  components: {ExpiredTodoTable, DeletedTodoTable},
  computed: {
    ...mapGetters(['getExpiredTodoUser'])
  }
}
</script>

<style>
.deleted_todo_empty {
  width: 100%;
  text-align: center;
  font-size: 30px;
  opacity: .5;
  background-color: hsla(0,0%,100%,.24);
  border-radius: 3px;
  padding: 6px 8px;
  color: #fff;
}
</style>