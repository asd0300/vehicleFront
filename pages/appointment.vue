<template>
    <div>
      <h2>Book an Appointment</h2>
      <form @submit.prevent="bookAppointment">
        <div>
          <label for="brand">Vehicle Brand:</label>
          <select v-model="selectedBrand" @change="updateModels" id="brand">
            <option disabled value="">Please select a brand</option>
            <option v-for="(models, brand) in vehicleData" :key="brand" :value="brand">{{ brand }}</option>
          </select>
        </div>
        <div>
          <label for="model">Vehicle Model:</label>
          <select v-model="vehicleDetails" id="model" :disabled="!selectedBrand">
            <option disabled value="">Please select a model</option>
            <option v-for="model in vehicleModels" :key="model">{{ model }}</option>
          </select>
        </div>
        <div>
          <label for="service">Service Type:</label>
          <select v-model="serviceType" id="service">
            <option value="maintenance">Maintenance</option>
            <option value="repair">Repair</option>
          </select>
        </div>
        <div>
          <label for="date">Appointment Date:</label>
          <input v-model="appointmentDate" type="date" id="date" required>
        </div>
        <div>
          <label for="pickup">Pickup Address:</label>
          <input v-model="pickupAddress" type="text" id="pickup" required>
        </div>
        <div>
          <label for="dropoff">Dropoff Address:</label>
          <input v-model="dropoffAddress" type="text" id="dropoff" required>
        </div>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  
  // Vehicle brand and model data
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
  const config = useRuntimeConfig()
  const updateModels = () => {
    vehicleModels.value = vehicleData[selectedBrand.value] || []
  }
  const userId = localStorage.getItem('user_id');
  const bookAppointment = async () => {
    try {
      const response = await axios.post(`${config.public.apiBase}/api/book/appointments`, {
        
        vehicle_brand: selectedBrand.value,
        vehicle_model: vehicleDetails.value,
        service_type: serviceType.value,
        appointment_date: appointmentDate.value,
        pickup_address: pickupAddress.value,
        dropoff_address: dropoffAddress.value,
      },
      {
    headers: {
      'Authorization': `Bearer ${userId}` // 添加 Authorization 標頭
    }
  })
  
      alert('Appointment booked successfully')
    } catch (error) {
      console.error('Failed to book appointment', error)
      alert('Failed to book appointment')
    }
  }
  </script>
  