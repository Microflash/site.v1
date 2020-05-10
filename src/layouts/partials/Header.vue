<template>
  <header class="header">
    <div class="container">
      <g-link class="brand" to="/">
        <Logo />
      </g-link>
      <g-link class="header-link" to="/collection/">Collection</g-link>
      <g-link class="header-link" to="/profile/naiyer/">About</g-link>
      <Search />
      <ThemeSwitcher />
      <hr class="break" />
    </div>
  </header>
</template>

<script>
import Logo from 'static/favicon.svg'
import Search from '~/components/Search'
import ThemeSwitcher from '~/components/ThemeSwitcher'

export default {
  components: {
    Logo,
    Search,
    ThemeSwitcher
  }
}
</script>

<style lang="scss">
@use 'styles/_variables';
@use 'styles/_properties';
@use 'styles/mixins/_layout';
@use 'styles/mixins/_queries';

.header {
  background-color: variables.$bg-glossy;
  font-size: variables.$font-sm;

  .container {
    display: flex;
    flex-wrap: properties.$wrap-responsive;
    justify-content: properties.$align-expanded;
    align-items: center;

    > * {
      @include layout.py(properties.$gap-compressed);

      &:not(:first-child) {
        margin-left: variables.$gap-sm;
      }

      &:not(:nth-last-child(2)) {
        margin-right: variables.$gap-sm;
      }
    }

    .brand {
      line-height: 0;
      width: 30px;

      svg {
        @include layout.size(inherit);
      }
    }

    .break {
      flex-basis: 100%;
      height: 0;
      margin: 0;
      padding: 0;
      
      @include queries.md {
        @include layout.hide;
      }
    }
  }
}

@include queries.within-md {
  .brand {
    flex: 1;
  }

  .search {
    order: 2;
  }

  .break {
    order: 3;
  }

  .brand + .header-link {
    margin-left: 0 !important;
  }

  .theme-switcher,
  .header-link {
    order: 4;
    margin-top: -(variables.$gap-lg);
  }
}
</style>
