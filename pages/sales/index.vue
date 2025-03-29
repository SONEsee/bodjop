<script setup lang="ts">
const saleStore = UseSaleStore();
const globalStore = UseGlobalStore();
const title = ref("ຂໍ້ມູນການຂາຍ");
const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ສ້າງວັນທີ", value: "created_at" },
  { title: "ງວດວັນທີ", value: "sale_date" },
  { title: "ຈຳນວນງວດທັງໝົດ", value: "total_devices" },
  { title: "ຍອດລວມ", value: "total_amount" },
  { title: "ຄົນສ້າງ", value: "username" },
  { title: "ສະຖານະ", value: "status" },
  { title: "Actions", value: "actions" },
]);

const request = saleStore.request_sale_get_data;

const response_data = computed(() => {
  return saleStore.response_sale_get_data;
});

async function onSelectChange(selection: number) {
  request.limit = selection;
  await saleStore.GetSaleListData();
}

async function onPageChange(page: number) {
  request.page = page;
  await saleStore.GetSaleListData();
}

async function onDateSelect(date: Date | null) {
  request.sale_date = date;
  await saleStore.GetSaleListData();
}

onMounted(() => {
  saleStore.GetSaleListData();
});
</script>

<template>
  <section class="pa-6">
    <v-card flat class="pa-6" min-height="95vh">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine
            :title="`${title} (${formatnumber(
              response_data?.pagination?.total_count ?? 0
            )})`"
          />
        </v-col>

        <v-col
          cols="12"
          class="d-flex flex-wrap justify-space-between align-center"
        >
          <div class="d-flex flex-wrap align-center">
            <div>
              <label>ງວດວັນທີ</label>
              <DatePicker
                :date="request.sale_date"
                @on-set-date="onDateSelect($event)"
              />
            </div>

            <div class="pt-5 ml-5">
              <v-btn
                color="primary"
                variant="flat"
                @click="saleStore.GetSaleListData()"
                :loading="request.loading"
                >ຄົ້ນຫາ</v-btn
              >
            </div>
          </div>
          <div>
            <v-btn
              color="primary"
              width="165px"
              flat
              @click="goPath('/sales/new')"
            >
              + ເພີ່ມຂໍ້ມູນການຂາຍ</v-btn
            >
          </div>
        </v-col>

        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="response_data?.list_data ?? []"
            :loading="request.loading"
            :items-per-page="request.limit"
            hide-default-footer
            :items-per-page-options="GetItemPerPageOptions()"
          >
            <template v-slot:item.no="{ index }">
              {{ index + (request.page - 1) * request.limit + 1 }}
            </template>

            <template v-slot:item.created_at="{ item }">
              {{ FormatDatetime(item.created_at) }}
            </template>

            <template v-slot:item.sale_date="{ item }">
              {{ FormatDate(item.sale_date) }}
            </template>

            <template v-slot:item.total_amount="{ item }">
              {{ formatnumber(item.total_amount) }}
            </template>

            <template v-slot:item.status="{ item }">
              <GlobalDefaultStatusChip :status="item.status" />
            </template>

            <template v-slot:item.username="{ item }">
              {{ item?.user?.fullname ?? "N/A" }}
            </template>

            <template v-slot:item.actions="{ index, item }">
              <div class="d-flex flex-wrap">
                <div class="mr-1">
                  <v-btn
                    color="primary"
                    icon="mdi-eye"
                    variant="text"
                    size="small"
                    @click="goPath(`/sales/detail?id=${item.id}`)"
                  ></v-btn>
                </div>

                <div>
                  <v-btn
                    color="error"
                    icon="mdi-cancel"
                    variant="text"
                    size="small"
                    :disabled="item.status === 2"
                    @click="saleStore.OnCancelSale(item.id)"
                  ></v-btn>
                </div>
              </div>
            </template>

            <template v-slot:bottom>
              <GlobalTablePaginations
                :limit="request.limit"
                :page="request.page"
                :totalpage="response_data?.pagination?.total_page ?? 1"
                @onSelectionChange="onSelectChange"
                @onPagechange="onPageChange"
              />
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
