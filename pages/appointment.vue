<template>
  <div>
    <h2>Book an Appointment</h2>
    <el-form @submit.prevent="bookAppointment" label-width="120px">
      <el-form-item label="Vehicle Brand:">
        <el-select v-model="selectedBrand" @change="updateModels" placeholder="Please select a brand">
          <el-option v-for="(models, brand) in vehicleData" :key="brand" :label="brand" :value="brand"/>
        </el-select>
      </el-form-item>

      <el-form-item label="Vehicle Model:">
        <el-select v-model="vehicleDetails" placeholder="Please select a model" :disabled="!selectedBrand">
          <el-option v-for="model in vehicleModels" :key="model" :label="model" :value="model"/>
        </el-select>
      </el-form-item>

      <el-form-item label="Service Type:">
        <el-select v-model="serviceType" placeholder="Select service type">
          <el-option label="Maintenance" value="maintenance"/>
          <el-option label="Repair" value="repair"/>
        </el-select>
      </el-form-item>

      <el-form-item label="Appointment Date:">
        <el-date-picker v-model="appointmentDate" type="date" placeholder="Select date" @change="fetchAvailableSlots"/>
      </el-form-item>

      <el-form-item v-if="availableSlots.morning.length > 0" label="Morning Slot:">
        <el-select v-model="selectedMorningSlot" placeholder="Select a morning slot">
          <el-option v-for="slot in availableSlots.morning" :key="slot" :label="slot" :value="slot"/>
        </el-select>
      </el-form-item>

      <el-form-item v-if="availableSlots.afternoon.length > 0" label="Afternoon Slot:">
        <el-select v-model="selectedAfternoonSlot" placeholder="Select an afternoon slot">
          <el-option v-for="slot in availableSlots.afternoon" :key="slot" :label="slot" :value="slot"/>
        </el-select>
      </el-form-item>

      <el-form-item label="Pickup Address:">
        <el-input v-model="pickupAddress" placeholder="Enter pickup address"/>
      </el-form-item>

      <el-form-item label="Dropoff Address:">
        <el-input v-model="dropoffAddress" placeholder="Enter dropoff address"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="bookAppointment">Book Appointment</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const vehicleData = {
  "Toyota": ["Camry", "Corolla", "Highlander", "RAV4", "Tacoma"],
  "Honda": ["Accord", "Civic", "CR-V", "Pilot", "Odyssey"],
  "Ford": ["F-150", "Escape", "Mustang", "Explorer", "Bronco"],
  "Chevrolet": ["Silverado", "Equinox", "Malibu", "Tahoe", "Traverse"],
  "BMW": ["3 Series", "5 Series", "X3", "X5", "7 Series"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLA", "GLC", "GLE"],
  "Audi": ["A3", "A4", "Q3", "Q5", "Q7"],
  "Tesla": ["Model S", "Model 3", "Model X", "Model Y"],
  "Hyundai": ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade"],
  "Nissan": ["Altima", "Rogue", "Sentra", "Murano", "Pathfinder"],
}

const selectedBrand = ref('')
const vehicleModels = ref([])
const vehicleDetails = ref('')
const serviceType = ref('maintenance')
const appointmentDate = ref('')
const pickupAddress = ref('')
const dropoffAddress = ref('')
const availableSlots = ref({ morning: [], afternoon: [] })
const selectedMorningSlot = ref('')
const selectedAfternoonSlot = ref('')
const config = useRuntimeConfig()

const updateModels = () => {
  vehicleModels.value = vehicleData[selectedBrand.value] || []
}

const fetchAvailableSlots = async () => {
  if (!appointmentDate.value) return
  
  try {
    const response = await axios.get(`${config.public.apiBase}/api/book/getAvailableSlots?date=${appointmentDate.value}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    availableSlots.value = response.data
  } catch (error) {
    console.error('Error fetching available slots:', error)
  }
}

const bookAppointment = async () => {
  try {
    const response = await axios.post(`${config.public.apiBase}/api/book/appointments`, {
      vehicle_brand: selectedBrand.value,
      vehicle_model: vehicleDetails.value,
      service_type: serviceType.value,
      appointment_date: appointmentDate.value,
      morning_slot: selectedMorningSlot.value,
      afternoon_slot: selectedAfternoonSlot.value,
      pickup_address: pickupAddress.value,
      dropoff_address: dropoffAddress.value,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user_id')}`
      }
    })
    alert('Appointment booked successfully')
  } catch (error) {
    console.error('Failed to book appointment', error)
    alert('Failed to book appointment')
  }
}
</script>
