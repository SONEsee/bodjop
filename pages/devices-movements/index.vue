<script lang="ts" setup>
const deviceMovementStore = UseDeviceMovementStore();
const request = deviceMovementStore.request_get_device_movement;
const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "ສ້າງວັນທີ", value: "created_at" },
  { title: "ອອກວັນທີ", value: "movement_date" },
  { title: "ຈຳນວນອຸປະກອນ", value: "total_pos_quantity" },
  { title: "ປະເພດ", value: "movement_type" },
  { title: "ຄົນສ້າງ", value: "user.fullname" },
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
              <div>
                <div>
                  <v-btn
                    color="primary"
                    variant="text"
                    icon="mdi-eye"
                    size="small"
                    @click="goPath(`/devices-movements/detail?id=${item.id}`)"
                  ></v-btn>
                </div>
              </div>
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
