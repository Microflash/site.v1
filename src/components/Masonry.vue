<template>
  <div class="masonry" ref="masonry">
    <slot></slot>
  </div>
</template>

<script>
import Macy from 'macy'

export default {
  props: {
    ordered: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Number,
      default: 3
    },
    margin: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      macy: null
    }
  },
  async mounted() {
    this.macy = new Macy({
      container: this.$refs.masonry,
      trueOrder: this.ordered,
      waitForImages: false,
      margin: this.margin,
      columns: this.columns,
      breakAt: {
        1200: 3,
        900: 2,
        600: 1
      }
    })
  }
}
</script>
