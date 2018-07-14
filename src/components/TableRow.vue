<template>
  <transition appear>
    <tr @click.stop="clicked" :class="{ 'clickable-table-row': clickable, highlight: glow }">
      <slot></slot>
    </tr>
  </transition>
</template>

<style>
.clickable-table-row {
  cursor: pointer !important;
}

@keyframes highlight {
  0% {
    background: beige;
  }
  100% {
    background: none;
  }
}

.highlight {
  animation: highlight 2s;
}
</style>

<script>
export default {
  props: {
    item: Object,
    clickable: Boolean
  },
  data () {
    return {
      glow: false
    }
  },
  watch: {
    item (i) {
      let me = this
      if (new Date() - i.time < 1000) {
        this.glow = false
        setTimeout(function () { me.glow = true }, 1)
      }
    }
  },
  methods: {
    clicked () {
      if (this.clickable) {
        this.$emit('click')
      }
    }
  }
}
</script>
