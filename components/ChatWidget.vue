<template>
    <div class="chat-widget" :class="{ 'is-open': isOpen }">
      <button class="chat-button" @click="toggleChat">
        💬 聊天
      </button>
      <div class="chat-content" v-if="isOpen">
        <div class="chat-messages">
          <div v-for="(message, index) in messages" :key="index" class="message">
            <strong>{{ message.sender }}:</strong> {{ message.text }}
          </div>
        </div>
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..."/>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isOpen = ref(false)
  const messages = ref([])
  const newMessage = ref('')
  
  function toggleChat() {
    isOpen.value = !isOpen.value
  }
  
  function sendMessage() {
    if (newMessage.value.trim() !== '') {
      messages.value.push({ sender: 'User', text: newMessage.value })
      newMessage.value = ''
      // 这里可以调用发送到后台的函数，使用 WebSocket 或 API
    }
  }
  </script>
  
  <style scoped>
  .chat-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    max-width: 300px;
    width: 100%;
  }
  .chat-button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
  .chat-content {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
  }
  .chat-messages {
    max-height: 200px;
    overflow-y: auto;
    margin-bottom: 10px;
  }
  .message {
    margin-bottom: 5px;
  }
  </style>
  