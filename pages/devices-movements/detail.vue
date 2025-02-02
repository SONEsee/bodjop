<script setup lang="ts">
const deviceMovementStore = UseDeviceMovementStore();
const route = useRoute();
const id = route.query?.id?.toString() ?? null;
const globalStore = UseGlobalStore();

onMounted(() => {
  deviceMovementStore.GetDetailData(id);
});
</script>

<template>
  <section class="pa-6">
    <v-card class="pa-6" flat min-height="95vh">
      <DeviceMovementsDetailComponentMainContent
        v-if="deviceMovementStore.response_detail_data != null"
      />
    </v-card>

    <GlobalOverlayLoading :loading="globalStore.loading_overlay" />
  </section>
</template>
