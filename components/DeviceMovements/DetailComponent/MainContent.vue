<script lang="ts" setup>
const deviceMovementStore = UseDeviceMovementStore();

const response_data = computed(() => {
  return deviceMovementStore.response_detail_data;
});
</script>
<template>
  <section>
    <v-row>
      <v-col cols="12">
        <GlobalTextTitleLine :title="'ລາຍລະອຽດການກະຈາຍ'" />
      </v-col>

      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <GlobalCardTitle
              :title="'ສ້າງວັນທີ'"
              :text="FormatDatetime(response_data?.created_at)"
            />
          </v-col>

          <v-col cols="3">
            <GlobalCardTitle
              :title="'ສ້າງໂດຍ'"
              :text="response_data?.user?.fullname ?? 'N/A'"
            />
          </v-col>

          <v-col cols="3">
            <GlobalCardTitle
              :title="'ຈຳນວນອຸປະກອນທັງໝົດ'"
              :text="formatnumber(response_data?.total_pos_quantity ?? 0)"
            />
          </v-col>

          <v-col cols="3">
            <GlobalCardTitle
              :title="'ກະຈາຍວັນທີ'"
              :text="FormatDate(response_data?.movement_date)"
            />
          </v-col>

          <v-col cols="3">
            <GlobalCardTitle
              :title="'ປະເພດການກະຈາຍ'"
              :text="
                response_data?.movement_type === 'OUT'
                  ? 'ກະຈາຍອຸປະກອນ'
                  : 'ຮັບເຂົ້າຫ້ອງການ'
              "
            />
          </v-col>

          <v-col cols="3">
            <GlobalCardTitle
              :title="'ຕົວແທນ'"
              :text="`${response_data?.agency?.fullname ?? 'N/A'} - ${
                response_data?.agency?.agent_code
              }`"
            />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <DeviceMovementsDetailComponentDeviceTables />
      </v-col>
    </v-row>
  </section>
</template>
