<template>
  <header class="header">
    <div class="container flex justify-start items-center flex-wrap lg:flex-nowrap text-sm">
      <g-link class="brand leading-none mr-far-base" aria-label="Microflash logo" to="/">
        <Logo />
      </g-link>
      <nav class="menu-start inline-flex justify-center sm:order-1 sm:basis-100 sm:mt-base">
        <g-link class="tappable focus:bg-ruby hover:bg-ruby focus:no-underline hover:no-underline" to="/posts/">Articles</g-link>
        <g-link class="tappable focus:bg-ruby hover:bg-ruby focus:no-underline hover:no-underline" to="/projects/">Projects</g-link>
        <g-link class="tappable focus:bg-ruby hover:bg-ruby focus:no-underline hover:no-underline" to="/profile/naiyer/">About</g-link>
      </nav>
      <nav class="menu-end inline-flex ml-auto">
        <theme-switcher />
        <text-mode-switcher class="ml-base" />
        <search class="ml-base" />
      </nav>
    </div>
    <slot></slot>
  </header>
</template>

<script>
import Logo from '@/static/assets/images/logo.svg'
import Search from '~/components/Search'
import ThemeSwitcher from '~/components/ThemeSwitcher'
import TextModeSwitcher from '~/components/TextModeSwitcher'

export default {
  components: {
    Logo,
    Search,
    ThemeSwitcher,
    TextModeSwitcher
  }
}
</script>

<style lang="scss" scoped>
@use '~/assets/styles/mixins/size' as *;

.header {
  .container {
    padding: var(--far-md) var(--far-base);

    & + .container {
      padding-top: 0;
    }
  }

  .brand {
    width: calc(9rem + 2vw);

    svg {
      @include size(inherit);
    }
  }
}
</style>
