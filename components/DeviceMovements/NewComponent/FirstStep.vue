<script lang="ts" setup>
const agencyStore = UseAgencyStore();
const deviceStore = UseDeviceStore();
const title = ref("ເພີ່ມຂໍ້ມູນການກະຈາຍອຸປະກອນ");

const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "POS No.", value: "pos_code" },
  { title: "IMEI", value: "imei" },
  { title: "ສະຖານະ", value: "status" },
  { title: "actions", value: "actions" },
]);

const request = deviceStore.request_device_movement;

const agencies = computed(() => {
  return agencyStore.agency_selections;
});

const devices = computed(() => {
  return deviceStore.response_device_selections;
});

const onAddDevice = () => {
  if (request.device_id === null) {
    return;
  }

  request.list_device_id.push(request.device_id);
  request.device_id = null;
};

const debounceGetDevice = useDebounceFn((value: string | null) => {
  deviceStore.GetDeviceSelections(1, value);
}, 800);

const debounceOfAgencies = useDebounceFn((value: string | null) => {
  agencyStore.GetAgencySelections(value);
}, 800);
onMounted(() => {
  // agencyStore.GetAgencySelections(null);
  // deviceStore.GetDeviceSelections(1, null);
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <GlobalTextTitleLine :title="title" />
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="3">
          <label>ເວລາເຄື່ອນຍ້າຍ</label>
          <DatePicker
            :date="request.movement_date"
            @on-set-date="request.movement_date = $event"
          />
        </v-col>
        <v-col cols="3">
          <label>ເລືອກຕົວແທນ / Agency</label>
          <v-autocomplete
            :items="agencies"
            variant="outlined"
            hide-details
            item-title="fullname"
            return-object
            no-filter
            density="comfortable"
            clearable
            @update:search="debounceOfAgencies"
            v-model="request.agency_id"
          >
            <template v-slot:selection="{ item }">
              {{ item.title }} - {{ item.raw?.agent_code ?? "N/A" }}
            </template>
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :subtitle="item.raw.agent_code"
                :title="item.raw.fullname"
              ></v-list-item>
            </template>
          </v-autocomplete>
        </v-col>

        <v-col cols="3">
          <label>ອຸປະກອນ / Devices</label>
          <v-autocomplete
            :items="
              devices.filter(
                (d) => !request.list_device_id.map((d) => d.id).includes(d.id)
              )
            "
            variant="outlined"
            hide-details
            return-object
            no-filter
            @update:search="debounceGetDevice"
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
            density="comfortable"
          >
            <template v-slot:selection="{ item }">
              {{ item.raw?.pos_code }}
            </template>
          </v-autocomplete>
        </v-col>

        <v-col cols="3">
          <div class="pt-7">
            <v-btn
              color="primary"
              width="85px"
              flat
              @click="onAddDevice()"
              :disabled="request.device_id === null"
              >+ ເພີ່ມ</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <div>ລາຍການອຸປະກອນ ({{ request.list_device_id.length }})</div>

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
      <div>
        <div>
          <v-btn
            color="info"
            width="165px"
            :disabled="request.list_device_id.length == 0"
            flat
            @click="request.window = 2"
            >ຕໍ່ໄປ</v-btn
          >
        </div>
      </div>
    </v-col>
  </v-row>
</template>
