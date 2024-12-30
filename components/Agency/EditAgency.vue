<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3 class="">ເພີ່ມຂໍ້ມູນໂຕແທນ</h3>
        <v-divider></v-divider>
        <div class="d-flex justify-end mt-2">
          <v-btn color="primary" class="rounded-lg"
            ><v-icon icon="mdi-lock-outline" class="mr-2"></v-icon
            >ອັບເດດລະຫັດຜ່ານ</v-btn
          >
        </div>
      </v-col>
    </v-row>

    <v-line></v-line>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="pa-4 text-center" outlined>
            <v-col cols="12">
              <v-avatar size="150" class="mx-auto" color="grey lighten-2">
                <!-- <img src="" alt="Profile Picture" /> -->
              </v-avatar>
            </v-col>
            <v-col cols="12">
              <v-btn class="mt-4 mb-7 rounded-lg" style="width: 150" color="primary">
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
                id="name"
                placeholder="ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ"
                density="compact"
                variant="outlined"
              ></v-text-field>

              <label for="code">ລະຫັດຕົວແທນ / Agency code</label>
              <v-text-field
                id="code"
                placeholder="ກະລຸນາປ້ອນລະຫັດຕົວແທນ"
                density="compact"
                variant="outlined"
              ></v-text-field>
              <label for="districts">ເມືອງ / Districts</label>
              <v-select
                id="districts"
                placeholder="ກາລຸນາເລືອກເມື່ອງ"
                density="compact"
                :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                variant="outlined"
              ></v-select>
              <label for="status">ສະຖານະ / Status</label>
              <v-select
                id="status"
                placeholder="ກາລຸນາເລືອກສິດເຂົ້ານຳໃຊ້"
                density="compact"
                :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                variant="outlined"
              ></v-select>
              <!-- <label for="password">ລະຫັດຜ່ານ / Password</label>
              <v-text-field
                id="password"
                placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
                density="compact"
                variant="outlined"
              ></v-text-field> -->
            </v-col>

            <v-col cols="12" md="4">
              <label for="nickname">ຊື່ຫຼິ້ນ / Nickname</label>
              <v-text-field
                id="nickname"
                placeholder="ກະລຸນາປ້ອນຊື່ຫຼິນ"
                density="compact"
                variant="outlined"
              ></v-text-field>

              <label for="role">ສິດການເຂົ້າໃຊ້ງານ / Role access</label>
              <v-text-field
                id="role"
                placeholder="ກະລຸນາປ້ອນສິດການເຂົ້ານຳໃຊ້"
                density="compact"
                variant="outlined"
              ></v-text-field>
              <label for="villages">ບ້ານ / Villages</label>
              <v-select
                id="villages"
                placeholder="ກາລຸນາເລືອກບ້ານ"
                density="compact"
                :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                variant="outlined"
              ></v-select>
              <!-- <label for="confirm" style="font-size: 90%"
                >ຢືນຢັນລະຫັດຜ່ານ / Confirm password</label
              >
              <v-text-field
                id="confirm"
                placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
                density="compact"
                variant="outlined"
              ></v-text-field> -->
            </v-col>

            <v-col cols="12" md="4">
              <label for="phone">ເບີໂທລະສັບ / phone number</label>
              <v-text-field
                id="phone"
                placeholder="ກະລຸນາປ້ອນເບີໂທລະສັບ"
                density="compact"
                variant="outlined"
              ></v-text-field>
              <label for="provinces">ແຂວງ / Provinces</label>
              <v-select
                id="provinces"
                placeholder="ກາລຸນາແຂວງ"
                density="compact"
                :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                variant="outlined"
              ></v-select>
              <label for="username">ຊື້ຜູ້ໃຊ້ງານ / Username</label>
              <v-text-field
                id="username"
                placeholder="ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"
                density="compact"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
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
        <!-- <v-file-input
    label="ການໃຫ້ເປີເຊັນ / Commissions"
    density="compact"
    variant="underlined"
    class="text-field-black-label"
    :show-icon="false"
  ></v-file-input> -->

        <v-data-table-virtual
          style="font-size: 80%"
          :items="commissions"
          :headers="headers"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              color="primary"
              class="me-2"
              size="small"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon color="error" size="small" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
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
            <v-icon
              color="primary"
              class="me-2"
              size="small"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon color="error" size="small" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data> </template>
        </v-data-table-virtual>
      </v-col>

      <!-- <v-col cols="12" md="6">
          <h4 class="text-h6">ເອກະສານຂໍ້ມູນ / Identifications</h4>
          <v-data-table
            :items="identifications"
            :headers="headers"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Identifications</v-toolbar-title>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-col> -->
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      headers: [
        { title: "ລຳດັບ", value: "id" },
        { title: "ປະເພດໃຫ້ການ", value: "type" },
        { title: "ເປີເຊັນ ຫຼື ຈຳນວນເງິນ", value: "percent" },
        { title: "ສ່ວນແບ່ງທີ່ໃຫ້", value: "carbs" },
        { title: "ຈຳນວນເງິນ", value: "money" },
        { title: "Actions", value: "actions" },
      ],
      headers1: [
        { title: "ລຳດັບ", value: "id" },
        { title: "ປະເພດໃຫ້ການ", value: "type" },
        { title: "ເລກທີ", value: "no" },
        { title: "ຮູບພາບ", value: "image" },
        { title: "Actions", value: "actions" },
      ],
      commissions: [
        {
          id: "1",
          type: 159,
          percent: 6,
          carbs: 24,
          money: 4,
        },
      ],
      identifications: [
        {
          id: "1",
          type: 159,
          no: 6,
          image: 24,
          protein: 4,
        },
      ],
    };
  },
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
