<template>
  <footer class="footer py-far-md text-sm">
    <div class="container px-far-base">
      <div class="sidekick">
        <slot></slot>
        <hr />
      </div>
      <div class="footer-links flex items-center justify-between flex-wrap lg:flex-nowrap mb-lg">
        <ul class="list-none flex flex-wrap lg:flex-nowrap separated">
          <li class="my-xs inline-flex items-center">
            <a class="inline-flex items-center" target="_blank" rel="noopener noreferrer" href="https://github.com/Microflash/site/issues/new"><Icon symbol="icon-report-issue" class="icon-sm mr-ch-sm" />Report an issue</a>
          </li>
          <li class="my-xs inline-flex items-center">
            <a class="inline-flex items-center" href="/feed.xml"><Icon symbol="icon-rss" class="icon-sm mr-ch-sm" />RSS feed</a>
          </li>
          <li class="my-xs inline-flex items-center">
            <a class="inline-flex items-center" href="/sitemap.xml"><Icon symbol="icon-sitemap" class="icon-sm mr-ch-sm" />Sitemap</a>
          </li>
          <li class="my-xs inline-flex items-center">
            <a class="inline-flex items-center" target="_blank" rel="noopener noreferrer" href="https://github.com/Microflash/site"><Icon symbol="icon-source-code" class="icon-sm mr-ch-sm" />Source code</a>
          </li>
          <li class="my-xs inline-flex items-center">
            <a class="inline-flex items-center" href="/profile/naiyer/#privacy"><Icon symbol="icon-privacy" class="icon-sm mr-ch-sm" />Privacy</a>
          </li>
        </ul>
        <div class="text-base my-base">
          <a href="https://github.com/naiyerasif" title="GitHub" target="_blank" rel="noopener noreferrer" class="leading-none mr-ch-base">
            <Icon symbol="icon-github" class="icon-sm" />
          </a>
          <a href="https://gitlab.com/Microflash" title="GitLab" target="_blank" rel="noopener noreferrer" class="leading-none mr-ch-base">
            <Icon symbol="icon-gitlab" class="icon-sm" />
          </a>
          <a href="https://twitter.com/Microflash" title="Twitter" target="_blank" rel="noopener noreferrer" class="leading-none mr-ch-base">
            <Icon symbol="icon-twitter" class="icon-sm" />
          </a>
          <a href="https://in.linkedin.com/in/naiyerasif" title="LinkedIn" target="_blank" rel="noopener noreferrer" class="leading-none">
            <Icon symbol="icon-linkedin" class="icon-sm" />
          </a>
        </div>
      </div>
      <p class="about max-sm"><g-link class="font-bold" to="/">Microflash</g-link> is created, written, and maintained by <g-link to="/profile/naiyer/">Naiyer Asif</g-link>. It's built using <a href="/profile/naiyer/#technologies">Jamstack</a> and deployed on <a target="_blank" rel="noopener noreferrer" href="https://netlify.com/">Netlify</a> with <a target="_blank" rel="noopener noreferrer" href="https://github.com/Microflash/site/actions">GitHub Actions</a>.</p>
      <p class="text-xs">Except as otherwise noted, the content of this page is licensed under the <a target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution 4.0 License</a>, and the source code of this site and the code samples are licensed under the <a target="_blank" rel="noopener noreferrer" href="https://github.com/Microflash/site/blob/main/LICENSE.md">MIT License</a>.</p>
    </div>
  </footer>
</template>

<script>
import Icon from '~/components/Icon'
import Favicon from '@/static/favicon.svg'
import dayjs from 'dayjs'

export default {
  components: {
    Icon,
    Favicon
  },
  computed: {
    year() {
      return dayjs().year()
    }
  }
}
</script>

<style scoped>
.footer-links ul {
  margin-left: 0;
  margin-bottom: 0;
}
</style>
