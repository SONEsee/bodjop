<script lang="ts" setup>
import { DeviceModels } from "@/models";
import axios from "@/helpers/axios";
import * as XLSX from "xlsx";

const request = ref([] as DeviceModels.DeviceAgencyUploadFile[]);
const loading = ref(false);
const file = ref();

const headers = ref([
  {
    title: "Agency Code",
    value: "agency_code",
  },
  {
    title: "pos_code",
    value: "pos_code",
  },
  {
    title: "imei",
    value: "imei",
  },
  {
    title: "Device ID",
    value: "device_id",
  },
]);

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
        const tables: DeviceModels.DeviceAgencyUploadFile[] =
          XLSX.utils.sheet_to_json(worksheet, { raw: true });
        console.log(`table`, tables);
        request.value = [];
        for (let i = 0; i < tables.length; i++) {
          let item = tables[i];
          request.value.push({
            agency_code: item.agency_code,
            pos_code: item.pos_code?.toString() ?? "",
            imei: item.imei?.toString() ?? "",
            device_id: item.device_id?.toString() ?? "",
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

async function onSubmit() {
  try {
    loading.value = true;
    const res = await axios.post(
      "/api/v1/device-movements/update-devices-agencies",
      {
        items: request.value,
      }
    );

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
    <v-card flat min-height="95vh" class="pa-6">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine :title="'ອັບເດດ Device agency'" />
        </v-col>

        <v-col cols="12" class="d-flex flex-wrap justify-end">
          <div class="mr-3">
            <v-btn
              color="primary"
              flat
              width="165px"
              @click="onFilUpload"
              :loading="loading"
              >Upload file</v-btn
            >

            <input
              type="file"
              ref="file"
              style="display: none"
              @change="onFileUploadChange"
            />
          </div>

          <div>
            <v-btn
              color="info"
              flat
              width="165px"
              :loading="loading"
              @click="onSubmit"
              :disabled="request.length === 0"
              >ບັນທຶກ</v-btn
            >
          </div>
        </v-col>

        <v-col cols="12">
          <div>ຂໍ້ມູນ {{ request.length }}</div>
          <v-data-table :items="request" :headers="headers" />
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
