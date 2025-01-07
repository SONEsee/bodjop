<template>
  <v-container>
    <h3>ໜ້າສະແດງຂໍ້ມູນປະເພດລາຍຈ່າຍ / Detail Expense type</h3>
    <v-divider></v-divider>
    <v-col cols="12" class="mt-4">
      <v-row>
        <v-col cols="12" md="3">
          <label>ຊື່ພາສາລາວ / Name</label>
          <v-text-field
            id="id"
            density="compact"
            class="pa-2"
            color="primary"
            variant="outlined"
            readonly
            outlined
            :model-value="item?.name ?? ''"
            dense
          ></v-text-field>
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
            :model-value="item?.name_en ?? ''"
          ></v-text-field>
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
            :model-value="item?.user?.fullname ?? ''"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "@/helpers/axios";
import { ExpenseCreateModel } from "@/models/";
const route = useRoute();

const item = ref(null as ExpenseCreateModel.ExpenseDetailResponseItems | null);
const query = route.query;
const id = query.id?.toString() ?? null;

const GetDetailData = async () => {
  try {
    if (id === null) {
      return;
    }
    

    const res = await axios.get<ExpenseCreateModel.ExpenseDetailResponse>(
      `/api/v1/expense-types/detail/${id}`
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
