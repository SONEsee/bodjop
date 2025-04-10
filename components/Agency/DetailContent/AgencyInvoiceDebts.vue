<script lang="ts" setup>
const invoiceStore = UseInvoiceStore();
const loading = ref(false);
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
          <v-tooltip text="ພິມເອກະສານແບບ PDF" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                variant="text"
                icon="mdi-file-pdf-box"
                size="small"
                v-bind="props"
                @click="
                  openPath(
                    `/prints/commission_pdf?id=${item.invoice_detail_id}`
                  )
                "
              />
            </template>
          </v-tooltip>

          <v-tooltip text="ພິມເອກະສານແບບຮູບ" location="top">
            <template v-slot:activator="{ props }">
              <v-btn
                color="info"
                variant="text"
                icon="mdi-image"
                size="small"
                v-bind="props"
                @click="
                  openPath(
                    `/prints/commission_pdf?id=${item.invoice_detail_id}&&print_type=image`
                  )
                "
              />
            </template>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-row>
  </section>
</template>
