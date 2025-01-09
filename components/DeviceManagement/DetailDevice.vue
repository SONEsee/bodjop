<template>
  <v-container>
    <h3>ໜ້າສະແເດງຂໍ້ມູນອຸປະກອນ / Detail of device</h3>

    <v-divider></v-divider>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="3">
          <label for="id"><p class="ml-2">ລະຫັດ POS / Pos No</p></label>
          <v-text-field
            v-if="item"
            id="id"
            density="compact"
            class="pa-2"
            color="primary"
            variant="outlined"
            readonly
            dense
            :model-value="item.pos_no"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <label for="code"><p class="ml-2">ລະຫັດ IMEI / IMEI Code</p></label>
          <v-text-field
            v-if="item"
            id="code"
            density="compact"
            class="pa-2"
            color="primary"
            readonly
            variant="outlined"
            dense
            :model-value="item.imei"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <label for="exdate"
            ><p class="ml-2">ຫຼ້າສຸດຢູ່ກັບໃຜ / Lastest owner</p></label
          >
          <v-text-field
            v-if="item"
            id="exdate"
            density="compact"
            class="pa-2"
            color="primary"
            readonly
            variant="outlined"
            dense
            :model-value="item.create_fullname"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <label for="create"
            ><p class="ml-2">ຄົນສ້າງຂໍ້ມູນ / Create by user</p></label
          >
          <v-text-field
            v-if="item"
            id="create"
            density="compact"
            class="pa-2"
            color="primary"
            readonly
            variant="outlined"
            dense
            :model-value="item.create_username"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="6">
          <h3>ຕຳແໜ່ງຫຼ້າສຸດ / Lastest location</h3>
          <v-divider></v-divider>
          <div class="mt-4">
            <v-img src="../../public/image/map.png" style="width: 90%"></v-img>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <h3>ປະຫວັດການກະຈາຍອຸປະກອນ / History of device managements</h3>
          <v-divider></v-divider>

          <v-data-table
        :headers="headers"
        :items="item?.device_transactions"
        density="compact"
        item-key="name"
      >
        <template v-slot:body="{ items }">
          <tr v-for="(item, index) in items" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.pos_no }}</td>

            <td>{{ item.imei }}</td>
            <td>{{ FormatDatetime(item.created_at) }}</td>
            <td>{{ item.status }}</td>
            
          </tr>
        </template>
      </v-data-table>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "@/helpers/axios";
import { DeviceDetailModels } from "@/models/";
import { useRoute } from "vue-router";

const route = useRoute();
const item = ref(null as DeviceDetailModels.DeviceDetailidResponseItems | null);
const query = route.query;
const id = query.id?.toString() ?? null;
const headers = [
  { title: "ລ/ດ", Value: "index" },
  { title: "POS No.", Value: "pos_no" },
  { title: "IMEI", Value: "imei" },
  { title: "ວັນທີສ້າງ", Value: "created_at" },
  { title: "ສະຖານະ", Value: "status" },
  { title: "ການຈັດການ", Value: "actions" },
];

const Getdata = async () => {
  try {
    if (id === null) {
      return;
    }
    const res = await axios.get<DeviceDetailModels.DeviceDetailidResponse>(
      `/api/v1/devices/detail/${id}`
    );
    if (res.status === 200) {
      item.value = res.data.items;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  Getdata();
});
</script>
