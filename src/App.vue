<template>
  <div id="app">
    <div class="container">

    <MainWrapper/>

    </div>

  </div>
</template>

<script>

import MainWrapper from '@/components/MainWrapper'
import NewTodo from '@/components/NewTodo'

export default {
  name: 'App',
  data() {
    return {
    }
  },

  components: {
    NewTodo,
    MainWrapper,
  }
}
</script>

<style lang="scss">

</style>
