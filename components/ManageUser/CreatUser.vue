<script setup lang="ts">
import { ref, reactive } from "vue";
import notfoundImage from "@/assets/img/404.png";
const notfoundref = ref(notfoundImage);
import axios from "@/helpers/axios";
import { UsermeModel } from "@/models/";
import { useRouter } from "vue-router";
const userStore = UseUserStore();
const globalStore = UseGlobalStore();
const title = ref("ສ້າງຂໍ້ມູນຜູ້ໃຊ້ງານ");
const tour = ref("ຂໍ້ມູນທົວໄປ")
const location = ref("ຂໍ້ມູນທີ່ຢູ່")
interface UserRequest {
  fullname: string;
  phone_number: string;
  role: string;
  password: string;
  gender: string;
  username: string;
  profile_image: File | null;
}

const router = useRouter();
const form = ref();
const isFormValid = ref(false);
const loading = ref(false);
const visible = ref(false);

const request = userStore.form_create_data;

// const request = reactive<UserRequest>({
//   fullname: "",
//   phone_number: "",
//   role: "",
//   password: "",
//   gender: "",
//   username: "",
//   profile_image: null,
// });

const handleSubmit = async () => {
  try {
    const { valid } = await form.value.validate();
    if (!valid) return;

    // loading.value = true;
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
        delayGoPath("/user");
      } else {
        delayGoPath("users");
      }
    }
  } catch (error) {
    console.error("Registration failed:", error);

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
  <v-card class="pa-4" elevation="1"  border flat >
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
        >
          ບັນທຶກ
        </v-btn>
      </div>

      <v-row>
        <v-col cols="12" md="4">
          <div class="text-center mb-4">
          <h3>ຮູບໂປຣໄຟລ໌</h3></div>

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
        </v-col>

        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12">
              <GlobalTextTitleLine :title="tour" />
              <v-divider class="mb-4"></v-divider>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                v-model="request.fullname"
                density="comfortable"
                variant="outlined"
                label="ຊື່ ແລະ ນາມສະກຸນ"
                placeholder="ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນ']"
                hide-details="auto"
                class="mb-4"
                prepend-inner-icon="mdi-account"
              ></v-text-field>

              <v-text-field
                v-model="request.phone_number"
                density="comfortable"
                variant="outlined"
                label="ເບີໂທລະສັບ"
                placeholder="ກະລຸນາປ້ອນເບີໂທລະສັບ"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນ']"
                hide-details="auto"
                class="mb-4"
                prepend-inner-icon="mdi-phone"
              ></v-text-field>
              <v-text-field
                v-model="request.role"
                density="comfortable"
                variant="outlined"
                label="ສິດການເຂົ້ານຳໃຊ້"
                placeholder="ກະລຸນາປ້ອນສິດການເຂົ້ານຳໃຊ້"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນ']"
                hide-details="auto"
                class="mb-4"
                prepend-inner-icon="mdi-account-star-outline"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="request.gender"
                density="comfortable"
                variant="outlined"
                label="ເພດ"
                :rules="[(v) => !!v || 'ກະລຸນາເລືອກເພດ']"
                hide-details="auto"
                class="mb-4"
                prepend-inner-icon="mdi-gender-male-female"
              ></v-select>

              <v-text-field
                v-model="request.username"
                density="comfortable"
                variant="outlined"
                label="ຊື່ຜູ້ໃຊ້"
                placeholder="ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນ']"
                hide-details="auto"
                class="mb-4"
                prepend-inner-icon="mdi-account-key"
              ></v-text-field>

              <v-text-field
                v-model="request.password"
                density="comfortable"
                variant="outlined"
                type="password"
                placeholder="ກະລຸນາປ້ອນລະຫັດ"
                :rules="[(v) => !!v || 'ກະລຸນາປ້ອນຂໍ້ມູນ']"
                hide-details="auto"
                class="mb-4"
                prepend-inner-icon="mdi-key-outline"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <div class="mb-4"><GlobalTextTitleLine :title="location" /></div>
              
            </v-col>

            <v-col cols="12" md="4">
              <v-select
                v-model="request.province_id"
                :items="globalStore.provinces"
                item-title="pr_name"
                item-value="id"
                density="comfortable"
                variant="outlined"
                label="ແຂວງ"
                :rules="[(v) => !!v || 'ກະລຸນາເລືອກແຂວງ']"
                hide-details="auto"
                class="mb-4"
                @update:model-value="globalStore.GetDistrictData($event, null)"
                prepend-inner-icon="mdi-map-marker"
              ></v-select>
            </v-col>

            <v-col cols="12" md="4">
              <v-select
                v-model="request.district_id"
                :items="globalStore.districts"
                item-title="dr_name"
                item-value="id"
                density="comfortable"
                variant="outlined"
                label="ເມືອງ"
                :rules="[(v) => !!v || 'ກະລຸນາເລືອກເມືອງ']"
                hide-details="auto"
                class="mb-4"
                @update:model-value="globalStore.GetVillagesData($event, null)"
                prepend-inner-icon="mdi-map-marker-outline"
              ></v-select>
            </v-col>

            <v-col cols="12" md="4">
              <v-select
                v-model="request.village_id"
                :items="globalStore.villages"
                item-title="vill_name"
                item-value="id"
                density="comfortable"
                variant="outlined"
                label="ບ້ານ"
                :rules="[(v) => !!v || 'ກະລຸນາເລືອກບ້ານ']"
                hide-details="auto"
                class="mb-4"
                prepend-inner-icon="mdi-home-variant"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>
