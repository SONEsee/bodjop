<script lang="ts" setup>
const saleStore = UseSaleStore();
const reportStore = UseReportStore();

const sale_periods = computed(() => {
  return saleStore.sale_periods;
});

const request = reportStore.request_payment_transaction;

const response_data = computed(() => {
  return reportStore.response_payment_transactions;
});

const headers = ref([
  {
    title: "ລຳດັບ",
    value: "no",
  },
  {
    title: "ງວດວັນທີ",
    value: "sale_date",
  },
  {
    title: "ຕົວແທນ",
    value: "agency_code",
  },
  {
    title: "Fullname",
    value: "fullname",
  },
  {
    title: "ປະເພດລາຍຮັບ",
    value: "payment_type",
  },
  {
    title: "ໂອນເງິນວັນທີ",
    value: "payment_date",
  },
  {
    title: "ຈຳນວນເງີນ",
    value: "payment_amount",
  },
  {
    title: "actions",
    value: "actions",
  },
]);

onMounted(() => {
  saleStore.GetSalePeriodListData();
  reportStore.GetReportPaymentTransaction();
});
</script>

<template>
  <section class="pa-6">
    <v-card min-height="95vh" flat class="pa-6">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine :title="'ລາຍງານການລົງຍອດ'" />
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="3">
              <label> ງວດວັນທີ </label>
              <v-select
                :items="sale_periods"
                variant="outlined"
                hide-details
                density="comfortable"
                item-title="sale_date"
                v-model="request.sale_date"
                clearable
                item-value="sale_date"
                :item-props="
                  (item) => {
                    return {
                      title: 'ງວດວັນທີ',
                      subtitle: FormatDate(item.sale_date),
                    };
                  }
                "
              >
                <template v-slot:selection="{ item }">
                  {{ FormatDate(item.value) }}
                </template>
              </v-select>
            </v-col>

            <v-col cols="2">
              <div class="pt-7">
                <v-btn
                  color="primary"
                  flat
                  prepend-icon="mdi-magnify"
                  :loading="request.loading"
                  @click="reportStore.GetReportPaymentTransaction"
                  >ຄົ້ນຫາ</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-data-table
            :items="response_data"
            :headers="headers"
            :loading="request.loading"
            :items-per-page="-1"
          >
            <template v-slot:item.no="{ index }">
              {{ index + 1 }}
            </template>

            <template v-slot:item.sale_date="{ item }">
              {{ FormatDate(item.sale_date) }}
            </template>

            <template v-slot:item.payment_date="{ item }">
              {{ FormatDate(item.payment_date) }}
            </template>

            <template v-slot:item.payment_type="{ item }">
              {{ item.payment_type === 1 ? "Receive" : "Paid" }}
            </template>

            <template v-slot:item.payment_amount="{ item }">
              {{ formatnumber(item.payment_amount) }}
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
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
