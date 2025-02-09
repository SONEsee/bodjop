<script lang="ts" setup>
import axios from "@/helpers/axios";

const deviceStore = UseDeviceStore();

const request = deviceStore.request_device_movement;
const loading = ref(false);

const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "POS No.", value: "pos_code" },
  { title: "IMEI", value: "imei" },
  { title: "ສະຖານະ", value: "status" },
  //   { title: "actions", value: "actions" },
]);

const onSubmit = async () => {
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
      const res = await axios.post("/api/v1/device-movements/exports", {
        agency_id: request.agency_id?.id ?? null,
        movement_date: dayjs(request.movement_date).format("YYYY-MM-DD"),
        device_id: request.list_device_id.map((d) => d.id),
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
};
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine :title="'ສະຫຼຸບຂໍ້ມູນ'" />
        </v-col>

        <v-col cols="12">
          <h4>ຕົວແທນ</h4>
        </v-col>

        <v-col cols="12">
          <v-row>
            <v-col cols="3">
              <GlobalCardTitle
                :title="'ຊື່ເຕັມ'"
                :text="request.agency_id?.fullname ?? 'N/A'"
              />
            </v-col>

            <v-col cols="3">
              <GlobalCardTitle
                :title="'ລະຫັດຕົວແທນ'"
                :text="request.agency_id?.agent_code ?? 'N/A'"
              />
            </v-col>

            <v-col cols="3">
              <GlobalCardTitle
                :title="'ຊື່ຫຼິ້ນ'"
                :text="request.agency_id?.nick_name ?? 'N/A'"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <div>ຂໍ້ມູນອຸປະກອນ ({{ request.list_device_id.length }})</div>

          <v-data-table :headers="headers" :items="request.list_device_id">
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
                @click="request.list_device_id.splice(index, 1)"
              ></v-btn>
            </template>
          </v-data-table>
        </v-col>

        <v-col cols="12" class="d-flex flex-wrap justify-center">
          <div class="d-flex flex-wrap">
            <div class="mr-4">
              <v-btn
                color="grey"
                width="165px"
                @click="request.window = 1"
                :loading="loading"
                flat
                >ຍົກເລີກ</v-btn
              >
            </div>

            <div>
              <v-btn
                color="info"
                width="165px"
                flat
                :loading="loading"
                @click="onSubmit()"
                >ບັນທຶກ</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
