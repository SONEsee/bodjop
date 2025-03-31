<script setup lang="ts">
const salesDate = UseSaleStore();

onMounted(() => {
  salesDate.GetSalePeriodListData();
});
</script>
<template>
  <div>
   

    <ReportAgency />
  </div>
</template>
