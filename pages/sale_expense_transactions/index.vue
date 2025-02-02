<script lang="ts" setup>
const expenseTypeStore = UseExpenseTypeStore();
const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ສ້າງວັນທີ", value: "created_at" },
  { title: "ງວດວັນທີ", value: "sale_date" },
  { title: "ຕົວແທນ", value: "agency.fullname" },
  { title: "ປະເພດລາຍຈ່າຍ", value: "expense_type.name" },
  { title: "ຈຳນວນເງິນ", value: "amount" },
  { title: "ຄົນສ້າງ", value: "user.fullname" },
  { title: "ສະຖານະ", value: "status" },
  { title: "Actions", value: "actions" },
]);

const request = expenseTypeStore.request_get_data;

const response_data = computed(() => {
  return expenseTypeStore.response_get_data;
});

async function onSelectChange(select: number) {
  request.limit = select;
  await expenseTypeStore.GetListDataSaleExpenseTypeTransaction();
}

async function onPageChange(page: number) {
  request.page = page;
  await expenseTypeStore.GetListDataSaleExpenseTypeTransaction();
}

onMounted(() => {
  expenseTypeStore.GetListDataSaleExpenseTypeTransaction();
});
</script>

<template>
  <section class="pa-6">
    <v-card class="pa-6" flat min-height="95vh">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine :title="`ຈັດການຂໍ້ມູນການເພີ່ມລາຍຈ່າຍ`" />
        </v-col>

        <v-col cols="12" class="d-flex flex-wrap justify-end">
          <v-btn
            color="primary"
            width="165px"
            flat
            @click="goPath(`/sale_expense_transactions/new`)"
            >+ ເພີ່ມຂໍ້ມູນ</v-btn
          >
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
              {{ index + 1 }}
            </template>

            <template v-slot:item.sale_date="{ item }">
              {{ FormatDate(item.sale_date) }}
            </template>

            <template v-slot:item.status="{ item }">
              <GlobalDefaultStatusChip :status="item.status" />
            </template>

            <template v-slot:item.actions="{ item }">
              <div>
                <div>
                  <v-btn
                    color="primary"
                    variant="text"
                    icon="mdi-eye"
                    size="small"
                    @click="
                      goPath(`/sale_expense_transactions/detail?id=${item.id}`)
                    "
                  ></v-btn>
                </div>
              </div>
            </template>

            <template v-slot:item.created_at="{ item }">
              {{ FormatDatetime(item.created_at) }}
            </template>

            <template v-slot:item.amount="{ item }">
              {{ formatnumber(item.amount) }}
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
