<template>
  <div class="card">
    <g-link v-if="isInternalLink" :to="src">
      <slot></slot>
    </g-link>
    <template v-else-if="src == '#'">
      <slot></slot>
    </template>
    <a v-else target="_blank" rel="noopener noreferrer" :href="src">
      <slot></slot>
    </a>
  </div>
</template>

<script>
export default {
  props: ['src'],
  computed: {
    isInternalLink() {
      return this.src && this.src.startsWith('/')
    }
  }
}
</script>

<style lang="scss">
@use 'styles/_variables';
@use 'styles/_properties';
@use 'styles/mixins/_layout';

.card {
  display: flex;
  flex-direction: column;
  background-color: variables.$bg-vibrant;
  padding: properties.$space-sm;
  border-radius: variables.$radius;

  &:focus,
  &:hover {
    background-color: variables.$bg-glossy;

    .card-title,
    .card-description {
      color: inherit;
    }
  }

  .card-title {
    display: flex;
    align-items: center;
    @include layout.my(variables.$char-gap);
    font-weight: variables.$weight-md;

    .label {
      @include layout.size(variables.$icon-rg);
      margin-right: variables.$char-gap;
    }
  }

  .card-metadata {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: variables.$text-muted;
    font-size: variables.$font-sm;

    > span::after {
      content: variables.$symbol-separator;
      @include layout.mx(variables.$separator-gap);
      opacity: variables.$separator-opacity;
    }

    .label {
      @include layout.size(variables.$icon-sm);
      margin-right: variables.$char-gap;
    }
  }

  .card-description {
    color: variables.$text;
    font-size: variables.$font-sm;
  }
}
</style>
