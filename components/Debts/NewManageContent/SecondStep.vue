<script lang="ts" setup>
import axios from "@/helpers/axios";
import { InvoiceModels } from "@/models";
const debtStore = UseDebtsStore();
const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ງວດວັນທີ", value: "sale_date" },
  { title: "ຍອດຍັງເຫຼືອ", value: "debt_amount" },
  { title: "ລົງຍອດ", value: "amount" },
  { title: "actions", value: "actions" },
]);

const request = debtStore.request_new_debts;

const response_data = computed(() => {
  return request.invoices;
});

const onSubmitForm = async () => {
  try {
    const invoices = request.invoices.filter((d) => d.amount > 0);
    if (invoices.length === 0) {
      return;
    }

    const notification = await CallSwal({
      icon: "warning",
      title: "ຄຳເຕືອນ",
      text: "ທ່ານແນ່ໃຈແລ້ວທີ່ຈະດຳເນີນການຕໍ່?",
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (notification.isConfirmed) {
      request.loading = true;
      const res = await axios.post("/api/v1/invoice-payment-transactions/new", {
        items: invoices.map(
          (d: InvoiceModels.NewGetListInvoiceDebtResponseItem) => {
            return {
              amount: d.amount,
              invoice_detail_id: d.invoice_detail_id,
            };
          }
        ),
      });

      if (res.status === 200) {
        const successNotification = await CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ",
        });

        if (successNotification.isConfirmed) {
          delayGoPath(`/agency/detail?id=${request.agency?.id}`);
        } else {
          delayGoPath(`/agency/detail?id=${request.agency?.id}`);
        }
      }
    }
  } catch (error) {
    console.error(error);
    DefaultSwalError(error);
  } finally {
    request.loading = false;
  }
};
</script>

<template>
  <section>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <global-card-title
              :title="'ຈຳນວນທີ່ຈ່າຍ'"
              :text="formatnumber(request.amount ?? 0)"
            />
          </v-col>
          <v-col cols="3">
            <global-card-title
              :title="'ຈຳນວນໃບຮຽກເກັບເງິນ'"
              :text="formatnumber(request.invoices.length ?? 0)"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="response_data"
          density="comfortable"
          :loading="request.loading"
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

          <template v-slot:item.amount="{ item, index }">
            <div style="width: 200px" class="py-2">
              <GlobalTextFieldNumber
                :number="item.amount"
                @input_number="item.amount = $event"
                :hide="'auto'"
                :rules="[]"
                :density="'comfortable'"
              />
            </div>
          </template>

          <template v-slot:item.actions="{ item }">
            <div>
              <v-btn
                color="primary"
                variant="text"
                icon="mdi-file-pdf-box"
                size="small"
                @click="
                  openPath(
                    `/prints/commission_pdf?id=${item.invoice_detail_id}`
                  )
                "
              ></v-btn>
            </div>
          </template>
        </v-data-table>
      </v-col>

      <v-col cols="12">
        <div class="d-flex flex-wrap justify-center py-2">
          <div>
            <v-btn
              color="info"
              width="165px"
              flat
              :loading="request.loading"
              @click="onSubmitForm"
              >ບັນທຶກ</v-btn
            >
          </div>

          <div class="mx-2">
            <v-btn
              color="grey"
              width="165px"
              flat
              @click="request.tab = 1"
              :loading="request.loading"
              >ກັບຄືນ</v-btn
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </section>
</template>
