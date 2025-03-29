<script lang="ts" setup>
const agencyStore = UseAgencyStore();
const invoiceStore = UseInvoiceStore();
const route = useRoute();
const loading = ref(false);
const id = route?.query?.id?.toString() ?? null;
const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ງວດວັນທີ", value: "sale_date" },
  { title: "ລົງຍອດ", value: "innitial_amount" },
  { title: "ຍອດຍັງເຫຼືອ", value: "debt_amount" },
  { title: "ສະຖານະ", value: "status" },
  { title: "actions", value: "actions" },
]);

const response_data = computed(() => {
  return invoiceStore.response_invoice_debts;
});
</script>

<template>
  <section class="pa-4">
    <v-row>
      <v-col
        cosl="12"
        class="d-flex flex-wrap justify-space-between align-center"
      >
        <div class="d-flex flex-wrap">
          <h4>ລາຍການ ການຕັດໜີ້</h4>
        </div>

        <!-- <div style="width: 250px">
          <GlobalDebounceEventTextField
            :input="request.q"
            label="ຄົ້ນຫາ"
            @setinput="onDebounceSet"
          />
        </div> -->
      </v-col>

      <v-data-table
        :headers="headers"
        :items="response_data"
        density="comfortable"
        :loading="loading"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>

        <template v-slot:item.innitial_amount="{ item }">
          {{ formatnumber(item.innitial_amount) }}
        </template>

        <template v-slot:item.debt_amount="{ item }">
          {{ formatnumber(item.debt_amount) }}
        </template>

        <template v-slot:item.sale_date="{ item }">
          {{ FormatDate(item.sale_date) }}
        </template>

        <template v-slot:item.status="{ item }">
          <GlobalAgencyDebtStatus :status="item.status" />
        </template>

        <template v-slot:item.actions="{ item }">
          <div>
            <v-btn
              color="primary"
              variant="text"
              icon="mdi-file-pdf-box"
              size="small"
              @click="
                openPath(`/prints/commission_pdf?id=${item.invoice_detail_id}`)
              "
            ></v-btn>
          </div>
        </template>
      </v-data-table>
    </v-row>
  </section>
</template>
