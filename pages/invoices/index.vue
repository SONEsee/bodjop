<script lang="ts" setup>
const invoiceStore = UseInvoiceStore();
const title = ref("ຂໍ້ມູນໃບຮຽກເກັບເງິນ");

const request = invoiceStore.request_get_data;

const response_data = computed(() => {
  return invoiceStore.response_get_data;
});

const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ສ້າງວັນ", value: "created_at" },
  { title: "ງວດວັນທີ", value: "sale_date" },
  { title: "ເລກທີຫຼັກ", value: "main_invoice_code" },
  { title: "ຄົນສ້າງ", value: "user.fullname" },
  { title: "ສະຖານະ", value: "status" },
  { title: "actions", value: "actions" },
]);

const onSelectionChange = async function (selection: number) {
  request.limit = selection;
  await invoiceStore.GetInvoiceData();
};

const onPageChange = async function (page: number) {
  request.page = page;
  await invoiceStore.GetInvoiceData();
};

const onDebounceSet = async (value: string | null) => {
  request.q = value;
  await invoiceStore.GetInvoiceData();
};

const onDatePickerSelect = async (date: Date | null) => {
  request.sale_date = date;
  await invoiceStore.GetInvoiceData();
};

onMounted(() => {
  invoiceStore.GetInvoiceData();
});
</script>
<template>
  <section class="pa-6">
    <v-card min-height="95vh" flat class="pa-6">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine :title="title" />
        </v-col>

        <v-col
          cols="12"
          class="d-flex flex-wrap justify-space-between align-center"
        >
          <div class="d-flex">
            <div style="width: 250px">
              <GlobalDebounceEventTextField
                :label="'ຄົ້ນຫາ'"
                :input="request.q"
                @setinput="onDebounceSet"
              />
            </div>

            <div class="ml-5">
              <label>ງວດວັນທີ</label>
              <DatePicker
                :date="request.sale_date"
                @on-set-date="onDatePickerSelect"
              />
            </div>
          </div>

          <div>
            <v-btn
              color="primary"
              width="165px"
              flat
              @click="goPath(`/invoices/new`)"
              >+ ສ້າງໃບຮຽກເກັບເງິນ</v-btn
            >
          </div>
        </v-col>

        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="response_data?.list_data ?? []"
            :items-per-page="request.limit"
            :loading="request.loading"
            hide-default-footer
          >
            <template v-slot:item.no="{ index }">
              {{ index + (request.page - 1) * request.limit + 1 }}
            </template>

            <template v-slot:item.sale_date="{ item }">
              {{ FormatDate(item.sale_date) }}
            </template>

            <template v-slot:item.status="{ item }">
              <GlobalDefaultStatusChip :status="item.status" />
            </template>

            <template v-slot:item.created_at="{ item }">
              {{ FormatDatetime(item.created_at) }}
            </template>

            <template v-slot:item.actions="{ item }">
              <div class="d-flex flex-wrap">
                <div>
                  <v-btn
                    color="primary"
                    icon="mdi-eye"
                    size="small"
                    variant="text"
                    @click="goPath(`/invoices/detail?id=${item.id}`)"
                  ></v-btn>
                </div>

                <div>
                  <v-btn
                    color="error"
                    icon="mdi-delete"
                    size="small"
                    variant="text"
                  ></v-btn>
                </div>
              </div>
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
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
