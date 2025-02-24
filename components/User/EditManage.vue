<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { UseGlobalStore } from "~/stores/global";

import { CallSwal, goPath } from "~/composables/global";
import axios from "@/helpers/axios";
import { UserGetdataModel } from "@/models";
import notfounfimages from "@/assets/img/404.png";
import { useDebounceFn } from "@vueuse/core";

interface District {
  id: number;
  dr_name: string;
  dr_name_en: string;
  province_id: number;
}

interface Village {
  id: number;
  vill_name: string;
  vill_name_en: string;
  district_id: number;
}

const notfoundref = ref(notfounfimages);
const globalStore = UseGlobalStore();
const userStore = UserManageStore();
const route = useRoute();
const title = ref("");
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

onMounted(async () => {
  console.log("Route Params/ID:", route.params.id || route.query.id);

  const userId = route.params.id || route.query.id;
  if (userId) {
    try {
      await userStore.Getdetail(userId.toString());
      console.log(
        "User Data after fetch:",
        userStore.response_detail_query_data
      );
    } catch (error) {
      console.error("Error fetching user detail in onMounted:", error);
      await CallSwal({
        title: "ຜິດພາດ",
        text: "ບໍ່ສາມາດດຶງຂໂສມ຺ູນຜູ້ໃຊ້ໄດ້",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  if (request.value && request.value.village.district.province_id) {
    try {
      await globalStore.GetDistrictData(
        request.value.village.district.province_id,
        null
      );
      console.log("Districts after initial load:", globalStore.districts);

      if (request.value.village.district_id) {
        await globalStore.GetVillagesData(
          request.value.village.district_id.toString(),
          null
        );
        console.log("Villages after initial load:", globalStore.villages);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      await CallSwal({
        title: "ຜິດພາດ",
        text: "ບໍ່ສາມາດດຶງຂໂສມ຺ູນແຂວງ/ເມືອງ/ບ້ານໄດ້",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  if (request.value) {
    const userData =
      request.value as UserGetdataModel.GetUserDetailResponseItems;
    selectedDistrict.value =
      globalStore.districts.find(
        (d) => d.id === userData.village.district_id
      ) ?? null;
    selectedVillage.value =
      globalStore.villages.find((v) => v.id === userData.village_id) || null;
    console.log("Initial Selected District:", selectedDistrict.value);
    console.log("Initial Selected Village:", selectedVillage.value);
  }
});

watch(
  request,
  (newRequest) => {
    if (newRequest) {
      const userData =
        newRequest as UserGetdataModel.GetUserDetailResponseItems;
      selectedDistrict.value =
        globalStore.districts.find(
          (d) => d.id === userData.village.district_id
        ) ?? null;
      selectedVillage.value =
        globalStore.villages.find((v) => v.id === userData.village_id) || null;
      console.log("Updated Selected District:", selectedDistrict.value);
      console.log("Updated Selected Village:", selectedVillage.value);
    }
  },
  { immediate: true }
);


const selectedDistrict = ref<District | null>(null);
const selectedVillage = ref<Village | null>(null);

type FieldConfig = {
  id: string;
  label: string;
  model: keyof UserGetdataModel.GetUserDetailResponseItems;
  placeholder: string;
  rules: ((v: any) => true | string)[];
  icon?: string;
};

const fields: FieldConfig[] = [
  {
    id: "fullname",
    label: "ຊື່ ແລະ ນາມສະກຸນ ",
    model: "fullname",
    placeholder: "ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ",
    rules: [(v: string) => !!v || "ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ"],
    icon: "mdi-account",
  },
  {
    id: "gender",
    label: "ເພດ",
    model: "gender",
    placeholder: "ກະລຸນາປ້ອນເພດ",
    icon:"mdi-gender-male-female",
    rules: [(v: number) => v !== null || "ກະລຸนາປ້ອນເພດ"],
  },
  {
    id: "phone",
    label: "ເບີ້ໂທລະສັບ ",
    model: "phone_number",
    placeholder: "ກະລຸນາປ້ອນເບີ້ໂທລະສັບ",
    rules: [(v: string) => !!v || "ກະລຸນາປ້ອນເບີ້ໂທລະສັບ"],
    icon: "mdi-phone",
  },
  {
    id: "username",
    label: "ຊື່ຜູ້ໃຊ້ງານ ",
    model: "username",
    placeholder: "ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ",
    rules: [(v: string) => !!v || "ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"],
    icon: "mdi-account",
  },
  {
    id: "role",
    label: "ສິດການເຂົ້າໃຊ້ງານ ",
    model: "role",
    placeholder: "ກະລຸນາປ້ອນສິດການເຂົ້າໃຊ້ງານ",
    rules: [(v: string) => !!v || "ກະລຸນາປ້ອນສິດການເຂົ້າໃຊ້ງານ"],
    icon: "mdi-cogs",
  },
];

const provinceChange = async (province_id: number | null) => {
  console.log("Province Change:", province_id);
  await globalStore.GetDistrictData(province_id, null);
  console.log("Districts after province change:", globalStore.districts);
  if (request.value) {
    const userData =
      request.value as UserGetdataModel.GetUserDetailResponseItems;
    userData.village.district_id = null;
    selectedDistrict.value = null;
    userData.village_id = null;
    selectedVillage.value = null;
  }
};

const districtChange = async (district_id: number | null) => {
  console.log("District Change:", district_id);
  await globalStore.GetVillagesData(district_id?.toString() ?? null, null);
  console.log("Villages after district change:", globalStore.villages);
  if (request.value) {
    const userData =
      request.value as UserGetdataModel.GetUserDetailResponseItems;
    userData.village_id = null;
    selectedVillage.value = null;
  }
};

const onDebounceVillage = useDebounceFn(async (value: string) => {
  console.log("Village Search:", value);
  await globalStore.GetVillagesData(
    request.value?.village.district_id?.toString() ?? null,
    value ?? null
  );
  console.log("Villages after search:", globalStore.villages);
}, 1000);

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
    const notification = await CallSwal({
      title: "ທ່ານຕອ້ງການບັນທຶກການປຽນແປງນ້ີແທ້ບໍ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    });
    if (notification.isConfirmed) {
      loading.value = true;
      if (request.value) {
        const userData =
          request.value as UserGetdataModel.GetUserDetailResponseItems;
        const req = {
          fullname: userData.fullname ?? "",
          gender: userData.gender ?? 0,
          phone_number: userData.phone_number ?? "",
          username: userData.username ?? "",
          role: userData.role ?? "ADMIN",
          village_id: selectedVillage.value?.id ?? userData.village_id ?? null,
          image_profile: userData.image_profile ?? "",
          status: userData.status ?? 1,
          agent_code: userData.agent_code ?? "N/A",
        };
        console.log("Request Data Before Submit:", req);

        if (!req.village_id) {
          await CallSwal({
            icon: "error",
            title: "ຜິດພາດ",
            text: "ກະລຸນາເລືອກບ້ານກ່ອນບັນທຶກ",
          });
          loading.value = false;
          return;
        }

        const formData = new FormData();
        for (const [key, value] of Object.entries(req)) {
          if (key === "image_profile" && value instanceof File) {
            formData.append("profile_image", value, value.name);
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
            await CallSwal({
              icon: "success",
              title: "ສຳເລັດ",
              text: "ບັນທຶກບັນທຶກການປຽນແປງສຳເລັດ",
            });
            setTimeout(() => goPath("/manageuser"), 1200);
          }
        } catch (error: any) {
          console.error(
            "Error submitting form:",
            error.response?.data || error.message
          );
          await CallSwal({
            icon: "error",
            title: "ຜິດພາດ",
            text: error.response?.data?.message || "ບໍ່ສາມາດບັນທຶກການປຽນແປງໄດ້",
          });
        } finally {
          loading.value = false;
        }
      } else {
        await CallSwal({
          icon: "error",
          title: "ຜິດພາດ",
          text: "ບໍ່ສາມາດບັນທຶກການປຽນແປງໄດ້",
        });
        loading.value = false;
      }
    }
  }
};

const GetImageUrl = (image: string | File) => {
  return typeof image === "string" ? image : URL.createObjectURL(image);
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
              <v-icon icon="mdi-home"></v-icon>
                ບັນທຶກ
              </v-btn>
            </div>
          </v-col>

          <v-col cols="12" class="px-6 pt-6">
            <v-row>
              <v-col cols="12" md="4">
                <div class="d-flex flex-column align-center">
                  <v-avatar
                    v-if="
                      request.image_profile && request.image_profile !== 'N/A'
                    "
                    size="220"
                    class="elevation-3 mb-4"
                    :image="GetImageUrl(request.image_profile)"
                  />
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
                  <template v-for="(field, index) in fields" :key="index">
                    <v-col cols="12" md="4">
                      <label
                        :for="field.id"
                        class="font-weight-medium mb-2 d-block"
                      >
                        {{ field.label }}
                      </label>
                      <v-text-field
                      :prepend-inner-icon="field.icon"
                        :id="field.id"
                        v-model="request[field.model]"
                        :rules="field.rules"
                        :placeholder="field.placeholder"
                        density="compact"
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
                      ແຂວງ 
                    </label>
                    <v-select
                        prepend-inner-icon="mdi-map-marker-outline"
                      v-model="request.village.district.province_id"
                      :rules="[(v: number | null) => v !== null || 'ກະລຸນາເຜືອກແຂວງ']"
                      placeholder="ກະລຸນາເຜືອກແຂວງ"
                      density="compact"
                      :items="globalStore.provinces"
                      item-title="pr_name"
                      item-value="id"
                      variant="outlined"
                      hide-details="auto"
                      class="pb-6"
                      @update:model-value="provinceChange"
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <label
                      for="district"
                      class="font-weight-medium mb-2 d-block"
                    >
                      ເມືອງ 
                    </label>
                    <v-select
                    prepend-inner-icon="mdi-map-marker"
                      v-model="selectedDistrict"
                      :rules="[(v: District | null) => !!v && typeof v.id === 'number' || 'ກະລຸນາເຜືອກເມືອງ']"
                      placeholder="ກະລຸນາເຜືອກເມືອງ"
                      density="compact"
                      :items="globalStore.districts"
                      item-value="id"
                      item-title="dr_name"
                      return-object
                      variant="outlined"
                      hide-details="auto"
                      class="pb-6"
                      @update:model-value="
                        districtChange(selectedDistrict?.id ?? null)
                      "
                    />
                  </v-col>

                  <v-col cols="12" md="4">
                    <label
                      for="villages"
                      class="font-weight-medium mb-2 d-block"
                    >
                      ບ້ານ 
                    </label>
                    <v-autocomplete
                        prepend-inner-icon="mdi-map-marker-radius"
                      id="villages"
                      v-model="selectedVillage"
                      :rules="[(v: Village | null) => !!v && typeof v.id === 'number' || 'ກະລຸນາເຜືອກບ້ານ']"
                      :items="globalStore.villages"
                      item-value="id"
                      item-title="vill_name"
                      return-object
                      placeholder="ກະລຸນາເຜືອກບ້ານ"
                      density="compact"
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
  <template v-else>
    <div class="d-flex justify-center align-center" style="height: 100vh">
      <v-progress-circular indeterminate color="primary" />
    </div>
  </template>
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
