<template>
    <MainLayout>
      <div>
        <h2>Campaigns</h2>
        <CampaignList />
      </div>
    </MainLayout>
  </template>
  
  <script>
   import MainLayout from '../layout/MainLayout.vue';
  import CampaignList from '../components/Campaign/CampaignList.vue';
  import CreateCampaign from '../components/Campaign/CreateCampaign.vue';
  
  export default {
    components: {
      MainLayout,
      CampaignList,
      CreateCampaign,
    },
  };
  </script>
  