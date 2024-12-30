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
    <div class="d-flex justify-end">
      <p>ສະຖານະ: <v-chip disabled>ເປີດໃຊ້ງານ</v-chip></p>
    </div>
    <v-row>
      <v-col cols="12" md="4" class="d-flex align-center justify-center">
        <div class="d-flex text-center align-center">
          <v-col cols="12" class="d-flex justify-center align-center">
            <v-avatar
              size="150"
              class="mx-auto d-flex align-center"
              color="grey lighten-2"
            >
              <!-- <img src="" alt="Profile Picture" /> -->
            </v-avatar>
          </v-col>
          <v-col cols="12">
            <!-- <v-btn class="mt-4 mb-7" style="width: 150" color="primary">
                <v-icon icon="mdi-cloud-upload-outline" class="mr-2"></v-icon>
                <p>ອັບໂຫຼດຮູບພາບ</p>
              </v-btn> -->
          </v-col>
        </div>
      </v-col>

      <v-col cols="12" md="8" class="mt-12 mb-12">
        <v-row style="font-size: 90%">
          <v-col cols="12" md="4">
            <label for="name">ຊື່ ແລະ ນາມສະກຸນ / Fullname</label>
            <v-text-field
              readonly
              id="name"
              density="compact"
              variant="outlined"
              >xayxana MANIVONG</v-text-field
            >

            <label for="code">ລະຫັດຕົວແທນ / Agency code</label>
            <v-text-field
              readonly
              id="code"
              density="compact"
              variant="outlined"
              >BINH1</v-text-field
            >
            <label for="districts">ເມືອງ / Districts</label>
            <v-text-field
              readonly
              id="districts"
              density="compact"
              :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
              variant="outlined"
              >ເມືອງຈັນທະບູລີ</v-text-field
            >
            <!-- <label for="password">ລະຫັດຜ່ານ / Password</label> -->
            <!-- <v-text-field
                readonly
                id="password"
                placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
                density="compact"
                variant="outlined"
              ></v-text-field> -->
          </v-col>

          <v-col cols="12" md="4">
            <label for="nickname">ຊື່ຫຼິ້ນ / Nickname</label>
            <v-text-field
              readonly
              id="nickname"
              density="compact"
              variant="outlined"
              >Binh</v-text-field
            >

            <label for="role">ສິດການເຂົ້າໃຊ້ງານ / Role access</label>
            <v-text-field
              readonly
              id="role"
              density="compact"
              variant="outlined"
              >ຕົວແທນລະດັບແຂວງ</v-text-field
            >
            <label for="villages">ບ້ານ / Villages</label>
            <v-text-field
              readonly
              id="villages"
              density="compact"
              :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
              variant="outlined"
              >ໂພນສະຫວ່າງ</v-text-field
            >
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
              readonly
              density="compact"
              variant="outlined"
              >2056009989</v-text-field
            >
            <label for="provinces">ແຂວງ / Provinces</label>
            <v-text-field
              id="provinces"
              readonly
              density="compact"
              :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
              variant="outlined"
              >2056009989</v-text-field
            >
            <label for="username">ຊື້ຜູ້ໃຊ້ງານ / Username</label>
            <v-text-field
              id="username"
              readonly
              density="compact"
              variant="outlined"
              >binh</v-text-field
            >

            <!-- <label for="status">ສະຖານະ / Status</label>
              <v-text-field
                id="status"
                placeholder="ກາລຸນາເລືອກສິດເຂົ້ານຳໃຊ້"
                density="compact"
                :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                variant="outlined"
              ></v-text-field> -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <h4 class="">ການໃຫ້ເປີເຊັນ / Commissions</h4>
        <v-divider></v-divider>

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
        <h4 class="">ເອກະສານລະບຸຕົວຕົນ / Identifications</h4>
        <v-divider></v-divider>

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
    </v-row></v-container>
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
