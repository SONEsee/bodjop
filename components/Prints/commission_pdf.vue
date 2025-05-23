<script lang="ts" setup>
import { COMMISSION_OR_EXPENSES } from "@/enum/commissions";
import { toPng } from "html-to-image";
const printStore = UsePrintStore();
const route = useRoute();
const dayjs = useDayjs();

const printType = route.query?.print_type?.toString() ?? null;

const invoice_detail = computed(() => {
  return printStore.invoice_detail;
});

useHead({
  title: `Invoice ${dayjs(invoice_detail?.value?.sale_date).format(
    "DD-MM-YYYY"
  )} ${invoice_detail?.value?.agency?.agent_code}`,
});

const targetElement = ref<HTMLElement | null>(null);

const onExportImage = async () => {
  try {
    if (printType === "image") {
      if (targetElement.value != null) {
        const dataUrl = await toPng(targetElement.value, {
          backgroundColor: "#ffffff",
          style: {
            fontFamily: "NotoSansLao",
          },
        });
        const link = document.createElement("a");
        const filename = `Invoice ${dayjs(
          invoice_detail?.value?.sale_date
        ).format("DD-MM-YYYY")} ${invoice_detail?.value?.agency?.agent_code}`;
        link.download = `${filename}.png`;
        link.href = dataUrl;
        link.click();
      }
    } else {
      window.print();
    }
  } catch (error) {
    console.error(error);
  }
};

// Use this in your watcher
watch(
  invoice_detail,
  async (newVal) => {
    if (newVal !== null) {
      // Small delay to ensure DOM is fully rendered
      await nextTick();
      setTimeout(async () => {
        await onExportImage();
      }, 1200);
    }
  },
  { immediate: true, deep: true }
);

const acencyTitle = ref([
  {
    name: "ລະຫັດຕົວແທນ",
  },
  {
    name: "ຊື່ຕົວແທນ",
  },
  {
    name: "ພິມເອກະສານວັນທີ",
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
  <div
    class="box-container ma-0 pa-5"
    v-if="invoice_detail !== null"
    ref="targetElement"
  >
    <div class="watermark">
      <div v-if="invoice_detail.invoice_debt?.status === 1">ຍັງບໍ່ໄດ້ຊຳລະ</div>
      <div v-else-if="invoice_detail.invoice_debt?.status === 2">
        ຊຳລະຍັງບໍ່ສຳເລັດ
      </div>
      <div v-else>ຊຳລະສຳເລັດແລ້ວ</div>
    </div>
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
            <div class="header">
              {{ FormatInvoiceDate(invoice_detail?.sale_date) }}
            </div>
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

          <v-card
            width="99%"
            height="30"
            flat
            rounded="0"
            class="ma-0 pa-0 pr-3 mt-1 d-flex align-center justify-end card text"
          >
            {{ FormatDatetime(new Date()) }}
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
                  COMMISSION_OR_EXPENSES.TOPUP_CARD
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
                  invoice_detail?.total_amount + invoice_detail?.total_debt
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
@font-face {
  font-family: "NotoSansLao";
  src: url("/fonts/NotoSansLao-Regular.ttf") format("truetype");
}

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

.watermark {
  position: absolute;
  top: 40%;
  left: 25%;
  transform: translate(-50%, -50%);
  color: rgba(0, 0, 0, 0.2);
  font-size: 60px;
  font-weight: bold;
  pointer-events: none;
  z-index: 1;
  text-align: center;
  transform: translate(-50%, -50%) rotate(-40deg);
}

@media print {
  .watermark {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(0, 0, 0, 0.2);
    font-size: 60px;
    font-weight: bold;
    pointer-events: none;
    z-index: 1;
    text-align: center;
    transform: translate(-50%, -50%) rotate(-40deg);
  }
}
</style>
