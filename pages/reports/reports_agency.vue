<script setup lang="ts">
const salesDate = UseSaleStore();

onMounted(() => {
  salesDate.GetSalePeriodListData();
});
</script>
<template>
  <section class="pa-4">
    <ReportAgency />
  </section>
</template>
