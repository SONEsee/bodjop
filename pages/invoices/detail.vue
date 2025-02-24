<script lang="ts" setup>
const invoiceStore = UseInvoiceStore();
const title = ref("ຂໍ້ມູນໃບຮຽກເກັບເງິນ");
const globalStore = UseGlobalStore();
const route = useRoute();
const id = route.query?.id?.toString() ?? null;

const invoice_response = computed(() => {
  return invoiceStore.repsonse_get_detail_invoice_data;
});

onMounted(() => {
  invoiceStore.GetInvoiceDetailData(id);
});
</script>

<template>
  <section class="pa-6">
    <v-card class="pa-6" min-height="95vh" flat>
      <v-row v-if="invoice_response !== null">
        <v-col cols="12">
          <GlobalTextTitleLine
            :title="`${title} (${formatnumber(
              invoice_response?.invoice_details.length
            )})`"
          />
        </v-col>

        <v-col cols="12">
          <InvoicesDetailContentInvoiceDetailTable />
        </v-col>
      </v-row>
    </v-card>

    <globalOverlayLoading :loading="globalStore.loading_overlay" />
  </section>
</template>
