<template>
  <v-container>
    <h3>ໜ້າສະແດງຂໍ້ມູນປະເພດລາຍຈ່າຍ / Detail Expense type</h3>
    <v-divider></v-divider>
    <div v-for="(item, index) in data">
      {{ item }}{{ index }}
      hi
    </div>
    <v-col cols="12" class="mt-4">
      <v-row>
        <v-col cols="12" md="3 ">
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
        <v-col cols="12" md="3">
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
        <v-col cols="12" md="3">
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
        :items="datarespons?.items.list_data"
        density="compact"
        item-key="name"
      >
        <template v-slot:body="{ items }">
          <tr v-for="(item, index) in items" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>

            <td>{{ item.name_en }}</td>
            <td>{{ new Date(item.created_at).toLocaleDateString() }}</td>
            <td>{{ item.status }}</td>
            <td>
              <a :href="`../expinse_type_managements/edit?id=${item.id}`">
                <v-icon icon="mdi-pencil" @click=""></v-icon
              ></a>

              <v-icon icon="mdi-delete" @click="detaildata"></v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-container>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "@/helpers/axios";
import { ExpenseCreateModel } from "@/models/";

const datarespons = ref<ExpenseCreateModel.ExpenseCreateResponse | null>(null);
const data = ref<ExpenseCreateModel.ExpenseDetailResponse | null>(null);
const error = ref<string | null>(null);
const headers = [
  { title: "ຊື່ພາສາລາວ", Value: "name" },
  { title: "ຊື່ພາສາອັງກິດ", Value: "name_en" },
  { title: "ຄົນສ້າງ", Value: "created_by" },
  { title: "ວັນທີສ້າງ", Value: "created_at" },
  { title: "ສະຖານະ", Value: "status" },
  { title: "ການຈັດການ", Value: "actions" },
];
const getdata = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      error.value = "Authorization token is missing.";
      return;
    }
    const res = await axios.get<ExpenseCreateModel.ExpenseCreateResponse>(
      "/api/v1/expense-types/get-data?limit=60&page=1",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      datarespons.value = res.data;

      console.log("test", res.data);
    }
  } catch (error) {
    console.log(error);
  }
};
const detaildata = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      error.value = "Authorization token is missing.";
      return;
    }
    const res = await axios.get<ExpenseCreateModel.ExpenseDetailResponse>(
      `/api/v1/expense-types/detail/${datarespons.value?.items.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      data.value = res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getdata();
  detaildata();
});
</script>
