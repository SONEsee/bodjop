<script lang="ts" setup>
const agencyStore = UseAgencyStore();
const title = ref("ເພີ່ມຂໍ້ມູນຕົວແທນ");
const visible = ref(false);

const request = agencyStore.form_create_data;
</script>

<template>
  <section>
    <v-row>
      <v-col cols="12">
        <GlobalTextTitleLine :title="title" />
      </v-col>

      <v-col cols="12" class="pt-12">
        <v-row>
          <v-col cols="4">
            <v-row>
              <v-col cols="12" class="d-flex flex-wrap justify-center">
                <v-avatar size="220" class="mx-auto" color="grey lighten-2">
                </v-avatar>
              </v-col>

              <v-col cols="12" class="d-flex flex-wrap justify-center">
                <v-btn
                  class="mt-4 mb-7"
                  width="180px"
                  height="40px"
                  color="primary"
                  flat
                  prepend-icon="mdi-cloud-upload-outline"
                  text="ອັບໂຫຼດຮູບພາບ"
                >
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="8">
            <v-row>
              <v-col cols="12" md="4">
                <label>ຊື່ ແລະ ນາມສະກຸນ / Fullname</label>
                <v-text-field
                  @click:append-inner="visible = !visible"
                  :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ']"
                  v-model="request.fullname"
                  placeholder="ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  class="pb-6"
                ></v-text-field>

                <label>ລະຫັດຕົວແທນ / Agency code</label>
                <v-text-field
                  v-model="request.agency_code"
                  :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນລະຫັດຕົວແທນ']"
                  placeholder="ກະລຸນາປ້ອນລະຫັດຕົວແທນ"
                  density="compact"
                  hide-details="auto"
                  variant="outlined"
                  class="pb-6"
                ></v-text-field>

                <label>ເມືອງ / Districts</label>
                <v-select
                  v-model="request.district_id"
                  :rules="[(v: string) => !!v || 'ກະລຸນາເລືອກເມືອງ']"
                  placeholder="ກາລຸນາເລືອກເມື່ອງ"
                  density="compact"
                  :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                  variant="outlined"
                  hide-details="auto"
                  class="pb-6"
                ></v-select>

                <label>ລະຫັດຜ່ານ / Password</label>
                <v-text-field
                  v-model="request.password"
                  :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານ']"
                  placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  class="pb-6"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <label>ຊື່ຫຼິ້ນ / Nickname</label>
                <v-text-field
                  v-model="request.nick_name"
                  :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນຊື່ຫຼິນ']"
                  placeholder="ກະລຸນາປ້ອນຊື່ຫຼິນ"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  class="pb-6"
                ></v-text-field>

                <label>ສິດການເຂົ້າໃຊ້ງານ / Role access</label>
                <v-text-field
                  v-model="request.role"
                  :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນສິດການເຂົ້ານຳໃຊ້']"
                  placeholder="ກະລຸນາປ້ອນສິດການເຂົ້ານຳໃຊ້"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  class="pb-6"
                ></v-text-field>

                <label>ບ້ານ / Villages</label>
                <v-select
                  v-model="request.village_id"
                  :rules="[(v: string) => !!v || 'ກະລຸນາເລືອກບ້ານ']"
                  placeholder="ກາລຸນາເລືອກບ້ານ"
                  density="compact"
                  :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                  variant="outlined"
                  hide-details="auto"
                  class="pb-6"
                ></v-select>

                <label>ຢືນຢັນລະຫັດຜ່ານ / Confirm password</label>
                <v-text-field
                  v-model="request.confirm_password"
                  hide-details="auto"
                  :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານ']"
                  placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
                  density="compact"
                  variant="outlined"
                  class="pb-6"
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <label>ເບີໂທລະສັບ / Phone number</label>
                <v-text-field
                  v-model="request.phone_number"
                  hide-details="auto"
                  :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນເບີໂທລະສັບ']"
                  placeholder="ກະລຸນາປ້ອນເບີໂທລະສັບ"
                  density="compact"
                  variant="outlined"
                  class="pb-6"
                ></v-text-field>

                <label>ແຂວງ / Provinces</label>
                <v-select
                  v-model="request.province_id"
                  hide-details="auto"
                  :rules="[(v: string) => !!v || 'ກະລຸນາເລືອກແຂວງ']"
                  placeholder="ກາລຸນາແຂວງ"
                  density="compact"
                  :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                  variant="outlined"
                  class="pb-6"
                ></v-select>

                <label>ຊື້ຜູ້ໃຊ້ງານ / Username</label>
                <v-text-field
                  v-model="request.username"
                  :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ']"
                  placeholder="ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  class="pb-6"
                ></v-text-field>

                <label>ສະຖານະ / Status</label>
                <v-select
                  v-model="request.status"
                  :rules="[(v: string) => !!v || 'ກະລຸນາເລືອກສິດເຂົ້ານຳໃຊ້']"
                  placeholder="ກາລຸນາເລືອກສິດເຂົ້ານຳໃຊ້"
                  density="compact"
                  :items="['ພູຄາ', 'ນາປົງ', 'ປາກລາຍ', 'ວຽງຈັນ']"
                  variant="outlined"
                  hide-details="auto"
                  class="pb-6"
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>
