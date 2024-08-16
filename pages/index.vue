<template>
  <el-container>
    <el-header>
      <h1>Welcome to Car Repair Booking System</h1>
    </el-header>

    <el-main>
      <el-row>
        <el-col :span="24">
          <div v-if="username">
            <el-alert
              :title="`Logged in as: ${username}`"
              type="success"
              show-icon
              class="alert"
            />
            <el-button @click="logout" type="primary">Logout</el-button>
            <el-link :href="'/appointment'">Book an Appointment</el-link>
            <el-link :href="'/myAppointment'">My Appointment</el-link>
            <el-link v-if="role === 'owner'" :href="'/clientsAppointments'">Check Client's Appointment</el-link>
            <el-link v-if="role === 'owner'" :href="'/capacity'">Capacity Check</el-link>
            <el-link v-if="role === 'owner'" :href="'/ownerCapacitySettings'">Calendar Capacity</el-link>
          </div>
          <div v-else>
            <p>Please login to use the system.</p>
            <el-link :href="'/login'">Login</el-link> |
            <el-link :href="'/register'">Register</el-link>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElAlert, ElButton, ElLink, ElContainer, ElHeader, ElMain, ElRow, ElCol } from 'element-plus'
import {jwtDecode as jwt_decode} from 'jwt-decode';
const router = useRouter()
const username = ref('')
const role = ref("")

onMounted(() => {
  const token = localStorage.getItem('jwt')
  if (token) {
    const decoded = jwt_decode(token);
    username.value = localStorage.getItem('username')
    role.value = decoded.role
  }
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

.el-link {
  margin-right: 1em;
  color: #007bff;
}

.el-link:hover {
  text-decoration: underline;
}

.el-button {
  margin-right: 1em;
}

.alert {
  margin-bottom: 1em;
}
</style>
