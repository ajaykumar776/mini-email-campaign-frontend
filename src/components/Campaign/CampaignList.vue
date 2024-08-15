<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between mb-4">
      <h3>Campaign List</h3>
      <router-link to="/create-campaign" class="btn btn-primary">
        Create Campaign
      </router-link>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="campaign in campaigns" :key="campaign.id">
          <td>{{ campaign.id }}</td>
          <td>{{ campaign.name }}</td>
          <td>
            <span :class="statusClass(campaign.status)">
              <span v-if="campaign.status === 'in_progress'" class="spinner"></span>
              {{ campaign.status }}
            </span>
          </td>
          <td>
            <button 
              class="btn btn-success btn-sm" 
              @click="processCampaignHandler(campaign.id)"
              v-if="campaign.status === 'pending' || campaign.status === 'failed'"
              :disabled="isProcessing(campaign.id)"
            >
              Process
            </button>
            <button 
              class="btn btn-danger btn-sm" 
              @click="deleteCampaignHandler(campaign.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Loader -->
    <div v-if="loading" class="text-center mt-3">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import { fetchCampaigns, deleteCampaign, processCampaign, getCampaignStatus } from '../../services/api/action';

export default {
  data() {
    return {
      campaigns: [],
      loading: false,
      processingCampaigns: new Set(), // To keep track of currently processing campaigns
    };
  },
  async created() {
    await this.loadCampaigns();
    await this.checkProcessingCampaigns();
  },
  methods: {
    statusClass(status) {
      switch (status) {
        case 'in_progress':
          return 'text-warning';
        case 'processed':
          return 'text-success';
        case 'pending':
          return 'text-info';
        case 'processing':
          return 'text-muted'; // or any other class for processing
        default:
          return 'text-muted';
      }
    },
    isProcessing(campaignId) {
      return this.processingCampaigns.has(campaignId);
    },
    async deleteCampaignHandler(campaignId) {
      const confirmed = confirm('Are you sure you want to delete this campaign?');

      if (!confirmed) {
        return;
      }

      try {
        await deleteCampaign(campaignId);
        this.campaigns = this.campaigns.filter(campaign => campaign.id !== campaignId);
      } catch (error) {
        alert('Failed to delete campaign.');
      }
    },

    async processCampaignHandler(campaignId) {
      this.processingCampaigns.add(campaignId);
      this.loading = true;

      try {
        await processCampaign(campaignId);
        await this.pollCampaignStatus(campaignId);
      } catch (error) {
        alert('Failed to start processing campaign.');
      } finally {
        this.processingCampaigns.delete(campaignId);
        this.loading = false;
        await this.loadCampaigns(); // Refresh campaigns after processing
      }
    },

    async pollCampaignStatus(campaignId) {
      let status = 'in_progress'; // Initialize with a default non-final status

      while (status === 'in_progress') {
        try {
          const response = await getCampaignStatus(campaignId);
          status = response.status;

          // Refresh campaign status in the local list
          const campaign = this.campaigns.find(c => c.id === campaignId);
          if (campaign) {
            campaign.status = status;
          }

          if (status !== 'in_progress') {
            break; // Exit loop if status is no longer 'in_progress'
          }

          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before polling again
        } catch (error) {
          console.error('Error polling campaign status:', error);
          break; // Exit loop on error
        }
      }
    },

    async loadCampaigns() {
      try {
        this.campaigns = await fetchCampaigns();
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
      }
    },

    async checkProcessingCampaigns() {
      // Find campaigns with 'in_progress' status and poll their status
      const inProgressCampaigns = this.campaigns.filter(campaign => campaign.status === 'in_progress');

      if (inProgressCampaigns.length > 0) {
        this.loading = true;

        const checks = inProgressCampaigns.map(campaign => this.pollCampaignStatus(campaign.id));
        await Promise.all(checks);

        this.loading = false;
        await this.loadCampaigns(); // Refresh campaigns after checking all in_progress statuses
      }
    }
  },
};
</script>

<style scoped>
.text-warning {
  color: #ffc107;
}

.text-success {
  color: #28a745;
}

.text-info {
  color: #17a2b8;
}

.text-muted {
  color: #6c757d;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 20px;
  height: 20px;
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  color: #fff;
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-success {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  color: #fff;
  background-color: #218838;
  border-color: #1e7e34;
}

.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  color: #fff;
  background-color: #c82333;
  border-color: #bd2130;
}

.text-center {
  text-align: center;
}
</style>
