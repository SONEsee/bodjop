<template>
  <section>
    <v-row>
      <v-col cols="12">
        <GlobalTextTitleLine :title="title" />
      </v-col>

      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="dataget?.items.list_data ?? []"
          density="comfortable"
          :loading="loading"
        >
          <template v-slot:body="{ items }">
            <tr v-for="(item, index) in items" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.pos_no }}</td>

              <td>{{ item.imei }}</td>

              <td>{{ FormatDatetime(item.created_at) }}</td>

              <td>
                <GlobalDefaultStatusChip :status="item.status" />
              </td>

              <td>
                <v-btn
                  icon="mdi-eye"
                  variant="text"
                  color="primary"
                  size="small"
                  @click="goPath(`/devices/detail?id=${item.id}`)"
                />
                <v-btn
                  icon="mdi-pencil"
                  size="small"
                  variant="text"
                  color="primary"
                  @click="goPath(`/devices/edit?id=${item.id}`)"
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
    </v-row>
  </section>
</template>
<script lang="ts" setup>
import axios from "@/helpers/axios";
import { ref, onMounted } from "vue";
import { DeviceDetailModel } from "@/models/";
import Swal from "sweetalert2";
const dataget = ref<DeviceDetailModel.DeviceDetailResponse | null>(null);
const title = ref("ໜ້າສະແດງຂໍ້ມູນອຸປະກອນ / Device managements");
const loading = ref(false);

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
    loading.value = true;
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
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
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
