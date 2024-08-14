<template>
    <div>
      <el-header>
        <h1>Edit Client Appointment</h1>
      </el-header>
  
      <el-container>
        <el-main>
          <el-form :model="appointment" ref="form" label-width="120px" class="appointment-form">
            <el-form-item label="Appointment ID">
              <el-input v-model="appointment.id" disabled />
            </el-form-item>
            <el-form-item label="Status">
              <el-select v-model="appointment.status" placeholder="Select status">
                <el-option label="In Progress" value="In Progress" />
                <el-option label="Completed" value="Completed" />
              </el-select>
            </el-form-item>
            <el-form-item label="Comments">
              <div v-for="(comment, index) in appointment.comments" :key="index">
                <el-input v-model="comment.author" placeholder="Author" />
                <el-input type="textarea" v-model="comment.text" placeholder="Add comments" />
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addComment">Add Comment</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateAppointment">Update Appointment</el-button>
              <el-button @click="goBack">Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const appointment = ref({
  id: '',
  status: '',
  comments: [],
})

const config = useRuntimeConfig()
const router = useRouter()
const route = useRoute()

const fetchAppointment = async () => {
  try {
    const id = route.params.id
    const token = localStorage.getItem('jwt')
    const response = await axios.get(`${config.public.apiBase}/api/book/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    appointment.value = response.data
    if (!appointment.value.comments) {
      appointment.value.comments = []
    }
  } catch (error) {
    console.error('Error fetching appointment:', error)
  }
}

const updateAppointment = async () => {
  try {
    const id = appointment.value.id
    const token = localStorage.getItem('jwt')
    await axios.put(`${config.public.apiBase}/api/book/appointments/${id}`, appointment.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    router.push('/clientsAppointments')
  } catch (error) {
    console.error('Error updating appointment:', error)
  }
}

const addComment = () => {
  appointment.value.comments.push({
    author: '',
    text: '',
    created: new Date().toISOString()
  })
}

const goBack = () => {
  router.push('/clientsAppointments')
}

onMounted(() => {
  fetchAppointment()
})
</script>
  