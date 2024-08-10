// layouts/default.vue
<template>
  <div>
    <nav>
      <NuxtLink v-if="!isHomePage" to="/">Back to Home</NuxtLink>
    </nav>
    <Nuxt />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const isHomePage = route.path === '/'
</script>

<style>
nav {
  padding: 10px;
  background-color: #f3f3f3;
}
</style>