<script setup lang="ts">
import { useRoute } from "vue-router";
import { UseGlobalStore } from "~/stores/global";

import { CallSwal, goPath } from "~/composables/global";
import axios from "@/helpers/axios";
import { UserGetdataModel } from "@/models";

const globalStore = UseGlobalStore();
const userStore = UserManageStore();

const loading = ref(false);
const form = ref();
const file = ref();

const request = computed({
  get() {
    return userStore.response_detail_query_data;
  },
  set(value) {
    userStore.response_detail_query_data = value;
  },
});

const onProvinceChange = async (value: number | null) => {
  await globalStore.GetDistrictData(value, null);
  if (request.value !== null) {
    request.value.village_id = null;
    request.value.village.district_id = null;
    if (value === null) {
      globalStore.districts = [];
      globalStore.villages = [];
    }
  }
};

const onDistrictChange = async (value: number | null) => {
  await globalStore.GetVillagesData(value?.toString() ?? null, null);
  if (request.value != null) {
    request.value.village_id = null;
  }
};

const onDistrictSearch = useDebounceFn(async (value: string) => {
  await globalStore.GetDistrictData(
    request.value?.village?.district?.province_id ?? null,
    value
  );
}, 800);

const onVillageSearch = useDebounceFn(async (value: string) => {
  await globalStore.GetVillagesData(
    request.value?.village?.district_id?.toString() ?? null,
    value
  );
}, 800);

const openFile = () => {
  file.value.click();
};

const onFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files[0]) {
    const file = files[0];
    if (request.value) {
      const userData =
        request.value as UserGetdataModel.GetUserDetailResponseItems;
      userData.image_profile = file;
    }
  }
};

const submitForm = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    loading.value = true;
    const userData = request.value;
    if (userData === null) {
      return;
    }

    let req = {
      village_id: userData?.village_id ?? null,
      fullname: userData.fullname ?? "",
      gender: userData.gender ?? 0,
      phone_number: userData.phone_number ?? "",
      role: userData.role,
      username: userData.username ?? "",
      image_profile: userData.image_profile ?? "",
      status: userData.status ?? 1,
      nick_name: userData?.nick_name ?? "N/A",
    };

    const formData = new FormData();
    for (const [key, value] of Object.entries(req)) {
      if (key === "image_profile" && value instanceof File) {
        formData.append("file", value, value.name);
      } else if (value !== null) {
        formData.append(key, value.toString());
      }
    }

    const path = `/api/v1/users/update-detail/${userData.id}`;
    try {
      const response = await axios.post(path, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        const successnotification = await CallSwal({
          icon: "success",
          title: "ສຳເລັດ",
          text: "ບັນທຶກບັນທຶກການປ່ຽນແປງສຳເລັດ",
        });

        if (successnotification.isConfirmed) {
          delayGoPath("/manageuser");
        } else {
          delayGoPath("/manageuser");
        }
      }
    } catch (error) {
      DefaultSwalError(error);
    } finally {
      loading.value = false;
    }
  }
};
</script>

<template>
  <section v-if="request !== null">
    <v-card min-height="95vh" flat class="pa-4 pt-4">
      <v-form ref="form" @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12">
            <GlobalTextTitleLine :title="'ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້ງານ'" />
          </v-col>

          <v-col cols="12" class="d-flex flex-wrap justify-end">
            <v-btn
              color="primary"
              flat
              type="submit"
              :loading="loading"
              variant="flat"
              class="px-6 elevation-1"
            >
              <v-icon icon="mdi-content-save-edit"></v-icon>
              ບັນທຶກ
            </v-btn>
          </v-col>

          <v-col cols="12">
            <v-row>
              <v-col md="4">
                <div class="d-flex align-center">
                  <GlobalAvatarProfileImage
                    :image_url="request?.image_profile ?? ''"
                  />
                </div>

                <div class="d-flex flex-wrap justify-center">
                  <v-btn
                    width="180"
                    height="40"
                    color="primary"
                    flat
                    prepend-icon="mdi-cloud-upload-outline"
                    @click="openFile"
                    class="elevation-1 mt-5"
                  >
                    ອັບໂຫຼດຮູບພາບ
                  </v-btn>
                  <input
                    type="file"
                    ref="file"
                    class="d-none"
                    accept="image/jpg,image/png,image/jpeg"
                    @change="onFileChange"
                  />
                </div>
              </v-col>

              <v-col cols="12" md="8">
                <v-row>
                  <v-col md="4">
                    <label>
                      ຊື່ ແລະ ນາມສະກຸນ / fullname
                      <span style="color: red"> * </span>
                    </label>
                    <v-text-field
                      v-model="request.fullname"
                      :rules="[(v: string)=> !!v || 'This fiels is required']"
                      placeholder="ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ"
                      density="compact"
                      variant="outlined"
                      hide-details="auto"
                    />
                  </v-col>

                  <v-col md="4">
                    <label>
                      ຊື່ຫຼິ້ນ / Nick name <span style="color: red"> * </span>
                    </label>
                    <v-text-field
                      v-model="request.nick_name"
                      :rules="[(v: string)=> !!v || 'This fiels is required']"
                      placeholder="ກະລຸນາປ້ອນຊື່ຫຼິ້ນ"
                      density="compact"
                      variant="outlined"
                      hide-details="auto"
                    />
                  </v-col>

                  <v-col md="4">
                    <label>
                      ເພດ / Gender <span style="color: red"> * </span>
                    </label>
                    <v-select
                      v-model="request.gender"
                      :rules="[(v: string)=> !!v || 'This fiels is required']"
                      placeholder="ກະລຸນາປ້ອນຊື່ຫຼິ້ນ"
                      density="compact"
                      variant="outlined"
                      hide-details="auto"
                      :items="GetDefaultGenders()"
                    />
                  </v-col>

                  <v-col cols="4">
                    <label>
                      ແຂວງ / province
                      <span style="color: red"> * </span></label
                    >
                    <v-select
                      v-model="request.village.district.province_id"
                      :items="globalStore.provinces"
                      item-title="pr_name"
                      item-value="id"
                      density="compact"
                      variant="outlined"
                      :rules="[(v) => !!v || 'ກະລຸນາເລືອກແຂວງ']"
                      hide-details="auto"
                      placeholder="ກະລຸນາເລືອກແຂວງ"
                      @update:model-value="onProvinceChange($event)"
                      clearable
                    ></v-select>
                  </v-col>

                  <v-col md="4">
                    <label>
                      ເມືອງ / district
                      <span style="color: red"> * </span></label
                    >
                    <v-autocomplete
                      v-model="request.village.district_id"
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
                      clearable
                    ></v-autocomplete>
                  </v-col>

                  <v-col md="4">
                    <label>
                      ບ້ານ / village <span style="color: red"> * </span></label
                    >
                    <v-autocomplete
                      v-model="request.village_id"
                      :items="globalStore.villages"
                      item-title="vill_name"
                      item-value="id"
                      density="compact"
                      variant="outlined"
                      placeholder="ກະລຸນາເລືອກບ້ານ"
                      :rules="[(v) => !!v || 'ກະລຸນາເລືອກບ້ານ']"
                      hide-details="auto"
                      no-filter
                      @update:search="onVillageSearch"
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
                      >ຊື່ຜູ້ໃຊ້ / username
                      <span style="color: red"> * </span></label
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
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </section>
</template>

<style scoped></style>
