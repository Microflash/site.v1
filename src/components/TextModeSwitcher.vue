<template>
  <a role="switch" @click.prevent="switchTextMode" :aria-label="'Switch to ' + nextTextMode + ' text'" aria-checked="true" class="text-mode-switcher leading-none" tabindex="0">
    <svg viewBox="0 0 24 24" class="icon" role="img" aria-hidden="true">
      <transition name="slide-up" mode="out-in">
        <use :href="uri('zoom-in')" key="dark" v-if="textMode === 'normal'"></use>
        <use :href="uri('zoom-out')" key="light" v-else></use>
      </transition>
    </svg>
  </a>
</template>

<script>
// sprite file location
const sprites = '/assets/images/icons.svg'
// available text modes
const textModes = ['normal', 'large']

export default {
  data() {
    return {
      textMode: 'normal',
    }
  },
  computed: {
    nextTextMode() {
      const currentIndex = textModes.indexOf(this.textMode)
      const nextIndex = (currentIndex + 1) % textModes.length
      return textModes[nextIndex]
    }
  },
  methods: {
    switchTextMode() {
      const currentIndex = textModes.indexOf(this.textMode);
      const nextIndex = (currentIndex + 1) % textModes.length;
      window.__setPreferredTextMode(textModes[nextIndex])
      this.textMode = textModes[nextIndex]
    },
    uri(symbol) {
      return `${sprites}#icon-${symbol}`
    }
  },
  async mounted() {
    if (typeof window.__textMode !== 'undefined') this.textMode = window.__textMode
  }
}
</script>
