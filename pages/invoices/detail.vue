<script lang="ts" setup>
const invoiceStore = UseInvoiceStore();
const title = ref("ຂໍ້ມູນໃບຮຽກເກັບເງິນ");
const globalStore = UseGlobalStore();
const route = useRoute();
const id = route.query?.id?.toString() ?? null;

onMounted(() => {
  invoiceStore.GetInvoiceDetailData(id);
});
</script>

<template>
  <section class="pa-6">
    <v-card class="pa-6" min-height="95vh" flat>
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine :title="title" />
        </v-col>
      </v-row>
    </v-card>

    <globalOverlayLoading :loading="globalStore.loading_overlay" />
  </section>
</template>
