<template>
    <el-container>
      <el-header>
        <h2>Weekly Time Slot Capacities</h2>
      </el-header>
  
      <el-main>
        <el-card>
          <el-table :data="weeklyCapacities" style="width: 100%">
            <el-table-column prop="date" label="Date" />
            <el-table-column prop="morning" label="Morning Slots" />
            <el-table-column prop="afternoon" label="Afternoon Slots" />
          </el-table>
          <div v-if="!weeklyCapacities.length" style="text-align: center; margin-top: 20px;">
            <el-alert title="No capacities available for this week." type="info" show-icon />
          </div>
        </el-card>
      </el-main>
    </el-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { ElContainer, ElHeader, ElMain, ElCard, ElTable, ElTableColumn, ElAlert } from 'element-plus'
  
  const weeklyCapacities = ref([])
  const config = useRuntimeConfig()
  
  // Fetch the weekly capacities when the component is mounted
  onMounted(fetchWeeklyCapacities)
  
  async function fetchWeeklyCapacities() {
    try {
      const response = await axios.get(`${config.public.apiBase}/api/capacity`)
      weeklyCapacities.value = response.data
    } catch (error) {
      console.error('Error fetching capacities:', error)
    }
  }
  </script>
  
  <style scoped>
  /* Optional: Add any additional styling */
  </style>
  