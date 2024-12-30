<template>
  <v-container>
    <h3>ການແກ້ໄຂຂໍ້ມູນອຸປະກອນ / Edit Device</h3>
    <v-divider></v-divider>
    <v-form ref="form" @submit.prevent="handleEdit">

    
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="6" class="mt-4">
          <v-row>
            <v-col cols="12" md="6">
              <label for="id"><p class="ml-2">ລະຫັດ POS / Pos No</p></label>
              <v-text-field
                v-model="id"
                @click:append-inner="DeviceManagementEdit"
                :rules = "[v => !!v || 'ກະລຸນາປ້ອນລະຫັດ POS']"
                id="id"
                density="compact"
                class="pa-2"
                color="primary"
                variant="outlined"
                label="ກະລຸນາປ້ອນລະຫັດ POS"
                outlined
                dense
              ></v-text-field
            ></v-col>
            <v-col cols="12" md="6">
              <label for="code"
                ><p class="ml-2">ລະຫັດ IMEI / IMEI Code</p></label
              >
              <v-text-field
                v-model="code"
                :rules = "[v => !!v || 'ກະລຸນາປ້ອນລະຫັດ IMEI']"
                id="code"
                density="compact"
                class="pa-2"
                color="primary"
                label="ກະລຸນາປ້ອນລະຫັດ IMEI"
                variant="outlined"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <div class="d-flex justify-center">
      <v-btn color="primary" class="rounded-lg" style="width: 10%"
      type="submit"a
        ><p class="pa-2">ບັນທຶກ</p></v-btn
      >
      <v-btn color="error" class="rounded-lg ml-6" style="width: 10%"
        ><p class="pa-2">ຍົກເລິກ</p></v-btn
      >
    </div>
  </v-form>
  </v-container>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import axios from "@/helpers/axios";

const id = ref(null);
const code = ref(null);
const form = ref();

const validate = ref(false);
const DeviceManagementEdit = () => {
  validate.value = !validate.value;
};
const handleEdit = async () => {
  try {
    const { valid } = await form.value.validate();
    if (valid) {
      console.log("Edit Device");
      };
    }
     
    
   catch (error) {
    console.log(error);
  }
};
</script>
