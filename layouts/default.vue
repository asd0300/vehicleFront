// layouts/default.vue
<template>
  <div>
    <nav>
      <button @click="goToHome">Back to Home</button>
    </nav>
    <NuxtPage />
    <ChatWidget />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { navigateTo } from '#app'
import ChatWidget from '~/components/ChatWidget.vue'

const goToHome = () => {
  navigateTo('/')
}

const route = useRoute()
const isHomePage = route.path === '/'
</script>

<style>
nav {
  padding: 10px;
  background-color: #f3f3f3;
}
</style>