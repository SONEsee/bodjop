<script lang="ts" setup>
import { ref } from "vue";
import { onDeviceUploadFile } from "@/helpers/xlsx";
import axios from "@/helpers/axios";
import type { DeviceModel } from "~/models";

const form = ref();
const pos_no = ref("");
const imei = ref("");
const file = ref();
const loading = ref(false);
const deviceStore = UseDeviceStore();
const headers = ref([
  {
    title: "ລຳດັບ",
    value: "no",
  },
  {
    title: "Pos code",
    value: "pos_code",
  },
  {
    title: "IMEI",
    value: "imei",
  },
  {
    title: "actions",
    value: "actions",
  },
]);
const request_option = ref("1");

const response_devices_upload = computed(() => {
  return deviceStore.request_device_uploads;
});

const onOpenClickUpload = () => {
  file.value.click();
};

const onSubmitForm = async () => {
  try {
    const { valid } = await form.value.validate();
    if (valid) {
      const respons = await axios.post<DeviceModel.DeviceResponse>(
        "/api/v1/devices/new",
        {
          pos_no: pos_no.value,
          imei: imei.value,
        }
      );
      if (respons.status === 200) {
        const notification = await CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ການເພີ່ມຂໍ້ມູນສຳເລັດ",
        });

        if (notification.isConfirmed) {
          delayGoPath("/devices");
        } else {
          delayGoPath("/devices");
        }
      }
    }
  } catch (e) {
    console.log(e);
    DefaultSwalError(e);
  }
};

async function onFileUpload(event: Event) {
  try {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result as ArrayBuffer;
        const result = await onDeviceUploadFile(data);
        if (result instanceof Error) {
          return DefaultSwalError(result);
        }

        deviceStore.request_device_uploads = result;
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

async function onSubmitMultiple() {
  try {
    if (response_devices_upload.value.length < 1) {
      return;
    }

    loading.value = true;
    const res = await axios.post("/api/v1/devices/multiples", {
      items: response_devices_upload.value,
    });
    if (res.status === 200) {
      const notification = await CallSwal({
        icon: "success",
        title: "ສຳເລັດ",
        text: "ການເພີ່ມຂໍ້ມູນສຳເລັດ",
      });

      if (notification.isConfirmed) {
        delayGoPath("/devices");
      } else {
        delayGoPath("/devices");
      }
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
  <section>
    <v-row>
      <v-col cols="12">
        <GlobalTextTitleLine :title="'ເພີ່ມຂໍ້ມູນອຸປະກອນ'" />
      </v-col>

      <v-col cols="12">
        <v-radio-group
          v-model="request_option"
          inline
          hide-details
          color="primary"
        >
          <v-radio label="ສ້າງຂໍ້ມູນແບບຟອມ" value="1"></v-radio>
          <v-radio label="ສ້າງແບບອັບໂຫຼດຟາຍ" value="2"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12" v-if="request_option === '1'">
        <v-form ref="form" @submit.prevent="onSubmitForm">
          <v-row>
            <v-col cols="3">
              <label>ລະຫັດ POS / Pos No</label>
              <v-text-field
                v-model="pos_no"
                density="compact"
                class="pa-2"
                variant="outlined"
                hide-details="auto"
                :rules="[(val: string) => !!val || 'ກະລຸນາປ້ອນລະຫັດ POS']"
              ></v-text-field>
            </v-col>

            <v-col cols="3">
              <label>ລະຫັດ IMEI / IMEI Code</label>
              <v-text-field
                v-model="imei"
                density="compact"
                class="pa-2"
                variant="outlined"
                hide-details="auto"
                :rules="[(val:string) => !!val || 'ກະລຸນາປ້ອນລະຫັດ IMEI']"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="d-flex justify-center">
              <div>
                <v-btn color="primary" width="180px" type="submit" flat>
                  ບັນທຶກ
                </v-btn>
                <v-btn
                  color="#90A4AE"
                  width="180px"
                  flat
                  class="ml-3"
                  @click="goPath('/devices')"
                >
                  ຍົກເລິກ
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-col>

      <v-col cols="12" v-else>
        <v-row>
          <v-col cols="12" class="d-flex flex-wrap justify-end">
            <div class="mr-4">
              <v-btn
                color="#008CBA"
                flat
                width="140px"
                @click="onOpenClickUpload"
                :loading="loading"
                >ອັບໂຫຼດ</v-btn
              >
              <input
                type="file"
                style="display: none"
                ref="file"
                @change="onFileUpload"
              />
            </div>

            <div>
              <a
                href="/uploads/UPLOAD_DEVICE_FILE.xlsx"
                download="device_upload_file.xlsx"
                target="_blank"
              >
                <v-btn
                  color="primary"
                  flat
                  prepend-icon="mdi-file-excel"
                  :loading="loading"
                  >ດາວໂຫຼດຟາຍອັບໂຫຼດ</v-btn
                >
              </a>
            </div>
          </v-col>

          <v-col cols="12">
            <v-data-table :items="response_devices_upload" :headers="headers">
              <template v-slot:item.no="{ index }">
                {{ index + 1 }}
              </template>

              <template v-slot:item.actions="{ index }">
                <v-btn
                  color="error"
                  icon="mdi-delete"
                  variant="text"
                  :loading="loading"
                  size="small"
                  @click="deviceStore.request_device_uploads.splice(index, 1)"
                ></v-btn>
              </template>
            </v-data-table>
          </v-col>

          <v-col cols="12" class="d-flex flex-wrap justify-center">
            <div>
              <v-btn
                color="info"
                width="150px"
                flat
                :loading="loading"
                :disabled="response_devices_upload.length === 0"
                @click="onSubmitMultiple"
                >ບັນທຶກ</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>
