<template>
  <div>
    <h2>Book an Appointment</h2>
    <el-form @submit.prevent="bookAppointment" label-width="120px">
      <el-form-item label="Vehicle Brand:" :required="true">
        <el-select v-model="selectedBrand" @change="updateModels" placeholder="Please select a brand">
          <el-option v-for="(models, brand) in vehicleData" :key="brand" :label="brand" :value="brand"/>
        </el-select>
      </el-form-item>

      <el-form-item label="Vehicle Model:" :required="true">
        <el-select v-model="vehicleDetails" placeholder="Please select a model" :disabled="!selectedBrand">
          <el-option v-for="model in vehicleModels" :key="model" :label="model" :value="model"/>
        </el-select>
      </el-form-item>

      <el-form-item label="Service Type:" :required="true">
        <el-select v-model="serviceType" placeholder="Select service type">
          <el-option label="Maintenance" value="maintenance"/>
          <el-option label="Repair" value="repair"/>
        </el-select>
      </el-form-item>
      <CalendlyEmbed @date-selected="handleDateSelected" @no-available-data="handleNoAvailableData"/>
      <p v-if="noAvailableData" style="color: red; font-weight: bold;">No available appointment slots. Please check backend info later.</p>
      <el-form-item label="Pickup Address:" :required="true">
        <el-input v-model="pickupAddress" placeholder="Enter pickup address"/>
      </el-form-item>

      <el-form-item label="Dropff Address: " :required="true">
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
const noAvailableData = ref(false)

const handleDateSelected = (date) =>{
  appointmentDate.value = date
}

const handleNoAvailableData= () => {
  noAvailableData.value = true;
}

const updateModels = () => {
  vehicleModels.value = vehicleData[selectedBrand.value] || []
}

const bookAppointment = async () => {
  if (!selectedBrand.value || !vehicleDetails.value || !serviceType.value || !appointmentDate.value || 
      !pickupAddress.value || !dropoffAddress.value) {
    alert('Please fill in all required fields');
    return;
      }
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
