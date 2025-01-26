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
        delayGoPath("/users");
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
  
  <v-card border flat><v-col cols="12">
    <GlobalTextTitleLine :title="title" />
  </v-col>
  <v-form ref="form" @submit.prevent="handleSubmit">
    <div class="d-flex justify-end align-end mr-3">
      <v-btn color="primary" type="submit" class="mt-2">ບັນທຶກ</v-btn>
    </div>

    <v-col cols="12">
      <v-row>
        <v-col cols="4">
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
                /> </v-col
            >
          </v-row>
        </v-col>
        <v-col cols="8">
          
            <v-row class="ml-2 mr-2">
              <v-col cols="12" md="6">
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

                <label>ເບີໂທລະສັບ</label>
                <v-text-field
                  v-model="request.phone_number"
                  :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນເບີ້ໂທລະສັບ']"
                  placeholder="ກະລຸນາປ້ອນເບີ້ໂທລະສັບ"
                  density="compact"
                  hide-details="auto"
                  variant="outlined"
                  class="pb-6"
                ></v-text-field>

                <label>ສິດການເຂົ້າໃຊ້ງານ</label>
                <v-text-field
                  v-model="request.role"
                  :rules="[(v: string) => !!v || 'ກະລຸນາປອ້ນສິດການເຂົ້າໃຊ້ງານ']"
                  placeholder="ກະລຸນາປອ້ນສິດການເຂົ້າໃຊ້ງານ"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  class="pb-6"
                ></v-text-field>

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
                <label>Villages</label>
                <v-select
                  v-model="request.village_id"
                  :items="globalStore.villages"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  item-title="vill_name"
                  :rules="[(v: string) => !!v || 'Villages is required']"
                  item-value="id"
                ></v-select>
              </v-col>

              <v-col cols="6">
                <label>ເພດ</label>
                <v-text-field
                  v-model="request.gender"
                  :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນເພດ']"
                  placeholder="ກະລຸນາປ້ອນເພດ"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  class="pb-6"
                ></v-text-field>

                <label>ຊື່ຜູ້ໃຊ້ງານ</label>
                <v-text-field
                  v-model="request.username"
                  :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ']"
                  placeholder="ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"
                  density="compact"
                  variant="outlined"
                  hide-details="auto"
                  class="pb-6"
                ></v-text-field>

                <label>Province</label>
                <v-select
                  v-model="request.province_id"
                  :items="globalStore.provinces"
                  variant="outlined"
                  hide-details="auto"
                  :rules="[(v: string) => !!v || 'Province is required']"
                  density="compact"
                  item-title="pr_name"
                  item-value="id"
                  @update:model-value="
                    globalStore.GetDistrictData($event, null)
                  "
                ></v-select>
                <label>Districts</label>
                <v-select
                  v-model="request.district_id"
                  :items="globalStore.districts"
                  variant="outlined"
                  hide-details="auto"
                  density="compact"
                  item-title="dr_name"
                  item-value="id"
                  :rules="[(v: string) => !!v || 'Districts is required']"
                  @update:model-value="
                    globalStore.GetVillagesData($event, null)
                  "
                ></v-select>
                
              </v-col>
            </v-row>
          
        </v-col>
      </v-row> </v-col
  >
</v-form></v-card>

</template>
