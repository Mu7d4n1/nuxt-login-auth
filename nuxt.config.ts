export default defineNuxtConfig({
  compatibilityDate: '2026-09-18',

  modules: [
    '@nuxt/ui'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  runtimeConfig: {
    sessionPassword: ''
  },

  typescript: {
    strict: true
  }
})