<template>
  <v-container>
    <h3>ໜ້າສະແດງຂໍ້ມູນປະເພດລາຍຈ່າຍ / Detail Expense type</h3>
    <v-divider></v-divider>

    <v-col cols="12" class="mt-4 d-flex flex-wrap">
      <v-row>
        <v-col cols="3"  > 
          <label for="id"><p class="ml-2">ຊື່ພາສາລາວ / Name</p></label>
          <v-text-field
            id="id"
            density="compact"
            class="pa-2"
            color="primary"
            variant="outlined"
            readonly
            outlined
            dense
            >sone</v-text-field
          >
        </v-col>
        <v-col cols="3" >
          <label for="code"
            ><p class="ml-2">ຊື່ພາສາອັງກິດ / Name English</p></label
          >
          <v-text-field
            id="code"
            density="compact"
            class="pa-2"
            color="primary"
            readonly
            variant="outlined"
            dense
            >sone</v-text-field
          >
        </v-col>
        <v-col cols="3" >
          <label for="exdate"
            ><p class="ml-2">ຄົນສ້າງ / Create by user</p></label
          >
          <v-text-field
            id="exdate"
            density="compact"
            class="pa-2"
            color="primary"
            readonly
            variant="outlined"
            dense
            >Binh xayxana</v-text-field
          >
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="dataget?.items.list_data"
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
            <td>
              <v-btn
                icon="mdi-eye"
                variant="text"
                color="primary"
                size="small"
                @click="
                  goPath(`/device_manage_agency/detail?id=${item.id}`)
                "
              />
              <v-btn
                icon="mdi-pencil"
                size="small"
                variant="text"
                color="primary"
                @click="goPath(`/device_manage_agency/edit?id=${item.id}`)"
              />
              <v-btn
                icon="mdi-delete-outline"
                size="small"
                variant="text"
                color="error"
                @click="deleteData(item.id)"
              />
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-container>
</template>
<script lang="ts" setup>
import axios from "@/helpers/axios";
import { ref, onMounted } from "vue";
import { DeviceDetailModel } from "@/models/";
import Swal from "sweetalert2";
const dataget = ref<DeviceDetailModel.DeviceDetailResponse | null>(null);
const item = ref<DeviceDetailModel.DeviceDetailResponse | null>(null);
const error = ref<string | null>(null);

const headers = [
  { title: "ລ/ດ", Value: "index" },
  { title: "POS No.", Value: "pos_no" },
  { title: "IMEI", Value: "imei" },
  { title: "ວັນທີສ້າງ", Value: "created_at" },
  { title: "ສະຖານະ", Value: "status" },
  { title: "ການຈັດການ", Value: "actions" },
];
const request = ref({
  limit: 20,
  page: 1,
});
const getdata = async () => {
  try {
    const respons = await axios.get<DeviceDetailModel.DeviceDetailResponse>(
      "/api/v1/devices/get-data?limit=20&page=1",
      {
        params: {
          ...request.value,
        },
      }
    );
    if (respons.status === 200) {
      dataget.value = respons.data;
      console.log("get data success");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (id: string) => {
  try {
    const confirmed = await Swal.fire({
      title: "ຢືນຢັນການລົບ?",
      text: "ເຈົ້າຈະບໍ່ສາມາດກູ້ຄືນຂໍ້ມູນນີ້ໄດ້!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ຢືນຢັນ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (confirmed.isConfirmed) {
      const res = await axios.delete<DeviceDetailModel.DeviceDetailResponse>(
        `/api/v1/devices/delete-data/${id}`
      );
      if (res.status === 200) {
        Swal.fire("ສໍາເລັດ!", "ຂໍ້ມູນຖືກລົບສໍາເລັດ.", "success");
        await getdata();
      }
    }
  } catch (error) {
    console.error(error);
    Swal.fire("ຜິດພາດ!", "ບໍ່ສາມາດລົບຂໍ້ມູນໄດ້.", "error");
  }
};
onMounted(() => {
  getdata();
});
</script>
