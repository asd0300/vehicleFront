<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="text" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
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
const email = ref('')
const errorMessage = ref('')
const router = useRouter()
const config = useRuntimeConfig()

const register = async () => {
  try {
    const response = await axios.post(`${config.public.apiBase}/api/user/register`, {
      username: username.value,
      password: password.value,
      email: email.value
    })
    // Handle successful registration, e.g., store token and redirect
    router.push('/login')
  } catch (error) {
    errorMessage.value = 'Registration failed. Please try again.'
  }
}
</script>