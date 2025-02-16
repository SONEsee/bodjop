<script setup lang="ts">
const globalStore = UseGlobalStore();
const userStore = UseUserStore();
const route = useRoute();
const id = route.query.id;
onMounted(() => {
  globalStore.GetProvinceData();
  userStore.GetDetailData(id?.toString() ?? null);
});
</script>
<template>
<Detail/>
</template>