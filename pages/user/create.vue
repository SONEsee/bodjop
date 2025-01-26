<script lang="ts" setup>
const globalStore = UseGlobalStore();

onMounted(() => {
  globalStore.GetProvinceData();
});
</script>
<template>
  <section>
    <CreatUser />
  </section>
</template>
