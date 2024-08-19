import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {

  const axiosInstance = axios.create({
    baseURL: useRuntimeConfig().public.apiBase, // 使用运行时配置
  });


  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('jwt');
        nuxtApp.$router.push('/login');
        alert('Your session has expired. Please log in again.');
      }
      return Promise.reject(error);
    }
  );

  // 将 Axios 实例添加到 Nuxt 应用实例中
  nuxtApp.provide('axios', axiosInstance);
});
