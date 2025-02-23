<script lang="ts" setup>
import axios from "@/helpers/axios";
const title = ref("ກັບອຸປະກອນເຂົ້າຫ້ອງການ");
const deviceStore = UseDeviceStore();
const deviceMovementStore = UseDeviceMovementStore();
const loading = ref(false);

const request = deviceMovementStore.request_return_device;

const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "POS No.", value: "pos_code" },
  { title: "IMEI", value: "imei" },
  { title: "ສະຖານະ", value: "status" },
  { title: "actions", value: "actions" },
]);

const devices = computed(() => {
  return deviceStore.response_device_selections;
});

async function onAddDevice() {
  if (request.device_id !== null) {
    request.devices.push(request.device_id);
    request.device_id = null;
  }
}

async function onSubmitForm() {
  try {
    const notification = await CallSwal({
      icon: "warning",
      title: "ຄຳເຕືອນ",
      text: `ທ່ານກຳລັງບັນທຶກຂໍ້ມູນການກະຈາຍທ່ານແນ່ໃຈແລ້ວບໍ່?`,
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (notification.isConfirmed) {
      loading.value = true;
      const dayjs = useDayjs();
      const res = await axios.post("/api/v1/device-movements/return", {
        devices: request.devices.map((d) => d.id),
        movement_date: dayjs(request.movement_date).format("YYYY-MM-DD"),
      });
      if (res.status === 200) {
        const successNotification = await CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
        });
        if (successNotification.isConfirmed) {
          delayGoPath("/devices-movements");
        } else {
          delayGoPath("/devices-movements");
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
</script>
<template>
  <section>
    <v-row>
      <v-col cols="12">
        <GlobalTextTitleLine :title="title" />
      </v-col>

      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <label>ວັນທີຕີກັບ</label>
            <DatePicker
              :date="request.movement_date"
              @on-set-date="request.movement_date = $event"
            />
          </v-col>
          <v-col cols="3">
            <label>ເລກອຸປະກອນ / Pos code</label>
            <v-autocomplete
              :items="
                devices.filter(
                  (d) => !request.devices.map((d) => d.id).includes(d.id)
                )
              "
              variant="outlined"
              hide-details
              :loading="loading"
              return-object
              no-filter
              v-model="request.device_id"
              :item-props="
                (item) => {
                  return {
                    title: 'ລະຫັດເຄື່ອງ',
                    subtitle: item.pos_code,
                  };
                }
              "
              item-title="pos_code"
              density="compact"
            >
              <template v-slot:selection="{ item }">
                {{ item.raw?.pos_code }}
              </template>
            </v-autocomplete>
          </v-col>

          <v-col cols="2">
            <div class="pt-7">
              <v-btn
                color="primary"
                flat
                @click="onAddDevice"
                :loading="loading"
                >+ ເພີ່ມ</v-btn
              >
            </div>
          </v-col>

          <v-col cols="4" class="d-flex flex-wrap align-center justify-end">
            <div>
              <v-btn
                color="info"
                width="160px"
                flat
                :loading="loading"
                @click="onSubmitForm"
                >ບັນທຶກ</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="request.devices"
          :loading="loading"
        >
          <template v-slot:item.no="{ index }">
            {{ index + 1 }}
          </template>

          <template v-slot:item.status="{ item }">
            <GlobalDefaultStatusChip :status="item.status" />
          </template>

          <template v-slot:item.actions="{ index }">
            <v-btn
              color="error"
              icon="mdi-delete"
              variant="text"
              size="small"
              @click="request.devices.splice(index, 1)"
            ></v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </section>
</template>
