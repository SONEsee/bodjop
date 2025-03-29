<script lang="ts" setup>
import axios from "@/helpers/axios";
import { ExpenseTypeModels } from "@/models";
import { onExpenseTypeTransactionUpload } from "@/helpers/xlsx";
const title = ref("ເພີ່ມຂໍ້ມູນການໃຊ້ຈ່ານ | Expense adjustment");
const saleStore = UseSaleStore();
const agencyStore = UseAgencyStore();
const expenseTypeStore = UseExpenseTypeStore();
const form = ref();
const loading = ref(false);
const file = ref();
const request_create_upload = ref(
  [] as ExpenseTypeModels.ExpenseTypeTransactionUploadFileResponse[]
);

const form_option = ref("1");
const headers = ref([
  {
    title: "ງວດວັນທີ",
    value: "sale_date",
  },
  {
    title: "ລະຫັດຕົວແທນ",
    value: "agency_code",
  },
  {
    title: "ປະເພດຄ່າໃຊ້ຈ່າຍ",
    value: "expense_type",
  },
  {
    title: "ຈຳນວນ",
    value: "amount",
  },
  {
    title: "Remark",
    value: "note",
  },
  {
    title: "actions",
    value: "actions",
  },
]);

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

const debounceAgencySearch = useDebounceFn(async (value: string) => {
  await agencyStore.GetAgencySelections(value);
}, 800);

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

function onOpenFile() {
  file.value.click();
}

async function onFileUpload(event: Event) {
  try {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result as ArrayBuffer;
        const res = await onExpenseTypeTransactionUpload(data);
        if (res instanceof Error) {
          return DefaultSwalError(res);
        }

        request_create_upload.value = res;
      };
      reader.readAsArrayBuffer(file);
    }

    //@ts-ignore
    event.target.value = null;
  } catch (error) {
    console.error(error);
    return DefaultSwalError(error);
  }
}

async function onCreateMultipleForm() {
  try {
    if (request_create_upload.value.length < 1) {
      return;
    }

    const notification = await CallSwal({
      icon: "warning",
      title: "ຄຳເຕືອນ",
      text: "ທ່ານກຳລັງບັນທຶກຂໍ້ມູນທ່ານແນ່ໃຈແລ້ວບໍ່?",
      showCancelButton: true,
      cancelButtonText: "ຍົກເລີກ",
      confirmButtonText: "ຕົກລົງ",
    });
    if (notification.isConfirmed) {
      loading.value = true;
      const dayjs = useDayjs();
      const res = await axios.post(
        "/api/v1/sale-expense-transactions/new-multiple",
        {
          items: request_create_upload.value.map(
            (d: ExpenseTypeModels.ExpenseTypeTransactionUploadFileResponse) => {
              return {
                sale_date: dayjs(d.sale_date).format("YYYY-MM-DD"),
                agency_code: d.agency_code?.toString()?.trim() ?? "",
                amount: d.amount,
                expense_type_code: d.expense_type,
                note: d.note,
              };
            }
          ),
        }
      );

      if (res.status === 200) {
        const successNotification = await CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ",
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
}

onMounted(() => {
  agencyStore.GetAgencySelections(null);
  saleStore.GetSalePeriodListData();
  expenseTypeStore.GetExpenseTypeSelectionData();
});
</script>

<template>
  <section class="pa-6">
    <v-card class="pa-6" min-height="95vh" flat>
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine :title="title" />
        </v-col>

        <v-col cols="12">
          <v-radio-group
            v-model="form_option"
            inline
            hide-details
            color="primary"
          >
            <v-radio :label="'ເພີ່ມຂໍ້ມູນແບບຟອມ'" :value="'1'"></v-radio>
            <v-radio label="ອັບໂຫຼດຟາຍ" :value="'2'"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col cols="12" v-if="form_option === '1'">
          <v-form ref="form" @submit.prevent="onSubmitForm">
            <v-row>
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
                    <v-autocomplete
                      :items="agencyStore.agency_selections"
                      variant="outlined"
                      hide-details="auto"
                      density="comfortable"
                      item-title="fullname"
                      item-value="id"
                      clearable
                      no-filter
                      v-model="request.agency_id"
                      :rules="[(v: string) => !!v || 'This field is required']"
                      @update:search="debounceAgencySearch"
                    >
                      <template v-slot:selection="{ item }">
                        {{ item.title }} - {{ item.raw?.agent_code ?? "N/A" }}
                      </template>
                      <template v-slot:item="{ props, item }">
                        <v-list-item
                          v-bind="props"
                          :subtitle="item.raw.agent_code"
                          :title="item.raw.fullname"
                        ></v-list-item>
                      </template>
                    </v-autocomplete>
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

              <v-col cols="12" class="d-flex flex-wrap justify-center">
                <v-btn
                  color="primary"
                  width="165px"
                  flat
                  type="submit"
                  :loading="loading"
                  >+ ບັນທຶກ</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-col>

        <v-col v-else cols="12">
          <v-row>
            <v-col cols="12" class="d-flex flex-wrap justify-end pt-0">
              <div class="mr-4">
                <v-btn
                  color="info"
                  flat
                  width="165px"
                  prepend-icon="mdi-cloud-upload"
                  @click="onOpenFile()"
                  :loading="loading"
                  >ອັບໂຫຼດຟາຍ</v-btn
                >

                <input
                  type="file"
                  ref="file"
                  style="display: none"
                  @change="onFileUpload"
                />
              </div>

              <div class="mr-3">
                <a
                  href="/uploads/expense_type_transactions_upload_file.xlsx"
                  download="sale_expense_transaction_upload_file.xlsx"
                  target="_blank"
                >
                  <v-btn
                    color="primary"
                    flat
                    width="165px"
                    prepend-icon="mdi-cloud-download"
                    :loading="loading"
                    >ດາວໂຫຼດຟາຍອັບໂຫຼດ</v-btn
                  >
                </a>
              </div>

              <div v-if="request_create_upload.length > 0">
                <v-btn
                  color="teal-darken-1"
                  flat
                  width="165px"
                  prepend-icon="mdi-content-save"
                  :loading="loading"
                  @click="onCreateMultipleForm()"
                  >ບັນທຶກ</v-btn
                >
              </div>
            </v-col>

            <v-col cols="12">
              <v-data-table :items="request_create_upload" :headers="headers">
                <template v-slot:item.sale_date="{ item }">
                  {{ FormatDate(item.sale_date) }}
                </template>

                <template v-slot:item.amount="{ item }">
                  {{ formatnumberV2(item.amount) }}
                </template>

                <!-- <template v-slot:item.expense_type="{ item }">
                  {{ GetCommissionOrExpenseTypeLabel(item.expense_type) }}
                </template> -->

                <template v-slot:item.actions="{ index }">
                  <v-btn
                    color="error"
                    icon="mdi-delete"
                    variant="text"
                    :loading="loading"
                    size="small"
                    @click="request_create_upload.splice(index, 1)"
                  ></v-btn>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
