<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

import axios from "@/helpers/axios";
const deviceMovementStore = UseDeviceMovementStore();
const request = deviceMovementStore.request_get_device_movement;
const loading = ref(false);
const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ສ້າງວັນທີ", value: "created_at" },
  { title: "ອອກວັນທີ", value: "movement_date" },
  { title: "ຈຳນວນອຸປະກອນ", value: "total_pos_quantity" },
  { title: "ປະເພດ", value: "movement_type" },
  { title: "ຄົນສ້າງ", value: "user.fullname" },
  { title: "ສະຖານະ", value: "status" },
  { title: "Actions", value: "actions" },
]);

const response_data = computed(() => {
  return deviceMovementStore.response_device_movement_data;
});

const onPageChange = async (page: number) => {
  request.page = page;
  await deviceMovementStore.GetDeviceMovementData();
};

const onSelectionChange = async (selection: number) => {
  request.limit = selection;
  await deviceMovementStore.GetDeviceMovementData();
};

const ondeleteMovement = async (id: string) => {
  try {
    const notification = await CallSwal({
      icon: "warning",
      title: "ຄຳເຕືອນ",
      text: "ທ່ານກຳລັງລົບ ທ່ານແນ່ໃຈແລ້ວບໍ່?",
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (notification.isConfirmed) {
      loading.value = true;
      const res = await axios.delete(`/api/v1/device-movements/cancel/${id}`);
      if (res.status === 200) {
        const successNotification = await CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
        });
        if (successNotification.isConfirmed) {
          await deviceMovementStore.GetDeviceMovementData();
        } else {
          await deviceMovementStore.GetDeviceMovementData();
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

onMounted(() => {
  deviceMovementStore.GetDeviceMovementData();
});
</script>

<template>
  <section class="pa-6">
    <v-card class="pa-6" flat min-height="95vh">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine
            :title="`ຂໍ້ມູນການກະຈາຍ (${
              response_data?.pagination?.total_count ?? 0
            })`"
          />
        </v-col>

        <v-col cols="12" class="d-flex flex-wrap justify-end">
          <div class="d-flex">
            <div class="mr-3">
              <v-btn
                color="primary"
                width="165px"
                flat
                prepend-icon="mdi-clipboard-arrow-right"
                @click="goPath('/devices-movements/transports')"
                >ກະຈາຍອຸປະກອນ</v-btn
              >
            </div>

            <div>
              <v-btn
                color="primary"
                width="165px"
                flat
                prepend-icon="mdi-clipboard-arrow-left"
                @click="goPath('/devices-movements/return')"
                >ອຸປະກອນກັບຫ້ອງການ</v-btn
              >
            </div>
          </div>
        </v-col>

        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="response_data?.list_data ?? []"
            :loading="request.loading"
            :items-per-page="request.limit"
            hide-default-footer
          >
            <template v-slot:item.no="{ index }">
              {{ index + (request.page - 1) * request.limit + 1 }}
            </template>

            <template v-slot:item.created_at="{ item }">
              {{ FormatDatetime(item.created_at) }}
            </template>

            <template v-slot:item.movement_date="{ item }">
              {{ FormatDate(item.movement_date) }}
            </template>

            <template v-slot:item.movement_type="{ item }">
              {{
                item.movement_type === "OUT"
                  ? "ກະຈາຍອຸປະກອນ"
                  : "ກັບຄືນເຂົ້າຫ້ອງການ"
              }}
            </template>

            <template v-slot:item.actions="{ item }">
              <div class="d-flex flex-wrap">
                <div>
                  <v-btn
                    color="primary"
                    variant="text"
                    icon="mdi-eye"
                    size="small"
                    :loading="loading"
                    @click="goPath(`/devices-movements/detail?id=${item.id}`)"
                  ></v-btn>
                </div>

                <div>
                  <v-btn
                    color="error"
                    variant="text"
                    icon="mdi-delete"
                    :loading="loading"
                    size="small"
                    :disabled="item.status === 2 || item.movement_type === 'IN'"
                    @click="ondeleteMovement(item.id)"
                  ></v-btn>
                </div>
              </div>
            </template>

            <template v-slot:item.status="{ item }">
              <GlobalDefaultStatusChip :status="item.status" />
            </template>

            <template v-slot:bottom>
              <GlobalTablePaginations
                :page="request.page"
                :limit="request.limit"
                :totalpage="response_data?.pagination?.total_page ?? 1"
                @onPagechange="onPageChange"
                @onSelectionChange="onSelectionChange"
              />
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>
