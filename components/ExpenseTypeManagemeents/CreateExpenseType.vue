<template>
  <v-container>
    <h3>ເພີ່ມຂໍ້ມູນປະເພດລາຍຈ່າຍ / Create new expense type</h3>
    <v-divider></v-divider>
    <v-form ref="form" @submit.prevent="Create">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="6" class="mt-4">
            <v-row>
              <v-col cols="12" md="6">
                <label for="id"><p class="ml-2">ຊື່ພາສາລາວ / Name</p></label>
                <v-text-field
                  v-model="name"
                  @click:append-inner="CheckForm"
                  :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຊື່ພາສາລາວ']"
                  id="id"
                  density="compact"
                  class="pa-2"
                  color="primary"
                  variant="outlined"
                  label="ກະລຸນາປ້ອນຊື່ພາສາລາວ / Name"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
              <v-col cols="12" md="6">
                <label for="code"
                  ><p class="ml-2">ຊື່ພາສາອັງກິດ / Name English</p></label
                >
                <v-text-field
                  v-model="name_en"
                  :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຊື່ພາສາອັງກິດ']"
                  id="code"
                  density="compact"
                  class="pa-2"
                  color="primary"
                  label="ກະລຸນາປ້ອນຊື່ພາສາອັງກິດ / Name English"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <div class="d-flex justify-center">
        <v-btn
          color="primary"
          class="rounded-lg"
          style="width: 10%"
          type="submit"
        >
          
          <p class="pa-2">ບັນທຶກ</p></v-btn
        >
        <v-btn color="#90A4AE" class="rounded-lg ml-6" style="width: 10%"
          ><p class="pa-2">ຍົກເລິກ</p></v-btn
        >
      </div></v-form
    >
  </v-container>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import axios from "@/helpers/axios";
import type { ExpenseCreateModel } from "~/models";
import Swal from "sweetalert2";

const name = ref("");
const name_en = ref("");
const form = ref();
const validate = ref(false);

const CheckForm = () => {
  validate.value = !validate.value;
};
const Create = async () => {
  try {
    const valid = await form.value.validate();
    if (valid) {
      console.log("Form is valid");
      const respons = await axios.post<ExpenseCreateModel.ExpenseCreateResponse>(
        "/api/v1/expense-types/new",
        {
          name: name.value,
          name_en: name_en.value,
        }

      );
      console.log(respons);
      if (respons.status === 200) {
        console.log("success sone seedavanh");
        Swal.fire({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ການເພີ່ມຂໍ້ມູນສຳເລັດ",
        });
      }else{
        Swal.fire({
          icon: "error",
          title: "ຜິດພາດ",
          text: "ການເພີ່ມຂໍ້ມູນຜິດພາດ",
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
</script>
