import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const fetchCampaigns = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/campaigns`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data.campaigns;
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    throw error;
  }
};

export const processCampaign = async (campaignId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/campaigns/${campaignId}/process`, null, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to process campaign:', error);
    throw error;
  }
};

export const deleteCampaign = async (campaignId) => {
  try {
    await axios.delete(`${API_BASE_URL}/campaigns/${campaignId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
  } catch (error) {
    console.error('Failed to delete campaign:', error);
    throw error;
  }
};

export const createCampaign = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/campaigns`, formData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating campaign:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getCampaignStatus = async (campaignId) => {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${API_BASE_URL}/campaigns/${campaignId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.status;
  };

export const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  export async function registerUser(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
