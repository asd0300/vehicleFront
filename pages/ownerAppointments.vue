<template>
    <div>
      <h1>Client Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>User Name</th>
            <th>Vehicle Brand</th>
            <th>Vehicle Model</th>
            <th>Service Type</th>
            <th>Appointment Date</th>
            <th>Pickup Address</th>
            <th>Dropoff Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id">
            <td>{{ appointment.id }}</td>
            <td>{{ appointment.user_name }}</td>
            <td>{{ appointment.vehicle_brand }}</td>
            <td>{{ appointment.vehicle_model }}</td>
            <td>{{ appointment.service_type }}</td>
            <td>{{ new Date(appointment.appointment_date).toLocaleDateString() }}</td>
            <td>{{ appointment.pickup_address }}</td>
            <td>{{ appointment.dropoff_address }}</td>
            <td>{{ appointment.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  const config = useRuntimeConfig()
  export default {
    data() {
      return {
        appointments: []
      };
    },
    async created() {
      await this.fetchAppointments();
    },
    methods: {
      async fetchAppointments() {
        try {
          const token = localStorage.getItem('jwt')
          const response = await axios.get(`${config.public.apiBase}/api/book/appointments/client`,{
            headers: {
                    Authorization: `Bearer ${token}`, 
                },
          }); // Fetch appointments for clients
          this.appointments = response.data;
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      }
    }
  };
  </script>
  