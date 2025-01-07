<template>
  <v-container>
    <h3>ໜ້າສະແເດງຂໍ້ມູນອຸປະກອນ / Detail of device</h3>
    <div v-if="item">{{ item }}</div>
    <v-divider></v-divider>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="3">
          <label for="id"><p class="ml-2">ລະຫັດ POS / Pos No</p></label>
          <v-text-field
            id="id"
            density="compact"
            class="pa-2"
            color="primary"
            variant="outlined"
            readonly
            dense
          >{{ item?.pos_no }}</v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <label for="code"><p class="ml-2">ລະຫັດ IMEI / IMEI Code</p></label>
          <v-text-field
            id="code"
            density="compact"
            class="pa-2"
            color="primary"
            readonly
            variant="outlined"
            dense
          >{{ item?.imei }}</v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <label for="exdate"><p class="ml-2">ຫຼ້າສຸດຢູ່ກັບໃຜ / Lastest owner</p></label>
          <v-text-field
            id="exdate"
            density="compact"
            class="pa-2"
            color="primary"
            readonly
            variant="outlined"
            dense
          >{{ item?.create_fullname }}</v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <label for="create"><p class="ml-2">ຄົນສ້າງຂໍ້ມູນ / Create by user</p></label>
          <v-text-field
            id="create"
            density="compact"
            class="pa-2"
            color="primary"
            readonly
            variant="outlined"
            dense
          >{{ item?.create_username }}</v-text-field>
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
          {{ item?.device_transactions }}
          <v-data-table
            :items="item  ? item.device_transactions : []"
            density="compact"
            item-key="id"
          >
            <template v-slot:body="{ items }">
              <tr v-for="(transaction, index) in items" :key="transaction.id">
                <td>{{ index + 1 }}</td>
                <td>{{ transaction.name }}</td>
                <td>{{ transaction.name_en }}</td>
                <td>{{ FormatDatetime(transaction.created_at) }}</td>
                <td>{{ transaction.status }}</td>
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
import { DeviceDetailModel } from "@/models/";
import { useRoute } from "vue-router";

const route = useRoute();
const item = ref<DeviceDetailModel.Items | null>(null);
const query = route.query;
const id = query.id?.toString() ?? null;

const GetDetailData = async () => {
  try {
    if (id === null) {
      return;
    }

    const res = await axios.get<DeviceDetailModel.DeviceDetailidResponse>(
      `/api/v1/devices/detail/${id}`
    );
    if (res.status === 200) {
      console.log(`success`);
      item.value = res.data.items;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  GetDetailData();
});
</script>