<script lang="ts" setup>
const invoiceStore = UseInvoiceStore();
const route = useRoute();
const loading = ref(false);
const id = route?.query?.id?.toString() ?? null;
const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ຍອດວັນທີ", value: "sale_date" },
  { title: "ລົງຍອດ", value: "payment_amount" },
  { title: "ລົງວັນທີ", value: "created_at" },
  { title: "ຜູ້ລົງ", value: "username" },
]);

const request = invoiceStore.request_invoice_payment_transactions;
const response_data = computed(() => {
  return invoiceStore.response_invoice_payment_transactions;
});

async function onLoading() {
  try {
    loading.value = true;
    await invoiceStore.GetAgencyInvoicePaymentAmount(id);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function onSelectionChange(selection: number) {
  request.limit = selection;
  await onLoading();
}

async function onPageChange(page: number) {
  request.page = page;
  await onLoading();
}

// async function onDebounceSet(input: string | null) {
//   request.q = input;
//   await onLoading();
// }
</script>

<template>
  <section class="pa-4">
    <v-row>
      <v-data-table
        :headers="headers"
        :items="response_data?.list_data ?? []"
        density="comfortable"
        :items-per-page="request.limit"
        hide-default-footer
        :loading="loading"
      >
        <template v-slot:item.no="{ index }">
          {{ index + (request.page - 1) * request.limit + 1 }}
        </template>

        <template v-slot:item.sale_date="{ item }">
          {{ FormatDate(item.sale_date) }}
        </template>

        <template v-slot:item.payment_amount="{ item }">
          {{ formatnumberV2(item.payment_amount) }}
        </template>

        <template v-slot:item.username="{ item }">
          {{ item.username }} {{ item.fullname }}
        </template>

        <template v-slot:item.created_at="{ item }">
          {{ FormatDatetime(item.created_at) }}
        </template>

        <template v-slot:bottom>
          <GlobalTablePaginations
            :page="request.page"
            :limit="request.limit"
            :totalpage="response_data?.pagination?.total_page ?? 1"
            @onSelectionChange="onSelectionChange"
            @onPagechange="onPageChange"
          />
        </template>
      </v-data-table>
    </v-row>
  </section>
</template>
