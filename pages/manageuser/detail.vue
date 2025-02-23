<script setup lang="ts">
const globalStore = UseGlobalStore();
const userStore = UserManageStore();
const route = useRoute();
const id = route.query.id;
onMounted(() => {
  globalStore.GetProvinceData();
  userStore.Getdetail(id?.toString() ?? null);
});
</script>
<template>
    <DetailManageUser/>
    <GlobalOverlayLoading :loading="globalStore.loading_overlay" />
</template>