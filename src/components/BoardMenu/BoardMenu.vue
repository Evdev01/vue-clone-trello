<template>
  <div class="board_menu">
    <div class="board_menu_header">
      <div class="material-icons">keyboard_arrow_left</div>
      <div class="board_menu_title">Меню</div>
      <div class="material-icons" @click="showBoardMenu">close</div>
    </div>

    <div class="board_menu_inner">
      <div class="board_menu_navigation_item" @click="showBoardGalleryImg = !showBoardGalleryImg">Сменить фон</div>
      <div class="material-icons" @click="boardMenuResetBackground">close</div>
      <BoardMenuGallery
          v-if="showBoardGalleryImg"
          @resetDefaultBackground="resetDefaultBackground"
      />
    </div>
  </div>
</template>

<script>

import BoardMenuGallery from '@/components/BoardMenu/BoardMenuGallery'
import {mapActions} from 'vuex'

export default {
  name: "BoardMenu",
  data() {
    return {
      showBoardGalleryImg: false
    }
  },
  methods: {
    ...mapActions(['resetBackground']),
    boardMenuResetBackground() {
      this.resetBackground()
      this.$emit('resetDefaultBackground')
    },
    resetDefaultBackground() {
      this.$emit('resetDefaultBackground')
    },
    showBoardMenu() {
      this.$emit('showBoardMenu')
    }
  },
  components: {BoardMenuGallery}
}
</script>

<style lang="scss">
.board_menu {
  background: #f4f5f7;
  width: 300px;
  height: auto;
  position: absolute;
  top: 0;
  right: 0;

  &_header {
    display: flex;
    justify-content: space-between;
    padding: 15px 0 12px 0;
    border-bottom: 1px solid #999999;
    margin-bottom: 10px;
  }

  & hr {
    color: #999999;
  }
}

.board_menu_inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  & img {
    width: 50%;
    padding: 7px;
    border-radius: 20px;

    &:hover {
      cursor: pointer;
    }
  }
}

.board_menu_navigation_item {
  padding: 7px 0;

  &:hover {
    cursor: pointer;
  }
}
</style>