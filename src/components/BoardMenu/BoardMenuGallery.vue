<template>
  <div>
    <img v-for="img in getGalleryBackgroundImg" class="background_gallery_item" :src="img.url" :key="img.id"
         @click="selectNewBackgroundBoardMenu(img)">
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "BoardMenuGallery",
  computed: {
    ...mapGetters(['getGalleryBackgroundImg'])
  },
  methods: {
    ...mapActions(['selectNewBackground']),
    selectNewBackgroundBoardMenu(img) {
      this.selectNewBackground(img)
      this.$emit('resetDefaultBackground')
    }
  }
}
</script>

<style lang="scss">
.background_gallery {
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

.background_gallery_inner {
  display: flex;
  flex-wrap: wrap;

  & img {
    width: 50%;
    padding: 7px;
    border-radius: 20px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>