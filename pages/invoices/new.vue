<script lang="ts" setup>
const saleStore = UseSaleStore();
const agencyStore = UseAgencyStore();

onMounted(() => {
  saleStore.GetSalePeriodListData();
  agencyStore.GetAgencySelections();
});
</script>

<template>
  <section class="pa-6">
    <v-card min-height="95vh" flat class="pa-6">
      <InvoicesNewContentMainContent />
    </v-card>
  </section>
</template>
