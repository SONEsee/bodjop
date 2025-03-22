<script setup lang="ts">
const globalStore = UseGlobalStore();

onMounted(() => {
  globalStore.GetProvinceData();
});
</script>
<template>
  <section class="pa-4">
    <CreateMangeUser />
  </section>
</template>
