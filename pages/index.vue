<template>
    <div>
      <h1>Welcome to Car Repair Booking System</h1>
      <div v-if="username">Logged in as: {{ username }}</div>
      <div v-else>
        <p>Please login to use the system.</p>
      </div>
      <p>This is your one-stop solution for car repair bookings, including pick-up and delivery services.</p>
      
      <nav>
        <button v-if="username" @click="logout">Logout</button>
        <div v-else>
          <NuxtLink to="/login">Login |</NuxtLink>
          <NuxtLink to="/register">Register</NuxtLink>
        </div>
      </nav>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    const router = useRouter() // Define the router at the top level
    const username = ref('')
    onMounted(() => {
      username.value = localStorage.getItem('username')
    })

    function logout() {
      // Clear JWT token and username from localStorage
      localStorage.removeItem('jwt')
      localStorage.removeItem('username')
      
      // Redirect to homepage
      router.push('/')
      // Optionally, reload the page to update state
      window.location.reload()
    }
  </script>
  
  <style scoped>
  h1 {
    color: #333;
    margin-bottom: 1em;
  }
  
  p {
    font-size: 1.2em;
    margin-bottom: 2em;
  }
  
  nav a {
    margin-right: 1em;
    color: #007bff;
    text-decoration: none;
  }
  
  nav a:hover {
    text-decoration: underline;
  }
  </style>