// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  runtimeConfig:{
    public:{
      apiBase: process.env.API_BASE_URL || 'http://localhost:4000',
    }
  },
  plugins: [
    '~/plugins/element-plus',
    '~/plugins/axios.js'
  ]
})
