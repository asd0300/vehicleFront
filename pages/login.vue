<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const config = useRuntimeConfig()

const login = async () => {
  try {
    const response = await axios.post(`${config.public.apiBase}/api/user/login`, {
      username: username.value,
      password: password.value,
    })

    // Save JWT token and username to localStorage
    localStorage.setItem('jwt', response.data.token)
    localStorage.setItem('username', username.value)
    localStorage.setItem('user_id', response.data.user_id)

    router.push('/')
  } catch (error) {
    errorMessage.value = 'Login failed. Please check your credentials.'
  }
}
</script>