<script lang="ts" setup>
const deviceMovementStore = UseDeviceMovementStore();

const response_data = computed(() => {
  return (
    deviceMovementStore.response_detail_data?.device_movement_details ?? []
  );
});

const headers = ref([
  { title: "ລ/ດ", value: "no" },
  { title: "POS No.", value: "pos_no" },
  { title: "IMEI", value: "imei" },
  //   { title: "ສະຖານະ", value: "status" },
  //   { title: "actions", value: "actions" },
]);
</script>
<template>
  <v-row>
    <v-col cols="12">
      <div>
        <h4>
          ຂໍ້ມູນອຸປະກອນໃນລາຍການ ({{ formatnumber(response_data.length) }})
        </h4>
      </div>
    </v-col>

    <v-col cols="12">
      <v-data-table :headers="headers" :items="response_data">
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
