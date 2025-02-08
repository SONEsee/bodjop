<script lang="ts" setup>
import { COMMISSION_OR_EXPENSES } from "@/enum/commissions";
const printStore = UsePrintStore();

const invoice_detail = computed(() => {
  return printStore.invoice_detail;
});

const acencyTitle = ref([
  {
    name: "ລະຫັດຕົວແທນ",
  },
  {
    name: "ຊື່ຕົວແທນ",
  },
]);

const expenseTitle = ref([
  {
    name: "ຈຳນວນເຄື່ອງ",
  },
  {
    name: "ຍອດຂາຍສະເລ່ຍ",
  },
  {
    name: "ເປີເຊັນຂາຍພື້ນຖານ",
  },
  {
    name: "ເປີເຊັນຖອກຕົງ",
  },
  {
    name: "ເປີເຊັນເປົ້າ",
  },
  {
    name: "ບິນລາງວັນ",
  },
  {
    name: "ບິນລາງວັນເລກທ້າຍ",
  },
  {
    name: "ເປີເຊັນບິນລາງວັນ",
  },
  {
    name: "ຕົວເເທນຢືນ",
  },
  {
    name: "ຄ່າກຳມະການ",
  },
  {
    name: "ບັດເຕີມເງິນ",
  },
  {
    name: "ອາກອນ",
  },
  {
    name: "ອື່ນໆ",
  },
]);
</script>
<template>
  <div class="box-container ma-0 pa-5" v-if="invoice_detail !== null">
    <v-card width="100%" rounded="0" class="ma-0 pa-0 card" elevation="0">
      <div class="d-flex flex-wrap">
        <!-- header -->
        <v-col cols="5" class="ma-0 pa-0">
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pl-3 d-flex align-center card-header"
          >
            <div class="header">ງວດວັນທີ</div>
          </v-card>

          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pl-3 mt-1 d-flex align-center card text"
            v-for="(data, index) in acencyTitle"
            :key="`data-${index}`"
          >
            {{ data.name }}
          </v-card>

          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pl-3 mt-1 d-flex align-center card-header"
          >
            <div class="header">I. ຍອດຂາຍ</div>
          </v-card>

          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pl-3 mt-1 d-flex align-center card text"
            v-for="(data, index) in expenseTitle"
            :key="`data-${index}`"
          >
            {{ `${index + 1}. ${data.name} ` }}
          </v-card>

          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pl-3 mt-1 d-flex align-center card-header"
          >
            <div class="header">II. ລວມຍອດ</div>
          </v-card>

          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pl-3 mt-1 d-flex align-center card text"
          >
            14. ຍອດຄ້າງ
          </v-card>

          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pl-3 mt-1 d-flex align-center card-header"
          >
            <div class="header">III. ລວມຍອດຖອກງວດນີ້ທັງໝົດ</div>
          </v-card>
        </v-col>

        <!-- information -->
        <v-col cols="7" class="ma-0 pa-0 d-flex justify-end flex-wrap">
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 d-flex align-center justify-end card-header"
          >
            <div class="header">12/06/2024</div>
          </v-card>

          <!-- agency code -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{ invoice_detail?.agency?.agent_code ?? "N/A" }}
          </v-card>

          <!-- agency name -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{ invoice_detail?.agency?.fullname ?? "N/A" }}
          </v-card>

          <!-- sale total -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 d-flex align-center justify-end card-header"
          >
            <div class="header">
              {{ formatnumberV2(invoice_detail?.total_sale_amount) }}
            </div>
          </v-card>

          <!-- pos count -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{ formatnumber(invoice_detail?.total_devices) }}
          </v-card>

          <!-- ຍອດຂາຍສະເລ່ຍ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{ formatnumber(invoice_detail?.total_average_amount) }}
          </v-card>

          <!-- ເປີເຊັນຂາຍພື້ນຖານ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{
              formatnumber(
                FilterAmountOfEachTypeInvoiceV2(
                  invoice_detail.invoice_calculations ?? [],
                  COMMISSION_OR_EXPENSES.STANDARD_COMMISSION
                )
              )
            }}
          </v-card>

          <!-- ເປີເຊັນຖອກຕົງ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{
              formatnumber(
                FilterAmountOfEachTypeInvoiceV2(
                  invoice_detail.invoice_calculations ?? [],
                  COMMISSION_OR_EXPENSES.STRAIGHT_COMMISSION
                )
              )
            }}
          </v-card>

          <!-- ເປີເຊັນເປົ້າ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{
              formatnumber(
                FilterAmountOfEachTypeInvoiceV2(
                  invoice_detail.invoice_calculations ?? [],
                  COMMISSION_OR_EXPENSES.GOAL_COMMISSION
                )
              )
            }}
          </v-card>

          <!-- ບິນລາງວັນ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{
              formatnumber(
                FilterAmountOfEachTypeInvoiceV2(
                  invoice_detail.invoice_calculations ?? [],
                  COMMISSION_OR_EXPENSES.WINNER_EXPENSE_SALE
                )
              )
            }}
          </v-card>

          <!-- ບິນລາງວັນເລກທ້າຍ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{
              formatnumber(
                FilterAmountOfEachTypeInvoiceV2(
                  invoice_detail.invoice_calculations ?? [],
                  COMMISSION_OR_EXPENSES.WINNER_EXPENSE_LAST_DIGIT_SALE
                )
              )
            }}
          </v-card>

          <!-- ເປີເຊັນບິນລາງວັນ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{
              formatnumber(
                FilterAmountOfEachTypeInvoiceV2(
                  invoice_detail.invoice_calculations ?? [],
                  COMMISSION_OR_EXPENSES.WINNER_SALE_COMMISSION
                )
              )
            }}
          </v-card>

          <!-- ຕົວແທນຢືມ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{
              formatnumber(
                FilterAmountOfEachTypeInvoiceV2(
                  invoice_detail.invoice_calculations ?? [],
                  COMMISSION_OR_EXPENSES.BORROW_EXPENSE_SALE
                )
              )
            }}
          </v-card>

          <!-- ຄ່າກຳມະການ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{
              formatnumber(
                FilterAmountOfEachTypeInvoiceV2(
                  invoice_detail.invoice_calculations ?? [],
                  COMMISSION_OR_EXPENSES.COMMITTEE_EXPENSE_SALE
                )
              )
            }}
          </v-card>

          <!-- ບັດເຕີມເງິນ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{
              formatnumber(
                FilterAmountOfEachTypeInvoiceV2(
                  invoice_detail.invoice_calculations ?? [],
                  COMMISSION_OR_EXPENSES.BORROW_EXPENSE_SALE
                )
              )
            }}
          </v-card>

          <!-- ອາກອນ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{
              formatnumber(
                FilterAmountOfEachTypeInvoiceV2(
                  invoice_detail.invoice_calculations ?? [],
                  COMMISSION_OR_EXPENSES.VAT_EXPENSE_SALE
                )
              )
            }}
          </v-card>

          <!-- ອື່ນໆ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{
              formatnumber(
                FilterAmountOfEachTypeInvoiceV2(
                  invoice_detail.invoice_calculations ?? [],
                  COMMISSION_OR_EXPENSES.OTHER_EXPENSE_SALE
                )
              )
            }}
          </v-card>

          <!-- ລວມຍອດ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card-header"
          >
            <div class="header">
              {{ formatnumber(invoice_detail?.total_amount) }}
            </div>
          </v-card>

          <!--  ຍອດຄ້າງ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card-header1"
          >
            <div class="header">
              {{ formatnumber(invoice_detail?.total_debt) }}
            </div>
          </v-card>

          <!-- ລວມຍອດຖອກງວດນີ້ທັງໝົດ -->
          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card-header"
          >
            <div class="header">
              {{
                formatnumber(
                  invoice_detail?.total_amount - invoice_detail?.total_debt
                )
              }}
            </div>
          </v-card>
        </v-col>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.box-container {
  page-break-before: always;
  width: 21cm;
  height: 29.7cm;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.card {
  background-color: transparent;
}

.card-header {
  background-color: #ffbf00;
}

.card-header1 {
  background-color: #ffaaa5;
}

.header {
  font-size: 16px;
  font-weight: bold;
}

.text {
  font-size: 14px;
}
</style>
