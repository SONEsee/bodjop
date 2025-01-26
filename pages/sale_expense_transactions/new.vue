<script lang="ts" setup>
import axios from "@/helpers/axios";
const title = ref("ເພີ່ມຂໍ້ມູນການໃຊ້ຈ່ານ | Expense adjustment");
const saleStore = UseSaleStore();
const agencyStore = UseAgencyStore();
const expenseTypeStore = UseExpenseTypeStore();
const form = ref();
const loading = ref(false);

const request = ref({
  sale_date: null,
  agency_id: null,
  amount: null,
  description: null,
  expense_type_id: null,
});

const sale_periods = computed(() => {
  return saleStore.sale_periods;
});

const onSubmitForm = async () => {
  try {
    const { valid } = await form.value.validate();
    if (valid) {
      loading.value = true;
      const dayjs = useDayjs();
      const res = await axios.post("/api/v1/sale-expense-transactions/new", {
        ...request.value,
        sale_date: dayjs(request.value.sale_date).format("YYYY-MM-DD"),
        description: request.value.description ?? "N/A",
      });
      if (res.status === 200) {
        const successNotification = await CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
        });

        if (successNotification.isConfirmed) {
          delayGoPath("/sale_expense_transactions");
        } else {
          delayGoPath("/sale_expense_transactions");
        }
      }
    }
  } catch (error) {
    console.error(error);
    DefaultSwalError(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  agencyStore.GetAgencySelections();
  saleStore.GetSalePeriodListData();
  expenseTypeStore.GetExpenseTypeSelectionData();
});
</script>
<template>
  <section class="pa-6">
    <v-form ref="form" @submit.prevent="onSubmitForm">
      <v-card class="pa-6" min-height="95vh" flat>
        <v-row>
          <v-col cols="12">
            <GlobalTextTitleLine :title="title" />
          </v-col>

          <v-col cols="12" class="d-flex flex-wrap justify-end">
            <v-btn
              color="primary"
              width="165px"
              flat
              type="submit"
              :loading="loading"
              >+ ບັນທຶກ</v-btn
            >
          </v-col>

          <v-col cols="12">
            <v-row>
              <v-col cols="3">
                <label>ເລືອກງວດວັນທີ</label>
                <v-select
                  :items="sale_periods"
                  variant="outlined"
                  hide-details="auto"
                  density="comfortable"
                  item-title="sale_date"
                  item-value="sale_date"
                  v-model="request.sale_date"
                  :rules="[(v: string) => !!v || 'This field is required']"
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
                <label>ເລືອກຕົວແທນ</label>
                <v-select
                  :items="agencyStore.agency_selections"
                  variant="outlined"
                  hide-details="auto"
                  density="comfortable"
                  item-title="fullname"
                  item-value="id"
                  clearable
                  v-model="request.agency_id"
                  :rules="[(v: string) => !!v || 'This field is required']"
                >
                  <template v-slot:selection="{ item }">
                    {{ item.title }}
                  </template>
                </v-select>
              </v-col>

              <v-col cols="3">
                <label>ເລືອກປະເພດຄ່າໃຊ້ຈ່າຍ</label>
                <v-select
                  :items="expenseTypeStore.expense_type_selections"
                  variant="outlined"
                  hide-details="auto"
                  density="comfortable"
                  item-title="name"
                  item-value="id"
                  clearable
                  v-model="request.expense_type_id"
                  :rules="[(v: string) => !!v || 'This field is required']"
                >
                  <template v-slot:selection="{ item }">
                    {{ item.title }}
                  </template>
                </v-select>
              </v-col>

              <v-col cols="3">
                <label>ຈຳນວນເງິນ</label>
                <GlobalTextFieldNumber
                  :hide="'auto'"
                  :number="request.amount"
                  @input_number="request.amount = $event"
                />
              </v-col>

              <v-col cols="6">
                <label>ລາຍລະອຽດ</label>
                <v-textarea
                  variant="outlined"
                  v-model="request.description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </section>
</template>
