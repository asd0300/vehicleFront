<template>
  <el-container>
    <el-header>
      <h2>Register</h2>
    </el-header>

    <el-main>
      <el-form :model="form" ref="formRef" label-width="120px" @submit.native.prevent="register">
        <el-form-item label="Username:" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="Email:" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Password:" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">Register</el-button>
          <el-button @click="router.push('/login')">Back to Login</el-button>
        </el-form-item>
        <el-alert v-if="errorMessage" :title="errorMessage" type="error" show-icon />
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElContainer, ElHeader, ElMain, ElForm, ElFormItem, ElInput, ElButton, ElAlert } from 'element-plus'

const router = useRouter()
const config = useRuntimeConfig()

const form = ref({
  username: '',
  email: '',
  password: ''
})

const errorMessage = ref('')

const register = async () => {
  try {
    await axios.post(`${config.public.apiBase}/api/user/register`, form.value)
    // Handle successful registration
    router.push('/login')
  } catch (error) {
    errorMessage.value = 'Registration failed. Please try again.'
  }
}
</script>

<style scoped>
.el-header {
  margin-bottom: 1em;
}
.el-form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
