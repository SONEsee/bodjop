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
  <section class="pa-6">
    <EditManage />
    <GlobalOverlayLoading :loading="globalStore.loading_overlay" />
  </section>
</template>
