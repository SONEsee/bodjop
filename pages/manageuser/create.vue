<script setup lang="ts">
const globalStore = UseGlobalStore();

onMounted(() => {
  globalStore.GetProvinceData();
});
</script>
<template>
    <CreateMangeUser/>
</template>