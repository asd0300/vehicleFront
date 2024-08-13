<template>
    <div>
      <h1>My Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Vehicle Brand</th>
            <th>Vehicle Model</th>
            <th>Service Type</th>
            <th>Appointment Date</th>
            <th>Pickup Address</th>
            <th>Dropoff Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id">
            <td>{{ appointment.id }}</td>
            <td>{{ appointment.vehicle_brand }}</td>
            <td>{{ appointment.vehicle_model }}</td>
            <td>{{ appointment.service_type }}</td>
            <td>{{ new Date(appointment.appointment_date).toLocaleDateString() }}</td>
            <td>{{ appointment.pickup_address }}</td>
            <td>{{ appointment.dropoff_address }}</td>
            <td>{{ appointment.status }}</td>
            <td>
              <button @click="editAppointment(appointment)">Edit</button>
              <button @click="deleteAppointment(appointment.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modify Appointment Form -->
      <div v-if="showEditForm">
        <h2>Edit Appointment</h2>
        <form @submit.prevent="updateAppointment">
          <div>
            <label for="user_id">User ID:</label>
            <input v-model="selectedAppointment.user_id" type="text" id="user_id" required />
          </div>
          <div>
            <label for="vehicle_brand">Vehicle Brand:</label>
            <input v-model="selectedAppointment.vehicle_brand" type="text" id="vehicle_brand" required />
          </div>
          <div>
            <label for="vehicle_model">Vehicle Model:</label>
            <input v-model="selectedAppointment.vehicle_model" type="text" id="vehicle_model" required />
          </div>
          <div>
            <label for="service_type">Service Type:</label>
            <input v-model="selectedAppointment.service_type" type="text" id="service_type" required />
          </div>
          <div>
            <label for="appointment_date">Appointment Date:</label>
            <input v-model="selectedAppointment.appointment_date" type="date" id="appointment_date" required />
          </div>
          <div>
            <label for="pickup_address">Pickup Address:</label>
            <input v-model="selectedAppointment.pickup_address" type="text" id="pickup_address" required />
          </div>
          <div>
            <label for="dropoff_address">Dropoff Address:</label>
            <input v-model="selectedAppointment.dropoff_address" type="text" id="dropoff_address" required />
          </div>
          <!-- <div>
            <label for="status">Status:</label>
            <input v-model="selectedAppointment.status" type="text" id="status" required />
          </div> -->
          <button type="submit">Update Appointment</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  const config = useRuntimeConfig()
  
  export default {
    data() {
      return {
        appointments: [],
        showEditForm: false,
        selectedAppointment: {}
      };
    },
    async created() {
      await this.fetchAppointments();
    },
    methods: {
      async fetchAppointments() {
        try {
          const userId = localStorage.getItem('user_id');
          const response = await axios.get(`${config.public.apiBase}/api/book/appointments`, {
          headers: {
              'Authorization': `Bearer ${userId}`
            }
          });
          this.appointments = response.data;
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      },
      async deleteAppointment(id) {
        try {
          await axios.delete(`${config.public.apiBase}/api/book/appointments/${id}`);
          this.appointments = this.appointments.filter(appt => appt.id !== id);
          alert('Appointment deleted successfully!');
        } catch (error) {
          console.error('Error deleting appointment:', error);
          alert('Failed to delete appointment.');
        }
      },
      editAppointment(appointment) {
        this.selectedAppointment = { ...appointment };
        this.showEditForm = true;
      },
      async updateAppointment() {
        try {
          await axios.put(`${config.public.apiBase}/api/book/appointments/${this.selectedAppointment.id}`, this.selectedAppointment);
          this.showEditForm = false;
          await this.fetchAppointments();
          alert('Appointment updated successfully!');
        } catch (error) {
          console.error('Error updating appointment:', error);
          alert('Failed to update appointment.');
        }
      }
    }
  };
  </script>
  