<template>
  <v-container>
    <h3>ແກ້ໄຂຂໍ້ມູນປະເພດລາຍຈ່າຍ / Edit Expense Type</h3>
    <v-divider></v-divider>
    <v-form ref="form" @submit.prevent="handleSubmit">
      <v-row>
        <v-col cols="12" md="6" class="mt-4">
          <label for="name"><p class="ml-2">ຊື່ພາສາລາວ / Name</p></label>
          <v-text-field
            v-model="formData.name"
            :rules="[rules.required]"
            id="name"
            density="compact"
            class="pa-2"
            color="primary"
            variant="outlined"
            label="ກະລຸນາປ້ອນຊື່ພາສາລາວ / Name"
          />
        </v-col>
        <v-col cols="12" md="6" class="mt-4">
          <label for="name_en"
            ><p class="ml-2">ຊື່ພາສາອັງກິດ / Name English</p></label
          >
          <v-text-field
            v-model="formData.name_en"
            :rules="[rules.required]"
            id="name_en"
            density="compact"
            class="pa-2"
            color="primary"
            variant="outlined"
            label="ກະລຸນາປ້ອນຊື່ພາສາອັງກິດ / Name English"
          />
        </v-col>
      </v-row>
      <div class="d-flex justify-center mt-6">
        <v-btn
          color="primary"
          class="rounded-lg"
          style="width: 10%"
          type="submit"
        >
          <p class="pa-1">ບັນທຶກ</p>
        </v-btn>
        <v-btn
          color="#90A4AE"
          class="rounded-lg ml-6"
          style="width: 10%"
          @click="handleCancel"
        >
          <p class="pa-1">ຍົກເລິກ</p>
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "@/helpers/axios";
import type { ExpenseCreateModel } from "~/models";
import Swal from "sweetalert2";

const formData = ref({
  name: "",
  name_en: "",
});

const form = ref();
const rules = {
  required: (value: string) => !!value || "ກະລຸນາປ້ອນຂໍ້ມູນ",
};

const route = useRoute();
const id = ref(route.query.id?.toString() || "");

const fetchData = async () => {
  if (!id.value) return;
  try {
    const { data } = await axios.get<ExpenseCreateModel.ExpenseDetailResponse>(
      `/api/v1/expense-types/detail/${id.value}`
    );
    formData.value = {
      name: data.items.name || "",
      name_en: data.items.name_en || "",
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handleSubmit = async () => {
  try {
    const valid = await form.value.validate();
    if (!valid) return;

    const response = await axios.post<ExpenseCreateModel.ExpenseCreateResponse>(
      `/api/v1/expense-types/update/${id.value}`,
      formData.value
    );
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "ສຳເລັດ",
        text: "ການແກ້ໄຂຂໍ້ມູນສຳເລັດ",
      });
    }
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

const handleCancel = () => {
  console.log("Cancel action triggered");
};

onMounted(fetchData);
</script>
