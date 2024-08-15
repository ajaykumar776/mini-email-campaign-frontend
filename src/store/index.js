import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      user: null,
      campaigns: [],
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setCampaigns(state, campaigns) {
      state.campaigns = campaigns;
    },
  },
  actions: {
    async fetchCampaigns({ commit }) {
      try {
        const response = await axios.get('/api/campaigns');
        const data = await response.data;
        commit('setCampaigns', data);
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
      }
    },
  },
});

export default store;
