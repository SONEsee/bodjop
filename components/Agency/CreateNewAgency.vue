<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3 class="">ເພີ່ມຂໍ້ມູນໂຕແທນ</h3>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-line></v-line>
    <v-container>
      <v-form
        class=""
        style="width: 100%"
        ref="form"
        @submit.prevent="handleAgency"
      >
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="pa-4 text-center" outlined>
              <v-col cols="12">
                <v-avatar size="150" class="mx-auto" color="grey lighten-2">
                  <!-- <img src="" alt="Profile Picture" /> -->
                </v-avatar>
              </v-col>
              <v-col cols="12">
                <v-btn
                  class="mt-4 mb-7"
                  style="width: 150"
                  color="primary"
                  type="submit"
                >
                  <v-icon icon="mdi-cloud-upload-outline" class="mr-2"></v-icon>
                  <p>ອັບໂຫຼດຮູບພາບ</p>
                </v-btn>
              </v-col>
            </v-card>
          </v-col>

          <v-col cols="12" md="8">
            <v-row style="font-size: 90%">
              <v-col cols="12" md="4">
                <label for="name">ຊື່ ແລະ ນາມສະກຸນ / Fullname</label>
                <v-text-field
                  @click:append-inner="toggleVisibility"
                  :rules ="[(v: string) => !!v || 'ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ']"
                  v-model="name"
                  id="name"
                  placeholder="ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                <label for="code">ລະຫັດຕົວແທນ / Agency code</label>
                <v-text-field
                v-model="agencycode"
                :rules ="[(v: string) => !!v || 'ກະລຸນາປ້ອນລະຫັດຕົວແທນ']"
                  id="code"
                  placeholder="ກະລຸນາປ້ອນລະຫັດຕົວແທນ"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
                <label for="districts">ເມືອງ / Districts</label>
                <v-select
                v-model="district"
                :rules ="[(v: string) => !!v || 'ກະລຸນາເລືອກເມື່ອງ']"
                  id="districts"
                  placeholder="ກາລຸນາເລືອກເມື່ອງ"
                  density="compact"
                  :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                  variant="outlined"
                ></v-select>
                <label for="password">ລະຫັດຜ່ານ / Password</label>
                <v-text-field
                  v-model="password"
                  :rules ="[(v: string) => !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານ']"
                  id="password"
                  placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <label for="nickname">ຊື່ຫຼິ້ນ / Nickname</label>
                <v-text-field
                  v-model="nickname"
                  :rules ="[(v: string) => !!v || 'ກະລຸນາປ້ອນຊື່ຫຼິນ']"
                  id="nickname"
                  placeholder="ກະລຸນາປ້ອນຊື່ຫຼິນ"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                <label for="role">ສິດການເຂົ້າໃຊ້ງານ / Role access</label>
                <v-text-field
                  v-model="role"
                  :rules ="[(v: string) => !!v || 'ກະລຸນາປ້ອນສິດການເຂົ້ານຳໃຊ້']"
                  id="role"
                  placeholder="ກະລຸນາປ້ອນສິດການເຂົ້ານຳໃຊ້"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
                <label for="villages">ບ້ານ / Villages</label>
                <v-select
                  v-model="village"
                  :rules ="[(v: string) => !!v || 'ກະລຸນາເລືອກບ້ານ']"
                  id="villages"
                  placeholder="ກາລຸນາເລືອກບ້ານ"
                  density="compact"
                  :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                  variant="outlined"
                ></v-select>
                <label for="confirm" style="font-size: 90%"
                  >ຢືນຢັນລະຫັດຜ່ານ / Confirm password</label
                >
                <v-text-field
                  v-model="confirm"
                  :rules ="[(v: string) => !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານ']"
                  id="confirm"
                  placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <label for="phone">ເບີໂທລະສັບ / phone number</label>
                <v-text-field
                  v-model="phone"
                  :rules ="[(v: string) => !!v || 'ກະລຸນາປ້ອນເບີໂທລະສັບ']"
                  id="phone"
                  placeholder="ກະລຸນາປ້ອນເບີໂທລະສັບ"
                  density="compact"
                  variant="outlined"
                ></v-text-field>
                <label for="provinces">ແຂວງ / Provinces</label>
                <v-select
                  v-model="province"
                  :rules ="[(v: string) => !!v || 'ກະລຸນາເລືອກແຂວງ']"
                  id="provinces"
                  placeholder="ກາລຸນາແຂວງ"
                  density="compact"
                  :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                  variant="outlined"
                ></v-select>
                <label for="username">ຊື້ຜູ້ໃຊ້ງານ / Username</label>
                <v-text-field
                  v-model="username"
                  :rules ="[(v: string) => !!v || 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ']"
                  id="username"
                  placeholder="ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"
                  density="compact"
                  variant="outlined"
                ></v-text-field>

                <label for="status">ສະຖານະ / Status</label>
                <v-select
                  v-model="status"
                  :rules ="[(v: string) => !!v || 'ກະລຸນາເລືອກສິດເຂົ້ານຳໃຊ້']"
                  id="status"
                  placeholder="ກາລຸນາເລືອກສິດເຂົ້ານຳໃຊ້"
                  density="compact"
                  :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                  variant="outlined"
                ></v-select>
              </v-col>
            </v-row>
          </v-col> </v-row
      ></v-form>
    </v-container>

    <v-row>
      <v-col cols="12" md="6">
        <v-file-input
          label="ການໃຫ້ເປີເຊັນ / Commissions"
          density="compact"
          variant="underlined"
          append-inner-icon="mdi-file-document-plus-outline"
          class="text-field-black-label"
        ></v-file-input>

        <v-data-table-virtual
          style="font-size: 80%"
          :items="commissions"
          :headers="headers"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" class="me-2" size="small">
              mdi-pencil
            </v-icon>
            <v-icon color="error" size="small"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table-virtual>
      </v-col>
      <v-col cols="12" md="6">
        <v-file-input
          id="username"
          label="ເອກະສານລະບຸຕົວຕົນ / Identifications"
          density="compact"
          variant="underlined"
          append-inner-icon="mdi-file-document-plus-outline"
          class="text-field-black-label hide-file-icon"
        ></v-file-input>

        <v-data-table-virtual
          style="font-size: 80%"
          :items="identifications"
          :headers="headers1"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" class="me-2" size="small">
              mdi-pencil
            </v-icon>
            <v-icon color="error" size="small"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table-virtual>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import axios from "@/helpers/axios";
import { UserModel } from "@/models/";
import { ref } from "vue";
const name = ref(null);
const agencycode = ref(null);
const district = ref(null);
const password = ref(null);
const nickname = ref(null);
const role = ref(null);
const village = ref(null);
const confirm = ref(null);
const phone = ref(null);
const province = ref(null);
const username = ref(null);
const status = ref(null);
const visible = ref(false);
const form = ref();
const toggleVisibility = () => {
  visible.value = !visible.value;
};
const handleAgency = async () => {
  try {
    const { valid } = await form.value.validate();
    if (valid) {
      console.log("name");
    }
  } catch (error) {
    console.log(error);
  }
};
const districts = ["ພູຄາ", "ນາປົງ", "ປາກລາຍ", "ວຽງຈັນ"];
const villages = ["ບ້ານ1", "ບ້ານ2", "ບ້ານ3"];
const provinces = ["ແຂວງ1", "ແຂວງ2", "ແຂວງ3"];
const statuses = ["ສະຖານະ1", "ສະຖານະ2", "ສະຖານະ3"];

const headers = [
  { title: "ລຳດັບ", value: "id" },
  { title: "ປະເພດໃຫ້ການ", value: "type" },
  { title: "ເປີເຊັນ", value: "percentage" },
  { title: "Actions", value: "actions", sortable: false },
];

const headers1 = [
  { title: "ລຳດັບ", value: "id" },
  { title: "ປະເພດເອກະສານ", value: "docType" },
  { title: "Actions", value: "actions", sortable: false },
];

const commissions = ref([]);
const identifications = ref([]);
</script>

<style scoped>
.text-h5 {
  margin-bottom: 16px;
}
.text-field-black-label .v-label {
  color: #000000 !important;
}
.hide-file-icon .v-input__control .v-icon {
  display: none;
}
</style>
