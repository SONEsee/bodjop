<template>
  <section>
    <v-row>
      <v-col cols="12">
        <GlobalTextTitleLine
          :title="`${title} (${formatnumber(
            dataget?.items?.pagination?.total_count ?? 0
          )})`"
        />
      </v-col>

      <v-col
        cols="12"
        class="d-flex flex-wrap justify-space-between align-center"
      >
        <div style="width: 250px">
          <GlobalDebounceEventTextField
            :input="request.q"
            :label="'ຄົ້ນຫາ'"
            @setinput="onInputChange"
          />
        </div>

        <div>
          <v-btn
            color="primary"
            flat
            width="180px"
            @click="goPath('/devices/new')"
          >
            + ເພີ່ມອຸປະກອນ</v-btn
          >
        </div>
      </v-col>

      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="dataget?.items.list_data ?? []"
          :loading="loading"
          :itemsPerPage="request.limit"
        >
          <template v-slot:item.index="{ index }">
            {{ index + (request.page - 1) * request.limit + 1 }}
          </template>

          <template v-slot:item.created_at="{ item }">
            {{ FormatDatetime(item.created_at) }}
          </template>
          <!-- <template v-slot:body="{ items }">
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
          </template> -->

          <template v-slot:item.status="{ item }">
            <GlobalDefaultStatusChip :status="item.status" />
          </template>

          <template v-slot:item.actions="{ item }">
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
          </template>

          <template v-slot:bottom>
            <GlobalTablePaginations
              :page="request.page"
              :limit="request.limit"
              :totalpage="dataget?.items?.pagination?.total_page ?? 1"
              @onSelectionChange="onSelectChange"
              @onPagechange="onPageChange"
            />
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
  { title: "ລ/ດ", value: "index" },
  { title: "POS No.", value: "pos_no" },
  { title: "IMEI", value: "imei" },
  { title: "ວັນທີສ້າງ", value: "created_at" },
  { title: "ເຈົ້າຂອງຫຼ້າສຸດ", value: "lastest_user.nick_name" },
  { title: "ສະຖານະ", value: "status" },
  { title: "ການຈັດການ", value: "actions" },
];

const request = ref({
  limit: 20,
  page: 1,
  q: null as string | null,
});

const onSelectChange = async (value: number) => {
  request.value.limit = value;
  await getdata();
};

const onPageChange = async (value: number) => {
  request.value.page = value;
  await getdata();
};

async function onInputChange(input: string | null) {
  request.value.q = input;
  await getdata();
}

const getdata = async () => {
  try {
    loading.value = true;
    const respons = await axios.get<DeviceDetailModel.DeviceDetailResponse>(
      "/api/v1/devices/get-data",
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
