<template>
  <div>
    <el-header>
      <h1>Client Appointments</h1>
    </el-header>

    <el-container>
      <el-main>
        <el-table :data="appointments" stripe>
          <el-table-column label="Actions" width="180">
            <template #default="{ row }">
              <el-button @click="editAppointment(row.id)" type="primary">Edit</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" width="180" />
          <el-table-column prop="id" label="Appointment ID" width="180" />
          <el-table-column prop="user_name" label="User Name" width="180" />
          <el-table-column prop="vehicle_brand" label="Vehicle Brand" width="180" />
          <el-table-column prop="vehicle_model" label="Vehicle Model" width="180" />
          <el-table-column prop="service_type" label="Service Type" width="180" />
          <el-table-column prop="appointment_date" label="Appointment Date" width="180">
            <template #default="{ row }">
              {{ new Date(row.appointment_date).toLocaleDateString() }}
            </template>
          </el-table-column>
          <el-table-column prop="pickup_address" label="Pickup Address" width="200" />
          <el-table-column prop="dropoff_address" label="Dropoff Address" width="200" />
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const appointments = ref([])
const config = useRuntimeConfig()
const router = useRouter()

const fetchAppointments = async () => {
  try {
    const token = localStorage.getItem('jwt')
    const response = await axios.get(`${config.public.apiBase}/api/book/appointments/client`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    appointments.value = response.data
  } catch (error) {
    console.error('Error fetching appointments:', error)
  }
}

onMounted(() => {
  fetchAppointments()
})

const editAppointment = (id) => {
  router.push(`/editClientAppointment/${id}`)
}
</script>

<style scoped>
/* 样式可以根据需要自定义 */
</style>
