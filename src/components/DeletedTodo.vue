<template>
  <div class="deleted_todo">
    <div class="main__wrapper">
      <div class="container">
        <div class="main__wrapper-inner">
          <DeletedTodoTable v-if="getDeletedTodoUser.length"/>
          <p class="basket_empty" v-else>No tasks deleted ...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeletedTodoTable from '@/components/DeletedTodoTable'
import {mapGetters} from 'vuex'
export default {
  name: "DeletedTodo",
  components: {DeletedTodoTable},
  computed: {
    ...mapGetters(['getDeletedTodoUser'])
  }
}
</script>

<style>
.basket_empty {
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