<script setup lang="ts">
import notfoundImage from "@/assets/img/404.png";
const notfoundref = ref(notfoundImage);
import axios from "@/helpers/axios";

const userStore = UserManageStore();
const globalStore = UseGlobalStore();
const title = ref("ສ້າງຂໍ້ມູນຜູ້ໃຊ້ງານ");
const form = ref();
const loading = ref(false);
const request = userStore.form_create_data;
const visiblePassword = ref(false);

const onProvinceChange = async (value: number | null) => {
  await globalStore.GetDistrictData(value, null);
  request.district_id = null;
  request.village_id = null;
};

const onDistrictChange = async (value: number | null) => {
  await globalStore.GetVillagesData(value?.toString() ?? null, null);
  request.village_id = null;
};

// const onDistrictSearch = async (value: string | null) => {};

const onDistrictSearch = useDebounceFn(async (value: string) => {
  await globalStore.GetDistrictData(request.province_id, value);
}, 800);

const onVillageSearch = useDebounceFn(async (value: string) => {
  await globalStore.GetVillagesData(request.district_id, value);
}, 800);

const handleSubmit = async () => {
  try {
    const { valid } = await form.value.validate();
    if (!valid) return;

    loading.value = true;
    var formData = new FormData();
    for (const [key, value] of Object.entries(request)) {
      if (key === "profile_image") {
        if (value !== null) {
          const file = value as File;
          formData.append(key, file, file.name);
        }
      } else {
        formData.append(key, value?.toString() ?? "");
      }
    }

    const res = await axios.post("/api/v1/users/new", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 200) {
      const successNotification = await CallSwal({
        icon: "success",
        title: "ສ້າງຜູ້ໃຊ້ງານສຳເລັດ",
        text: "ຜູ້ໃຊ້ງານຖືກສ້າງສຳເລັດ",
      });

      if (successNotification.isConfirmed) {
        delayGoPath("/manageuser");
      } else {
        delayGoPath("users");
      }
    }
  } catch (error) {
    DefaultSwalError(error);
  } finally {
    loading.value = false;
  }
};

const file = ref<HTMLInputElement>();
const openFile = () => file.value?.click();

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files[0]) {
    request.profile_image = files[0];
  }
};
</script>

<template>
  <v-card class="pa-4" min-height="95vh" flat>
    <v-col cols="12">
      <GlobalTextTitleLine :title="title" />
    </v-col>

    <v-form ref="form" @submit.prevent="handleSubmit">
      <div class="d-flex justify-end align-end mb-4">
        <v-btn
          color="primary"
          type="submit"
          :loading="loading"
          prepend-icon="mdi-content-save"
          variant="flat"
        >
          ບັນທຶກ
        </v-btn>
      </div>

      <v-row class="mt-6">
        <v-col md="4">
          <!-- <div class="text-center mb-4">
          <h3>ຮູບໂປຣໄຟລ໌</h3></div> -->
          <v-row>
            <v-col cols="12" class="d-flex justify-center">
              <v-row>
                <v-col
                  cols="12"
                  class="d-flex flex-wrap justify-center mt-2 ml-2 mr-2 mb-2"
                >
                  <v-avatar
                    size="220"
                    class="mx-auto"
                    :image="
                      request.profile_image === null
                        ? notfoundref
                        : GetImageUrl(request.profile_image)
                    "
                  >
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
                    @click="openFile"
                  >
                  </v-btn>

                  <input
                    type="file"
                    ref="file"
                    style="display: none"
                    accept="image/jpg,image/png,image/jpeg"
                    @change="onFileChange"
                  />
                </v-col>
              </v-row>
            </v-col>

            <input
              type="file"
              ref="file"
              style="display: none"
              accept="image/jpg,image/png,image/jpeg"
              @change="onFileChange"
            />
          </v-row>
        </v-col>

        <v-col cols="12" md="8">
          <v-row>
            <v-col md="4">
              <label>
                ຊື່ ແລະ ນາມສະກຸນ / fullname
                <span style="color: red"> * </span></label
              >
              <v-text-field
                v-model="request.fullname"
                density="compact"
                variant="outlined"
                placeholder="ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ"
                :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນ']"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <label>
                ຊື່ຫຼິ້ນ / Nick name <span style="color: red"> * </span></label
              >
              <v-text-field
                v-model="request.nick_name"
                density="compact"
                variant="outlined"
                placeholder="ກະລຸນາປ້ອນຊື້ຫຼິ້ນ"
                :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນ']"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <label> ເພດ / Gender <span style="color: red"> * </span></label>
              <v-select
                v-model="request.gender"
                placeholder="ກະລຸນາເລືອກເພດ"
                density="compact"
                variant="outlined"
                :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນ']"
                hide-details="auto"
                :items="GetDefaultGenders()"
              ></v-select>
            </v-col>

            <v-col md="4">
              <label>
                ແຂວງ / province <span style="color: red"> * </span></label
              >
              <v-select
                v-model="request.province_id"
                :items="globalStore.provinces"
                item-title="pr_name"
                item-value="id"
                density="compact"
                variant="outlined"
                :rules="[(v) => !!v || 'ກະລຸນາເລືອກແຂວງ']"
                hide-details="auto"
                placeholder="ກະລຸນາເລືອກແຂວງ"
                @update:model-value="onProvinceChange($event)"
              ></v-select>
            </v-col>

            <v-col md="4">
              <label>
                ເມືອງ / district <span style="color: red"> * </span></label
              >
              <v-autocomplete
                v-model="request.district_id"
                :items="globalStore.districts"
                item-title="dr_name"
                item-value="id"
                density="compact"
                variant="outlined"
                :rules="[(v) => !!v || 'ກະລຸນາເລືອກເມືອງ']"
                hide-details="auto"
                placeholder="ກະລຸນາເລືອກເມືອງ"
                @update:model-value="onDistrictChange($event)"
                @update:search="onDistrictSearch($event)"
                no-filter
              ></v-autocomplete>
            </v-col>

            <v-col md="4">
              <label> ບ້ານ / village <span style="color: red"> * </span></label>
              <v-autocomplete
                v-model="request.village_id"
                :items="globalStore.villages"
                item-title="vill_name"
                item-value="id"
                density="compact"
                variant="outlined"
                placeholder="ກະລຸນາເລືອກບ້ານ"
                :rules="[(v) => !!v || 'ກະລຸນາເລືອກບ້ານ']"
                @update:search="onVillageSearch($event)"
                no-filter
                hide-details="auto"
              ></v-autocomplete>
            </v-col>

            <v-col cols="4">
              <label>
                ເບີໂທລະສັບ / phone number
                <span style="color: red"> * </span></label
              >
              <v-text-field
                v-model="request.phone_number"
                density="compact"
                variant="outlined"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນ']"
                placeholder="ກະລຸນາປ້ອນເບີໂທ"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col md="4">
              <label
                >ຊື່ຜູ້ໃຊ້ / username <span style="color: red"> * </span></label
              >
              <v-text-field
                v-model="request.username"
                density="compact"
                variant="outlined"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນ']"
                placeholder="ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <label
                >ສິດການເຂົ້ານຳໃຊ້ / role
                <span style="color: red"> * </span></label
              >
              <v-select
                v-model="request.role"
                density="compact"
                variant="outlined"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນ']"
                hide-details="auto"
                placeholder="ກະລຸນາເລືອກສິດການເຂົ້າໃຊ້ງານ"
                :items="GetUserRoleList()"
              ></v-select>
            </v-col>

            <v-col cols="4">
              <label
                >ລະຫັດຜ່ານ / Password <span style="color: red"> * </span>
              </label>
              <v-text-field
                v-model="request.password"
                density="compact"
                variant="outlined"
                :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="visiblePassword = !visiblePassword"
                :type="visiblePassword ? 'text' : 'password'"
                placeholder="ກະລຸນາປ້ອນລະຫັດ"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນ']"
                hide-details="auto"
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <label
                >ສະຖານະ / Status <span style="color: red"> * </span>
              </label>
              <v-select
                v-model="request.status"
                :items="GetDefaultStatus()"
                density="compact"
                variant="outlined"
                placeholder="ກະລຸນາເລືອກສະຖານະ"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນ']"
                hide-details="auto"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>
