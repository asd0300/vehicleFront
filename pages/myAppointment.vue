<template>
  <el-container>
    <el-header>
      <h1>My Appointments</h1>
    </el-header>

    <el-main>
      <el-table :data="appointments" stripe>
        <el-table-column prop="id" label="Appointment ID" />
        <el-table-column prop="vehicle_brand" label="Vehicle Brand" />
        <el-table-column prop="vehicle_model" label="Vehicle Model" />
        <el-table-column prop="service_type" label="Service Type" />
        <el-table-column prop="appointment_date" label="Appointment Date">
          <template v-slot="{ row }">
            {{ new Date(row.appointment_date).toLocaleDateString() }}
          </template>
        </el-table-column>
        <el-table-column prop="pickup_address" label="Pickup Address" />
        <el-table-column prop="dropoff_address" label="Dropoff Address" />
        <el-table-column prop="status" label="Status" />
        <el-table-column label="Actions">
          <template v-slot="{ row }">
            <el-button @click="editAppointment(row)" type="primary" size="small">Edit</el-button>
            <el-button @click="deleteAppointment(row.id)" type="danger" size="small">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- Modify Appointment Form -->
      <el-dialog title="Edit Appointment" :visible.sync="showEditForm" width="50%">
        <el-form :model="selectedAppointment" ref="formRef" label-width="120px">
          <el-form-item label="User ID:" prop="user_id">
            <el-input v-model="selectedAppointment.user_id" />
          </el-form-item>
          <el-form-item label="Vehicle Brand:" prop="vehicle_brand">
            <el-input v-model="selectedAppointment.vehicle_brand" />
          </el-form-item>
          <el-form-item label="Vehicle Model:" prop="vehicle_model">
            <el-input v-model="selectedAppointment.vehicle_model" />
          </el-form-item>
          <el-form-item label="Service Type:" prop="service_type">
            <el-input v-model="selectedAppointment.service_type" />
          </el-form-item>
          <el-form-item label="Appointment Date:" prop="appointment_date">
            <el-date-picker
              v-model="selectedAppointment.appointment_date"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="Select date"
            />
          </el-form-item>
          <el-form-item label="Pickup Address:" prop="pickup_address">
            <el-input v-model="selectedAppointment.pickup_address" />
          </el-form-item>
          <el-form-item label="Dropoff Address:" prop="dropoff_address">
            <el-input v-model="selectedAppointment.dropoff_address" />
          </el-form-item>
          <el-form-item>
            <el-button @click="updateAppointment" type="primary">Update Appointment</el-button>
            <el-button @click="showEditForm = false">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElTable, ElTableColumn, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElDatePicker, ElContainer, ElHeader, ElMain } from 'element-plus'

const router = useRouter()
const config = useRuntimeConfig()

const appointments = ref([])
const showEditForm = ref(false)
const selectedAppointment = ref({})

async function fetchAppointments() {
  try {
    const userId = localStorage.getItem('user_id')
    const response = await axios.get(`${config.public.apiBase}/api/book/appointments`, {
      headers: {
        'Authorization': `Bearer ${userId}`
      }
    })
    appointments.value = response.data
  } catch (error) {
    console.error('Error fetching appointments:', error)
  }
}

async function deleteAppointment(id) {
  try {
    await axios.delete(`${config.public.apiBase}/api/book/appointments/${id}`)
    appointments.value = appointments.value.filter(appt => appt.id !== id)
    alert('Appointment deleted successfully!')
  } catch (error) {
    console.error('Error deleting appointment:', error)
    alert('Failed to delete appointment.')
  }
}

function editAppointment(appointment) {
  selectedAppointment.value = { ...appointment }
  showEditForm.value = true
}

async function updateAppointment() {
  try {
    await axios.put(`${config.public.apiBase}/api/book/appointments/${selectedAppointment.value.id}`, selectedAppointment.value)
    showEditForm.value = false
    await fetchAppointments()
    alert('Appointment updated successfully!')
  } catch (error) {
    console.error('Error updating appointment:', error)
    alert('Failed to update appointment.')
  }
}

onMounted(() => {
  fetchAppointments()
})
</script>

<style scoped>
/* Add custom styles if necessary */
.el-header {
  margin-bottom: 1em;
}
.el-table {
  margin-bottom: 1em;
}
.el-dialog {
  max-width: 1000px;
}
</style>
