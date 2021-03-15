<template>
  <div class="deleted_todo">
    <div class="main__wrapper">
      <div class="container">
        <div class="main__wrapper-inner">
          <ExpiredTodoTable v-if="getExpiredTodoUser.length"/>
          <p class="basket_empty" v-else>No tasks expired ...</p>
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
.basket_empty {
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: #000000;
  opacity: .5;
}
</style>