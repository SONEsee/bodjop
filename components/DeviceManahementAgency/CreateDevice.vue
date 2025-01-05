<template>
  <v-container>
    <h3>ເພີ່ມຂໍ້ມູນອຸປະກອນ</h3>
    <v-divider></v-divider>
    <v-form ref="form" @submit.prevent="Create">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="6" class="mt-4">
            <v-row>
              <v-col cols="12" md="6">
                <label for="id"><p class="ml-2">ລະຫັດ POS / Pos No</p></label>
                <v-text-field
                  v-model="pos_no"
                  @click:append-inner="DeviceManagementCreate"
                  id="id"
                  density="compact"
                  class="pa-2"
                  color="primary"
                  variant="outlined"
                  label="ກະລຸນາປ້ອນລະຫັດ POS"
                  outlined
                  dense
                  :rules="[val => !!val || 'ກະລຸນາປ້ອນລະຫັດ POS']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <label for="code"><p class="ml-2">ລະຫັດ IMEI / IMEI Code</p></label>
                <v-text-field
                  v-model="imei"
                  id="code"
                  density="compact"
                  class="pa-2"
                  color="primary"
                  label="ກະລຸນາປ້ອນລະຫັດ IMEI"
                  variant="outlined"
                  dense
                  :rules="[val => !!val || 'ກະລຸນາປ້ອນລະຫັດ IMEI']"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <div class="d-flex justify-center">
        <v-btn color="primary" class="rounded-lg" style="width: 10%" type="submit">
          <p class="pa-2">ບັນທຶກ</p>
        </v-btn>
        <v-btn color="error" class="rounded-lg ml-6" style="width: 10%">
          <p class="pa-2">ຍົກເລິກ</p>
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "@/helpers/axios";
import type { DeviceModel } from "~/models";
import Swal from "sweetalert2";


const form = ref();
const pos_no = ref("");
const imei= ref("");


const vasislist = ref(false);
const DeviceManagementCreate = () => {
  vasislist.value = !vasislist.value;
};


const Create = async () => {
  try {
    const valid = await form.value.validate();
    if (valid) {
     
      const respons = await  axios.post<DeviceModel.DeviceResponse>(
        "/api/v1/devices/new",
        {
          pos_no:pos_no.value,
          imei:imei.value,

        }
      );
      if(respons.status===200){
        console.log('sussecc')
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
