<template>
  <div class="card">
    <div v-if="metadata" class="card-metadata">{{ metadata }}</div>
    <div v-else class="card-metadata">
      <slot></slot>
    </div>
    <div class="card-title">
      <Sprite v-if="icon" class="label" :symbol="icon" />
      {{ title }}
    </div>
    <div class="card-description">{{ description }}</div>
  </div>
</template>

<script>
import Sprite from '~/components/Sprite'

export default {
  props:['metadata', 'title', 'description', 'icon'],
  components: {
    Sprite
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
    a {
      background-color: variables.$bg-glossy;
    }

    .card-title,
    .card-description {
      color: inherit;
    }
  }

  .card-title {
    display: flex;
    align-items: center;
    @include layout.my(variables.$gap);
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
