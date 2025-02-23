<script setup lang="ts">
const deviceStore = UseDeviceStore();

onMounted(() => {
  deviceStore.GetDeviceSelections(2, null);
});
</script>

<template>
  <section class="pa-6">
    <v-card flat min-height="95vh" class="pa-6">
      <DeviceMovementsReturnComponentMainContent />
    </v-card>
  </section>
</template>
