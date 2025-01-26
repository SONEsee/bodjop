<script lang="ts" setup>
const saleStore = UseSaleStore();
const globalStore = UseGlobalStore();
const route = useRoute();
const id = route.query?.id?.toString() ?? null;

onMounted(() => {
  saleStore.GetSaleDetail(id);
});
</script>
<template>
  <section class="pa-6">
    <v-card flat min-height="95vh" class="pa-6">
      <SalesDetailSaleComponentsMainContent />
    </v-card>
  </section>
  <GlobalOverlayLoading :loading="globalStore.loading_overlay" />
</template>
