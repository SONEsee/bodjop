<template>
  <v-container>
    <h3>ການແກ້ໄຂຂໍ້ມູນອຸປະກອນ / Edit Device</h3>
    <v-divider></v-divider>
    <v-form ref="form" @submit.prevent="handleEdit">
      <v-col cols="12 d-flex flex-wrap" >
        <v-row>
          <v-col cols="6"  class="mt-4">
            <v-row>
              <v-col cols="6" >
                <label for="id"><p class="ml-2">ລະຫັດ POS / Pos No</p></label>
                <v-text-field
                  v-model="formData.pos_no"
                  @click:append-inner="DeviceManagementEdit"
                  :rules="[(v) => !!v || 'ກະລຸນາປ້ອນລະຫັດ POS']"
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
                  v-model="formData.imei"
                  :rules="[(v) => !!v || 'ກະລຸນາປ້ອນລະຫັດ IMEI']"
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
        <v-btn
          color="primary"
          class="rounded-lg"
          style="width: 10%"
          type="submit"
          a
          ><p class="">ບັນທຶກ</p></v-btn
        >
        <v-btn color="#90A4AE" class="rounded-lg ml-6" style="width: 10%"
          >ຍົກເລິກ</v-btn
        >
      </div>
    </v-form>
  </v-container>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import axios from "@/helpers/axios";
import { DeviceModel } from "@/models/";
import Swal from "sweetalert2";
const route = useRoute();
const query = route.query;
const id = query.id?.toString() || "";

const code = ref(null);
const form = ref();
const formData = ref({
  pos_no: "",
  imei: "",
});

const fetdata = async () => {
  try {
    const response = await axios.get<DeviceModel.DeviceResponse>(
      `/api/v1/devices/detail/${id}`
    );
    formData.value = {
      pos_no: response.data.items.pos_no,
      imei: response.data.items.imei,
    }
    if (response.status === 200) {
      console.log("success good sone dev ");
    }
  } catch (error) {
    console.log(error);
  }
};

const validate = ref(false);
const DeviceManagementEdit = () => {
  validate.value = !validate.value;
};
const handleEdit = async () => {
  try {
    const { valid } = await form.value.validate();
    if (valid) {
     const response = await axios.post<DeviceModel.DeviceResponse>(
      `/api/v1/devices/update-data/${id}`,
      formData.value
      );
      if (response.status === 200) {
Swal.fire({
        icon: "success",
        title: "ສຳເລັດ",
        text: "ການແກ້ໄຂຂໍ້ມູນອຸປະກອນສຳເລັດ",
      });


        console.log("success submit");
      }
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "ຜິດພາດ",
      text: "ການແກ້ໄຂຂໍ້ມູນອຸປະກອນຜິດພາດ",
    });
    console.log(error);
  }
};
onMounted(() => {
  fetdata();
});
</script>
