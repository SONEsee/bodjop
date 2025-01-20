<script setup lang="ts">
import { ref } from "vue";
import axios from "@/helpers/axios";

const title = "ຈັດການຜູ້ໃຊ້ງານ";
interface User {
  id: string;
  username: string;
  fullname: string;
  phone_number: string;
  role: string;
  status: number;
}

const headers = [
  { title: "ຊື່ຜູ້ໃຊ້", key: "username" },
  { title: "ຊື່ ແລະ ນາມສະກຸນ", key: "fullname" },
  { title: "ເບີໂທ", key: "phone_number" },
  { title: "ສິດການເຂົ້າໃຊ້", key: "role" },
  { title: "ສະຖານະ", key: "status" },
  { title: "ຈັດການ", key: "actions", sortable: false },
];
const data = [
  {
    id: "1",
    username: "admin",
    fullname: "Admin",
    phone_number: "020 12345678",
    role: "Admin",
    status: 1,
  },
  {
    id: "2",
    username: "user",
    fullname: "User",
    phone_number: "020 87654321",
    role: "User",
    status: 1,
  },
  {
    id: "2",
    username: "user",
    fullname: "User",
    phone_number: "020 87654321",
    role: "User",
    status: 1,
  },
  {
    id: "2",
    username: "user",
    fullname: "User",
    phone_number: "020 87654321",
    role: "User",
    status: 1,
  },
  {
    id: "2",
    username: "user",
    fullname: "User",
    phone_number: "020 87654321",
    role: "User",
    status: 1,
  },
  {
    id: "2",
    username: "user",
    fullname: "User",
    phone_number: "020 87654321",
    role: "User",
    status: 1,
  },
  {
    id: "2",
    username: "user",
    fullname: "User",
    phone_number: "020 87654321",
    role: "User",
    status: 1,
  },
  {
    id: "2",
    username: "user",
    fullname: "User",
    phone_number: "020 87654321",
    role: "User",
    status: 1,
  },
];

const items = ref<User[]>([]);
const loading = ref(true);
const totalItems = ref(0);
const itemsPerPage = ref(10);

const loadItems = async (options: any) => {
  try {
    loading.value = true;
    const { page, itemsPerPage, sortBy } = options;

    const response = await axios.get("/api/v1/users", {
      params: {
        page,
        per_page: itemsPerPage,
        sort_by: sortBy[0]?.key,
        sort_order: sortBy[0]?.order,
      },
    });

    items.value = response.data.items;
    totalItems.value = response.data.total;
  } catch (error) {
    console.error("Failed to load users:", error);
  } finally {
    loading.value = false;
  }
};

const editItem = (item: User) => {};
</script>
<template>
  <v-col cols="12">
    <GlobalTextTitleLine :title="title" />
  </v-col>
  <div class="d-flex justify-end align-end mr-3">
    <v-btn color="primary" :to="{path:'/user/create'}"
    prepend-icon="mdi-plus" 
      >ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້ງານ</v-btn
    >
  </div>

  <v-col cols="12">
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="data"
      :items-length="totalItems"
      :loading="loading"
      item-value="id"
      @update:options="loadItems"
    >
      <template v-slot:item.status="{ item }">
        <v-chip :color="item.status === 1 ? 'success' : 'error'">
          {{ item.status === 1 ? "Active" : "Inactive" }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <!-- <v-btn icon small @click="editItem(item)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn> -->
        <v-btn
          icon="mdi-eye"
          variant="text"
          size="small"
          color="primary"
        ></v-btn>
        <v-btn
          icon="mdi-pencil"
          variant="text"
          size="small"
          color="info"
        ></v-btn>
        <v-btn
          icon="mdi-delete"
          variant="text"
          size="small"
          color="error"
        ></v-btn>
      </template> </v-data-table-server
  ></v-col>
</template>


