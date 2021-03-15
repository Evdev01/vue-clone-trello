<template>
  <div class="popup__wrapper" ref="popup_wrapper">
    <div class="popup">
      <div class="popup__header">
        <span class="current_todo_time">{{currentTodo.timeCreated}}</span>
        <span>
          <i class="material-icons" @click="closePopupMoreInfoTodo">close</i>
        </span>
      </div>
      <div class="popup__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupMoreInfoAboutTodo",
  props: {
    currentTodo: {
      type: Object
    }
  },
  methods: {
    closePopupMoreInfoTodo() {
      this.$emit('closePopupMoreInfoTodo')
    }
  },
  mounted() {
    let vm = this
    document.addEventListener('click', function (item) {
      if (item.target === vm.$refs['popup_wrapper']) {
        vm.closePopupMoreInfoTodo()
      }
    })
  }
}
</script>

<style lang="scss">
.popup__wrapper {
  background: rgba(64, 64, 64, .4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.popup {
  z-index: 10;
  position: fixed;
  top: 15%;
  width: 600px;
  background: #ffffff;
  box-shadow: 0 0 17px 0 #e7e7e7;
  padding: 16px;

  &__header, &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.submit_btn {
  padding: 8px;
  color: #ffffff;
  background: #26ae68;
}

.close_modal {
  padding: 8px;
  color: #ffffff;
  background: red;

  &:hover {
    cursor: pointer;
  }
}

.material-icons:hover,
.submit_btn {
  cursor: pointer;
}

.current_todo_time {
  font-size: 16px;
  color: #999999;
}
</style>