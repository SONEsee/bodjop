<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

import axios from "@/helpers/axios";
import { onExcelSaleExpenseTransactions } from "@/helpers/xlsx";
const expenseTypeStore = UseExpenseTypeStore();
const saleStore = UseSaleStore();
const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ສ້າງວັນທີ", value: "created_at" },
  { title: "ງວດວັນທີ", value: "sale_date" },
  { title: "ຕົວແທນ", value: "agency" },
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

const sale_periods = computed(() => {
  return saleStore.sale_periods;
});

async function onSelectChange(select: number) {
  request.limit = select;
  await expenseTypeStore.GetListDataSaleExpenseTypeTransaction();
}

async function onPageChange(page: number) {
  request.page = page;
  await expenseTypeStore.GetListDataSaleExpenseTypeTransaction();
}

async function onDeleteTransactions(id: string) {
  try {
    const notification = await CallSwal({
      icon: "warning",
      text: "ທ່ານຕ້ອງການລົບຂໍ້ມູນນີ້ ທ່ານແນ່ໃຈແລ້ວບໍ່?",
      title: "ຄຳເຕືອນ",
      showCancelButton: true,
      cancelButtonText: "ຍົກເລີກ",
      confirmButtonText: "ຕົກລົງ",
    });

    if (notification.isConfirmed) {
      request.loading = true;
      const res = await axios.delete(
        `/api/v1/sale-expense-transactions/delete-data/${id}`
      );
      if (res.status === 200) {
        const successNotification = await CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ",
        });

        if (successNotification.isConfirmed) {
          await expenseTypeStore.GetListDataSaleExpenseTypeTransaction();
        } else {
          await expenseTypeStore.GetListDataSaleExpenseTypeTransaction();
        }
      }
    }
  } catch (error) {
    console.error(error);
    DefaultSwalError(error);
  } finally {
    request.loading = false;
  }
}

async function onExportExcel() {
  try {
    await expenseTypeStore.GetExportSaleExpenseData();
    const response_data = expenseTypeStore.response_sale_expense_data;
    if (response_data.length > 0) {
      await onExcelSaleExpenseTransactions(response_data);
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  expenseTypeStore.GetListDataSaleExpenseTypeTransaction();
  saleStore.GetSalePeriodListData();
});
</script>

<template>
  <section class="pa-6">
    <v-card class="pa-6" flat min-height="95vh">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine :title="`ຈັດການຂໍ້ມູນການເພີ່ມລາຍຈ່າຍ`" />
        </v-col>

        <v-col
          cols="12"
          class="d-flex flex-wrap justify-space-between align-center"
        >
          <div class="d-flex flex-wrap align-center">
            <div style="width: 250px">
              <label>ງວດວັນທີ</label>
              <v-select
                :items="sale_periods"
                variant="outlined"
                density="compact"
                item-title="sale_date"
                item-value="sale_date"
                clearable
                v-model="request.sale_date"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :subtitle="FormatDate(item.title)"
                    :title="'ງວດວັນທີ'"
                  ></v-list-item>
                </template>

                <template v-slot:selection="{ item }">
                  {{ FormatDate(item.title) }}
                </template>
              </v-select>
            </div>

            <div class="ml-3">
              <v-btn
                color="primary"
                flat
                :loading="request.loading"
                @click="expenseTypeStore.GetListDataSaleExpenseTypeTransaction"
                >ຄົ້ນຫາ</v-btn
              >
            </div>
          </div>

          <div class="d-flex flex-wrap">
            <div class="mr-3">
              <v-btn
                color="primary"
                width="165px"
                flat
                :loading="request.loading"
                @click="goPath(`/sale_expense_transactions/new`)"
                >+ ເພີ່ມຂໍ້ມູນ</v-btn
              >
            </div>

            <div>
              <v-btn
                color="info"
                prepend-icon="mdi-export"
                flat
                :loading="request.loading"
                @click="onExportExcel()"
                >Export Excel</v-btn
              >
            </div>
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
              {{ index + 1 }}
            </template>

            <template v-slot:item.agency="{ item }">
              {{ item.agency?.agent_code }} - {{ item.agency?.fullname }}
            </template>

            <template v-slot:item.sale_date="{ item }">
              {{ FormatDate(item.sale_date) }}
            </template>

            <template v-slot:item.status="{ item }">
              <GlobalDefaultStatusChip :status="item.status" />
            </template>

            <template v-slot:item.actions="{ item }">
              <div class="d-flex">
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

                <div>
                  <v-btn
                    color="error"
                    icon="mdi-delete"
                    variant="text"
                    size="small"
                    @click="onDeleteTransactions(item.id)"
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
