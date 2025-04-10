<script lang="ts" setup>
const invoiceStore = UseInvoiceStore();
const globalStore = UseGlobalStore();
const route = useRoute();
const loading = ref(false);
const id = route?.query?.id?.toString() ?? null;
const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ຍອດວັນທີ", value: "sale_date" },
  { title: "ລົງຍອດ", value: "payment_amount" },
  { title: "ລົງວັນທີ", value: "created_at" },
  { title: "ຜູ້ລົງ", value: "username" },
  { title: "Actions", value: "actions" },
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

async function onImageLoad(imageLink: string) {
  try {
    globalStore.request_dialog_image.loading = true;
    const imageUrl = await globalStore.GetFileData(imageLink);
    globalStore.response_dialog_image.file = imageUrl;
    globalStore.request_dialog_image.loading = false;
    globalStore.request_dialog_image.dialog = true;
  } catch (error) {
    console.error(error);
  } finally {
    globalStore.request_dialog_image.loading = false;
  }
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

        <template v-slot:item.actions="{ item }">
          <v-tooltip text="ເບິ່ງຮູບພາບ" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                class="ma-1"
                v-bind="props"
                icon="mdi-image-search"
                variant="flat"
                color="primary"
                size="small"
                :disabled="item.image_url == 'N/A' || item.image_url === ''"
                @click="onImageLoad(item.image_url)"
              ></v-btn>
            </template>
          </v-tooltip>
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

      <GlobalDialogImage />
    </v-row>
  </section>
</template>
