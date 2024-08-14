<template>
  <el-container>
    <el-header>
      <h2>Login</h2>
    </el-header>
    
    <el-main>
      <el-form :model="form" ref="formRef" label-width="120px" @submit.native.prevent="login">
        <el-form-item label="Username:" :error="errorMessage.username">
          <el-input v-model="form.username" placeholder="Enter your username" />
        </el-form-item>
        <el-form-item label="Password:" :error="errorMessage.password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Login</el-button>
        </el-form-item>
        <el-form-item>
          <el-alert
            v-if="errorMessage.general"
            title="Login failed. Please check your credentials."
            type="error"
            show-icon
          />
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElForm, ElFormItem, ElInput, ElButton, ElAlert, ElContainer, ElHeader, ElMain } from 'element-plus'

const router = useRouter()
const config = useRuntimeConfig()

const form = ref({
  username: '',
  password: ''
})

const errorMessage = ref({
  username: '',
  password: '',
  general: ''
})

const login = async () => {
  try {
    const response = await axios.post(`${config.public.apiBase}/api/user/login`, {
      username: form.value.username,
      password: form.value.password,
    })

    // Save JWT token and username to localStorage
    localStorage.setItem('jwt', response.data.token)
    localStorage.setItem('username', form.value.username)
    localStorage.setItem('user_id', response.data.user_id)

    router.push('/')
  } catch (error) {
    errorMessage.value.general = 'Login failed. Please check your credentials.'
  }
}
</script>

<style scoped>
/* Add custom styles if necessary */
.el-header {
  margin-bottom: 1em;
}

.el-form-item {
  margin-bottom: 1em;
}

.el-alert {
  margin-top: 1em;
}
</style>
