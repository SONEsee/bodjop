<script setup lang="ts">
const title = "ຈັດການຜູ້ໃຊ້ງານ";
const userStore = UseUserStore();
onMounted(async () => {
  try {
    await userStore.GetData();
  } catch (error) {
    console.error("Failed to load users:", error);
  }
});
const response_data = computed(() => {
  return userStore.respons_query_data;
});
const request = userStore.request_query_data;
async function onSelectionChange(limit: number) {
  request.limit = limit;
  await userStore.GetData();
}
async function onPageChange(page: number) {
  request.page = page;
  await userStore.GetData();
}
const headers = [
  { title: "ຊື່ຜູ້ໃຊ້", key: "username" },
  { title: "ຊື່ ແລະ ນາມສະກຸນ", key: "fullname" },
  { title: "ເບີໂທ", key: "phone_number" },
  { title: "ສິດການເຂົ້າໃຊ້", key: "role" },
  { title: "ສະຖານະ", key: "status" },
  { title: "ຮູບ", key: "image_profile" },
  { title: "ຈັດການ", key: "actions", sortable: false },
];
const onDeleteUser = async (id: string) => {
  const res = await userStore.OndeleteUser(id);
  if (res instanceof Error) {
    return DefaultSwalError(res.message);
  }
  const notification = await CallSwal({
    icon: "success",
    title: "ສຳເລັດ",
    text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
  });
  if (notification.isConfirmed) {
    await userStore.GetData();
  } else {
    await userStore.GetData();
  }
};
const onsetinput = async (input: string | null) => {
  if (request !== null) {
    request.q = input ?? null;
    await userStore.GetData();
  }
};
</script>
<template>
  
  <div>
   
    <v-col cols="12">
    <GlobalTextTitleLine :title="title" />
  </v-col>
  <div class="d-flex justify-end align-end mr-3">
    <v-btn
      color="primary"
      :to="{ path: '/user/create' }"
      prepend-icon="mdi-plus"
      >ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້ງານ</v-btn
    >
  </div>
    <v-data-table 
    :headers="headers"
    :items="userStore.respons_query_data?.items.list_data " 
    
    >
    <template v-slot:item.no="{ item, index }">
              {{ index + 1 }}
            </template>
            <template v-slot:item.image="{ item }">
              <div class="pa-2">
                <GlobalMenuSpanImage :image="item.image_profile" />
              </div>
            </template>
            <template v-slot:item.villages="{ item }">
              {{ item?.created_at ?? "" }},
             
            </template>
            <template v-slot:item.status="{ item }">
              <GlobalDefaultStatusChip :status="item.status" />
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                color="primary"
                icon="mdi-pencil"
                variant="text"
                @click="goPath(`/user/edit?id=${item.id}`)"
                size="small"
              ></v-btn>

              <v-btn
                color="primary"
                icon="mdi-eye"
                variant="text"
                @click="goPath(`/user/detail?id=${item.id}`)"
                size="small"
              ></v-btn>

              <v-btn
                color="error"
                icon="mdi-delete"
                variant="text"
                size="small"
                @click="onDeleteUser(item.id)"
                
              ></v-btn>
            </template>
            <template v-slot:bottom>
    <GlobalTablePaginations
                :page="request.page"
                :limit="request.limit"
                :totalpage="userStore.respons_query_data?.items.pagination.total_page ?? 1"
                @onSelectionChange="onSelectionChange"
                @onPagechange="onPageChange"
              /></template>
      </v-data-table>
  </div>
</template>

