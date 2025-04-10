<script lang="ts" setup>
import { onExportExcelInvoiceReport } from "@/helpers/xlsx";
const saleStore = UseSaleStore();
const reportStore = UseReportStore();

const request = reportStore.request_invoice_report;

const sale_periods = computed(() => {
  return saleStore.sale_periods;
});

const response_data = computed(() => {
  return reportStore.response_invoice_report;
});

const headers = ref([
  {
    title: "Actions",
    value: "actions",
    minWidth: "150",
  },

  {
    title: "Sales Date",
    value: "sale_date",
    minWidth: "150",
  },

  {
    title: "Agent Code",
    value: "agency_code",
    minWidth: "150",
  },

  {
    title: "Full Name",
    value: "agency_name",
    minWidth: "230",
  },

  {
    title: "Sales",
    value: "sales",
  },

  {
    title: "basic percent",
    value: "basic_com_percent",
    minWidth: "120",
  },

  {
    title: "basic_com",
    value: "basic_com",
  },

  {
    title: "Ontime com percent",
    value: "ontime_percent",
    minWidth: "200",
  },

  {
    title: "ontime_com",
    value: "ontime_com",
  },

  {
    title: "normal_prize",
    value: "normal_prize",
  },

  {
    title: "bill_prize",
    value: "bill_prize",
  },

  {
    title: "borrow_amount",
    value: "borrow_amount",
  },

  {
    title: "prize_com",
    value: "prize_com",
  },

  {
    title: "refill_card",
    value: "refill_card",
  },

  {
    title: "other_expenses",
    value: "other_expense",
  },

  {
    title: "Settlement Amount",
    value: "settle_amount",
    minWidth: "200",
  },

  {
    title: "Check Amount",
    value: "check_amount",
    minWidth: "200",
  },
]);

async function onExportExcel() {
  request.loading = true;
  await reportStore.GetInvoiceReport();
  await onExportExcelInvoiceReport(response_data.value);
  request.loading = false;
}

onMounted(() => {
  saleStore.GetSalePeriodListData();
});
</script>

<template>
  <section class="pa-6">
    <v-card min-height="95vh" flat class="pa-6">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine
            :title="`ລາຍງານໃບເກັບເງິນ (${response_data.length})`"
          />
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="3">
              <label> ງວດວັນທີ </label>
              <v-select
                :items="sale_periods"
                variant="outlined"
                :loading="request.loading"
                hide-details
                density="comfortable"
                item-title="sale_date"
                clearable
                item-value="sale_date"
                v-model="request.sale_date"
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

            <v-col cols="3">
              <div class="pt-7">
                <v-btn
                  color="primary"
                  flat
                  prepend-icon="mdi-magnify"
                  :loading="request.loading"
                  @click="reportStore.GetInvoiceReport"
                  :disabled="request.sale_date === null"
                  >ຄົ້ນຫາ</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="d-flex flex-wrap justify-end py-0 my-0">
          <div>
            <v-btn
              color="info"
              flat
              prepend-icon="mdi-export"
              :disabled="
                response_data.length === 0 || request.sale_date === null
              "
              :loading="request.loading"
              @click="onExportExcel()"
              >Export excel</v-btn
            >
          </div>
        </v-col>

        <v-col cols="12" class="d-flex flex-nowrap">
          <v-data-table
            :headers="headers"
            :items="response_data"
            :items-per-page="100"
          >
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
                      openPath(`/prints/commission_pdf?id=${item.invoice_id}`)
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
                        `/prints/commission_pdf?id=${item.invoice_id}&&print_type=image`
                      )
                    "
                  />
                </template>
              </v-tooltip>
            </template>
            <template v-slot:item.sale_date="{ item }">
              {{ FormatDate(item.sale_date) }}
            </template>

            <template v-slot:item.sales="{ item }">
              {{ formatnumber(item.sales) }}
            </template>

            <template v-slot:item.basic_com="{ item }">
              {{ formatnumber(item.basic_com) }}
            </template>

            <template v-slot:item.ontime_com="{ item }">
              {{ formatnumber(item.ontime_com) }}
            </template>

            <template v-slot:item.ontime_percent="{ item }">
              {{ item.ontime_percent }} %
            </template>

            <template v-slot:item.basic_com_percent="{ item }">
              {{ item.basic_com_percent }} %
            </template>

            <template v-slot:item.normal_prize="{ item }">
              {{ formatnumber(item.normal_prize) }}
            </template>

            <template v-slot:item.bill_prize="{ item }">
              {{ formatnumber(item.bill_prize) }}
            </template>

            <template v-slot:item.borrow_amount="{ item }">
              {{ formatnumber(item.borrow_amount) }}
            </template>

            <template v-slot:item.prize_com="{ item }">
              {{ formatnumber(item.prize_com) }}
            </template>

            <template v-slot:item.refill_card="{ item }">
              {{ formatnumber(item.refill_card) }}
            </template>

            <template v-slot:item.other_expense="{ item }">
              {{ formatnumber(item.other_expense) }}
            </template>

            <template v-slot:item.settle_amount="{ item }">
              {{ formatnumber(item.settle_amount) }}
            </template>

            <template v-slot:item.check_amount="{ item }">
              {{ formatnumber(item.check_amount) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
