<script setup lang="ts">
const UserManage = UserManageStore();

const response = computed(() => {
  return UserManage.response_query_data;
});
const request = UserManage.request_query_data;
async function onSelectionChange(limit: number) {
  request.limit = limit;
  await UserManage.GetData();
}
async function onPageChange(page: number) {
  request.page = page;
  await UserManage.GetData();
}
const title = "ຈັດການຜູ້ໃຊ້ງານ";
const headers = [
  { title: "ຊື່ຜູ້ໃຊ້", key: "username" },
  { title: "ຊື່ ແລະ ນາມສະກຸນ", key: "fullname" },
  { title: "ເບີໂທ", key: "phone_number" },
  { title: "ສິດການເຂົ້າໃຊ້", key: "role" },
  { title: "ສະຖານະ", key: "status" },
  { title: "ຮູບ", key: "image_profile" },
  { title: "ຈັດການ", key: "actions", sortable: false },
];

const OndeleteUser = async (id: string) => {
  const res = await UserManage.OndeleteUser(id);
  if (res instanceof Error) {
    return DefaultSwalError(res.message);
  }
  const notification = await CallSwal({
    icon: "success",
    title: "ສຳເລັດ",
    text: "ລົບຂໍ້ມູນສຳເລັດ",
  });
  if (notification.isConfirmed) {
    await UserManage.GetData();
  } else {
    await UserManage.GetData();
  }
};

onMounted(() => {
  UserManage.GetData();
});
</script>

<template>
  <div>
    <v-col cols="12">
      <GlobalTextTitleLine :title="title" />
    </v-col>
    <div class="d-flex justify-end align-end mr-3">
      <v-btn
        color="primary"
        @click="goPath('/manageuser/create')"
        prepend-icon="mdi-plus"
        flat
        >ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້ງານ</v-btn
      >
    </div>
    <v-data-table
      :headers="headers"
      :items="response?.list_data"
      :items-per-page="request.limit"
      :loading="request.loading"
      hide-default-footer
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
          @click="goPath(`/manageuser/edit?id=${item.id}`)"
          size="small"
        ></v-btn>

        <v-btn
          color="primary"
          icon="mdi-eye"
          variant="text"
          @click="goPath(`/manageuser/detail/?id=${item.id}`)"
          size="small"
        ></v-btn>

        <v-btn
          color="error"
          icon="mdi-delete"
          variant="text"
          size="small"
          @click="OndeleteUser(item.id)"
        ></v-btn>
      </template>

      <template v-slot:bottom>
        <GlobalTablePaginations
          :page="request.page"
          :limit="request.limit"
          :totalpage="response?.pagination.total_count ?? 1"
          @onSelectionChange="onSelectionChange"
          @onPagechange="onPageChange"
      /></template>
    </v-data-table>
  </div>
</template>
