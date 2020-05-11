<template>
  <section class="toc" id="table-of-contents">
    <a role="button" @click.prevent="toggleOpen()" aria-label="Toggle Table of contents" class="toc-header">
      <strong>Table of contents</strong>
      <div class="toc-minimizer">
        <transition name="slide-up" mode="out-in">
          <div key="close" v-if="!tocOpen" class="close">&#8595;</div>
          <div key="open" v-else class="open">&#8593;</div>
        </transition>
      </div>
    </a>
    <transition name="dissolve">
      <ul v-if="tocOpen" class="toc-body">
        <li v-for="header in allHeadings" :key="header.id">
          <a :class="'toc-item-' + header.depth" :href="header.anchor">{{ header.value }}</a>
        </li>
      </ul>
    </transition>
  </section>
</template>

<script>
import * as appConfig from '../../app.config'

export default {
  props: ['headers', 'depth'],
  data() {
    return {
      tocOpen: false
    }
  },
  computed: {
    allHeadings() {
      const maxDepth = this.depth ? this.depth : appConfig.prefs.maxTocDepth
      return this.headers.filter(h => h.depth <= maxDepth)
    }
  },
  methods: {
    toggleOpen() {
      this.tocOpen = !this.tocOpen
    }
  }
}
</script>

<style lang="scss">
@use 'styles/_variables';
@use 'styles/_properties';

.toc {
  background-color: variables.$bg-vibrant;
  border-radius: variables.$radius;
  padding: 1em 1.2em;
  margin-bottom: properties.$space-rg;
}

.toc-header {
  display: flex;
  justify-content: space-between;
  font-weight: variables.$weight-lg;
  color: inherit;

  &:focus,
  &:hover {
    color: inherit;
  }
}

.toc-body {
  list-style-type: none;
  margin-left: 0;
  margin-top: variables.$gap;
  font-size: variables.$font-sm;

  li {
    $toc-margin: variables.$gap;
    $levels: 3 4 5 6;

    @each $level in $levels {
      .toc-item-#{$level} {
        margin-left: $toc-margin * ($level - 2);
      }
    }
  }
}
</style>
