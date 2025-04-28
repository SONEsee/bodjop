<script setup lang="ts">

import DetaiMaterialTransportDocumentl from '~/components/MaterialTransportDocument/DetaiMaterialTransportDocumentl.vue';

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
        <DetaiMaterialTransportDocumentl
      
        v-if="deviceMovementStore.response_detail_data != null"
      />
    </v-card>

    <GlobalOverlayLoading :loading="globalStore.loading_overlay" />
  </section>
</template>
