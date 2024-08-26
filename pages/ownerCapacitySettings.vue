<template>
    <el-container>
      <el-header>
        <h1>Set Appointment Limits</h1>
      </el-header>
  
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-calendar :range="dateRange" @select="handleDateSelect">
              <template #date-cell="{ data }">
                <div>
                  <span>{{ data.day }}</span>
                  <div>
                    <p>Set limit appointment</p>
                    <el-input
                      v-model.number="getLimit(data.day).limit_appointment"
                      placeholder="Set limit appointment"
                      size="mini"
                      type="number"
                    ></el-input>
                  </div>
                  <div style="margin-top: 0.5em;">
                    <p>Set resdue appointment</p>
                    <el-input
                      v-model.number="getLimit(data.day).resdue_appointment"
                      placeholder="Set resdue appointment"
                      size="mini"
                      type="number"
                    ></el-input>
                  </div>
                </div>
              </template>
            </el-calendar>
            <el-button type="primary" @click="saveSettings" style="margin-top: 1em;">Save Settings</el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  import { useRuntimeConfig } from '#imports'
  import axios from 'axios'
  
  const today = new Date()
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)
  
  const dateRange = ref([today, nextWeek])
  const limits = reactive([])
  const config = useRuntimeConfig()
  
  const getLimit = (day) => {
    let limit = limits.find(limit => limit.day === day)
    if (!limit) {
      limit = {
        day,
        limit_appointment: 500,  // 默认值
        resdue_appointment: 0
      }
      limits.push(limit)
    }
    return limit
  }
  
  const handleDateSelect = (date) => {
    const dateString = date.toISOString().split('T')[0]
    getLimit(dateString)
  }
  
  const saveSettings = async () => {
    try {
       const payload = limits.map(limit => ({
        ...limit,
        resdue_appointment: parseInt(limit.resdue_appointment, 10)
        }))
      await axios.post(`${config.public.apiBase}/api/calendar/limits`, limits, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      alert('Settings saved successfully!')
    } catch (error) {
      console.error('Failed to save settings:', error)
      alert('Failed to save settings.')
    }
  }

  //獲取現有設定
  const fetchCurrentSettings = async () => {
    try {
      const response = await axios.get(`${config.public.apiBase}/api/calendar/limits`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      limits.splice(0, limits.length)
      response.data.forEach(limit => {
        limits.push(limit)
      })
    } catch (error) {
      console.error('Failed to fetch current settings:', error)
      alert('Failed to load current settings.')
    }
  }
  onMounted(() => {
    fetchCurrentSettings()
  })
  </script>
  
  <style scoped>
  h1 {
    color: #333;
    margin-bottom: 1em;
  }
  
  .el-input {
    width: 100%;
  }
  
  .el-button {
    margin-top: 1em;
  }

  /* Custom styles for el-calendar */
    ::v-deep .el-calendar-table__row {
    height: 200px; /* Adjust the height as needed */
    }

  </style>
  