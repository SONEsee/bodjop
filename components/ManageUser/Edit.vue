<script setup lang="ts">
import axios from "@/helpers/axios";
import notfounfimages from "@/assets/img/404.png";
const notfoundref = ref(notfounfimages);
const userStore = UseUserStore();

const agencyStore = UseAgencyStore();
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
    console.log(request.value.village.district_id);
    request.value.village_id = null;
    console.log(request.value.village_id);
  }
};

const districtChange = async (district_id: number | null) => {
  await globalStore.GetVillagesData(district_id?.toString() ?? null, null);
  if (request.value !== null) {
    request.value.village_id = null;
    console.log(request.value.village_id);
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
  console.log(`event`, event);
  //@ts-ignore
  const files = event.target.files;
  let file = files[0];
  console.log(`file`, file);
  if (file) {
    const value = file as any;
    if (request.value !== null) {
      request.value.image_profile = value;
    }
  }
};
const submitForm = async ()=>{
  const {valid} = await form.value.validate();
  if(valid){
    const notification = await CallSwal({
      title: "ທ່ານແມ່ນທີ່ຈະບັນທຶກຂໍ້ມູນນີ້?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    });
    if(notification.isConfirmed){
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
      for (const [key, value] of Object.entries(req)){
        if(key === "file"){
          const file = value as File;
          formData.append("profile_image", file, file.name);
        }else{
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
          if (notification.isConfirmed) {
            setTimeout(() => {
              goPath("/user");
            }, 1200);
          } else {
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
  <section v-if="request !== null">
    <v-form ref="form" @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12">
          <GlobalTextTitleLine />
        </v-col>
        <v-col cols="12" class="d-flex flex-wrap justify-end">
          <v-btn color="primary" flat type="submit" :loading="loading"
            >ບັນທຶກ</v-btn
          >
        </v-col>
        <v-col cols="12 " class="pt-12">
          <v-row>
            <v-col cols="4">
              <v-row>
                <v-col cols="12" class="d-flex flex-wrap justify-center">
                  <v-avatar
                    size="220"
                    class="mx-auto"
                    :image="GetImageUrl(request.image_profile)"
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
            <v-col cols="8">
              <v-row>
                <v-col cols="12" md="4">
                  <label for="fullname">ຊື່ ແລະ ນາມສະກຸນ / Fullname</label>
                  <v-text-field
                    id="fullname"
                    @click:append-inner="visible = !visible"
                    :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ']"
                    v-model="request.fullname"
                    placeholder="ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ"
                    density="compact"
                    variant="outlined"
                    hide-details="auto"
                    class="pb-6"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <label for="gender">ເພດ </label>
                  <v-text-field
                    @click:append-inner="visible = !visible"
                    :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນເພດ']"
                    v-model="request.gender"
                    id="gender"
                    placeholder="ກະລຸນາປ້ອນເພດ"
                    density="compact"
                    variant="outlined"
                    hide-details="auto"
                    class="pb-6"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <label for="phone">ເບີ້ໂທລະສັບ / phon number</label>
                  <v-text-field
                    id="phone"
                    @click:append-inner="visible = !visible"
                    :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນgເບີ້ໂທລະສັບ']"
                    v-model="request.phone_number"
                    placeholder="ກະລຸນາປ້ອນເບີ້ໂທລະສັບ"
                    density="compact"
                    variant="outlined"
                    hide-details="auto"
                    class="pb-6"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <label for="username">ຊື້ຜູ້ໃຊ້ງານ / Username</label>
                  <v-text-field
                    id="username"
                    @click:append-inner="visible = !visible"
                    :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ']"
                    v-model="request.username"
                    placeholder="ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"
                    density="compact"
                    variant="outlined"
                    hide-details="auto"
                    class="pb-6"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <label for="role">ສິດການເຂົ້າໃຊ້ງານ / role</label>
                  <v-text-field
                    id="role"
                    @click:append-inner="visible = !visible"
                    :rules="[(v: string) => !!v || 'ກະລຸນາປ້ອນຊື່ສິດການເຂົ້າໃຊ້ງານ']"
                    v-model="request.role"
                    placeholder="ກະລຸນາປ້ອນສິດການເຂົ້າໃຊ້ງານ"
                    density="compact"
                    variant="outlined"
                    hide-details="auto"
                    class="pb-6"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <label for="province">ແຂວງ / Provines</label>
                  <v-select
                    id="province"
                    v-model="request.village.district.province_id"
                    :rules="[(v: string) => !!v || 'ກະລຸນາເລືອກແຂວງ']"
                    placeholder="ກະລຸນາເລືອກແຂວງ"
                    :items="globalStore.provinces"
                    item-value="id"
                    item-title="pr_name"
                    variant="outlined"
                    density="compact"
                    class="pb-6"
                    no-filter
                    hide-details="auto"
                    @update:model-value="provinceChange"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <label for="district">ເມືອງ / Districts</label>
                  <v-select
                    id="district"
                    v-model="request.village.district_id"
                    :rules="[(v: string) => !!v || 'ກະລຸນາເລືອກເມືອງ']"
                    placeholder="ກາລຸນາເລືອກເມືອງ"
                    density="compact"
                    :items="globalStore.districts"
                    item-value="id"
                    item-title="dr_name"
                    variant="outlined"
                    hide-details="auto"
                    class="pb-6"
                    @update:model-value="districtChange"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <label for="villages">ບ້ານ / Villages</label>
                  <v-autocomplete
                    id="villages"
                    v-model="request.village_id"
                    :rules="[(v: string)=> !!v || 'ກະລຸນາເລືອກບ້ານ']"
                    placeholder="ກະລຸນາເລືອກບ້ານ"
                    :items="globalStore.villages"
                    item-value="id"
                    item-title="vill_name"
                    variant="outlined"
                    density="compact"
                    @update:search="onDebounceVillage"
                    class="pb-6"
                    no-filter
                    hide-details="auto"
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </section>
  {{ request }}
</template>
