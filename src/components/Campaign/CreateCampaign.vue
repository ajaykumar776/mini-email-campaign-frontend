<template>
  <MainLayout>
    <div class="container mt-5">
      <h2>Create New Campaign</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="name" class="form-label">Campaign Name</label>
          <input
            v-model="name"
            type="text"
            id="name"
            class="form-control"
            placeholder="Campaign Name"
            required
          />
          <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
        </div>
        <div class="mb-3">
          <label for="csvFile" class="form-label">CSV File</label>
          <input
            type="file"
            id="csvFile"
            class="form-control"
            @change="handleFileUpload"
            accept=".csv"
          />
          <div v-if="errors.csvFile" class="text-danger">{{ errors.csvFile }}</div>
        </div>
        <button type="submit" class="btn btn-primary">Create Campaign</button>
      </form>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '../../layout/MainLayout.vue'; // Import the MainLayout component
import { createCampaign } from '../../services/api/action'; // Import the createCampaign function

export default {
  components: { MainLayout },
  data() {
    return {
      name: '',
      csvFile: null,
      errors: {}, // Object to store validation errors
    };
  },
  methods: {
    handleFileUpload(event) {
      this.csvFile = event.target.files[0];
    },
    validateForm() {
      const errors = {};
      if (!this.name.trim()) {
        errors.name = 'Campaign name is required.';
      }
      if (!this.csvFile) {
        errors.csvFile = 'CSV file is required.';
      } else if (this.csvFile.type !== 'text/csv') {
        errors.csvFile = 'Invalid file type. Only CSV files are allowed.';
      }
      this.errors = errors;
      return Object.keys(errors).length === 0;
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return;
      }
      
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('csv_file', this.csvFile);

      try {
        const response = await createCampaign(formData);
        console.log('Campaign created:', response);
        this.$router.push('/campaigns');
      } catch (error) {
        console.error('Error creating campaign:', error.response ? error.response.data : error.message);
      }
    },
  },
};
</script>

<style scoped>
.text-danger {
  color: #dc3545;
}
</style>
