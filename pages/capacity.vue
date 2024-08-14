<template>
    <div>
      <el-header>
        <h2>Set Time Slot Capacity</h2>
      </el-header>
  
      <el-container>
        <el-main>
          <el-form :model="form" @submit.prevent="submitCapacity">
            <el-form-item
              v-for="(item, index) in capacities"
              :key="index"
            >
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item
                    :label="'Date ' + (index + 1)"
                    :prop="'date' + index"
                  >
                    <el-date-picker
                      v-model="item.date"
                      type="date"
                      placeholder="Select Date"
                      :key="'date' + index"
                      style="width: 100%;"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="'Morning Slots ' + (index + 1)"
                    :prop="'morning' + index"
                  >
                    <el-input-number
                      v-model="item.morning"
                      :min="0"
                      style="width: 100%;"
                      placeholder="Morning Slots"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    :label="'Afternoon Slots ' + (index + 1)"
                    :prop="'afternoon' + index"
                  >
                    <el-input-number
                      v-model="item.afternoon"
                      :min="0"
                      style="width: 100%;"
                      placeholder="Afternoon Slots"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-divider />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitCapacity">Submit</el-button>
            </el-form-item>
          </el-form>
          <WeeklyCapacities />
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import WeeklyCapacities from '@/pages/weeklyCapacities.vue'
  import { ElForm, ElFormItem, ElInputNumber, ElDatePicker, ElButton, ElContainer, ElMain, ElRow, ElCol, ElDivider, ElHeader } from 'element-plus'
  
  const form = ref({})
  const capacities = ref([{ date: '', morning: 0, afternoon: 0 }])
  const config = useRuntimeConfig()
  
  async function submitCapacity() {
    try {
      const response = await axios.post(`${config.public.apiBase}/api/capacity`, capacities.value)
      console.log('Capacity updated successfully:', response.data)
    } catch (error) {
      console.error('Error updating capacity:', error)
    }
  }
  
  onMounted(() => {
    // fetchWeeklyCapacities()
  })
  </script>
  
  <style scoped>
  /* 样式可以根据需要自定义 */
  </style>
  