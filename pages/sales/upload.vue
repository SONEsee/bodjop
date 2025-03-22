<script lang="ts" setup>
import { onSaleUploadFileRecover } from "@/helpers/xlsx";
import axios from "@/helpers/axios";
import { SaleModels } from "~/models";
const datenow = ref(new Date());
const items = ref([] as SaleModels.UploadSaleBody[]);
const file = ref();
const loading = ref(false);

const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ງວດວັນທີ", value: "sale_date" },
  { title: "ຈຳນວນບິນ", value: "total_bills" },
  { title: "ລວມເງິນ", value: "total_amount" },
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
        const result = await onSaleUploadFileRecover(data);
        if (result instanceof Error) {
          return DefaultSwalError(result);
        }

        items.value = result;
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

const onSubmit = async () => {
  try {
    if (items.value.length < 1) {
      return;
    }

    loading.value = true;
    const dayjs = useDayjs();
    const res = await axios.post("/api/v1/sales/upload", {
      // sale_date: dayjs(datenow.value).format("YYYY-MM-DD"),
      // items: items.value,

      requests: items.value,
    });

    if (res.status === 200) {
      console.log(`success`);
      await CallSwal({
        title: "success",
        icon: "success",
      });
    }
  } catch (error) {
    console.error(error);
    DefaultSwalError(error);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <section class="pa-6">
    <v-card flat min-height="95vh" class="pa-4">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine :title="'ອັບໂຫຼດຂໍ້ມູນການຂາຍ'" />
        </v-col>
        <v-col cols="12" class="d-flex flex-wrap justify-end">
          <!-- <div>
            <label>ງວດວັນທີ</label>
            <DatePicker :date="datenow" @on-set-date="datenow = $event" />
          </div> -->

          <div>
            <v-btn color="primary" flat @click="onOpenfile">ອັບໂຫຼດຟາຍ</v-btn>
            <input
              type="file"
              style="display: none"
              ref="file"
              @change="onFileUpload"
            />

            <v-btn
              color="info"
              flat
              class="mx-4"
              :disabled="items.length === 0"
              :loading="loading"
              @click="onSubmit"
              >ບັນທຶກ</v-btn
            >
          </div>
        </v-col>

        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page-options="GetItemPerPageOptions()"
            :items-per-page="200"
          >
            <template v-slot:item.no="{ index }">
              {{ index + 1 }}
            </template>

            <template v-slot:item.total_bills="{ item }">
              {{ formatnumber(item.items.length) }}
            </template>

            <template v-slot:item.total_amount="{ item }">
              {{ formatnumber(useSumBy(item.items, (d) => d.sale_amount)) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
