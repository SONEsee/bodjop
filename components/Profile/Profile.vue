<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3 class="">ລາຍລະອຽດຂໍ້ມູນຜູ້ໃຊ້ງານ</h3>
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-line></v-line>

    <v-container>
      <div class="d-flex justify-end" v-if="datarespons">
        <p v-if="datarespons.items.status === 1">
          ສະຖານະ:
          <v-chip disabled color="success">ເປີດໃຊ້ງານ</v-chip>
        </p>
        <p v-if="datarespons.items.status === 0">
          ສະຖານະ:
          <v-chip disabled color="error">ປິດໃຊ້ງານ</v-chip>
        </p>
      </div>
      <v-row>
        <v-col cols="12" md="4" class="d-flex align-center justify-center">
          <div class="d-flex text-center align-center">
            <v-col cols="12" class="d-flex justify-center align-center">
              <v-avatar
                v-if="datarespons"
                size="150"
                class="mx-auto d-flex align-center"
                color="grey lighten-2"
              >
                <img
                  :src="`https://32lottery-api.phouservice.com/${datarespons.items.image_profile}`"
                  alt="Profile Picture"
                />
              </v-avatar>
            </v-col>
            <v-col cols="12"> </v-col>
          </div>
        </v-col>

        <v-col cols="12" md="8" class="mt-12 mb-12">
          <v-row style="font-size: 90%">
            <v-col cols="12" md="4">
              <label for="name">ຊື່ ແລະ ນາມສະກຸນ / Fullname</label>
              <v-text-field
                v-if="datarespons"
                readonly
                id="name"
                density="compact"
                variant="outlined"
                >{{ datarespons.items.fullname }}</v-text-field
              >

              <label for="code">ລະຫັດຕົວແທນ / Agency code</label>
              <v-text-field
                v-if="datarespons"
                readonly
                id="code"
                density="compact"
                variant="outlined"
                >{{ datarespons.items.agent_code }}</v-text-field
              >

              <label for="districts">ເມືອງ / Districts</label>
              <v-text-field
                v-if="datarespons"
                readonly
                id="districts"
                density="compact"
                variant="outlined"
                >{{ datarespons.items.village_id }}</v-text-field
              >
            </v-col>

            <v-col cols="12" md="4">
              <label for="nickname">ຊື່ຫຼິ້ນ / Nickname</label>
              <v-text-field
                v-if="datarespons"
                readonly
                id="nickname"
                density="compact"
                variant="outlined"
                >{{ datarespons.items.nick_name }}</v-text-field
              >

              <label for="role">ສິດການເຂົ້າໃຊ້ງານ / Role access</label>
              <v-text-field
                v-if="datarespons"
                readonly
                id="role"
                density="compact"
                variant="outlined"
                >{{ datarespons.items.role }}</v-text-field
              >

              <label for="villages">ບ້ານ / Villages</label>
              <v-text-field
                v-if="datarespons"
                readonly
                id="villages"
                density="compact"
                variant="outlined"
                >{{ datarespons.items.village_id }}</v-text-field
              >
            </v-col>

            <v-col cols="12" md="4">
              <label for="phone">ເບີໂທລະສັບ / phone number</label>
              <v-text-field
                v-if="datarespons"
                id="phone"
                readonly
                density="compact"
                variant="outlined"
                >{{ datarespons.items.phone_number }}</v-text-field
              >

              <label for="provinces">ແຂວງ / Provinces</label>
              <v-text-field
                id="provinces"
                readonly
                density="compact"
                variant="outlined"
                >ນະຄອນຫຼວງວຽງຈັນ</v-text-field
              >

              <label for="username">ຊື້ຜູ້ໃຊ້ງານ / Username</label>
              <v-text-field
                v-if="datarespons"
                id="username"
                readonly
                density="compact"
                variant="outlined"
                >{{ datarespons.items.username }}</v-text-field
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts" setup>
import axios from "@/helpers/axios";
import { UsermeModel } from "@/models/";
import { ref, onMounted } from "vue";

const datarespons = ref<UsermeModel.UserMeResponse | null>(null);
const error = ref<string | null>(null);

const getdata = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      error.value = "Authorization token is missing.";
      return;
    }
    console.log("Token:", localStorage.getItem("token"));

    const res = await axios.get<UsermeModel.UserMeResponse>(
      "/api/v1/users/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data) {
      datarespons.value = res.data;
      console.log("datarespons", datarespons.value);
    }
  } catch (err: any) {
    if (err.response) {
      error.value = `Error ${err.response.status}: ${
        err.response.data.message || "ການເຂົ້າເຖິ່ງບໍ່ໄດ້ຮັບອານຸຍາດ."
      }`;
    } else {
      error.value = "Error fetching user data. Please try again.";
    }
    console.error("Error fetching user data:", err);
  }
};

onMounted(() => {
  getdata();
});
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
