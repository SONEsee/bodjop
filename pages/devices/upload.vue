<script lang="ts" setup>
import { DeviceModel } from "@/models";
import axios from "@/helpers/axios";
import * as XLSX from "xlsx";
const file = ref();
const request = ref([] as DeviceModel.DeviceUploadFile[]);
const loading = ref(false);

function onFilUpload() {
  file.value.click();
}

async function onFileUploadChange(event: Event) {
  try {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const tables: DeviceModel.DeviceUploadFile[] = XLSX.utils.sheet_to_json(
          worksheet,
          { raw: true }
        );

        request.value = [];
        for (let i = 0; i < tables.length; i++) {
          let item = tables[i];
          request.value.push({
            pos_old_no: item.pos_old_no?.toString() ?? "",
            pos_new_no: item.pos_new_no?.toString() ?? "",
          });
        }
      };

      reader.readAsArrayBuffer(file);
    }

    //@ts-ignore
    event.target.value = null;
  } catch (error) {
    console.error(error);
  }
}

const headers = ref([
  {
    title: "Old Pos",
    value: "pos_old_no",
  },
  {
    title: "New Pos",
    value: "pos_new_no",
  },
]);

async function onSubmit() {
  try {
    loading.value = true;
    const res = await axios.post("/api/v1/devices/upload-update", {
      items: request.value,
    });

    if (res.status === 200) {
      await CallSwal({
        icon: "success",
        title: "ສຳເລັດ",
        text: "ບັນທຶກຂ້ໍມູນສຳເລັດແລ້ວ",
      });
    }
  } catch (error) {
    console.error(error);
    DefaultSwalError(error);
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <section class="pa-6">
    <v-row>
      <v-col cols="12">
        <GlobalTextTitleLine :title="'ອັບໂຫຼດຟາຍອັບເດດ'" />
      </v-col>
      <v-col cols="12" class="d-flex flex-wrap justify-end">
        <v-btn
          color="primary"
          flat
          @click="onFilUpload()"
          class="mr-4"
          :loading="loading"
          >ອັບໂຫຼດຟາຍ</v-btn
        >
        <input
          type="file"
          ref="file"
          style="display: none"
          @change="onFileUploadChange"
        />

        <v-btn
          color="info"
          :disabled="request.length == 0"
          flat
          :loading="loading"
          @click="onSubmit()"
          >save</v-btn
        >
      </v-col>

      <v-col cols="12">
        <v-data-table :headers="headers" :items="request" />
      </v-col>
    </v-row>
  </section>
</template>
