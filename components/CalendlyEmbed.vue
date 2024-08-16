<template>
  <el-date-picker
    v-model="selectedDate"
    type="date"
    :picker-options="pickerOptions"
    @change="handleDateSelect"
    placeholder="Select a date"
    :disabled-date="disabledDate"
  >
    <template #default="{ date, data }">
      <div
        :class="{
          'available-date': isAvailable(date),
          'unavailable-date': !isAvailable(date)
        }"
      >
        <span>{{ date.getDate() }}</span>
        <!-- 仅在日期可选时显示标记颜色 -->
        <span v-if="isAvailable(date)" class="dot available"></span>
      </div>
    </template>
  </el-date-picker>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

const selectedDate = ref(null);
const state = reactive({
  calendarData: [],
});
const config = useRuntimeConfig();
const emit = defineEmits(['date-selected', 'no-available-data']);

const fetchCalendarData = async () => {
  try {
    const response = await axios.get(`${config.public.apiBase}/api/calendar`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    state.calendarData = response.data;
  } catch (error) {
    console.error('Failed to fetch calendar data:', error);
    emit('no-available-data', true);
  }
};

const isAvailable = (date) => {
  const day = date.toISOString().split('T')[0];
  const dayData = state.calendarData.find((item) => item.day === day);
  return dayData && dayData.resdue_appointment > dayData.reserved;
};

const disabledDate = (time) => {
  return time.getTime() < Date.now() || !isAvailable(time);
}

const pickerOptions = ref({
  disabledDate: (date) => {
    return !isAvailable(date); // 禁用非可用的日期
  },
});

const handleDateSelect = (date) => {
  const selectedDay = date.toISOString().split('T')[0];
  const selectedDayData = state.calendarData.find((item) => item.day === selectedDay);
  if (selectedDayData && selectedDayData.resdue_appointment > selectedDayData.reserved) {
    emit('date-selected', selectedDay);
  }
};

onMounted(() => {
  fetchCalendarData();
});
</script>

<style scoped>
.available-date {
  position: relative;
  background-color: #e0f7fa;
  border-radius: 50%;
}

.unavailable-date {
  position: relative;
  background-color: transparent; /* 不可选日期背景设置为透明 */
}

.dot {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.available {
  background-color: #4caf50;
}
</style>
