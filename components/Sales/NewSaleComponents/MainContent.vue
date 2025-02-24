<script lang="ts" setup>
import { onSaleUploadFile } from "@/helpers/xlsx";
import axios from "@/helpers/axios";

const title = ref("ເພີ່ມຂໍ້ມູນການຂາຍ");
const file = ref();
const saleStore = UseSaleStore();
const loading = ref(false);
const request = saleStore.sale_request_create;
const dayjs = useDayjs();

const response_period_check = computed(() => {
  return saleStore.sale_period_check;
});

const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "Pos code", value: "pos_code" },
  {
    title: "1 ໂຕ",
    value: "one_digits",
  },
  { title: "2 ໂຕ", value: "two_digits" },
  { title: "3 ໂຕ", value: "three_digits" },
  { title: "4 ໂຕ", value: "four_digits" },
  { title: "5 ໂຕ", value: "five_digits" },
  { title: "6 ໂຕ", value: "six_digits" },
  { title: "ຍອດລວມ", value: "sale_amount" },
  { title: "Actions", value: "actions" },
]);

function onOpenfile() {
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
        const result = await onSaleUploadFile(data, request.sale_date);
        if (result instanceof Error) {
          return DefaultSwalError(result);
        }

        saleStore.sale_request_create.items = result;
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

async function onCreateSale() {
  try {
    if (request.sale_date === null) {
      return;
    }

    let text: string = "";
    if (response_period_check.value !== null) {
      text = `ຍອດຂາຍວັນທີ ${dayjs(response_period_check.value.sale_date).format(
        "DD-MM-YYYY"
      )} ໄດ້ມີການເພີ່ມເຂົ້າມາໃນລະບົບແລ້ວ ຂໍ້ມູນອາດຊ້ຳກັນໄດ້ທ່ານແນ່ໃຈແລ້ວບໍ່?`;
    } else {
      text = "ທ່ານກຳລັງສ້າງຂໍ້ມູນການຂາຍທ່ານແນ່ໃຈແລ້ວບໍ່";
    }

    const notification = await CallSwal({
      icon: "warning",
      title: "ຄຳເຕືອນ",
      text: `${text}`,
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (notification.isConfirmed) {
      const dayjs = useDayjs();
      loading.value = true;
      const res = await axios.post("/api/v1/sales/new", {
        items: saleStore.sale_request_create.items,
        sale_date: dayjs(request.sale_date).format("YYYY-MM-DD"),
      });

      if (res.status === 200) {
        const successNotification = await CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ",
        });
        if (successNotification.isConfirmed) {
          delayGoPath("/sales");
        } else {
          delayGoPath("/sales");
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

async function onDateSelect(date: Date | null) {
  try {
    saleStore.sale_period_check = null;
    //@ts-ignore
    request.sale_date = date;
    await saleStore.GetSalePeriodCheck(date);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <section>
    <v-row>
      <v-col cols="12">
        <GlobalTextTitleLine
          :title="`${title} (${formatnumber(request.items.length)})`"
        />
      </v-col>

      <v-col cols="12" class="d-flex flex-wrap justify-space-between">
        <div>
          <div>
            <label>ຍອດຂາຍວັນທີ</label>
            <DatePicker
              :date="request.sale_date"
              :required="true"
              @on-set-date="onDateSelect"
            />
          </div>
        </div>
        <div class="mr-3 d-flex flex-wrap">
          <div class="pt-6 mr-6">
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              flat
              width="180px"
              @click="onOpenfile"
              :loading="loading"
            >
              ອັບໂຫຼດຂໍ້ມູນການຂາຍ</v-btn
            >
          </div>

          <div
            v-if="saleStore.sale_request_create.items.length > 0"
            class="pt-6"
          >
            <v-btn
              color="#33cc5c"
              width="180px"
              flat
              class="text-white font-weight-black"
              :loading="loading"
              @click="onCreateSale()"
              >ບັນທຶກ</v-btn
            >
          </div>
        </div>

        <input
          type="file"
          ref="file"
          style="display: none"
          @change="onFileUpload"
        />
      </v-col>

      <v-col cols="12" v-show="saleStore.sale_request_create.items.length > 0">
        <v-data-table
          :headers="headers"
          :items="saleStore.sale_request_create.items ?? []"
          :items-per-page-options="GetItemPerPageOptions()"
          :items-per-page="200"
        >
          <template v-slot:item.no="{ index }">
            {{ index + 1 }}
          </template>

          <template v-slot:item.actions="{ item, index }">
            <div class="d-flex flex-wrap">
              <div class="mr-1">
                <v-btn
                  color="primary"
                  icon="mdi-eye"
                  variant="text"
                  size="small"
                  :disabled="item.winner_sales.length === 0"
                ></v-btn>
              </div>

              <div>
                <v-btn
                  color="error"
                  icon="mdi-delete"
                  variant="text"
                  size="small"
                  @click="saleStore.sale_request_create.items.splice(index, 1)"
                ></v-btn>
              </div>
            </div>
          </template>

          <template v-slot:item.one_digits="{ item }">
            {{ formatnumber(item.one_digits) }}
          </template>

          <template v-slot:item.two_digits="{ item }">
            {{ formatnumber(item.two_digits) }}
          </template>

          <template v-slot:item.three_digits="{ item }">
            {{ formatnumber(item.three_digits) }}
          </template>

          <template v-slot:item.four_digits="{ item }">
            {{ formatnumber(item.four_digits) }}
          </template>

          <template v-slot:item.five_digits="{ item }">
            {{ formatnumber(item.five_digits) }}
          </template>

          <template v-slot:item.six_digits="{ item }">
            {{ formatnumber(item.six_digits) }}
          </template>

          <template v-slot:item.sale_amount="{ item }">
            {{ formatnumber(item.sale_amount) }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </section>
</template>
