<template>
  <transition name="dialog-fade">
    <div v-el-drag-dialog
      class="el-dialog__wrapper"
      v-show="visible">
      <div flex="dir:top box:justify"
        class="el-dialog"
        :class="[{ 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button type="button"
            aria-label="Max"
            @click="maxDialog"
            class="button btn-max">
            <i class="iconfont icon-max"></i>
          </button>
          <button type="button"
            class="button btn-close"
            aria-label="Close"
            @click="handleClose">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body"
          v-if="rendered">
          <slot></slot>
        </div>
        <div flex="main:center"
          lass="el-dialog__footer"
          v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from 'element-ui/src/utils/popup'
import Migrating from 'element-ui/src/mixins/migrating'
import emitter from 'element-ui/src/mixins/emitter'
import elDragDialog from '@/directives/el-dragDialog'

export default {
  name: 'ElDialog',
  directives: { elDragDialog },
  provide () {
    return {
      dialog: this
    }
  },

  mixins: [Popup, emitter, Migrating],

  props: {
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: true
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: true
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    width: String,

    defaultFullscreen: Boolean,

    customClass: {
      type: String,
      default: ''
    },
    // false 允许拖拽；true 不允许拖拽
    noDrag: {
      type: Boolean,
      default: false
    },
    top: {
      type: String,
      default: '10vh'
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      closed: false,
      fullscreen: false
    }
  },

  watch: {
    visible (val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0
        })
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper)
        if (!this.closed) this.$emit('close')
      }
    },
    defaultFullscreen: {
      handler: function (val) {
        if (val) {
          this.fullscreen = true
        }
      },
      immediate: true
    }
  },

  computed: {
    style () {
      let style = {}
      if (this.width) {
        style.width = this.width
      }
      if (!this.fullscreen) {
        style.marginTop = this.top
      }
      return style
    },
    dragdisable () {
      // console.log(this.fullscreen || noDrag);
      return this.fullscreen || this.noDrag
    }
  },

  methods: {
    handleClose () {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide (cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        this.closed = true
      }
    },
    updatePopper () {
      this.broadcast('ElSelectDropdown', 'updatePopper')
      this.broadcast('ElDropdownMenu', 'updatePopper')
    },
    maxDialog () {
      this.fullscreen = !this.fullscreen
      this.$emit('max', this.fullscreen)
    },
    dragDialog () {
      this.$emit('drag')
    },
    dragStart () {
      this.$emit('dragStart')
    },
    dragEnd () {
      this.$emit('dragEnd')
    }
  },

  mounted () {
    if (this.visible) {
      this.rendered = true
      this.open()
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },

  destroyed () {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style lang="less" scoped>
.el-dialog.is-fullscreen {
  width: 100% !important;
  height: 100% !important;
}
.el-dialog__header {
  position: relative;
  height: 44px;
  padding: 10px 20px;
  color: #fff;
  // cursor: move;
  background: #4491e0;
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__close {
    color: #fff;
  }
  .button {
    position: absolute;
    border: 0;
    background: transparent;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    outline: 0;
    &.btn-close {
      right: 20px;
    }
    &.btn-max {
      right: 40px;
    }
  }
}
.el-dialog__body {
  padding: 10px;
}
.el-dialog {
  margin: 0 auto;
  height: 80vh;
  padding: 0 0 20px;
}
</style>
