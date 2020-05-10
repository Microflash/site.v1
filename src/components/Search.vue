<template>
  <div class="search">
    <a role="button" @click="expand">
      <Sprite symbol="icon-search" class="icon" />
    </a>
    <transition name="dissolve">
      <div v-if="expanded" class="search-container">
        <div class="search-box">
          <input type="text" class="search-input" placeholder="Search" v-model="query" @input="softReset" @keyup="performSearch" @keyup.esc="searchResultsVisible = false" @keydown.up.prevent="highlightPrev" @keydown.down.prevent="highlightNext" @keyup.enter="performSearch" @blur="searchResultsVisible = false" @focus="searchResultsVisible = true" ref="search" aria-label="Search">
          <a role="button" @click="reset" class="search-reset">
            <Sprite symbol="icon-delete" class="icon" />
          </a>
        </div>
        <transition name="dissolve">
          <div v-if="query.length > 0 && searchResultsVisible" class="search-results">
            <div class="results-box" ref="results">
              <section class="result-label">
                {{ results.length > 0 ? results.length === 1 ? `${results.length} result` : `${results.length} results` : `No results for "${this.query}"` }}
              </section>
              <a v-for="(post, index) in results" :key="index" :href="post.item.path" @click="reset" class="result-item">
                <span class="result-title">{{ post.item.title }}</span>
              </a>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import Sprite from './Sprite'

import * as appConfig from '../../app.config'
const searchConfig = appConfig.searchConfig

export default {
  components: {
    Sprite
  },
  created() {
    axios(`/${searchConfig.file.name}`).then(response => {
      this.posts = response.data
    }).catch(error => {
      console.log(error)
    })
  },
  data() {
    return {
      query: '',
      results: [],
      posts: [],
      highlightedIndex: 0,
      searchResultsVisible: false,
      options: searchConfig.options,
      expanded: false
    }
  },
  methods: {
    reset() {
      this.query = ''
      this.highlightedIndex = 0
      this.expanded = !this.expanded
    },
    softReset() {
      this.highlightedIndex = 0
      this.searchResultsVisible = true
    },
    performSearch() {
      this.$search(this.query, this.posts, this.options).then(results => {
        this.results = results
      })
    },
    highlightPrev() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex = this.highlightedIndex - 1
        this.scrollIntoView()
      }
    },
    highlightNext() {
      if (this.highlightedIndex < this.results.length - 1) {
        this.highlightedIndex = this.highlightedIndex + 1
        this.scrollIntoView()
      }
    },
    scrollIntoView() {
      this.$refs.results.children[this.highlightedIndex].scrollIntoView({ block: 'nearest' })
    },
    expand() {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang="scss">
@use 'styles/_variables';
@use 'styles/_properties';
@use 'styles/mixins/_layout';

.search-container,
.search-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  position: relative;
}

.search-container {
  background-color: variables.$bg-glossy;
  position: absolute;
  top: properties.$search-alignment;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}

.search-box {
  width: properties.$search-width;
  @include layout.px(properties.$search-padding);
  height: 100%;

  .search-input {
    outline: none;
    border: none;
    flex: 1;
    height: inherit;
  }
}

.search-results {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: properties.$search-width;
  margin: 0 auto;
  top: 100%;
  right: 0;
  left: 0;
  z-index: 5;
  max-height: 75vh;
  overflow: hidden;
  border-bottom-left-radius: properties.$radius-responsive;
  border-bottom-right-radius: properties.$radius-responsive;

  .results-box {
    overflow: auto;
    z-index: 5;
    background-color: variables.$bg-muted;
    box-shadow: 0 30px 50px variables.$bg-glossy;

    > * {
      display: block;
    }

    .result-item,
    .result-label {
      padding: variables.$gap-xs properties.$search-padding;
    }

    .result-label {
      color: variables.$text-muted;
    }

    .result-item {
      color: variables.$text;

      &:focus,
      &:hover {
        color: variables.$link-vibrant;
        background-color: variables.$bg-vibrant;
      }
    }
  }
}
</style>
