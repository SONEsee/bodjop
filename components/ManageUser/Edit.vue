<script setup lang="ts">
import axios from "@/helpers/axios";
import notfounfimages from "@/assets/img/404.png";
const notfoundref = ref(notfounfimages);
const userStore = UseUserStore();
const globalStore = UseGlobalStore();

const title = ref("ເພີ່ມຂໍ້ມູນຕົວແທນ");
const visible = ref(false);
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

const provinceChange = async (province_id: number | null) => {
  await globalStore.GetDistrictData(province_id, null);
  if (request.value !== null) {
    request.value.village.district_id = null;
    request.value.village_id = null;
  }
};

const districtChange = async (district_id: number | null) => {
  await globalStore.GetVillagesData(district_id?.toString() ?? null, null);
  if (request.value !== null) {
    request.value.village_id = null;
  }
};

const onDebounceVillage = useDebounceFn(async (value: string) => {
  await globalStore.GetVillagesData(
    request.value?.village.district_id?.toString() ?? null,
    value ?? null
  );
}, 1000);

const openFile = () => {
  file.value.click();
};

const onFileChange = (event: Event) => {
  const files = event.target.files;
  let file = files[0];
  if (file) {
    const value = file as any;
    if (request.value !== null) {
      request.value.image_profile = value;
    }
  }
};

const submitForm = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    const notification = await CallSwal({
      title: "ທ່ານແມ່ນທີ່ຈະບັນທຶກຂໍ້ມູນນີ້?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    });
    if (notification.isConfirmed) {
      loading.value = true;
      let req = {
        fullname: request.value?.fullname ?? "",
        gender: request.value?.gender ?? "",
        phone_number: request.value?.phone_number ?? "",
        username: request.value?.username ?? "",
        role: request.value?.role ?? "",
        village_id: request.value?.village_id ?? "",
        image_profile: request.value?.image_profile ?? "",
      };
      var formData = new FormData();
      for (const [key, value] of Object.entries(req)) {
        if (key === "file") {
          const file = value as File;
          formData.append("profile_image", file, file.name);
        } else {
          formData.append(key, value?.toString() ?? "");
        }
      }
      const path = `/api/v1/users/update-detail/${request.value?.id}`;
      try {
        const response = await axios.post(path, formData);
        if (response.status === 200) {
          const notification = await CallSwal({
            icon: "success",
            title: "ສຳເລັດ",
            text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
          });
          if (notification.isConfirmed || !notification.isConfirmed) {
            setTimeout(() => {
              goPath("/user");
            }, 1200);
          }
        }
      } catch (error) {
        loading.value = false;
        await CallSwal({
          icon: "error",
          title: "ມີບັນຊີຜິດພາດ",
          text: "ຂໍ້ມູນຂອງທ່ານບໍ່ຖືກບັນທຶກ",
        });
      }
    }
  }
};
</script>

<template>
  
  <section v-if="request !== null" class="bg-gray-50 min-h-screen py-6">
    <div class="max-w-7xl mx-auto px-4">
      <v-form
        ref="form"
        @submit.prevent="submitForm"
        class="bg-white rounded-xl shadow-lg"
      >
        <v-row no-gutters>
          <v-col cols="12" class="px-6 pt-6">
            <div class="d-flex justify-space-between align-center mb-4">
              <GlobalTextTitleLine />
              <v-btn
                color="primary"
                flat
                type="submit"
                :loading="loading"
                class="px-6 elevation-1"
              >
                ບັນທຶກ
              </v-btn>
            </div>
          </v-col>

          <v-col cols="12" class="px-6 pt-6">
            <v-row>
              <v-col cols="12" md="4">
                <div class="d-flex flex-column align-center">
                  <v-avatar
                    v-if="request.image_profile !== 'N/A'"
                    size="220"
                    class="elevation-3 mb-4"
                    :image="GetImageUrl(request.image_profile)"
                  >
                  </v-avatar>
                  <GlobalAvatarProfileImage
                    v-else
                    size="220"
                    class="elevation-3 mb-4"
                    :image_url="request?.image_profile ?? ''"
                  />

                  <v-btn
                    width="180"
                    height="40"
                    color="primary"
                    flat
                    prepend-icon="mdi-cloud-upload-outline"
                    @click="openFile"
                    class="elevation-1"
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
                  <template
                    v-for="(field, index) in [
                    {
                      id: 'fullname',
                      label: 'ຊື່ ແລະ ນາມສະກຸນ / Fullname',
                      model: 'fullname',
                      placeholder: 'ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ',
                      rules: [(v: string) => !!v || 'ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ']
                    },
                    {
                      id: 'gender',
                      label: 'ເພດ',
                      model: 'gender',
                      placeholder: 'ກະລຸນາປ້ອນເພດ',
                      rules: [(v: string) => !!v || 'ກະລຸນາປ້ອນເພດ']
                    },
                    {
                      id: 'phone',
                      label: 'ເບີ້ໂທລະສັບ / Phone number',
                      model: 'phone_number',
                      placeholder: 'ກະລຸນາປ້ອນເບີ້ໂທລະສັບ',
                      rules: [(v: string) => !!v || 'ກະລຸນາປ້ອນເບີ້ໂທລະສັບ']
                    },
                    {
                      id: 'username',
                      label: 'ຊື່ຜູ້ໃຊ້ງານ / Username',
                      model: 'username',
                      placeholder: 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ',
                      rules: [(v: string) => !!v || 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ']
                    },
                    {
                      id: 'role',
                      label: 'ສິດການເຂົ້າໃຊ້ງານ / Role',
                      model: 'role',
                      placeholder: 'ກະລຸນາປ້ອນສິດການເຂົ້າໃຊ້ງານ',
                      rules: [(v: string) => !!v || 'ກະລຸນາປ້ອນສິດການເຂົ້າໃຊ້ງານ']
                    }
                  ]"
                    :key="index"
                  >
                    <v-col cols="12" md="4">
                      <label
                        :for="field.id"
                        class="font-weight-medium mb-2 d-block"
                      >
                        {{ field.label }}
                      </label>
                      <v-text-field
                        :id="field.id"
                        v-model="request[field.model]"
                        :rules="field.rules"
                        :placeholder="field.placeholder"
                        density="comfortable"
                        variant="outlined"
                        hide-details="auto"
                        class="mb-4"
                        bg-color="grey-lighten-4"
                      />
                    </v-col>
                  </template>

                  <v-col cols="12" md="4">
                    <label
                      for="province"
                      class="font-weight-medium mb-2 d-block"
                    >
                      ແຂວງ / Provinces
                    </label>
                    <v-select
                      id="province"
                      v-model="request.village.district.province_id"
                      :rules="[(v: string) => !!v || 'ກະລຸນາເລືອກແຂວງ']"
                      :items="globalStore.provinces"
                      item-value="id"
                      item-title="pr_name"
                      placeholder="ກະລຸນາເລືອກແຂວງ"
                      density="comfortable"
                      variant="outlined"
                      hide-details="auto"
                      class="mb-4"
                      bg-color="grey-lighten-4"
                      @update:model-value="provinceChange"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <label
                      for="district"
                      class="font-weight-medium mb-2 d-block"
                    >
                      ເມືອງ / Districts
                    </label>
                    <v-select
                      id="district"
                      v-model="request.village.district_id"
                      :rules="[(v: string) => !!v || 'ກະລຸນາເລືອກເມືອງ']"
                      :items="globalStore.districts"
                      item-value="id"
                      item-title="dr_name"
                      placeholder="ກະລຸນາເລືອກເມືອງ"
                      density="comfortable"
                      variant="outlined"
                      hide-details="auto"
                      class="mb-4"
                      bg-color="grey-lighten-4"
                      @update:model-value="districtChange"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <label
                      for="villages"
                      class="font-weight-medium mb-2 d-block"
                    >
                      ບ້ານ / Villages
                    </label>
                    <v-autocomplete
                      id="villages"
                      v-model="request.village_id"
                      :rules="[(v: string) => !!v || 'ກະລຸນາເລືອກບ້ານ']"
                      :items="globalStore.villages"
                      item-value="id"
                      item-title="vill_name"
                      placeholder="ກະລຸນາເລືອກບ້ານ"
                      density="comfortable"
                      variant="outlined"
                      hide-details="auto"
                      class="mb-4"
                      bg-color="grey-lighten-4"
                      @update:search="onDebounceVillage"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </section>
</template>

<style scoped>
.v-btn {
  text-transform: none;
  letter-spacing: 0.5px;
}

.v-text-field :deep(.v-field__outline__start),
.v-select :deep(.v-field__outline__start),
.v-autocomplete :deep(.v-field__outline__start) {
  border-radius: 8px 0 0 8px !important;
}

.v-text-field :deep(.v-field__outline__end),
.v-select :deep(.v-field__outline__end),
.v-autocomplete :deep(.v-field__outline__end) {
  border-radius: 0 8px 8px 0 !important;
}

label {
  color: rgba(0, 0, 0, 0.7);
}
</style>
